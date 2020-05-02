import React from 'react';

const CategoryListOT = ({ devoIdx }) => {

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
        "1&2Samuel": "1 & 2 Samuel",
        "Joel,Amos,Obadiah,Jonah,andMicah": "Joel, Amos, Obadiah, Jonah, & Micah",
    }

    let OTbook;
    debugger
    if (OTbooks.includes(devoIdx.book) && OTbookFormat[devoIdx.book] === undefined) {
        OTbook = devoIdx.book
    } else if (OTbooks.includes(devoIdx.book) && OTbookFormat[devoIdx.book] !== undefined) {
        OTbook = OTbookFormat[devoIdx.book]
    }

    return (
        <li className='category-li'>
            <div className='category-title' onClick={() => this.props.fetchDevo(devoIdx.book)}>
                <span>{OTbook}</span>
            </div>
        </li>
    )
}

export default CategoryListOT;
