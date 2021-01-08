import React from "react";
import CategoryListOT from "./category_list_OT";
import CategoryListNT from "./category_list_NT";
import CategoryListThemes from "./category_list_Themes";
import { bibleBooks } from '../home/function_helpers/bookTitles'
import { setPayload, sortTitles, sortAlphabetically} from '../home/function_helpers/helper_funcs'

class CategoriesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchBook: ''
        };

        this.handleClick = this.handleClick.bind(this);
    };

    componentDidMount() {
        this.props.fetchDevoIndex();
    };

    // sortTitles
    // this.props.sheDevoIndex.sort((a, b) => this.state.bibleBooks.indexOf(a.book) - this.state.bibleBooks.indexOf(b.book))
    // sort titles by bible order 

    // sortAlphabetically
    // this.props.sheDevoIndex.sort((a, b) => a.book < b.book ? -1 : 1
    // sort title by alphabetical order

    handleClick(devoPayload, e) {
        e.preventDefault();
    
        this.props.fetchDevoBook(setPayload(devoPayload))
            .then(() => this.props.closeModal())
    };

    render() {
        const { sheDevoIndex, heDevoIndex } = this.props
        console.log({ sheDevoIndex });
        return (
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
                                {sortTitles(sheDevoIndex, bibleBooks).map((title, i) => (
                                    <CategoryListOT 
                                        title={title} 
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
                                {sortTitles(sheDevoIndex, bibleBooks).map((title, i) => (
                                    <CategoryListNT 
                                        title={title}
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
                                {sortAlphabetically(sheDevoIndex, bibleBooks).map((title, i) => (
                                    <CategoryListThemes 
                                        title={title}
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
                                {sortTitles(heDevoIndex, bibleBooks).map((title, i) => (
                                    <CategoryListOT 
                                        title={title}
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
                                {sortTitles(heDevoIndex, bibleBooks).map((title, i) => (
                                    <CategoryListNT 
                                        title={title}
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
                                {sortAlphabetically(heDevoIndex, bibleBooks).map((title, i) => (
                                    <CategoryListThemes 
                                        title={title}
                                        handleClick={this.handleClick}
                                        key={i} />
                                ))}
                            </ul>
                        </div>
                    </section>
                </div>
        );
    }
}

export default CategoriesPage;
