import React, {Fragment} from   'react';
import NewsItem from '../../components/news-item/news-item.component';
import './news.styles.scss';
import { connect } from "react-redux";
import { fetchNews } from "../../redux/news/news.actions";
import Pagination from '../../components/pagination/pagination.component';
import Chart from '../../components/chat/chat.component';

class News extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchNews());
      }

      chatConfigOption() {
          return {
            chart: {
              height: 350,
              type: 'line',
              dropShadow: {
                enabled: true,
                color: '#000',
                top: 18,
                left: 7,
                blur: 10,
                opacity: 0.2
              },
              toolbar: {
                show: false
              }
            },
            colors: ['#77B6EA', '#545454'],
            dataLabels: {
              enabled: true,
            },
            stroke: {
              curve: 'smooth'
            },
            title: {
              text: 'Vote and ID',
              align: 'left'
            },
            grid: {
              borderColor: '#e7e7e7',
              row: {
                colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                opacity: 0.5
              },
            },
            markers: {
              size: 1
            },
            xaxis: {
              categories: this.props.news.map(news => news.objectID),
              title: {
                text: 'ID'
              }
            },
            yaxis: {
              title: {
                text: 'vote'
              },
              min: 5,
              max: 3400
            },
            legend: {
              position: 'top',
              horizontalAlign: 'right',
              floating: true,
              offsetY: -25,
              offsetX: -5
            }
          }
      }

      chatConfigseries() {
          return [{
              name: "",
              data: this.props.news.map(news => news.points)
            }]
      }

    render() {
        return (
            <Fragment>
            <div className='news-container'>
                {this.props.news.map(({objectID,...otherProps }) => (
                    <NewsItem key={objectID} {...otherProps} data-key={objectID} />
                    ))}
            </div>
            {this.props.news.length ?   <div>
                <Pagination />
                 <Chart option = {this.chatConfigOption()} series={this.chatConfigseries()}/>
                </div> : null}
            </Fragment>
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