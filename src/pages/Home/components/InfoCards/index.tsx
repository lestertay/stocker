import React from 'react';
import { Tag, Typography } from 'antd';
import { Predicted } from '../../../../constants';
import './index.css';

const {Title, Paragraph} = Typography;

interface IProps {
    username: string,
    handle: string,
    comments: string,
    replies: number,
    retweets: number,
    likes: number,
    predicted: Predicted,
    timestamp: string,
}

const InfoCard: React.FC<IProps> = ({username, handle, comments, replies, likes, retweets, predicted}) => {

    const renderTag = (predicted: Predicted) => {
        switch (predicted) {
            case Predicted.Positive:
                return <Tag color='green'>Positive</Tag>;
            case Predicted.Negative:
                return <Tag color='red'>Negative</Tag>;
            case Predicted.Neutral:
                return <Tag>Neutral</Tag>;
            case Predicted.Unavailable:
                return <div/>
        }
    }
    
    return (
        <div className='card-container'>
            <div style={{display: 'flex', flexDirection:'row', alignItems:'center', marginBottom: 10}}>
                <Title level={4} style={{margin: '0 8px 0px 0px'}}>{username}</Title> 
                <span style={{color: '#828384', fontSize: 16}}>{handle}</span>
                <div style={{marginLeft: 'auto'}}>
                    {renderTag(predicted)}
                </div>
            </div>
            <Paragraph>
                {comments}
            </Paragraph>
            <div style={{
                display: 'flex', 
                flexDirection:'row', 
                alignItems:'center',
                marginTop: 'auto',
                // color: '#48483A',
            }}>
                {/* {`Replies: ${replies} • Likes: ${likes} •  Retweets: ${retweets}`} */}
                <span>Replies: <b>{replies}</b></span>
                <div className='dividerr'/>
                <span>Likes: <b>{likes}</b></span>
                <div className='dividerr'/>
                <span>Retweets: <b>{retweets}</b></span>
            </div>
        </div>
    )
}

export default InfoCard