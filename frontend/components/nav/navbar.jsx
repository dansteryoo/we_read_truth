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

    this.props.openModal("Categories", match(this.state.search.toLowerCase()))
  }

  componentDidMount() {
    this.props.clearNoteState()
  }

  componentWillUnmount() {
    this.props.closeModal()
  }

  handleChange(f) {
    return (e) =>
      this.setState({
        [f]: e.target.value,
      });
  }

  render() {
    return (
      <nav className="nav-container">
        <Link to="/" className="nav-home">
          <img src={window.logo} />
        </Link>

        <div className="navsearch">
          <img className='navsearch-icon' src={window.search_icon} height='20' />
          <form onSubmit={this.handleSubmit} className="navbar-search-form">
            <input
              className="navsearch-input"
              type="text"
              placeholder="Search.."
              value={this.state.search}
              onChange={this.handleChange("search")}
            />
          </form>
        </div>

        <ul className="nav-links">
          <li className="logout-li">
            <a href="https://chrome.google.com/webstore/detail/mailto-for-gmail/dgkkmcknielgdhebimdnfahpipajcpjn" target="_blank">Chrome Ext</a>
          </li>
          
          <li className="logout-li">
            <a href="mailto:dansteryoo@gmail.com?subject=We Read Truth Feedback">Feedback</a>
          </li>
          <li className="devo-li">
            <a>Devotionals</a>
            <ul className="dropdown-devos">
              <li className="notes-li" onClick={() => this.props.openModal("Categories")}>
                Categories
              </li>
            </ul>
          </li>
          <li className="profile-li">
            <a>Profile</a>
            <ul className="dropdown-profile">
              <li className="notes-li" onClick={() => this.props.openModal("Notes")}>
                Notes
              </li>
            </ul>
          </li>
          <li className="logout-li" onClick={() => this.props.logout()}>
            Logout
              </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;


