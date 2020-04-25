import React from 'react';
import { Link } from 'react-router-dom';

const SideNavList = ({ each, i }) => {
    debugger
    return (
        <li className='leftside-nav-li'>
            <Link to={`/listings/${listing.id}`}>
            <div className='leftside-nav-day'>
                <span>{}Day 1</span>
            </div>
            <div className='leftside-nav-title'>
                <span>{}Weekly Truth</span>
            </div>
            <div className='leftside-nav-passage'>
                <span>{}Acts 1:1-20</span>
            </div>
            </Link>
        </li>
    )
}

export default SideNavList;
