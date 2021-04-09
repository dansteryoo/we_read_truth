import React from "react";
import { NTbooks } from "../../helpers/bookTitles";

/********************************
 *   CategoryListNT Component   *
 ********************************/

const CategoryListNT = ({ title, handleClick }) => {
    const lowerCaseArr = NTbooks.map((ele) => ele.toLowerCase());
    const bookTitle = NTbooks[lowerCaseArr.indexOf(title.book)];

    const fetchBookPayload = {
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
                {bookTitle}
            </span>
        </li>
    );
};

export default CategoryListNT;
