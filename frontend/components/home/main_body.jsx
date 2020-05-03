import React from 'react';

class MainBody extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    componentDidMount() {
        // this.props.fetchDevo();
    }

    render() {

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

}

export default MainBody;