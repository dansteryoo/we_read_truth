import React from 'react';

class DevoContentList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
    }

    componentDidMount() {

    }

    render() {

        return (
            <div className="devo-content-container" >
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
        )
    }
}

export default DevoContentList;