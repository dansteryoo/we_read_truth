import React from "react";
import { connect } from "react-redux";
import {
    fetchNote,
    fetchNotes,
    deleteNote,
    updateNote,
    createNote,
} from "../../actions/note_actions";
import { openModal } from "../../actions/modal_actions";
import { clearErrors } from "../../actions/session_actions";
import { withRouter } from "react-router-dom";
const ERRORS = [
    "ttl can't be blank", // 0 Title
    "bod can't be blank", // 1 Body
    "boo can't be blank", // 2 Book
    "day can't be blank", // 3 Day
    "day must only be a number", // 4 Number
];

const defaultState = {
    id: "",
    title: "",
    category: "",
    day: "",
    body: "",
    updateErrors: [],
    updateForm: false,
};

class NotesForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = defaultState;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.renderFormButton = this.renderFormButton.bind(this);
    }

    dayIsNumber(day) {
        let splitStr = day.trim().split("");

        for (let i = 0; i < splitStr.length; i++) {
            if (/^[a-zA-Z]*$/.test(splitStr[i])) return false;
        }
        return true;
    }

    isBlank(word) {
        return word.trim().length < 1;
    }

    componentDidMount() {
        this.props.fetchNotes();
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    componentDidUpdate(prevProps) {
        if (this.props.noteId !== prevProps.noteId) {
            //---------- if this.props.noteId is a NUMBER then populate with update first and render update form ----------//
            if (Number.isInteger(this.props.noteId.id)) {
                const { id, title, category, day, body } = this.props.noteId;
                this.setState({
                    id,
                    title,
                    category,
                    day,
                    body,
                    updateForm: true,
                });
            }

            //---------- if notes array is different from current props to prevProps ----------//
            if (this.props.notes.length !== prevProps.notes.length) {
                //---------- AND if current props array is empty SKIP reset state ----------//
                if (this.props.notes.length < 1) return;

                //---------- OR if current props array is NOT EMPTY then reset state ----------//
                if (!this.props.notes.some((ele) => ele.id === this.state.id)) {
                    this.setState(defaultState);
                }
            }
        }
    }

    handleChange(f) {
        return (e) => this.setState({ [f]: e.target.value });
    }

    handleCancelUpdate() {
        return this.setState(defaultState);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ loading: true });

        const { id, title, category, day, body } = this.state;
        let noteUpdate = { id, title, category, day, body };
        let note = { title, category, day, body };

        if (
            this.isBlank(title) ||
            this.isBlank(body) ||
            this.isBlank(category) ||
            this.isBlank(day) ||
            !this.dayIsNumber(day)
        ) {
            let errorsArr = [];
            if (this.isBlank(title)) errorsArr.push(ERRORS[0]); // Title is blank
            if (this.isBlank(body)) errorsArr.push(ERRORS[1]); // Body is blank
            if (this.isBlank(category)) errorsArr.push(ERRORS[2]); // Book is blank
            if (this.isBlank(day)) errorsArr.push(ERRORS[3]); // Day is blank
            if (!this.dayIsNumber(day) && !this.isBlank(day))
                errorsArr.push(ERRORS[4]); // Day is !number
            if (errorsArr.length > 0) return this.setState({ updateErrors: errorsArr });

        } else if (id.length < 1) {
            this.props
                .createNote(note)
                .then(() => this.setState({
                        ...defaultState,
                        success: true,
                    }))
                .then(() => this.renderSuccessMsg())
                .then(() => this.props.fetchNotes());
        } else {
            this.props
                .updateNote(noteUpdate)
                .then(() => this.setState({
                        ...defaultState,
                        update: true,
                    }))
                .then(() => this.renderUpdateMsg())
                .then(() => this.props.fetchNotes());
        }
    }

    renderSuccessMsg() {
        window.setTimeout(() => {
            this.setState({ success: false, loading: false });
        }, 3000);
    }

    renderUpdateMsg() {
        window.setTimeout(() => {
            this.setState({ update: false, loading: false });
        }, 3000);
    }

    renderFormButton() {
        if (this.state.updateForm) {
            return (
                <div className="button-container">
                    <button
                        className="notes-form-submit-button"
                        disabled={this.state.loading}
                        type="submit"
                    >
                        Update
                    </button>
                    <div
                        className="notes-form-cancel-x"
                        onClick={() => this.handleCancelUpdate()}
                    >
                        &#10005;
                    </div>
                </div>
            );
        } else {
            return (
                <div className="button-container">
                    <button
                        className="notes-form-submit-button"
                        disabled={this.state.loading}
                        type="submit"
                    >
                        Create
                    </button>
                </div>
            );
        }
    }

    renderErrors() {
        const { updateErrors } = this.state;

        const errorsHash = {
            title: "",
            body: "",
            book: "",
            day: "",
            number: "",
        };

        if (updateErrors.length < 1) return errorsHash;

        updateErrors.forEach((err) => {
            if (ERRORS.indexOf(err) === 0) errorsHash.title = err.slice(3);
            if (ERRORS.indexOf(err) === 1) errorsHash.body = err.slice(3);
            if (ERRORS.indexOf(err) === 2) errorsHash.book = err.slice(3);
            if (ERRORS.indexOf(err) === 3) errorsHash.day = err.slice(3);
            if (ERRORS.indexOf(err) === 4) errorsHash.number = err.slice(3);
        });

        const { title, category, day, body } = this.state;

        if (!this.isBlank(title)) errorsHash.title = "";
        if (!this.isBlank(body)) errorsHash.body = "";
        if (!this.isBlank(category)) errorsHash.book = "";
        if (!this.isBlank(day)) errorsHash.day = "";
        if (this.dayIsNumber(day)) errorsHash.number = "";

        return errorsHash;
    }

    render() {
        if (this.state.success) {
            return (
                <div className="success-message-div">
                    <span>Note Created!</span>
                </div>
            );
        } else if (this.state.update) {
            return (
                <div className="success-message-div">
                    <span>Note Updated!</span>
                </div>
            );
        } else {
            return (
                <div className="notes-form-container">
                    <form onSubmit={this.handleSubmit}>
                        <div className="notes-form">
                            {/* categories and day */}
                            <div className="notes-form-book-day">
                                <div className="columns">
                                    <div className="form-errors-notes">
                                        <label>Book </label>{" "}
                                        {this.renderErrors().book}
                                    </div>
                                    <input
                                        type="text"
                                        className="notes-form-input"
                                        value={this.state.category}
                                        onChange={this.handleChange("category")}
                                        // required
                                    />
                                </div>
                                <div className="columns">
                                    <div className="form-errors-notes">
                                        <label>Day# </label>
                                        {this.renderErrors().day}
                                        {this.renderErrors().number}
                                    </div>
                                    <input
                                        type="text"
                                        className="notes-form-input"
                                        value={this.state.day}
                                        onChange={this.handleChange("day")}
                                        // required
                                    />
                                </div>
                            </div>
                            {/* title */}
                            <div className="form-errors-notes">
                                <label>Title </label>
                                {this.renderErrors().title}
                            </div>
                            <input
                                type="text"
                                className="notes-form-input-title"
                                onChange={this.handleChange("title")}
                                value={this.state.title}
                                // required
                            />
                            {/* body */}
                            <div className="form-errors-notes">
                                <label>Body </label>
                                {this.renderErrors().body}
                            </div>
                            <textarea
                                className="notes-form-textarea"
                                placeholder={"Enter note here.."}
                                onChange={this.handleChange("body")}
                                value={this.state.body}
                                // required
                            />

                            {this.renderFormButton()}
                        </div>
                    </form>

                    <br />
                </div>
            );
        }
    }
}


const mapStateToProps = (state) => {
    let noteId;
    let notes;
    let noteErrors;

    if (state.notes.noteId !== undefined) {
        noteId = state.notes.noteId;
        notes = [];
    } else {
        noteId = {};
        notes = Object.values(state.notes);
    }

    if (state.notes.noteErrors !== undefined) {
        noteErrors = state.notes.noteErrors;
    } else {
        noteErrors = [];
    }

    return {
        currentUser: state.users[state.session.id],
        errors: state.errors,
        devos: Object.values(state.devos),
        notes: notes,
        noteId: noteId,
        noteErrors: noteErrors,
    };
};

const mapDispatchToProps = (dispatch) => ({
    openModal: (formType, id) => dispatch(openModal(formType, id)),
    fetchNotes: () => dispatch(fetchNotes()),
    fetchNote: (noteId) => dispatch(fetchNote(noteId)),
    deleteNote: (noteId) => dispatch(deleteNote(noteId)),
    updateNote: (note) => dispatch(updateNote(note)),
    createNote: (note) => dispatch(createNote(note)),
    clearErrors: () => dispatch(clearErrors()),
});

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(NotesForm)
);
