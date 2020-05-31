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
    };

    componentDidMount() {
        this.props.fetchDevoIndex();
    };

    componentWillUnmount() {
    };

    // this.props.sheDevoIndex.sort((a, b) => this.state.bibleBooks.indexOf(a.book) - this.state.bibleBooks.indexOf(b.book))
    // sort titles by bible order 

    sortBibleTitles(data) {
        const { bibleBooks } = this.state
        const lowerCaseTitle = bibleBooks.map(ele => ele.toLowerCase());
        return data
            .sort((a, b) => lowerCaseTitle.indexOf(a.book) - lowerCaseTitle.indexOf(b.book))
            .map(ele => ele)
    };

    // this.props.sheDevoIndex.sort((a, b) => a.book < b.book ? -1 : 1
    // sort title by alphabetical order

    sortOtherTitles(data) {
        return data
            .sort((a, b) => a.book < b.book ? -1 : 1)
            .map(ele => ele)
    };

    handleClick(devoBookPayload, e) {
        e.preventDefault();
        let payload = devoBookPayload;
        if (devoBookPayload.book.includes("&")) {
            payload = {
                gender: devoBookPayload.gender,
                book: devoBookPayload.book.replace("&", "%26")
            }
        }
        this.props.fetchDevoBook(payload)
            .then(() => this.props.closeModal());
    };

    render() {
        const { sheDevoIndex, heDevoIndex } = this.props
        
        return (
            <>
                <div className="categories-page-container">
                    <div className="form-closing-x" onClick={() => this.props.closeModal()}>
                        &#10005;
                    </div>

                    <section className="categories-section-she">
                        <div className="categories-title-she">
                            <span>Old Testament</span>
                        </div>
                        <div className="categories-OT">
                            <ul className="she-category-ul">
                                {this.sortBibleTitles(sheDevoIndex).map((eachDevoTitle, i) => (
                                    <CategoryListOT 
                                        eachDevoTitle={eachDevoTitle} 
                                        handleClick={this.handleClick}
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
                                        eachDevoTitle={eachDevoTitle}
                                        handleClick={this.handleClick}
                                        key={i} />
                                ))}
                            </ul>
                        </div>
                        <div className="categories-title-she">
                            <span>Themes</span>
                        </div>
                        <div className="categories-Other">
                            <ul className="she-category-ul">
                                {this.sortOtherTitles(sheDevoIndex).map((eachDevoTitle, i) => (
                                    <CategoryListOther 
                                        eachDevoTitle={eachDevoTitle}
                                        handleClick={this.handleClick}
                                        key={i} />
                                ))}
                            </ul>
                        </div>
                    </section>

                    <div className="form-or-separator-categories">
                        <hr />
                    </div>

                    <section className="categories-section-he">
                        <div className="categories-title-he">
                            <span>Old Testament</span>
                        </div>

                        <div className="categories-OT">
                            <ul className="he-category-ul">
                                {this.sortBibleTitles(heDevoIndex).map((eachDevoTitle, i) => (
                                    <CategoryListOT 
                                        eachDevoTitle={eachDevoTitle}
                                        handleClick={this.handleClick}
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
                                        eachDevoTitle={eachDevoTitle}
                                        handleClick={this.handleClick}
                                        key={i} />
                                ))}
                            </ul>
                        </div>
                        <div className="categories-title-he">
                            <span>Themes</span>
                        </div>
                        <div className="categories-Other">
                            <ul className="she-category-ul">
                                {this.sortOtherTitles(heDevoIndex).map((eachDevoTitle, i) => (
                                    <CategoryListOther 
                                        eachDevoTitle={eachDevoTitle}
                                        handleClick={this.handleClick}
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
