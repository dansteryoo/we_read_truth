import React from 'react';

class SheSideNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            id: '',
            gender: '',
            book: '', 
            title: '',
            passages: '',
            summary: '',
            img: ''
        }


        this.handleClick = this.handleClick.bind(this);
    };

    componentDidMount() {

    };

    handleClick(e) {
        e.preventDefault();
        this.setState({
            day: "",
            title: "",
            passage: "",
        })
    };

    render() {
        debugger
        return (
            <nav className="sidenav-container" >
                    <ul className='sidenav-ul'>

                    <li className='leftside-nav-li'>
                        <div className='leftside-nav-day'>
                            <span>{}Day 1</span>
                        </div>
                        <div className='leftside-nav-title'>
                            <span>{}Weekly Truth</span>
                        </div>
                        <div className='leftside-nav-passage'>
                            <span>{}Acts 1:1-20</span>
                        </div>
                    </li>
                    </ul>
            </nav>
        )
    }
}

export default SheSideNav;



