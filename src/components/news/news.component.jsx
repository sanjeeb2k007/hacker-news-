import React from   'react';
import NewsItem from '../../components/news-item/news-item.component';
import Pagination from '../../components/pagination/pagination.component';
import './news.styles.scss';
import { connect } from "react-redux";
import { fetchNews } from "../../redux/news/news.actions";

class News extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchNews());
      }

    render() {
        return (
            <div className='news-container'>
                {this.props.news.map(({objectID,...otherProps }) => (
                    <NewsItem key={objectID} {...otherProps} data-key={objectID} />
                    ))}
            </div>
        );

               
    }
}

const mapStateToProps = state => ({
    news: state.news.items,
    loading: state.news.loading,
    error: state.news.error,
    pageNumber:state.news.pageNumber
  });
  
  export default connect(mapStateToProps)(News);