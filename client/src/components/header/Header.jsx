import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faDoorOpen, faExpand, faCompress } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './Header.scss';

const Header = ({
    noteListOpen, openNoteList, editorSize, toggleEditorSize, logOut,
}) => (
    <nav className="site-nav">
        {editorSize !== 'normal' && !noteListOpen
            ? <span className="toggle-note-list">
                <button type="button" onClick={openNoteList}>
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
                onClick={toggleEditorSize}>{
                    editorSize === 'normal'
                        ? <FontAwesomeIcon icon={faExpand} />
                        : <FontAwesomeIcon icon={faCompress} />
                }</button>

        </span>}
        <span className="log-out">
            <button type="button" onClick={logOut}>
                <FontAwesomeIcon icon={faDoorOpen} />
                Log Out
            </button>
        </span>
    </nav>
);

Header.propTypes = {
    noteListOpen: PropTypes.bool.isRequired,
    openNoteList: PropTypes.func.isRequired,
    editorSize: PropTypes.string.isRequired,
    toggleEditorSize: PropTypes.func.isRequired,
    logOut: PropTypes.func.isRequired,
};

export default Header;
