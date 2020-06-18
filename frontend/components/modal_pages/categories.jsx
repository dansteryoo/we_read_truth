import React from "react";
import CategoryListOT from "./category_list_OT";
import CategoryListNT from "./category_list_NT";
import CategoryListOther from "./category_list_Other";
import { bibleBooks } from '../home/function_helpers/bookTitles'

class CategoriesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchBook: ''
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
        const lowerCaseArr = bibleBooks.map(ele => ele.toLowerCase());
        return data
            .sort((a, b) => lowerCaseArr.indexOf(a.book) - lowerCaseArr.indexOf(b.book))
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
            .then(() => this.props.closeModal())
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
                                {this.sortBibleTitles(sheDevoIndex).map((eachTitle, i) => (
                                    <CategoryListOT 
                                        eachTitle={eachTitle} 
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
                                {this.sortBibleTitles(sheDevoIndex).map((eachTitle, i) => (
                                    <CategoryListNT 
                                        eachTitle={eachTitle}
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
                                {this.sortOtherTitles(sheDevoIndex).map((eachTitle, i) => (
                                    <CategoryListOther 
                                        eachTitle={eachTitle}
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
                                {this.sortBibleTitles(heDevoIndex).map((eachTitle, i) => (
                                    <CategoryListOT 
                                        eachTitle={eachTitle}
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
                                {this.sortBibleTitles(heDevoIndex).map((eachTitle, i) => (
                                    <CategoryListNT 
                                        eachTitle={eachTitle}
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
                                {this.sortOtherTitles(heDevoIndex).map((eachTitle, i) => (
                                    <CategoryListOther 
                                        eachTitle={eachTitle}
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
