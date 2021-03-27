import React from "react";
import { NTbooks, NTbookFormat } from "../../helpers/bookTitles";

/********************************
 *   CategoryListNT Component   *
 ********************************/

const CategoryListNT = ({ title, handleClick }) => {
    const lowerCaseArr = NTbooks.map((ele) => ele.toLowerCase());
    const bookTitleRender = NTbookFormat[title.book];
    const bookTitle = NTbooks[lowerCaseArr.indexOf(title.book)];
    let NTbook = bookTitleRender || bookTitle;

    let fetchBookPayload = {
        gender: title.gender,
        book: bookTitle,
    };

    /********************************
     *            RENDER            *
     ********************************/

    return (
        <li className="category-li">
            <span
                className="category-title"
                onClick={(e) => handleClick(fetchBookPayload, e)}
            >
                {NTbook}
            </span>
        </li>
    );
};

export default CategoryListNT;
