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
                <div className='sidenav-content'>
                    <DevosWeekly />
                </div>
            </nav>
        )
    }
}

export default SideNav;



