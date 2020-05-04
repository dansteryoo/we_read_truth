import React from 'react';

const CategoryListOT = ({ eachDevoTitle }) => {

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
    ]

    const OTbookFormat = {
        "ZechariahandMalachi": "Zechariah & Malachi",
        "Nahum,Habakkuk,Zephaniah,andHaggai": "Nahum, Habakkuk, Zephaniah, & Haggai",
        "1&2Kings": "1 & 2 Kings",
        "SongofSongs": "Song of Songs",
        "Proverbs:TheWayofWisdom" : "Proverbs",
        "1&2Samuel": "1 & 2 Samuel",
        "Joel,Amos,Obadiah,Jonah,andMicah": "Joel, Amos, Obadiah, Jonah, & Micah",
    }

    let OTbook;

    if (OTbooks.includes(eachDevoTitle.book) && OTbookFormat[eachDevoTitle.book] === undefined) {
        OTbook = eachDevoTitle.book
    } else if (OTbooks.includes(eachDevoTitle.book) && OTbookFormat[eachDevoTitle.book] !== undefined) {
        OTbook = OTbookFormat[eachDevoTitle.book]
    }

    return (
        <li className='category-li'>
            <div className='category-title' onClick={() => this.props.fetchDevo(eachDevoTitle.book)}>
                <span>{OTbook}</span>
            </div>
        </li>
    )
}

export default CategoryListOT;
