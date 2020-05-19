import React from 'react';
import SideNavItem from './sidenav_item'

class SideNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            book: '',
        }
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        // this.props.clearErrors();
    };

    componentDidUpdate(prevProps) {
        if (this.props.devoBook !== prevProps.devoBook) {
            if (this.props.devoBook.length > 0) {
                this.setState({
                    book: this.props.devoBook[0].book
                })
            }
        }
    };

    render() {
        
        return (
            <>
                <div className='sidenav-container'>
                    <div className='sidenav-title'> 
                    <span>{this.state.book}</span>
                    </div>
                    <ul className="sidenav-ul" >
                        {
                            this.props.devoBook.map((dailyDevo, i) => (
                                <SideNavItem
                                    days={i}
                                    dailyDevoTitle={dailyDevo.title}
                                    key={dailyDevo.id}
                                />
                            ))
                        }
                    </ul>
                </div>
            </>
        )
    }
}

export default SideNav;