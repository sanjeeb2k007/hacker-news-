import { combineReducers } from 'redux';
import  newsReducer  from './news/news.reducer';

export default combineReducers ({
    news: newsReducer
})
