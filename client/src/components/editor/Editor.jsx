import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';
import { throttle } from 'throttle-debounce';

import { updateNote, getNote } from '../../store/actions/note-actions';
import './Editor.scss';

const Editor = ({ id, note, ...actions }) => {
    const [editorState, setEditorState] = useState({});

    useEffect(async () => {
        setEditorState({
            ...editorState,
            value: '',
        });
        await actions.getNote(id);
    }, [id]);

    const sanitize = (text) => DOMPurify.sanitize(text);

    useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
        if (editorState.noteId !== note.id) {
            setEditorState({
                ...editorState,
                // eslint-disable-next-line no-underscore-dangle
                ...{ value: sanitize(note.body) },
                ...(note.body && { noteId: note.id }),
            });
        }
    }, [note]);

    useEffect(() => {
        if (editorState.saved) {
            setTimeout(() => {
                setEditorState({
                    ...editorState,
                    saved: false,
                });
            }, 100);
        }
    }, [editorState.saved]);

    const onInput = useMemo(() => throttle(2000, false, (event) => {
        actions.updateNote({ ...note, body: event.target.innerHTML })
            .then((response) => {
                if (response !== 'throttled') {
                    setEditorState({
                        ...editorState,
                        saved: true,
                    });
                    //   toast('saved!');
                }
            })
            .catch((error) => {
                toast.error(error);
            });
    }), [editorState.noteId]);

    return (
    // eslint-disable-next-line react/no-danger
        <div className="editor" contentEditable="true" onInput={onInput} spellCheck="false" dangerouslySetInnerHTML={{ __html: editorState.value }} />
    );
};

Editor.propTypes = {
    id: PropTypes.string.isRequired,
    note: PropTypes.shape().isRequired,
    updateNote: PropTypes.func.isRequired,
    getNote: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    note: state.notes[ownProps.id] || {},
});

const mapDispatchToProps = {
    updateNote,
    getNote,
};

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
