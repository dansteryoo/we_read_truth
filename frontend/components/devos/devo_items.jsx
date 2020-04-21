import React from 'react';

const DevoItems = ({devo}) => {

    return (
        <div className='devo-main-container'>

            <div className='devo-main-title'>
                <span>{}</span>
            </div>
            <div className='devo-main-passages'>
                <span>{}</span>
            </div>
            <div className="devo-main-body">
                <span>{}</span>
            </div>
            <div className='devo-main-image'>
                <span>{}</span>
            </div>
            <div className='devo-main-footer'>
                <span>{}</span>
            </div>

        </div>
    )
}

export default DevoItems;