import { Typography, Tooltip, Button, Input } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip, Legend, Text } from 'recharts';
import { PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './index.css'
import { fetchAllStockComments } from '../../server';

const processString = (s: string) => {
    if(s.charAt(0) === '$' || s.length === 0) {
        return s.toUpperCase()
    } else {
        return ('$' + s).toUpperCase()
    }
} 

const processStockPredicted = (arr: any[]): [positive: number, neutral: number, negative: number]  => {
    let count = {
        positive: 0,
        neutral: 0,
        negative: 0,
    }

    arr.forEach((d: any) => {
        const sent = d.Predicted as ('positive' | 'neutral' | 'negative')
        count[sent] += 1
    })
    return [count.positive, count.neutral, count.negative]
}

const {Title} = Typography

interface Data {
    name: string,
    positive: number,
    neutral: number,
    negative: number,
}

export default function Home(){
    const location = useLocation()
    const [chosenStock, setChosenStock] = useState<string[]>([]); 
    const [data, setData] = useState<Data[]>([])
    const [inputVal, setInputVal] = useState('')

    const placeholderData = useRef([{
        name: '',
        positive: 0,
        neutral: 0,
        negative: 0
        
    }]).current
    useEffect(() => {
        const state = location.state as {[initial: string]: string};
        if(state) {
            onAddStock(state.initial.toUpperCase())
        }
    }, [])
     
    const onInputChange = (e: any) => {
        setInputVal(processString(e.target.value))
    }
    const onAddStock = (inputVal: string) => {
        fetchAllStockComments(inputVal)
            .then((value:any) => {
                setChosenStock([...chosenStock, inputVal])
                const [positive, neutral, negative] = processStockPredicted(value.response.docs ?? [])
                setData([...data, {
                    name: inputVal,
                    positive,
                    neutral,
                    negative
                }])
            })
        setInputVal('')
        
    }

    console.log(data)
    return (
        <div className='comparison-container'>
            <Title>Stock Sentiments Comparison</Title>
            <div className="ticker-display">
                <Title level={3}>{chosenStock.join(' vs ')}</Title>
                <Input 
                    onChange={onInputChange} 
                    onPressEnter={() => {onAddStock(inputVal)}}
                    value={inputVal} 
                    style={{borderRadius: 6, width: 120, height: 33, marginRight: 8, marginLeft: chosenStock.length > 0 ? 18 : 0}} 
                    placeholder="Compare..."
                />
                <Tooltip placement='right' title="add another stock ticker">
                    <Button onClick={() => {onAddStock(inputVal)}} type="dashed" shape="circle" icon={<PlusOutlined />} />
                </Tooltip>
            </div>

            <div style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%', 
                paddingTop: 24
            }}>
                <BarChart
                    maxBarSize={70}
                    width={700}
                    height={400}
                    data={data.length === 0 ? placeholderData : data}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis/>
                    <ChartTooltip />
                    <Legend />
                    <Text textAnchor='middle'> Sentiment distirbution of tweets</Text>
                    <Bar width={20} dataKey="positive" stackId="a" fill="#00BD9D" />
                    <Bar width={20} dataKey="neutral" stackId="a" fill="#424651" />
                    <Bar width={20} dataKey="negative" stackId="a" fill="#D64933" />
                </BarChart>
            </div>
        </div>
    )
}