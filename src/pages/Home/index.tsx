import { Typography, Input, AutoComplete } from 'antd';
import React, { useState } from 'react';
import { PageStatus } from '../../constants';
import {SearchOutlined} from '@ant-design/icons'
import './index.css';
import SearchBar from './components/SearchBar';

const {Title} = Typography;

export default function Home(){
    const [searchParams, setSearchParams] = useState('Tweet');
    const [searchQuery, setSearchQuery] = useState('');
    const [pageStatus, setPageStatus] = useState<PageStatus>(PageStatus.Ready)

    const onSearch = () => {
        console.log(`searching: q: ${searchQuery}, p: ${searchParams}`)
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
            
        </div>
    )
}