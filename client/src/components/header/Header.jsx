import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faEdit, faDoorOpen, faExpand, faCompress, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './Header.scss';

const Header = ({
    noteListOpen, openNoteList, editorSize, toggleEditorSize, logOut, addNote, deleteNote
}) => {
    const blurThen = (func) => (event) => {
        func(event);
        event.currentTarget.blur();
    };
    return (
        <nav className="site-nav">
            {editorSize !== 'normal' && !noteListOpen
                ? <span className="toggle-note-list">
                    <button type="button" onClick={blurThen(openNoteList)}>
                        <FontAwesomeIcon icon={faArrowLeft} />
                        Show Note List
                    </button>
                </span>
                : ''}
            {editorSize !== 'forced-expanded' && <span
                className="toggle-editor-size"
            >
                <button
                    type="button"
                    onClick={blurThen(toggleEditorSize)}>
                    {
                        editorSize === 'normal'
                            ? <><FontAwesomeIcon icon={faExpand} />Maximize</>
                            : <><FontAwesomeIcon icon={faCompress} />Restore</>
                    }

                </button>

            </span>}
            <span className="new-note">
                <button type="button" onClick={blurThen(addNote)}>
                    <FontAwesomeIcon icon={faEdit} />
                    New Note
                </button>
            </span>
            <span className="delete-note">
                <button type="button" onClick={blurThen(deleteNote)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                    Delete Note
                </button>
            </span>
            <span className="log-out">
                <button type="button" onClick={blurThen(logOut)}>
                    <FontAwesomeIcon icon={faDoorOpen} />
                    Log Out
                </button>
            </span>
        </nav>
    );};

Header.propTypes = {
    noteListOpen: PropTypes.bool.isRequired,
    openNoteList: PropTypes.func.isRequired,
    editorSize: PropTypes.string.isRequired,
    toggleEditorSize: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
    addNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
};

export default Header;
