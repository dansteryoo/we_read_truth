import React from 'react';
import { OTbooks, OTbookFormat } from '../home/function_helpers/bookTitles'

const CategoryListOT = ({ title, handleClick }) => {

    const lowerCaseArr = OTbooks.map(ele => ele.toLowerCase());
    const inBookTitle = lowerCaseArr.includes(title.book)
    const isBookTitleDefined = OTbookFormat[title.book] !== undefined
    const bookTitle = OTbooks[lowerCaseArr.indexOf(title.book)]

    let OTbook;
    if (inBookTitle && !isBookTitleDefined) {
        OTbook = bookTitle
    } else if (inBookTitle && isBookTitleDefined) {
        OTbook = OTbookFormat[title.book]
    };

    let fetchBookPayload = {
        gender: title.gender,
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
