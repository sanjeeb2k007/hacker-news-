import React from   'react';
import './pagination.style.scss';
import { connect } from "react-redux";
import { fetchNews } from "../../redux/news/news.actions";

class Pagination extends React.Component {
    nextClick  = () => {
        let currentPage = this.props.pageNumber && this.props.pageNumber >=2 ? this.props.pageNumber : 1;
        this.props.dispatch(fetchNews(currentPage+1));
      };

      prevClick  = () => {
        let currentPage = this.props.pageNumber && this.props.pageNumber >=2 ? this.props.pageNumber : null;
        if (currentPage && currentPage !==0) {
            this.props.dispatch(fetchNews(currentPage-1));
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
  
  export default connect(mapStateToProps)(Pagination);