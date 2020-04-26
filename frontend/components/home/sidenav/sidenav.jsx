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

    }

    render() {

        return (
            <nav className="sidenav-container" >
                {/*
                    listings.map(listing => (
                        <ListingsIndexItems
                            listing={listing}
                            key={listing.id}
                        />
                    ))
                    */}
            </nav>
        )
    }
}

export default SideNav;