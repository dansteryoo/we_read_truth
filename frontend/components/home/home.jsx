import React from 'react';
import SideNav from './sidenav/sidenav';
import NavBarContainer from '../nav/navbar_container';
import MainBody from './main_body'


class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            leftOpen: true,
            rightOpen: true,
        }

        this.toggleSidebar = this.toggleSidebar.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        // fetch('../data_he')
        //     .then(res => res.json())
        //     .then((data) => {
        //         this.setState({ contacts: data })
        //     })
        //     .catch(console.log)
    }

    handleClick(e) {
        e.preventDefault();
        this.setState({
            day: "",
            title: "",
            passage: "",
        })
    };

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
                    <div className='left-header'>
                        <h3 className='title'>
                        Plan
                        </h3>
                    </div>
                    <div className='content'>

                        <SideNav 
                        handleClick={this.handleClick}
                        /> 

                    </div>
                </div>
            </div>

            <div id='main'>
                <div className='main-header'>
                    <h3 className={`
                        title
                        ${'left-' + leftOpen}
                        ${'right-' + rightOpen}
                    `}>
                        Main
                    </h3>
                </div>
                <div className='content'>

                    <MainBody 
                        bookTitle=''
                        passages=''
                    />

                </div>
            </div>

            <div id='right' className={rightOpen} >
                <div className='icon'
                    onClick={this.toggleSidebar} >
                    &equiv;
                </div>
                <div className={`sidebar ${rightOpen}`} >
                    <div className='right-header'>
                        <h3 className='title'>
                        Notes
                        </h3>
                    </div>
                    <div className='content'>
                        <h3>Posts</h3><br/>

                    </div>
                </div>
            </div>

      </div>
      </>
    );
  }
}

export default HomePage;