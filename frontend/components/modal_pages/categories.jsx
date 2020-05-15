import React from "react";
import CategoryListOT from "./category_list_OT";
import CategoryListNT from "./category_list_NT";
import CategoryListOther from "./category_list_Other";

class CategoriesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bibleBooks: [
            "Genesis",
            "Exodus",
            "Leviticus",
            "Numbers",
            "Deuteronomy",
            "Joshua",
            "Judges",
            "Ruth",
            "1&2Samuel",
            "SecondSamuel",
            "1&2Kings",
            "SecondKings",
            "1&2Chronicles",
            "SecondChronicles",
            "Ezra",
            "Nehemiah",
            "Esther",
            "Job",
            "Psalm",
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
            "Amos",
            "Obadiah",
            "Jonah",
            "Micah",
            "Nahum,Habakkuk,Zephaniah,andHaggai",
            "Habakkuk",
            "Zephaniah",
            "Haggai",
            "ZechariahandMalachi",
            "Malachi",
            "Matthew",
            "Mark",
            "Luke",
            "John",
            "ActsoftheApostles",
            "Romans",
            "1&2Corinthians",
            "SecondCorinthians",
            "Galatians",
            "Ephesians",
            "Philippians",
            "Colossians",
            "1&2Thessalonians",
            "SecondThessalonians",
            "1&2TimothyandTitus",
            "SecondTimothy",
            "Titus",
            "Philemon",
            "Hebrews",
            "James",
            "1&2Peter",
            "SecondPeter",
            "123John",
            "SecondJohn",
            "ThirdJohn",
            "Jude",
            "Revelation"
            ]
        };

        this.handleClick = this.handleClick.bind(this);
        this.sortBibleTitles = this.sortBibleTitles.bind(this);
        this.sortOtherTitles = this.sortOtherTitles.bind(this);
    }

    componentDidMount() {
        this.props.fetchDevoIndex();
    }

    componentWillUnmount() {
        this.props.clearDevoState();
    }

    // this.props.sheDevoIndex.sort((a, b) => this.state.bibleBooks.indexOf(a.book) - this.state.bibleBooks.indexOf(b.book))
    // sort an array in the same order of another array

    sortBibleTitles(data) {
        const { bibleBooks } = this.state
        const lowerCaseTitle = bibleBooks.map(ele => ele.toLowerCase());
        return data
            .sort((a, b) => lowerCaseTitle.indexOf(a.book) - lowerCaseTitle.indexOf(b.book))
            .map(ele => ele)
    }

    // this.props.sheDevoIndex.sort((a, b) => a.book < b.book ? -1 : 1
    // sort an array of objects in alphabetical order

    sortOtherTitles(data) {
        return data
            .sort((a, b) => {
                return a.book < b.book ? -1 : 1
            })
            .map(ele => ele)
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({
            day: "",
            title: "",
            passage: "",
        });
    }

    render() {

        const { sheDevoIndex, heDevoIndex, fetchDevoBook, closeModal } = this.props
        
        return (
            <>
                <div className="categories-page-container">
                    <div className="form-closing-x" onClick={() => closeModal()}>
                        &#10005;
                    </div>

                    <section className="categories-section">
                        <div className="categories-title-she">
                            <span>Old Testament</span>
                        </div>
                        <div className="categories-OT">
                            <ul className="she-category-ul">
                                {this.sortBibleTitles(sheDevoIndex).map((eachDevoTitle, i) => (
                                    <CategoryListOT 
                                        closeModal={closeModal}
                                        fetchDevoBook={fetchDevoBook}
                                        eachDevoTitle={eachDevoTitle} 
                                        key={i} />
                                ))}
                            </ul>
                        </div>
                        <div className="categories-title-she">
                            <span>New Testament</span>
                        </div>
                        <div className="categories-NT">
                            <ul className="she-category-ul">
                                {this.sortBibleTitles(sheDevoIndex).map((eachDevoTitle, i) => (
                                    <CategoryListNT 
                                        closeModal={closeModal}
                                        fetchDevoBook={fetchDevoBook}
                                        eachDevoTitle={eachDevoTitle}
                                        key={i} />
                                ))}
                            </ul>
                        </div>
                        <div className="categories-title-she">
                            <span>Other Books</span>
                        </div>
                        <div className="categories-Other">
                            <ul className="she-category-ul">
                                {this.sortOtherTitles(sheDevoIndex).map((eachDevoTitle, i) => (
                                    <CategoryListOther 
                                        closeModal={closeModal}
                                        fetchDevoBook={fetchDevoBook}
                                        eachDevoTitle={eachDevoTitle}
                                        key={i} />
                                ))}
                            </ul>
                        </div>
                    </section>

                    <div className="form-or-separator-categories">
                        <hr />
                    </div>

                    <section className="categories-section">
                        <div className="categories-title-he">
                            <span>Old Testament</span>
                        </div>

                        <div className="categories-OT">
                            <ul className="he-category-ul">
                                {this.sortBibleTitles(heDevoIndex).map((eachDevoTitle, i) => (
                                    <CategoryListOT 
                                        closeModal={closeModal}
                                        fetchDevoBook={fetchDevoBook}
                                        eachDevoTitle={eachDevoTitle}
                                        key={i} />
                                ))}
                            </ul>
                        </div>
                        <div className="categories-title-he">
                            <span>New Testament</span>
                        </div>
                        <div className="categories-NT">
                            <ul className="he-category-ul">
                                {this.sortBibleTitles(heDevoIndex).map((eachDevoTitle, i) => (
                                    <CategoryListNT 
                                        closeModal={closeModal}
                                        fetchDevoBook={fetchDevoBook}
                                        eachDevoTitle={eachDevoTitle}
                                        key={i} />
                                ))}
                            </ul>
                        </div>
                        <div className="categories-title-he">
                            <span>Other Books</span>
                        </div>
                        <div className="categories-Other">
                            <ul className="she-category-ul">
                                {this.sortOtherTitles(heDevoIndex).map((eachDevoTitle, i) => (
                                    <CategoryListOther 
                                        closeModal={closeModal}
                                        fetchDevoBook={fetchDevoBook}
                                        eachDevoTitle={eachDevoTitle}
                                        key={i} />
                                ))}
                            </ul>
                        </div>
                    </section>
                </div>
            </>
        );
    }
}

export default CategoriesPage;
