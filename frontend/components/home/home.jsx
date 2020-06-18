import React from 'react';
import SidNavContainer from './sidenav/sidenav_container';
import NavBarContainer from '../nav/navbar_container';
import NotesFormContainer from '../notes/notes_form_container';
import MainBodyContainer from './main_body_container';
import { fetchDevoBook } from '../../util/devos_api_util';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leftOpen: true,
            rightOpen: true,
            currentUser: null,
            bookmark: null,
            devoFetch: false,
        }

        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.setPayload = this.setPayload.bind(this);
    };

    setPayload(data) {
        if (!data) return
        let payload;

        if (data.book.includes("&")) {
            payload = {
                gender: data.gender,
                book: data.book.replace("&", "%26")
            }
        } else {
            payload = {
                gender: data.gender,
                book: data.book
            }
        }

        return payload
    }

    componentDidMount() {
        this.setState({ 
            currentUser: this.props.currentUser.id, 
            devoFetch: true
         })
        this.props.clearErrors()
    };

    componentWillUnmount() {
        this.props.clearDevoState()
    };

    componentDidUpdate(prevProps) {
        const { bookmark, fetchDevo } = this.props 

        if (prevProps.bookmark != bookmark && this.state.devoFetch) {
            if (bookmark !== null || Object.values(bookmark).length > 1) {
                fetchDevo(bookmark.devo_id)
                    .then(() => this.setState({ devoFetch: false }))
            }
        }
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
            {/* ---------- TOP NAV  ---------- */}
            <NavBarContainer />
            <div id='layout'>
            <div id='left' className={leftOpen} >
                <div className='icon'
                    onClick={this.toggleSidebar} >
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </div>
                <div className={`sidebar ${leftOpen}`} >
                    <div className='left-header'>
                        <h3 className='title'>
                            <span>Current Plan</span>
                        </h3>
                    </div>
                    <div className='left-content'>
                    {/* ---------- SIDE NAV  ---------- */}
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
                    {/* ---------- MAIN BODY START ---------- */}
                            <MainBodyContainer/>
                    {/* ---------- MAIN BODY END ---------- */}
                </div>
            </div>
            <div id='right' className={rightOpen} >
                <div className='icon'
                    onClick={this.toggleSidebar} >
                            <i className="fa fa-bars" aria-hidden="true"></i>
                </div>
                <div className={`sidebar ${rightOpen}`} >
                    <div className='right-header'>
                        <h3 className='title'>
                            <span>My Notes</span>
                        </h3>
                    </div>
                    <div className='content'>
                    {/* ---------- NOTE FORM ---------- */}
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