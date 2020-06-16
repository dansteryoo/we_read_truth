import React from 'react';
import { OTbooks, OTbookFormat } from '../home/function_helpers/bookTitles'

const CategoryListOT = ({ eachTitle, handleClick }) => {

    const lowerCaseArr = OTbooks.map(ele => ele.toLowerCase());
    const inBookTitle = lowerCaseArr.includes(eachTitle.book)
    const isBookTitleDefined = OTbookFormat[eachTitle.book] !== undefined
    const bookTitle = OTbooks[lowerCaseArr.indexOf(eachTitle.book)]

    let OTbook;
    if (inBookTitle && !isBookTitleDefined) {
        OTbook = bookTitle
    } else if (inBookTitle && isBookTitleDefined) {
        OTbook = OTbookFormat[eachTitle.book]
    };

    let fetchBookPayload = {
        gender: eachTitle.gender,
        book: bookTitle
    }
    
    return (
        <li className='category-li'>
            <span className='category-title' onClick={(e) => handleClick(fetchBookPayload, e)}>
                {OTbook}
            </span>
        </li>
    )
};


export default CategoryListOT;
