import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import './Notebook.scss';

import { useMemo, useRef, useState, useEffect, createRef } from 'react';
import { useNavigate } from 'react-router';
import NoteList from '../note-list/NoteList';
import Editor from '../editor/Editor';
import Header from '../header/Header';
import { logOut } from '../../store/actions/user-actions';
import { addNote, deleteNote } from '../../store/actions/note-actions';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

const Notebook = ({logOut, addNote, deleteNote}) => {
    const noteList = useRef();
    const noteId = useParams().id;
    const [notebookState, setNotebookState] = useState({
        editorSize: 'normal',
        noteListOpen: false,
    });
    const navigate = useNavigate();

    const editor = createRef();

    const sendLogOut = async () => {
        await logOut()
            .then(() => {
                navigate('/');
                toast.success('You have been logged out.');
            });
    };

    const closeNoteList = () => {
        setNotebookState({
            ...notebookState,
            noteListOpen: false,
        });
    };

    const openNoteList = () => {
        setNotebookState({
            ...notebookState,
            noteListOpen: true,
        });
    };

    const newNote = async () => {
        const note = await addNote();
        toast.success("Your new note is ready!");
        navigate(`/notes/${note.id}`);
    };

    const removeNote = async () => {
        await deleteNote(noteId);
        toast.success("Your note has been deleted.\n(I hope you meant to do that!)");
        navigate(`/notes`);
    };

    useEffect(() => {
        if (editor.current) editor.current.focus();
    }, [noteId]);

    const noteListObserver = useMemo(
        () => new IntersectionObserver(
            ([entry], observer) => {
                if (entry.boundingClientRect.left < 0 && notebookState.editorSize === 'normal') {
                    setNotebookState(
                        { ...notebookState, editorSize: 'forced-expanded' },
                    );
                    observer.disconnect();
                }
            },
            { threshold: 1 },
        ),
    );

    const toggleEditorSize = () => {
        noteListObserver.disconnect();
        setNotebookState({
            ...notebookState,
            editorSize: notebookState.editorSize === 'expanded'
                ? 'normal'
                : notebookState.editorSize === 'forced-expanded'
                    ? 'forced-expanded'
                    : 'expanded',
        });
    };

    useEffect(() => {
        if (noteList.current) {
            noteListObserver.observe(noteList.current);
        }
    });

    return (
        <div className={`container ${notebookState.editorSize !== 'normal' ? 'notebook-expanded' : ''}`}>
            <div className="notebook">
                <div className="header">
                    <Header
                        editorSize={notebookState.editorSize}
                        toggleEditorSize={toggleEditorSize}
                        noteListOpen={notebookState.noteListOpen}
                        openNoteList={openNoteList}
                        logOut={sendLogOut}
                        addNote={newNote}
                        deleteNote={removeNote}
                    />
                </div>
                <div className="wrapper">
                    <div className="editor-container">
                        { noteId ?
                            <>
                                <Editor id={noteId} ref={editor} />
                            </>
                            : (
                                <div className="select-tip">
                                    <FontAwesomeIcon icon={faArrowLeft} />
                                    Select a note to start editing!
                                </div>
                            )}
                    </div>
                    <div className="note-list" ref={noteList}>
                        <NoteList
                            closeNoteList={closeNoteList}
                            isOpen={notebookState.noteListOpen}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

Notebook.propTypes = {
    logOut: PropTypes.func.isRequired,
    addNote: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    logOut,
    addNote,
    deleteNote
};

export default connect(null,mapDispatchToProps)(Notebook);
