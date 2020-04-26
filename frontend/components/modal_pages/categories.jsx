import React from 'react';


class CategoriesPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }


        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {

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
        // debugger
        return (
            <>
                <div className='categories-page-container'>

                        <div className='form-closing-x' onClick={() => this.props.closeModal()}>&#10005;</div>

                    <div className='categories-title'>
                        SHE CATEGORIES
                    </div>

                    <section>
                        <div className='categories-section'>
                            EACH CATEGORY
                        </div>
                    </section>

                        <div className='form-or-separator-categories'>
                            <hr />
                        </div>

                    <div className='categories-title'>
                        He CATEGORIES
                    </div>

                    <section>
                        <div className='categories-section'>
                            EACH CATEGORY
                        </div>
                    </section>
                </div>
            </>
        );
    }
}

export default CategoriesPage;