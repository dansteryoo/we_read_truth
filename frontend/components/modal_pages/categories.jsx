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
        this.sortTitles = this.sortTitles.bind(this);
    }

    componentDidMount() {
        this.props.fetchDevoIndex();
    }

    componentWillMount() {
        this.props.clearDevoState();
    }

    // this.props.sheDevoIndex.sort((a, b) => this.state.bibleBooks.indexOf(a.book) - this.state.bibleBooks.indexOf(b.book))
    // sort an array in the same order of another array

    sortTitles(data) {
        const { bibleBooks } = this.state
        return data
            .sort((a, b) => bibleBooks.indexOf(a.book) - bibleBooks.indexOf(b.book))
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

        console.log(this.sortTitles(this.props.sheDevoIndex))
        return (
            <>
                <div className="categories-page-container">
                    <div className="form-closing-x" onClick={() => this.props.closeModal()}>
                        &#10005;
                    </div>

                    <section className="categories-section">
                        <div className="categories-title">
                            <span>Old Testament</span>
                        </div>
                        <div className="categories-OT">
                            <ul className="she-category-ul">
                                {this.sortTitles(this.props.sheDevoIndex).map((eachDevoIdx) => (
                                    <CategoryListOT devoIdx={eachDevoIdx} key={eachDevoIdx.id} />
                                ))}
                            </ul>
                        </div>
                        <div className="categories-title">
                            <span>New Testament</span>
                        </div>
                        <div className="categories-NT">
                            <ul className="she-category-ul">
                                {this.sortTitles(this.props.sheDevoIndex).map((eachDevoIdx) => (
                                    <CategoryListNT devoIdx={eachDevoIdx} key={eachDevoIdx.id} />
                                ))}
                            </ul>
                        </div>
                        <div className="categories-Other">
                            <ul className="she-category-ul"></ul>
                        </div>
                    </section>

                    <div className="form-or-separator-categories">
                        <hr />
                    </div>

                    <section className="categories-section">
                        <div className="categories-title">
                            <span>Old Testament</span>
                        </div>

                        <div className="categories-OT">
                            <ul className="he-category-ul">
                                {this.sortTitles(this.props.heDevoIndex).map((eachDevoIdx) => (
                                    <CategoryListOT devoIdx={eachDevoIdx} key={eachDevoIdx.id} />
                                ))}
                            </ul>
                        </div>
                        <div className="categories-title">
                            <span>New Testament</span>
                        </div>
                        <div className="categories-NT">
                            <ul className="he-category-ul">
                                {this.sortTitles(this.props.heDevoIndex).map((eachDevoIdx) => (
                                    <CategoryListNT devoIdx={eachDevoIdx} key={eachDevoIdx.id} />
                                ))}
                            </ul>
                        </div>
                        <div className="categories-Other">
                            <ul className="he-category-ul"></ul>
                        </div>
                    </section>
                </div>
            </>
        );
    }
}

export default CategoriesPage;
