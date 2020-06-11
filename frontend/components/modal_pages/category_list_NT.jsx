import React from 'react';
import { NTbooks, NTbookFormat } from '../home/sidenav/bookTitles'

const CategoryListNT = ({ eachDevoTitle, handleClick }) => {

    const lowerCaseArr = NTbooks.map(ele => ele.toLowerCase());
    const inBookTitle = lowerCaseArr.includes(eachDevoTitle.book)
    const isbookTitleDefined = NTbookFormat[eachDevoTitle.book] !== undefined
    const bookTitle = NTbooks[lowerCaseArr.indexOf(eachDevoTitle.book)]

    let NTbook;
    if (inBookTitle && !isbookTitleDefined) {
        NTbook = bookTitle
    } else if (inBookTitle && isbookTitleDefined) {
        NTbook = NTbookFormat[eachDevoTitle.book]
    };

    let fetchBookPayload = {
        gender: eachDevoTitle.gender,
        book: bookTitle
    }

    return (
        <li className='category-li'>
            <span className='category-title' onClick={(e) => handleClick(fetchBookPayload, e)}>
                {NTbook}
            </span>
        </li>
    )
};

export default CategoryListNT;
