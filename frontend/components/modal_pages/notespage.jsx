import React from 'react';


class NotesPage extends React.Component {
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
                <div className='notes-page-container'>
                    <div className='notes-page-content'>
                        <div className='form-closing-x' onClick={() => this.props.closeModal()}>&#10005;</div>

                        <div className='form-or-separator-notes'>
                            <hr />
                        </div>
                        <section>
                            <div className='notes-page-section'>
                                EACH NOTE
                            </div>
                        </section>

                    </div>
                </div>
        </>
    );
  }
}

export default NotesPage;