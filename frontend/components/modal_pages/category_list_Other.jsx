import React from 'react';

const CategoryListOther = ({ eachDevoTitle, fetchDevoBook, closeModal }) => {

    const otherBooks = [
        "Justice",
        "HymnsV",
        "TheSermonontheMount",
        "Lent2017:YouAreMine",
        "Advent2018:UntiltheSonofGodAppears",
        "ThisIstheGospel",
        "Lent2018:SeetheLord’sSalvation",
        "MourningandDancing",
        "2019Wrapped:SheReadsTruthYearinReview",
        "NamesofGod",
        "OpenYourBible//Launch-WeekSampler",
        "InSpirit&inTruth:AStudyofBiblicalWorship",
        "Advent2016:ChristWasBornforThis",
        "Lent2016",
        "Hymns",
        "TheResurrectedLife",
        "TheRisenChrist",
        "Lent2020:HisLoveEndures",
        "Jesus,KeepMeNearTheCross",
        "TheBeatitudes",
        "PsalmsforPrayer",
        "AttributesofGod",
        "PsalmsofRest",
        "TheLifeofMoses",
        "HymnsIV",
        "BecauseHeLives",
        "HymnsII",
        "TheMiraclesofJesus",
        "SongsfortheRoad:ThePsalmsofAscent",
        "Women&MenintheWord:OldTestament",
        "HymnsIII",
        "GiveThanks",
        "MakingRoom:AStudyofBiblicalHospitality",
        "IAm:StatementsofOurSavior",
        "WorthyofPraise",
        "Advent2017:JoytotheWorld",
        "HoldingTighttoPermanent",
        "Advent2019:AThrillofHope",
        "CountdowntoActs",
        "FruitoftheSpirit",
        "Advent2015:BornIsTheKing",
        "TheParablesofJesus",
        "GoTellItontheMountain",
        "HymnsofHope",
        "PsalmsofGratitude",
    ]

    const OTHERbookFormat = {
        "HymnsV": 'Hymns V',
        "TheSermonontheMount": 'The Sermon on the Mount',
        "Lent2017:YouAreMine": 'Lent 2017',
        "Advent2018:UntiltheSonofGodAppears": 'Advent 2018',
        "ThisIstheGospel": 'This is the Gospel',
        "Lent2018:SeetheLord’sSalvation": 'Lent 2018',
        "MourningandDancing": 'Mourning & Dancing',
        "2019Wrapped:SheReadsTruthYearinReview": '2019 Wrapped: Year in Review',
        "NamesofGod": 'Names of God',
        "OpenYourBible//Launch-WeekSampler": 'OpenYourBible: Week Sampler',
        "InSpirit&inTruth:AStudyofBiblicalWorship": 'In Spirit & in Truth: Biblical Worship',
        "Advent2016:ChristWasBornforThis": 'Advent 2016',
        "Lent2016": 'Lent 2016',
        "Hymns": 'Hymns I',
        "TheResurrectedLife": 'The Resurrected Life',
        "TheRisenChrist": 'The Risen Christ',
        "Lent2020:HisLoveEndures": 'Lent 2020',
        "Jesus,KeepMeNearTheCross": 'Jesus, Keep Me Near The Cross',
        "TheBeatitudes": 'The Beatitudes',
        "PsalmsforPrayer": 'Psalms for Prayer',
        "AttributesofGod": 'Attributes of God',
        "PsalmsofRest": 'Psalms of Rest',
        "TheLifeofMoses": 'The Life of Moses',
        "HymnsIV": 'Hymns IV',
        "BecauseHeLives": 'Because He Lives',
        "HymnsII": 'Hymns II',
        "TheMiraclesofJesus": 'The Miracles of Jesus',
        "SongsfortheRoad:ThePsalmsofAscent": 'The Psalms of Ascent',
        "Women&MenintheWord:OldTestament": 'Old Testament Women & Men',
        "HymnsIII": 'Hymns III',
        "GiveThanks": 'Give Thanks',
        "MakingRoom:AStudyofBiblicalHospitality": 'MakingRoom: Biblical Hospitality',
        "IAm:StatementsofOurSavior": 'I Am: Statements of Our Savior',
        "WorthyofPraise": 'Worthy of Praise',
        "Advent2017:JoytotheWorld": 'Advent 2017',
        "HoldingTighttoPermanent": 'Holding Tight to Permanent',
        "Advent2019:AThrillofHope": 'Advent 2019',
        "CountdowntoActs": 'Countdown to Acts',
        "FruitoftheSpirit": 'Fruit of the Spirit',
        "Advent2015:BornIsTheKing": 'Advent 2015',
        "TheParablesofJesus": 'The Parables of Jesus',
        "GoTellItontheMountain": 'Go Tell It on the Mountain',
        "HymnsofHope": 'Hymns of Hope',
        "PsalmsofGratitude": 'Psalms of Gratitude',
    }

    let otherBook;

    if (otherBooks.includes(eachDevoTitle.book) && OTHERbookFormat[eachDevoTitle.book] === undefined) {
        otherBook = eachDevoTitle.book
    } else if (otherBooks.includes(eachDevoTitle.book) && OTHERbookFormat[eachDevoTitle.book] !== undefined) {
        otherBook = OTHERbookFormat[eachDevoTitle.book]
    }

    const handleClick = (e) => {
        e.preventDefault();
        fetchDevoBook(eachDevoTitle.book)
        .then(() => closeModal());
    }

    return (
        <li className='category-li'>
            <span className='category-title' onClick={handleClick}>
                {otherBook}
            </span>
        </li>
    )
}


export default CategoryListOther;
