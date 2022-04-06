import React from 'react';
import {Select} from 'antd';

interface IDropdownProps {
    onChange: React.Dispatch<React.SetStateAction<string>>;
    value: string;
}

const DropdownSelector:React.FC<IDropdownProps> = ({value, onChange}) => {
    return (
        <>
            <div className='divider'/>
            <Select 
                size='large' 
                value={value} 
                onChange={onChange}
                style={{
                    marginRight: 8, 
                    border: 'none',
                    width: 100
                    }}
            >
                <Select.Option value="Comments">Tweet</Select.Option>
                <Select.Option value="Handle">Handle</Select.Option>
            </Select>
        </>
    )
}

export default DropdownSelector;