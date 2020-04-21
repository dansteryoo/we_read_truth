import React from 'react';
import DevosWeekly from '../devos/devos_weekly_container';

class SideNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    render() {

        return (
            <nav className="sidenav-container" >
                <div className='hamburger'>
                    <div className='line'></div>
                    <div className='line'></div>
                    <div className='line'></div>
                        <ul className='sidenav-links'>
                            <li><a href='#'>Day 1</a></li>
                            <li><a href='#'>Day 2</a></li>
                            <li><a href='#'>Day 3</a></li>
                            <li><a href='#'>Day 4</a></li>
                            <li><a href='#'>Day 5</a></li>
                            <li><a href='#'>Day 6</a></li>
                            <li><a href='#'>Day 7</a></li>
                            <li><a href='#'>Day 8</a></li>
                        </ul>
                </div>
            </nav>
        )
    }
}

export default SideNav;



