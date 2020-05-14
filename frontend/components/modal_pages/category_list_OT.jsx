import React from 'react';

const CategoryListOT = ({ eachDevoTitle, fetchDevoBook, closeModal }) => {

    const OTbooks = [
        "Genesis",
        "Exodus",
        "Leviticus",
        "Numbers",
        "Deuteronomy",
        "Joshua",
        "Judges",
        "Ruth",
        "1&2Samuel",
        "1&2Kings",
        "1&2Chronicles",
        "Ezra",
        "Nehemiah",
        "Esther",
        "Job",
        "Psalms",
        "Proverbs",
        "Ecclesiastes",
        "SongofSongs",
        "Isaiah",
        "Jeremiah",
        "Lamentations",
        "Ezekiel",
        "Daniel",
        "Hosea",
        "Joel,Amos,Obadiah,Jonah,andMicah",
        "Nahum,Habakkuk,Zephaniah,andHaggai",
        "ZechariahandMalachi",
    ];

    const OTbookFormat = {
        "zechariahandmalachi": "Zechariah & Malachi",
        "nahum,habakkuk,zephaniah,andhaggai": "Nahum, Habakkuk, Zephaniah, & Haggai",
        "1&2kings": "1 & 2 Kings",
        "songofsongs": "Song of Songs",
        "proverbs:theWayofwisdom" : "Proverbs",
        "1&2samuel": "1 & 2 Samuel",
        "joel,amos,obadiah,jonah,andmicah": "Joel, Amos, Obadiah, Jonah, & Micah",
    };

    const lowerCaseTitle = OTbooks.map(ele => ele.toLowerCase());

    let OTbook;

    if (lowerCaseTitle.includes(eachDevoTitle.book) && OTbookFormat[eachDevoTitle.book] === undefined) {
        OTbook = OTbooks[lowerCaseTitle.indexOf(eachDevoTitle.book)]
    
    } else if (lowerCaseTitle.includes(eachDevoTitle.book) && OTbookFormat[eachDevoTitle.book] !== undefined) {
        OTbook = OTbookFormat[eachDevoTitle.book]
    };
    
    const handleClick = (e) => {
        e.preventDefault();
        fetchDevoBook(eachDevoTitle.book)
            .then(() => closeModal());
    };
    
    return (
        <li className='category-li'>
            <span className='category-title' onClick={handleClick}>
                {OTbook}
            </span>
        </li>
    )
};


export default CategoryListOT;
