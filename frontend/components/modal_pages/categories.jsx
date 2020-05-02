import React from 'react';
import CategoryListOT from './category_list_OT'
import CategoryListNT from './category_list_NT'
import CategoryListOther from './category_list_Other'

class CategoriesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            heOTbooks: [], 
            heNTBooks: [],
            heOther: [],
            sheOTbooks: [],
            sheNTBooks: [],
            sheOther: []
        }


        this.handleClick = this.handleClick.bind(this);
        this.filterOTBooks = this.filterOTBooks.bind(this);
        // this.filterNTBooks = this.filterNTBooks.bind(this);
    }

    componentDidMount() {
        debugger
        this.props.fetchDevoIndex();
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({
            day: "",
            title: "",
            passage: "",
        })
    };

    filterOTBooks(data) {

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

        const bookTitleFormat = {
            "ZechariahandMalachi": "Zechariah & Malachi",
            "Nahum,Habakkuk,Zephaniah,andHaggai": "Nahum, Habakkuk, Zephaniah, & Haggai",
            "1&2Kings": "1 & 2 Kings",
            "SongofSongs": "Song of Songs",
            "1&2Samuel": "1 & 2 Samuel",
            "Joel,Amos,Obadiah,Jonah,andMicah": "Joel, Amos, Obadiah, Jonah, & Micah",
        }

        const arr = []

        data.forEach(ele => {
    debugger
            if (OTbooks.includes(ele) && bookTitleFormat[ele] === undefined) {
                arr.push(ele)
            } else if (OTbooks.includes(ele)){
                arr.push(bookTitleFormat[ele])
            }
        })

        this.setState({heOTbooks: arr})
    }


    // NTBOOKS = [
    //     "Matthew",
    //     "Mark",
    //     "Luke",
    //     "John",
    //     "ActsoftheApostles",
    //     "Romans",
    //     "1&2Corinthians",
    //     "Galatians",
    //     "Ephesians",
    //     "Philippians",
    //     "Colossians",
    //     "1&2Thessalonians",
    //     "1&2TimothyandTitus",
    //     "Philemon",
    //     "Hebrews",
    //     "James",
    //     "1&2Peter",
    //     "123John",
    //     "Jude",
    //     "Revelation",
    // ]


    render() {
        debugger

        filterOTBooks(this.props.heDevoIndex)
        return (
            <>
                <div className='categories-page-container'>

                        <div className='form-closing-x' onClick={() => this.props.closeModal()}>&#10005;</div>

                    <div className='categories-title'>
                        SHE CATEGORIES
                    </div>

                    <section>
                        <div className='categories-OT'>
                            <ul className='she-category-ul'> 
                                {
                                    this.state.sheDevoIndex.map(eachDevoIdx => (
                                        <CategoryListOT
                                            devoIdx={eachDevoIdx}
                                            key={eachDevoIdx.id}
                                        />
                                    ))
                                }
                            </ul>
                        </div>
                        <div className='categories-NT'>
                            <ul className='she-category-ul'>
                                {
                                    this.props.sheDevoIndex.map(eachDevoIdx => (
                                        <CategoryListNT
                                            devoIdx={eachDevoIdx}
                                            key={eachDevoIdx.id}
                                        />
                                    ))
                                }
                            </ul>
                        </div>
                        <div className='categories-Other'>
                            <ul className='she-category-ul'>
                                {
                                    this.props.sheDevoIndex.map(eachDevoIdx => (
                                        <CategoryListOther
                                            devoIdx={eachDevoIdx}
                                            key={eachDevoIdx.id}
                                        />
                                    ))
                                }
                            </ul>
                        </div>
                    </section>

                        <div className='form-or-separator-categories'>
                            <hr />
                        </div>

                    <div className='categories-title'>
                        HE CATEGORIES
                    </div>

                    <section>
                        <div className='categories-OT'>
                            <ul className='he-category-ul'>
                                {
                                    this.props.sheDevoIndex.map(eachDevoIdx => (
                                        <CategoryListOT
                                            devoIdx={eachDevoIdx}
                                            key={eachDevoIdx.id}
                                        />
                                    ))
                                }
                            </ul>
                        </div>
                        <div className='categories-NT'>
                            <ul className='he-category-ul'>
                                {
                                    this.props.sheDevoIndex.map(eachDevoIdx => (
                                        <CategoryListNT
                                            devoIdx={eachDevoIdx}
                                            key={eachDevoIdx.id}
                                        />
                                    ))
                                }
                            </ul>
                        </div>
                        <div className='categories-Other'>
                            <ul className='he-category-ul'>
                                {
                                    this.props.sheDevoIndex.map(eachDevoIdx => (
                                        <CategoryListOther
                                            devoIdx={eachDevoIdx}
                                            key={eachDevoIdx.id}
                                        />
                                    ))
                                }
                            </ul>
                        </div>
                    </section>
                </div>
            </>
        );
    }
}

export default CategoriesPage;