import React from   'react';
import './pagination.style.scss';

const Pagination = ({prevClick, nextClick}) => ( 
    <div className='pagination'>
        <div onClick={prevClick} className='prev'>Privious</div>
        <div onClick={ nextClick} className='next'>next</div>
    </div>
) 

export default Pagination;