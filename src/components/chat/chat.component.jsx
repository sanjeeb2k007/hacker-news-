import React from   'react';
import Chart from 'react-apexcharts';
import { connect } from "react-redux";


class ChartComp extends React.Component {

    render() {
      return (
      <div id="chart">
        {this.props.news.length ? <Chart options={this.props.option} series={this.props.series} type="line" height={350} /> : null}
        
        </div>
      );
    }
    componentDidMount () {
        console.log(this);
      }
      
  }

  const mapStateToProps = state => ({
    news: state.news.items,
    loading: state.news.loading,
    error: state.news.error,
    pageNumber:state.news.pageNumber
  });
  
  export default connect(mapStateToProps)(ChartComp);