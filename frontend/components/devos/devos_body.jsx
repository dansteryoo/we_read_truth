import devos from './hereadstruth.json';
import React from 'react';
import DevoItems from './devo_items';

class DevoBody extends React.Component {
    constructor(props) {
        super(props)
    }

    // componentDidMount() {
    // }

    render() {
        return (
            <div className='devos-index-container'>

                <div className='devos-index-ph-title'>
                    <span>Day 1</span>
                </div>

                <div className='devos-index-header'>
                    <span>Title</span>
                </div>

                <div className='devos-index-subheader'>
                    <span>Passage</span>
                </div>

                <ul className='devos-ul'>
                    {
                        devos.map((devo, i) => (
                            <DevoItems
                                devo={devo}
                                key={i}
                            />
                        ))
                    }
                </ul>
            </div>
        )
    }

}

export default DevoBody;