import React from 'react';

const CategoryListNT = ({ devoIdx }) => {

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
    debugger
    if (NTbooks.includes(devoIdx.book) && NTbookFormat[devoIdx.book] === undefined) {
        NTbook = devoIdx.book
    } else if (NTbooks.includes(devoIdx.book) && NTbookFormat[devoIdx.book] !== undefined) {
        NTbook = NTbookFormat[devoIdx.book]
    }
    
    return (
        <li className='category-li'>
                <div className='category-title' onClick={() => this.props.fetchDevo(devoIdx.book)}>
                <span>{NTbook}</span> 
                </div>
        </li>
    )
}

export default CategoryListNT;
