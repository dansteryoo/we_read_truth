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
                <div className='form-container'>
                    <div className='form-closing-x' onClick={() => this.props.closeModal()}>&#10005;</div>
                    <br />
                    <br />
                    <div className='form-or-separator'>
                        <hr />
                    </div>
                    <div className='form-title'>
                        MY NOTES HERE
                    </div>
                    <br />
                    <section>
                        <div className='section'>
                            EACH NOTE
                        </div>
                    </section>
                    <br />
                </div>
        </>
    );
  }
}

export default NotesPage;