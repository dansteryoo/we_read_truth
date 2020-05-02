import React from 'react';

const CategoryListOT = ({ devoIdx }) => {


    return (
        <li className='category-li'>
                <div className='category-title' onClick={() => this.props.fetchDevo(devoIdx.book)}>
                    <span>{devoIdx.book}</span> 
                </div>
        </li>
    )
}

export default CategoryListOT;
