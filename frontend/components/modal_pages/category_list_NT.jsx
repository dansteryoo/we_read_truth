import React from 'react';

const CategoryListNT = ({ eachDevoTitle, handleClick }) => {

    const NTbooks = [
        "Matthew",
        "Mark",
        "Luke",
        "John",
        "ActsoftheApostles",
        "Romans",
        "1&2Corinthians",
        "Galatians",
        "Ephesians",
        "Philippians",
        "Colossians",
        "1&2Thessalonians",
        "1&2TimothyandTitus",
        "Philemon",
        "Hebrews",
        "James",
        "1&2Peter",
        "123John",
        "Jude",
        "Revelation",
    ];

    const NTbookFormat = {
        "1&2thessalonians": "1 & 2 Thessalonians",
        "1&2peter": "1 & 2 Peter",
        "1&2timothyandtitus": "1 & 2 Timothy, & Titus",
        "actsoftheapostles": "Acts",
        "1&2corinthians": "1 & 2 Corinthians"
    };

    const lowerCaseTitle = NTbooks.map(ele => ele.toLowerCase());

    let NTbook;
    const inBookTitle = lowerCaseTitle.includes(eachDevoTitle.book)
    const bookTitleUndefined = NTbookFormat[eachDevoTitle.book] === undefined
    const bookTitle = NTbooks[lowerCaseTitle.indexOf(eachDevoTitle.book)]

    if (inBookTitle && bookTitleUndefined) {
        NTbook = bookTitle
    } else if (inBookTitle && !bookTitleUndefined) {
        NTbook = NTbookFormat[eachDevoTitle.book]
    };

    let fetchBookPayload = {
        gender: eachDevoTitle.gender,
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
