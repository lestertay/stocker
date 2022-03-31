import React from 'react';
import {Input} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import DropdownSelector from './DropdownSelector';

interface IProps {
    searchParams: string, 
    setSearchParams: React.Dispatch<React.SetStateAction<string>>, 
    searchQuery: string, 
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>,
    onSearch: () => void,
}

const SearchBar: React.FC<IProps> = ({
    searchParams, 
    setSearchParams, 
    setSearchQuery, 
    searchQuery,
    onSearch,
}) => {
    return (
        <div className='search-input' id='custom-input'>
                <Input 
                    onChange={(e) => {
                        setSearchQuery(e.target.value)
                    }}
                    onPressEnter={() => {
                        onSearch()
                    }}
                    allowClear
                    prefix={<SearchOutlined style={{color: '#c2c2c2', marginRight: 8}}/>}
                    suffix={
                        <DropdownSelector 
                            value={searchParams} 
                            onChange={setSearchParams} />
                        }
                    style={{
                        width: 540, 
                        position: 'relative',
                        top: -32}} 
                    placeholder="Search..."  
                    size="large" 
                />
            </div>
    )
}

export default SearchBar;