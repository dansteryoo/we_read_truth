import React from 'react';
import SideNavContainer from '../nav/sidenav_container';
import NavBarContainer from '../nav/navbar_container';

class HomePage extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // this.props.fetchDevos();
    }

    componentDidMount() {
        // fetch('http://jsonplaceholder.typicode.com/users')
        //     .then(res => res.json())
        //     .then((data) => {
        //         this.setState({ contacts: data })
        //     })
        //     .catch(console.log)
    }

    render() {

        const { devos } = this.props;

        return (
            <>
            <NavBarContainer />

            <div className='hompage-main-container'>

                <div className='sidenav-container'>
                    <SideNavContainer />
                </div>

                <div className='homepage-mid-container'>
                    DEVOS HERE

                </div>

                <div className='homepage-right-container'>
                    NOTES HERE
                </div>

            </div>
        </>
        )
    }

}

export default HomePage;