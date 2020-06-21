import React from   'react';
import './homepage.styles.scss';
import News from '../../components/news/news.component';
import Pagination from '../../components/pagination/pagination.component';

const HomePage = () => (
    <div className='homepage'>
      <News />
      <Pagination />
    </div>
);

export default HomePage;