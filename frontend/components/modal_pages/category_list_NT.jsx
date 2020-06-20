import React from 'react';
import { NTbooks, NTbookFormat } from '../home/function_helpers/bookTitles'

const CategoryListNT = ({ title, handleClick }) => {

    const lowerCaseArr = NTbooks.map(ele => ele.toLowerCase());
    const inBookTitle = lowerCaseArr.includes(title.book)
    const isbookTitleDefined = NTbookFormat[title.book] !== undefined
    const bookTitle = NTbooks[lowerCaseArr.indexOf(title.book)]

    let NTbook;
    if (inBookTitle && !isbookTitleDefined) {
        NTbook = bookTitle
    } else if (inBookTitle && isbookTitleDefined) {
        NTbook = NTbookFormat[title.book]
    };

    let fetchBookPayload = {
        gender: title.gender,
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
