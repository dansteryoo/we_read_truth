import React from 'react';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ''
        }
    }

    componentWillMount(){
        this.props.closeModal();
    }

    update(f) {
        return e => this.setState({
            [f]: e.target.value
        });
    };

    render() {
        // debugger
        return (
            <nav className="nav-container" >

                <Link to="/" className="nav-home">
                    <img src={window.logo} />
                </Link>

                <div className='navsearch'>
                    <form className='navbar-search-form'>
                        <input
                            className='navsearch-input'
                            type='text'
                            placeholder='Search..'
                            value={this.state.search}
                            onChange={this.update('search')}
                        />
                    </form>
                </div>

                <ul className="nav-links">
                    <li className="devo-li">
                        <a>Devotionals</a>
                        <ul className="dropdown-devos">
                            <li className="notes-li" onClick={() => this.props.openModal('Categories')}>
                                Categories
                            </li>
                        </ul>
                    </li>
                    <li className="profile-li">
                        <a>Profile</a>
                        <ul className="dropdown-profile">
                            <li className="notes-li" onClick={() => this.props.openModal('Notes')}>
                                Notes
                            </li>
                            <li className="logout-li" onClick={() => this.props.logout()}>
                                Logout
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar;


