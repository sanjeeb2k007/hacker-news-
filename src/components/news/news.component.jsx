import React from   'react';
import NewsItem from '../../components/news-item/news-item.component';
import Pagination from '../../components/pagination/pagination.component';
import './news.styles.scss';
import {withRouter} from 'react-router-dom';

class News extends React.Component {
    constructor() {
        super();

        this.state = {
            news: [],
            pageNumber: 1,
        };
    }

    componentDidMount () {
        const urlParam =  new URLSearchParams(window.location.search).get('p');
        fetch(`http://hn.algolia.com/api/v1/search?page=${urlParam ||this.state.pageNumber}`)
          .then(response => response.json())
          .then(response => { console.log(response.hits);this.setState({news :response.hits, pageNumber:response.page, hidden:true })});
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
                {this.state.news.map(({objectID,...otherProps }) => (
                    <NewsItem key={objectID} {...otherProps} data-key={objectID} />
                    ))}
                     <Pagination prevClick ={this.prevClick} nextClick = {this.nextClick} />
            </div>
        );

               
    }
}

export default withRouter(News);