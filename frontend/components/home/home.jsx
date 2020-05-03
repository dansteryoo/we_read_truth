import React from 'react';
import SideNav from './sidenav/sidenav';
import HeSideNav from './sidenav/heside_nav';
import SheSideNav from './sidenav/sheside_nav';
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
    }

    componentWillMount() {
        let book = "Genesis"
        this.props.fetchDevoBook(book);
    }

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
    }



    render() {

        let leftOpen = this.state.leftOpen ? 'open' : 'closed';
        let rightOpen = this.state.rightOpen ? 'open' : 'closed';

        const { fetchDevo, fetchDevoBook, heDevos, sheDevos } = this.props;

        let sideNav;
        
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
                        Plan
                        </h3>
                    </div>
                    <div className='content'>

                        <HeSideNav 
                            heDevos={heDevos}
                        /> 

                        <SheSideNav 
                            sheDevos={sheDevos}
                        /> 

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
                        Main
                    </h3>
                </div>
                <div className='content'>

                    <MainBody 
                        heDevos={heDevos}
                        sheDevos={sheDevos}
                    />

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
                        Notes
                        </h3>
                    </div>
                    <div className='content'>
                    
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