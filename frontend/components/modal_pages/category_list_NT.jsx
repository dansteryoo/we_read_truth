import React from 'react';

const CategoryListNT = ({ eachDevoTitle }) => {

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
    ]

    const NTbookFormat = {
        "1&2Thessalonians": "1 & 2 Thessalonians",
        "1&2Peter": "1 & 2 Peter",
        "1&2TimothyandTitus": "1 & 2 Timothy & Titus",
        "ActsoftheApostles": "Acts",
        "1&2Corinthians": "1 & 2 Corinthians"
    }

    let NTbook;

    if (NTbooks.includes(eachDevoTitle.book) && NTbookFormat[eachDevoTitle.book] === undefined) {
        NTbook = eachDevoTitle.book
    } else if (NTbooks.includes(eachDevoTitle.book) && NTbookFormat[eachDevoTitle.book] !== undefined) {
        NTbook = NTbookFormat[eachDevoTitle.book]
    }
    
    return (
        <li className='category-li'>
                <div className='category-title' onClick={() => this.props.fetchDevo(eachDevoTitle.book)}>
                <span>{NTbook}</span> 
                </div>
        </li>
    )
}

export default CategoryListNT;
