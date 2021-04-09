import React from "react";
import { connect } from "react-redux";
import { closeModal } from "../../actions/modal_actions";
import CategoriesContainer from "../modal_pages/categories_container";
import NotesPage from "../modal_pages/notesPage";
import ProfilePage from "../modal_pages/profilePage";

/******************************
 *       Modal Component      *
 ******************************/

const Modal = ({ modal, closeModal }) => {
    if (!modal) return null;

    let component;
    switch (modal) {
        case "Notes":
            component = <NotesPage />;
            break;
        case "Categories":
            component = <CategoriesContainer />;
            break;
        case "Profiles":
            component = <ProfilePage />;
            break;
        default:
            return null;
    }

    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
};

/******************************
 *       mapStateToProps      *
 ******************************/

const mapStateToProps = (state) => {
    let modalVar;
    if (!state.modal) {
        modalVar = null;
    } else {
        modalVar = state.modal.formType;
    }
    let idVar;
    if (!state.modal) {
        idVar = null;
    } else {
        idVar = state.modal.bookingId;
    }

    return {
        modal: modalVar,
        typeId: idVar,
    };
};

/******************************
 *     mapDispatchToProps     *
 ******************************/

const mapDispatchToProps = (dispatch) => ({
    closeModal: () => dispatch(closeModal()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
