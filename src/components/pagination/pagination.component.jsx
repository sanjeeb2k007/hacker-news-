import React from   'react';
import './pagination.style.scss';
import { connect } from "react-redux";
import { fetchNews } from "../../redux/news/news.actions";
import {withRouter} from 'react-router-dom';

class Pagination extends React.Component {
    nextClick  = () => {
        let currentPage = this.props.pageNumber && this.props.pageNumber >=2 ? this.props.pageNumber : 1;
        this.props.dispatch(fetchNews(currentPage+1));
        this.props.history.push(`${this.props.match.url}${'?p='}${currentPage + 1}`);
      };

      prevClick  = () => {
        let currentPage = this.props.pageNumber && this.props.pageNumber >=2 ? this.props.pageNumber : null;
        if (currentPage && currentPage > 2) {
            this.props.dispatch(fetchNews(currentPage-1));
            this.props.history.push(`${this.props.match.url}${'?p='}${currentPage - 1}`);
        } else {
          this.props.dispatch(fetchNews());
          this.props.history.push(`${this.props.match.url}`)
        }
      };
    render () {
        return (
            <div className='pagination'>
            <div onClick={ this.prevClick} className='prev'>Privious</div>
            <div onClick={ this.nextClick} className='next'>next</div>
        </div>
        )}
}
const mapStateToProps = state => ({
    news: state.news.items,
    loading: state.news.loading,
    error: state.news.error,
    pageNumber: state.news.pageNumber
  });
  
  export default withRouter(connect(mapStateToProps) (Pagination));