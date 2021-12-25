import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './NoteList.scss';

// eslint-disable-next-line arrow-body-style
const NoteList = ({ notes, isOpen, closeNoteList }) => {
    return (
        <div className={`drawer-container ${isOpen ? 'open' : ''}`} onClick={closeNoteList} role="none">
            <div className="drawer">
                <button type="submit" className="close-button" onClick={closeNoteList}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                <div id="noteList">
                    <h2>My Notes</h2>
                    <nav>
                        {Object.values(notes).map((note) => (
                            <NavLink
                                to={`/notes/${note.id}`}
                                className={({ isActive }) => (isActive ? 'active' : '')}
                                key={note.id}
                                onClick={closeNoteList}
                            >
                                {note.title}

                            </NavLink>
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
};

NoteList.propTypes = {
    notes: PropTypes.shape().isRequired,
    closeNoteList: PropTypes.func.isRequired,
    isOpen: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ notes, noteListOpened }) => ({ notes, noteListOpened });

export default connect(mapStateToProps)(NoteList);
