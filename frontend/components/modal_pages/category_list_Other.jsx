import React from 'react';
import { otherBooks, OTHERbookFormat } from '../home/sidenav/bookTitles'

const CategoryListOther = ({ eachDevoTitle, handleClick }) => {

    const lowerCaseArr = otherBooks.map(ele => ele.toLowerCase());

    const lowerCaseFormat = (data) => {
        let hash = {};
        for (let key in data) { 
            hash[key.toLowerCase()] = data[key]
        };
        return hash;
    };

    const inBookTitle = lowerCaseArr.includes(eachDevoTitle.book) 
    const isBookTitleDefined = lowerCaseFormat(OTHERbookFormat)[eachDevoTitle.book] !== undefined
    const bookTitle = otherBooks[lowerCaseArr.indexOf(eachDevoTitle.book)]
    const bookTitleRender = lowerCaseFormat(OTHERbookFormat)[eachDevoTitle.book]

    let otherBook = inBookTitle && isBookTitleDefined ? bookTitleRender : null;

    let fetchBookPayload = {
        gender: eachDevoTitle.gender,
        book: bookTitle
    }

    return (
        <li className='category-li'>
            <span className='category-title' onClick={(e) => handleClick(fetchBookPayload, e)}>
                {otherBook}
            </span>
        </li>
    )
};


export default CategoryListOther;
