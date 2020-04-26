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
                <div className='form-container'>
                    <div className='form-closing-x' onClick={() => this.props.closeModal()}>&#10005;</div>
                    <br />
                    <br />
                    <div className='form-title'>
                        SHE CATEGORIES
                    </div>
                    <br />
                    <section>
                        <div className='section'>
                            EACH CATEGORY
                        </div>
                    </section>
                    <div className='form-or-separator'>
                        <hr />
                    </div>
                    <div className='form-title'>
                        HE CATEGORIES
                    </div>
                    <br />
                    <section>
                        <div className='section'>
                            EACH CATEGORY
                        </div>
                    </section>
                    <br />
                </div>
            </>
        );
    }
}

export default CategoriesPage;