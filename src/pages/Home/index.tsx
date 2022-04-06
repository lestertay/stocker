import { Pagination, Typography } from 'antd';
import React, { useState } from 'react';
import { PageStatus, predicatedEnumMap, Predicted, ResultsData } from '../../constants';
import './index.css';
import SearchBar from './components/SearchBar';
import InfoCard from './components/InfoCards';
import { fetchQueryResult } from '../../server';

const {Title, Paragraph} = Typography;

export default function Home(){
    const [searchParams, setSearchParams] = useState('Comments');
    const [searchQuery, setSearchQuery] = useState('');
    const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.Ready)
    const [resultsData, setResultsData] = useState<{[key:number]: ResultsData[]}>({1:[]})
    const [queryTime, setQueryTime] = useState(0)
    const [pageNumber, setPageNumber] = useState(1)
    const [totalCount, setTotalCount] = useState<number>(0);

    const onPageReset = () => {
        setPageStatus(PageStatus.Loading)
        setTotalCount(0)
        setResultsData({})
        setQueryTime(0)
        setPageNumber(1)
    }

    const onSearch = async () => {
        onPageReset()
        fetchQueryResult({label: searchParams, value: searchQuery})
            .then(data => {
                const {response, responseHeader} = data
                setQueryTime(responseHeader.QTime)
                setTotalCount(response.numFound)
                const processedResults: ResultsData[] = response.docs.map((r:any): ResultsData => {
                    const predictedEnum = predicatedEnumMap[r.Predicted] ?? Predicted.Unavailable
                    return {
                        username: r.UserName,
                        handle: r.Handle,
                        comments: r.Comments,
                        replies: r.Reply,
                        likes: r.Likes,
                        retweets: r.Retweet,
                        predicted: predictedEnum,
                        timestamp: r.TimeStamp,

                    } as ResultsData
                })
                setResultsData({
                    1: processedResults
                })
                setPageStatus(PageStatus.Ready)
            })
            .catch(error => {
                setPageStatus(PageStatus.Error)
                console.log('error', error)
            })
       
    }

    const onPaginationChange = (pageNumber: number, pageSize: number): void => {
        if (typeof resultsData[pageNumber] === 'undefined') {
            setPageStatus(PageStatus.Loading)
            fetchQueryResult({label: searchParams, value: searchQuery}, (pageNumber - 1) * pageSize)
                .then(data => {
                    const {response} = data
                    const processedResults: ResultsData[] = response.docs.map((r:any): ResultsData => {
                        const predictedEnum = predicatedEnumMap[r.Predicted] ?? Predicted.Unavailable
                        return {
                            username: r.UserName,
                            handle: r.Handle,
                            comments: r.Comments,
                            replies: r.Reply,
                            likes: r.Likes,
                            retweets: r.Retweet,
                            predicted: predictedEnum,
                            timestamp: r.TimeStamp,
    
                        } as ResultsData
                    })
                    setResultsData({
                        [pageNumber]: processedResults,
                        ...resultsData
                    })
                    setPageStatus(PageStatus.Ready)
                })
        }

        setPageNumber(pageNumber)
    }

    return (
        <div className='main-container'>
            <div className='container-bg'>
                <Title style={{color:'white'}}>Twitter Stock Sentiments</Title>
            </div>
            <SearchBar 
                onSearch={onSearch}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
           {(pageStatus === PageStatus.Ready) && <div className='info-container'>
                <Paragraph>
                    { totalCount > 0 ? (<span><b>{totalCount}</b> results found, query took <b>{queryTime}ms</b></span>) : (
                        <span>no results found yet</span>
                    )}
                </Paragraph>
                {resultsData[pageNumber].map((v, i) => {
                    return (
                        <div className='info-card-container' key={`${i}`}>
                            <InfoCard 
                                {...v}
                            />
                        </div>
                    )
                })}
                
                {totalCount > 0 && <Pagination 
                    current={pageNumber} 
                    style={{padding: '16px 0px 32px 0px'}} 
                    total={totalCount} 
                    showSizeChanger={false} 
                    onChange={onPaginationChange} />}
            </div>} 
        </div>
    )
}