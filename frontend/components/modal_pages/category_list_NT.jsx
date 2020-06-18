import React from 'react';
import { NTbooks, NTbookFormat } from '../home/function_helpers/bookTitles'

const CategoryListNT = ({ eachTitle, handleClick }) => {

    const lowerCaseArr = NTbooks.map(ele => ele.toLowerCase());
    const inBookTitle = lowerCaseArr.includes(eachTitle.book)
    const isbookTitleDefined = NTbookFormat[eachTitle.book] !== undefined
    const bookTitle = NTbooks[lowerCaseArr.indexOf(eachTitle.book)]

    let NTbook;
    if (inBookTitle && !isbookTitleDefined) {
        NTbook = bookTitle
    } else if (inBookTitle && isbookTitleDefined) {
        NTbook = NTbookFormat[eachTitle.book]
    };

    let fetchBookPayload = {
        gender: eachTitle.gender,
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
