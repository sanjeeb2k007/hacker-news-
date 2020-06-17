import React from   'react';
import NewsItem from '../../components/news-item/news-item.component';
import Pagination from '../../components/pagination/pagination.component';
import './news.styles.scss';

class News extends React.Component {
    constructor() {
        super();

        this.state = {
            news: [],
            pageNumber: 1
        };
    }

    componentDidMount () {
        const urlParam =  new URLSearchParams(window.location.search).get('p');
        fetch(`http://hn.algolia.com/api/v1/search?page=${urlParam ||this.state.pageNumber}`)
          .then(response => response.json())
          .then(response => this.setState({news :response.hits, pageNumber:response.page }));
      }

      nextClick  = () => {
        fetch(`https://hn.algolia.com/api/v1/search?page=${this.state.pageNumber}`)
        .then(response => response.json())
        .then(response => this.setState({news :response.hits, pageNumber:response.page + 1 }));
      }

      prevClick = () => {
        fetch(`https://hn.algolia.com/api/v1/search?page=${this.state.pageNumber}`)
        .then(response => response.json())
        .then(response => this.setState({news :response.hits, pageNumber:response.page - 1 }));
    }

    render() {
        return (
            <div className='news-container'>
                {this.state.news.map(({objectID,...otherProps }) => (
                        <NewsItem key={objectID} {...otherProps} />
                    ))}
                     <Pagination prevClick ={this.prevClick} nextClick = {this.nextClick} />
            </div>
        );

               
    }
}

export default News;