import React from 'react';
import { themeBooks, themeBookFormat } from '../home/function_helpers/bookTitles'

const CategoryListOther = ({ eachTitle, handleClick }) => {

    const lowerCaseArr = themeBooks.map(ele => ele.toLowerCase());

    const lowerCaseFormat = (data) => {
        let hash = {};
        for (let key in data) { 
            hash[key.toLowerCase()] = data[key]
        };
        return hash;
    };

    const inBookTitle = lowerCaseArr.includes(eachTitle.book) 
    const isBookTitleDefined = lowerCaseFormat(themeBookFormat)[eachTitle.book] !== undefined
    const bookTitle = themeBooks[lowerCaseArr.indexOf(eachTitle.book)]
    const bookTitleRender = lowerCaseFormat(themeBookFormat)[eachTitle.book]

    let themeBook = inBookTitle && isBookTitleDefined ? bookTitleRender : null;

    let fetchBookPayload = {
        gender: eachTitle.gender,
        book: bookTitle
    }

    return (
        <li className='category-li'>
            <span className='category-title' onClick={(e) => handleClick(fetchBookPayload, e)}>
                {themeBook}
            </span>
        </li>
    )
};


export default CategoryListOther;
