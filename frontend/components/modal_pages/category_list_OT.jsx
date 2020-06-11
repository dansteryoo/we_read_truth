import React from 'react';
import { OTbooks, OTbookFormat } from '../home/sidenav/bookTitles'

const CategoryListOT = ({ eachDevoTitle, handleClick }) => {

    const lowerCaseArr = OTbooks.map(ele => ele.toLowerCase());
    const inBookTitle = lowerCaseArr.includes(eachDevoTitle.book)
    const isBookTitleDefined = OTbookFormat[eachDevoTitle.book] !== undefined
    const bookTitle = OTbooks[lowerCaseArr.indexOf(eachDevoTitle.book)]

    let OTbook;
    if (inBookTitle && !isBookTitleDefined) {
        OTbook = bookTitle
    } else if (inBookTitle && isBookTitleDefined) {
        OTbook = OTbookFormat[eachDevoTitle.book]
    };

    let fetchBookPayload = {
        gender: eachDevoTitle.gender,
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
