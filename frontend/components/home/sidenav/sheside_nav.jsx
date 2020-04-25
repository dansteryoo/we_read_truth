import React from 'react';
import SideNavList from './sidenav_items'

class SheSideNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            gender: "he_data",
            folder: "NT", 
            name: "acts",
            book: "",
            passages: "",
        }
    }

    componentDidMount() {

    }

    render() {

        return (
            <nav className="sidenav-container" >
                    <ul className='sidenav-ul'>
                        {/*
                            this.state.book.map((each, i) => (
                                <SideNavList
                                    each={each}
                                    key={i}
                                />
                            ))
                        */}
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



