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

      nextClick  = () => {
        fetch(`https://hn.algolia.com/api/v1/search?page=${this.state.pageNumber + 1}`)
        .then(response => response.json())
        .then(response => {
            this.setState(function (state, props) { 
                return {  news :response.hits, pageNumber:response.page, hidden:true}
            });
        });
        this.props.history.push(`${this.props.match.url}${'?p='}${this.state.pageNumber + 1}`);
      }

      prevClick = () => {
        fetch(`https://hn.algolia.com/api/v1/search?page=${this.state.pageNumber - 1}`)
        .then(response => response.json())
        .then(response => {
            this.setState(function (state, props) { 
                return {  news :response.hits, pageNumber:response.page, hidden:true}
            });
        });
        this.props.history.push(`${this.props.match.url}${'?p='}${this.state.pageNumber - 1}`);
    }

    render() {
        return (
            <div className='news-container'>
                {this.props.news.map(({objectID,...otherProps }) => (
                    <NewsItem key={objectID} {...otherProps} data-key={objectID} />
                    ))}
                     <Pagination prevClick ={this.prevClick} nextClick = {this.nextClick} />
            </div>
        );

               
    }
}

const mapStateToProps = state => ({
    news: state.news.items,
    loading: state.news.loading,
    error: state.news.error
  });
  
  export default connect(mapStateToProps)(News);