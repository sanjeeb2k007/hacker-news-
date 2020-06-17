import React from   'react';
import './news-item.style.scss';

const NewsItem = ({title, url,author,created_at,points,num_comments}) => ( 
    <div className={'news-item'}> 
        <div className='content'>
            {num_comments ? <span>{num_comments}</span> : ''}
            {points ? <span>{points}</span> : ''}
            {title ? <span className='title'>{title}</span>: ''}
            <span className='url'>{url}</span>
            <span className='author'>{author}</span>
            <span className='date'>{new Date(`${created_at}`).toDateString()}</span>
            <span className='hide'>[hide]</span>
        </div>
    </div>

);

export default NewsItem;