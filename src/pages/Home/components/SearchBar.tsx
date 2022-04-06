import React, { useEffect, useRef, useState } from 'react';
import {Dropdown, Input, Menu} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import DropdownSelector from './DropdownSelector';
import { fetchHandleSuggestion } from '../../../server';
const _ = require('lodash');

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
    const [dropdownVisible, setDropdownVisible] = useState(false)
    const [suggestions, setSuggestions] = useState([])
    const processString = (s: string) => {
        if(s.charAt(0) === '@' || s.length === 0 || searchParams !== 'Handle') {
            return s
        } else {
            return '@' + s
        }
    } 

    const genHandleSuggestions = async (s: string) => {
        console.log('fetching suggestion for', s)
        fetchHandleSuggestion(s)
        .then((value:any) => {
            const r = value.suggest.mySuggester[s].suggestions.map((t:any) => t.term)
            console.log('received', r)
            setSuggestions(r)
            if(r.length === 0) {
                setDropdownVisible(false)
            } else if(!dropdownVisible) {
                setDropdownVisible(true)
            }
        })
        .catch(()=> {
            setDropdownVisible(false)
        })
        
    }
    const debouncedSearch = useRef(_.debounce(genHandleSuggestions, 200)).current

    useEffect(() => {
        return () => {
          debouncedSearch.cancel();
        };
      }, [debouncedSearch]);

    const onSelectSuggestion = (item: any) => {
        setDropdownVisible(false)
        setSearchQuery(item.key)
        console.log('selected', item)
    }


    const menu = (
        <Menu onClick={onSelectSuggestion} style={{borderRadius: 8}}>
            {suggestions.map((s:string) => {
                return (
                <Menu.Item key={s}>
                    {s}
                </Menu.Item>)
            })}
        </Menu>
      );

    return (
        <div className='search-input' id='custom-input'>
            <Dropdown visible={dropdownVisible && searchParams === "Handle" && suggestions.length > 0} overlay={menu}>
                <Input 
                    onBlur={() => {setDropdownVisible(false)}}
                    value={searchQuery}
                    onChange={(e) => {
                        const s = processString(e.target.value)
                        setSearchQuery(s)
                        if (searchParams === "Handle") {
                            debouncedSearch(s)
                        }
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
            </Dropdown>

        </div>
    )
}

export default SearchBar;