import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { openModal } from '../../actions/modal_actions';
import DevoContentList from './devo_content_list';


const mapStateToProps = (state) => ({
    currentUser: state.users[state.session.id],
    devoList: state.devos.id
});

const mapDispatchToProps = (dispatch) => ({
    logout: () => dispatch(logout()),
    openModal: (formType) => dispatch(openModal(formType))
});

export default connect(mapStateToProps, mapDispatchToProps)(DevoContentList);