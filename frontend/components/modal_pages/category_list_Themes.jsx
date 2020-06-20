import React from 'react';
import { themeBooks, themeBookFormat } from '../home/function_helpers/bookTitles'

const CategoryListThemes= ({ title, handleClick }) => {

    const lowerCaseArr = themeBooks.map(ele => ele.toLowerCase());

    const lowerCaseFormat = (data) => {
        let hash = {};
        for (let key in data) { 
            hash[key.toLowerCase()] = data[key]
        };
        return hash;
    };

    const inBookTitle = lowerCaseArr.includes(title.book) 
    const isBookTitleDefined = lowerCaseFormat(themeBookFormat)[title.book] !== undefined
    const bookTitle = themeBooks[lowerCaseArr.indexOf(title.book)]
    const bookTitleRender = lowerCaseFormat(themeBookFormat)[title.book]

    let themeBook = inBookTitle && isBookTitleDefined ? bookTitleRender : null;

    let fetchBookPayload = {
        gender: title.gender,
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


export default CategoryListThemes;
