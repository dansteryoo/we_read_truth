import React from 'react';
import CategoryListOT from './category_list_OT'
import CategoryListNT from './category_list_NT'
import CategoryListOther from './category_list_Other'

class CategoriesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
                Genesis: 1,
                Exodus: 2,
                Leviticus: 3,
                Numbers: 4,
                Deuteronomy: 5,
                Joshua: 6,
                Judges: 7,
                Ruth: 8,
                FirstSamuel: 9,
                SecondSamuel: 10,
                FirstKings: 11,
                SecondKings: 12,
                FirstChronicles: 13,
                SecondChronicles: 14,
                Ezra: 15,
                Nehemiah: 16,
                Esther: 17,
                Job: 18,
                Psalm: 19,
                Proverbs: 20,
                Ecclesiastes: 21,
                SongofSongs: 22,
                Isaiah: 23,
                Jeremiah: 24,
                Lamentations: 25,
                Ezekiel: 26,
                Daniel: 27,
                Hosea: 28,
                Joel: 29,
                Amos: 30,
                Obadiah: 31,
                Jonah: 32,
                Micah: 33,
                Nahum: 34,
                Habakkuk: 35,
                Zephaniah: 36,
                Haggai: 37,
                Zechariah: 38,
                Malachi: 39,
                Matthew: 40,
                Mark: 41,
                Luke: 42,
                John: 43,
                Acts: 44,
                Romans: 45,
                FirstCorinthians: 46,
                SecondCorinthians: 47,
                Galatians: 48,
                Ephesians: 49,
                Philippians: 50,
                Colossians: 51,
                FirstThessalonians: 52,
                SecondThessalonians: 53,
                FirstTimothy: 54,
                SecondTimothy: 55,
                Titus: 56,
                Philemon: 57,
                Hebrews: 58,
                James: 59,
                FirstPeter: 60,
                SecondPeter: 61,
                FirstJohn: 62,
                SecondJohn: 63,
                ThirdJohn: 64,
                Jude: 65,
                Revelation: 66
            };

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        this.props.fetchDevoIndex();
    }

    componentWillMount() {
        this.props.clearDevoState();
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({
            day: "",
            title: "",
            passage: "",
        })
    };


    render() {

        


        return (
            <>
                <div className='categories-page-container'>

                        <div className='form-closing-x' onClick={() => this.props.closeModal()}>&#10005;</div>

                    <section className='categories-section'>
                    <div className='categories-title'>
                        <span>Old Testament</span>
                    </div>
                        <div className='categories-OT'>
                            <ul className='she-category-ul'> 
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
                        <div className='categories-title'>
                            <span>New Testament</span>
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

                            </ul>
                        </div>
                    </section>

                        <div className='form-or-separator-categories'>
                            <hr />
                        </div>

                    <section className='categories-section'>
                    <div className='categories-title'>
                        <span>Old Testament</span>
                    </div>

                        <div className='categories-OT'>
                            <ul className='he-category-ul'>
                                {
                                    this.props.heDevoIndex.map(eachDevoIdx => (
                                        <CategoryListOT
                                            devoIdx={eachDevoIdx}
                                            key={eachDevoIdx.id}
                                        />
                                    ))
                                }
                            </ul>
                        </div>
                    <div className='categories-title'>
                        <span>New Testament</span>
                    </div>
                        <div className='categories-NT'>
                            <ul className='he-category-ul'>
                                {
                                    this.props.heDevoIndex.map(eachDevoIdx => (
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

                            </ul>
                        </div>
                    </section>
                </div>
            </>
        );
    }
}

export default CategoriesPage;