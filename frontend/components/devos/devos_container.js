import { connect } from 'react-redux';
import { fetchDevos } from '../../actions/devo_actions';
import DevoMain from './devos_body';


const mapStateToProps = (state) => ({
    devos: Object.values(state.devos)
});


const mapDispatchToProps = (dispatch) => ({
    fetchDevos: () => dispatch(fetchDevos())
});


export default connect(mapStateToProps, mapDispatchToProps)(DevoMain);