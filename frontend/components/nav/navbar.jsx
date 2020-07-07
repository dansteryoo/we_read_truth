import React from 'react';
import { searchRegexMatch } from '../home/function_helpers/helper_funcs'

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPosition = this.checkPosition.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    //---------- helper_func ----------//
    this.props.openModal('Categories', searchRegexMatch(this.state.search.toLowerCase()))
  }


  componentWillUnmount() {
    this.props.closeModal()
  }

  handleChange(f) {
    return (e) => this.setState({ [f]: e.target.value });
  }

  checkPosition() {
  if (window.matchMedia('(max-width: 1200px)').matches) {
    return 'navsearch-none'
  } else {
    return 'navsearch'
  }
}

  render() {

    return (
      <nav className='nav-container'>
        <div className='nav-home'>
          <img src={window.logo} />
        </div>

        <div className={this.checkPosition()}>
          <img className='navsearch-icon' src={window.search_icon} height='20' />
          <form onSubmit={this.handleSubmit} className='navbar-search-form'>
            <input
              className='navsearch-input'
              type='text'
              placeholder='Search..'
              value={this.state.search}
              onChange={this.handleChange('search')}
            />
          </form>
        </div>

        <ul className='nav-links'>
          <li className='contactus-li'>
            <a href="mailto:wereadtruth.app@gmail.com?subject=We Read Truth Feedback: ">Contact Us</a>  
          </li>
          <li className='devo-li' onClick={() => this.props.openModal('Categories')}>
            Devotionals
          </li>
          <li className='notes-li' onClick={() => this.props.openModal('Notes')}>
            Notes
          </li>
          <li className="profile-li">
            <a onClick={() => this.props.openModal('Profiles')}>
            Profile
            </a>
            <ul className="dropdown-profile">
              <li className='logout-li' onClick={() => this.props.logout()}>
                Logout
              </li>
          </ul>
          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;


