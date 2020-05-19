import React from 'react';

const SideNavItem = ({ dailyDevoTitle, days }) => {

    return (
        <li className='daily-devo-li'>
            <div className='daily-devo-days'>
                <span>Day: </span>{days + 1}
            </div>
            <div className='daily-devo-title'>
                <span>Title: </span>{dailyDevoTitle}
            </div>
        </li>
    )
}

export default SideNavItem;
