import React from 'react';

const SideNavItem = ({ dailyDevo, days, handleGetDevo }) => {

    return (
        <li className='daily-devo-li' onClick={() => handleGetDevo(dailyDevo.id)}>
            <div className='daily-devo-days'>
                <span>Day: </span>{days + 1}
            </div>
            <div className='daily-devo-title'>
                <span>Title: </span>{dailyDevo.title}
            </div>
        </li>
    )
}

export default SideNavItem;
