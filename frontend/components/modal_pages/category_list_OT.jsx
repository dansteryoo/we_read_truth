import React from "react";
import { OTbooks } from "../../helpers/bookTitles";

/********************************
 *   CategoryListOT Component   *
 ********************************/

const CategoryListOT = ({ title, handleClick }) => {
    const lowerCaseArr = OTbooks.map((ele) => ele.toLowerCase());
    const bookTitle = OTbooks[lowerCaseArr.indexOf(title.book)];

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

export default CategoryListOT;
