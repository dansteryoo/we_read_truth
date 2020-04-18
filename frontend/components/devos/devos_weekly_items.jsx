import React from 'react';

const DevosWeeklyItems = ({ devos }) => {

    return (
        <li className='devo-weekly-li'>

            <div className='devo-info'>

                <div className='devo-address'>
                    <span>{devo.address}</span>
                </div>
                <div className='devo-address'>
                    <span>{devo.address}</span>
                </div>
                <div className='devo-address'>
                    <span>{devo.address}</span>
                </div>

            </div>
        </li>
    )
}

export default DevosWeeklyItems;
