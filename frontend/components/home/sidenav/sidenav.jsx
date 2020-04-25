import React from 'react';
import HeSideNav from './heside_nav'
import SheSideNav from './sheside_nav'
import { Link } from 'react-router-dom';

class SideNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        debugger
    }

    render() {

        return (
            <nav className="sidenav-container" >
                <HeSideNav
                    bookTitle=''
                    passages=''
                    day=''
                />
            </nav>
        )
    }
}

export default SideNav;