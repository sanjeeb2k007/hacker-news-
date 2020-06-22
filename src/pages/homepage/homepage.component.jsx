import React from   'react';
import './homepage.styles.scss';
import News from '../../components/news/news.component';
import Pagination from '../../components/pagination/pagination.component';
import Chart from '../../components/chat/chat.component';

const HomePage = () => (
    <div className='homepage'>
      <News />
      <Pagination />
      <Chart />
    </div>
);

export default HomePage;