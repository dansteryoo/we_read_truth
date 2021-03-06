import React from "react";
import { themeBooks, themeBookFormat } from "../../helpers/bookTitles";

/********************************
 * CategoryListThemes Component *
 ********************************/

const CategoryListThemes = ({ title, handleClick }) => {
    const lowerCaseArr = themeBooks.map((ele) => ele.toLowerCase());

    /********************************
     *       lowerCaseFormat        *
     ********************************/

    const lowerCaseFormat = (data) => {
        let hash = {};
        for (let key in data) {
            hash[key.toLowerCase()] = data[key];
        }
        return hash;
    };

    const bookTitle = themeBooks[lowerCaseArr.indexOf(title.book)];
    const lowerCaseThemeBookFormat = lowerCaseFormat(themeBookFormat);
    const bookTitleRender = lowerCaseThemeBookFormat[title.book];
    let themeBook = bookTitleRender || bookTitle;

    let fetchBookPayload = {
        gender: title.gender,
        book: bookTitle,
    };

    /********************************
     *            render            *
     ********************************/

    return (
        <li className="category-li">
            <span
                className="category-title"
                onClick={(e) => handleClick(fetchBookPayload, e)}
            >
                {themeBook}
            </span>
        </li>
    );
};

export default CategoryListThemes;
