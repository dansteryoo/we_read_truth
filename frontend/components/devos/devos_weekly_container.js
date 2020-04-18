import { connect } from 'react-redux';
import { fetchDevos } from '../../actions/devo_actions';
import DevosWeekly from './devos_weekly';


const mapStateToProps = (state) => ({
    devos: Object.values(state.devos)
});


const mapDispatchToProps = (dispatch) => ({
    fetchDevos: () => dispatch(fetchDevos())
});


export default connect(mapStateToProps, mapDispatchToProps)(DevosWeekly);