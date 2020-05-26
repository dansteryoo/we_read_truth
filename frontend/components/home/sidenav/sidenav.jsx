import React from 'react';
import SideNavItem from './sidenav_item'

class SideNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            book: '',
        }

        this.handleGetDevo = this.handleGetDevo.bind(this);
        this.myRef = React.createRef();
    };

    componentDidMount() {
    };

    componentWillUnmount() {
    };

    componentDidUpdate(prevProps) {

        if (this.props.devoBook !== prevProps.devoBook) {

            if (this.props.devoBook.length > 0) {
                //---------- SCROLL TO TOP on render ----------//
                if (this.props.devoBook[0].book !== this.state.book) {
                    this.myRef.current.scrollTo(0, 0);
                }
                this.setState({ book: this.props.devoBook[0].book })
            }
        }
    };

    handleGetDevo(devoId) {
        this.props.fetchDevo(devoId);
    };
    

    render() {

        const bookTitles = [
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
            "Proverbs:TheWayofWisdom",
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
        ];

        const bookTitlesFormat = {
            "ZechariahandMalachi": "Zechariah & Malachi",
            "Nahum,Habakkuk,Zephaniah,andHaggai": "Nahum, Habakkuk, Zephaniah, & Haggai",
            "1&2Kings": "1 & 2 Kings",
            "SongofSongs": "Song of Songs",
            "Proverbs:TheWayofWisdom": "Proverbs",
            "1&2Samuel": "1 & 2 Samuel",
            "Joel,Amos,Obadiah,Jonah,andMicah": "Joel, Amos, Obadiah, Jonah, & Micah",
            "1&2Thessalonians": "1 & 2 Thessalonians",
            "1&2Peter": "1 & 2 Peter",
            "1&2TimothyandTitus": "1 & 2 Timothy, & Titus",
            "ActsoftheApostles": "Acts",
            "1&2Corinthians": "1 & 2 Corinthians",
            "HymnsV": 'Hymns V',
            "TheSermonontheMount": 'The Sermon on the Mount',
            "Lent2017:YouAreMine": 'Lent 2017',
            "Advent2018:UntiltheSonofGodAppears": 'Advent 2018',
            "ThisIstheGospel": 'This is the Gospel',
            "Lent2018:SeetheLord’sSalvation": 'Lent 2018',
            "MourningandDancing": 'Mourning & Dancing',
            "2019Wrapped:SheReadsTruthYearinReview": '2019 Wrapped (Year in Review)',
            "NamesofGod": 'Names of God',
            "InSpirit&inTruth:AStudyofBiblicalWorship": 'In Spirit & in Truth (Biblical Worship)',
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
            "SongsfortheRoad:ThePsalmsofAscent": 'Psalms of Ascent',
            "Women&MenintheWord:OldTestament": 'Old Testament Women & Men',
            "HymnsIII": 'Hymns III',
            "GiveThanks": 'Give Thanks',
            "MakingRoom:AStudyofBiblicalHospitality": 'Making Room (Biblical Hospitality)',
            "IAm:StatementsofOurSavior": 'I Am (Statements of Our Savior)',
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
        };

        const { book } = this.state;

        let devoBookTitle;
        if (bookTitles.includes(book) && bookTitlesFormat[book] === undefined) {
            devoBookTitle = bookTitles[bookTitles.indexOf(book)]

        } else if (bookTitles.includes(book) && bookTitlesFormat[book] !== undefined) {
            devoBookTitle = bookTitlesFormat[book]
        };

        return (
            <>
                <div className='sidenav-container' ref={this.myRef}>
                    <div className='sidenav-title'> 
                        <span>{devoBookTitle}</span>
                    </div>
                    <ul className="sidenav-ul" >
                        {
                            this.props.devoBook.map((dailyDevo, i) => (
                                <SideNavItem
                                    days={i}
                                    dailyDevo={dailyDevo}
                                    handleGetDevo={this.handleGetDevo}
                                    key={dailyDevo.id}
                                />
                            ))
                        }
                    </ul>
                </div>
            </>
        )
    }
}

export default SideNav;