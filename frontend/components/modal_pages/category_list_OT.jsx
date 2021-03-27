import React from "react";
import { OTbooks, OTbookFormat } from "../../helpers/bookTitles";

/********************************
 *   CategoryListOT Component   *
 ********************************/

const CategoryListOT = ({ title, handleClick }) => {
    const lowerCaseArr = OTbooks.map((ele) => ele.toLowerCase());
    const bookTitleRender = OTbookFormat[title.book];
    const bookTitle = OTbooks[lowerCaseArr.indexOf(title.book)];
    let OTbook = bookTitleRender || bookTitle;

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
                {OTbook}
            </span>
        </li>
    );
};

export default CategoryListOT;
