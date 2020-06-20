import React from 'react';
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const match = (search) => {
      const input = Array.from(search).reduce(
        (a, v, i) => `${a}[^${search.substring(i)}]*?${v}`,
        ''
      );
      return new RegExp(input);
      // return values.filter((each) => each.match(result));
    };

    this.props.openModal('Categories', match(this.state.search.toLowerCase()))
  }

  componentDidMount() {
    this.props.clearNoteState()
  }

  componentWillUnmount() {
    this.props.closeModal()
  }

  handleChange(f) {
    return (e) => this.setState({ [f]: e.target.value });
  }

  render() {

    return (
      <nav className='nav-container'>
        <div className='nav-home'>
          <img src={window.logo} />
        </div>

        <div className='navsearch'>
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
          <li className='devo-li'>
            <a href="mailto:wereadtruth.app@gmail.com?subject=We Read Truth Feedback: ">Contact Us</a>  
          </li>
          <li className='devo-li' onClick={() => this.props.openModal('Categories')}>
            Devotionals
          </li>
          <li className='notes-li' onClick={() => this.props.openModal('Notes')}>
            Notes
          </li>

          <li className="profile-li">
            <a onClick={() => this.props.openModal('Profiles')}>Profile</a>
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


