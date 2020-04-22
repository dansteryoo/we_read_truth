import React from 'react';
import SideNavContainer from '../nav/sidenav_container';
import NavBarContainer from '../nav/navbar_container';

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leftOpen: true,
            rightOpen: true,
        }

        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    componentDidMount() {
        // fetch('http://jsonplaceholder.typicode.com/users')
        //     .then(res => res.json())
        //     .then((data) => {
        //         this.setState({ contacts: data })
        //     })
        //     .catch(console.log)
    }

    toggleSidebar(event) {
        let key = `${event.currentTarget.parentNode.id}Open`;
        this.setState({ [key]: !this.state[key] });
    }


    render() {

        let leftOpen = this.state.leftOpen ? 'open' : 'closed';
        let rightOpen = this.state.rightOpen ? 'open' : 'closed';

        const { devos } = this.props;

        return (
            <>
            <NavBarContainer />
            <div id='layout'>

            <div id='left' className={leftOpen} >
                <div className='icon'
                    onClick={this.toggleSidebar} >
                    &equiv;
                </div>
                <div className={`sidebar ${leftOpen}`} >
                    <div className='header'>
                        <h3 className='title'>
                        Left header
                        </h3>
                    </div>
                    <div className='content'>
                        <SideNavContainer />
                    </div>
                </div>
            </div>

            <div id='main'>
                <div className='header'>
                    <h3 className={`
                        title
                        ${'left-' + leftOpen}
                        ${'right-' + rightOpen}
                    `}>
                        Main header
                    </h3>
                </div>
                <div className='content'>
                    <h3>Main content</h3><br/>

                </div>
            </div>

            <div id='right' className={rightOpen} >
                <div className='icon'
                    onClick={this.toggleSidebar} >
                    &equiv;
                </div>
                <div className={`sidebar ${rightOpen}`} >
                    <div className='header'>
                        <h3 className='title'>
                        Right header
                        </h3>
                    </div>
                    <div className='content'>
                        <h3>Right content</h3><br/>

                    </div>
                </div>
            </div>

      </div>
      </>
    );
  }
}

export default HomePage;