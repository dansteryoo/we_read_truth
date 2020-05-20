import React from 'react';
import SidNavContainer from './sidenav/sidenav_container';
import NavBarContainer from '../nav/navbar_container';
import NotesFormContainer from '../notes/notes_form_container'
import MainBody from './main_body'

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leftOpen: true,
            rightOpen: true,
        }

        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.handleClick = this.handleClick.bind(this);
    };

    componentDidMount() {
        this.props.clearErrors()
    };

    componentWillUnmount() {
        this.props.clearDevoState()
    };

    componentDidUpdate(prevProps) {
        
        // if (this.props.noteId !== prevProps.noteId) {
        //     const { id, title, category, tags, body } = this.props.noteId;
        //     this.setState({
        //         id: id,
        //         title: title,
        //         category: category,
        //         tags: tags,
        //         body: body,
        //     })
        // }
    };

    handleClick(e) {
        e.preventDefault();
        this.setState({
            day: "",
            title: "",
            passage: "",
        })
    };

    toggleSidebar(event) {
        let key = `${event.currentTarget.parentNode.id}Open`;
        this.setState({ [key]: !this.state[key] });
    };

    render() {

        let leftOpen = this.state.leftOpen ? 'open' : 'closed';
        let rightOpen = this.state.rightOpen ? 'open' : 'closed';

        const { currentUser } = this.props;
        
        return (
            <>
            <NavBarContainer />
            <div id='layout'>

            <div id='left' className={leftOpen} >
                <div className='icon'
                    onClick={this.toggleSidebar} >
                    &equiv;
                </div>
                <div className={`sidebar ${leftOpen}`} >
                    <div className='left-header'>
                        <h3 className='title'>
                            <span>Current Plan</span>
                        </h3>
                    </div>
                    <div className='left-content'>
                        {/* 
                            SIDE NAV
                        */}
                        <SidNavContainer/>

                    </div>
                </div>
            </div>

            <div id='main'>
                <div className='main-header'>
                    <h3 className={`
                        title
                        ${'left-' + leftOpen}
                        ${'right-' + rightOpen}
                    `}>
                        <span>Welcome {currentUser.first_name}!</span>
                    </h3>
                </div>
                <div className='content'>
                    {/* 
                        MAIN BODY 
                    */}
                    <MainBody/>
                </div>
            </div>

            <div id='right' className={rightOpen} >
                <div className='icon'
                    onClick={this.toggleSidebar} >
                    &equiv;
                </div>
                <div className={`sidebar ${rightOpen}`} >
                    <div className='right-header'>
                        <h3 className='title'>
                            <span>My Notes</span>
                        </h3>
                    </div>
                    <div className='content'>
                        {/* 
                            NOTES FORM 
                        */}
                        <NotesFormContainer />
                    </div>
                </div>
            </div>

      </div>
      </>
    );
  }
}

export default HomePage;