import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import DOMPurify from 'dompurify';
import { toast } from 'react-toastify';
import { throttle } from 'throttle-debounce';

import { updateNote, getNote } from '../../store/actions/note-actions';
import './Editor.scss';
import TextInput from '../common/text-input/TextInput';
import { forwardRef } from 'react';

const Editor = forwardRef(({ id, note, ...actions }, editor) => {
    const [noteState, setNoteState] = useState({});

    useEffect(async () => {
        setNoteState({
            ...noteState,
            body: '',
        });
        await actions.getNote(id);
    }, [id]);

    const sanitize = (text) => DOMPurify.sanitize(text);

    useEffect(() => {
    // eslint-disable-next-line no-underscore-dangle
        if (note.id !== noteState.id) {
            setNoteState({
                ...noteState,
                // eslint-disable-next-line no-underscore-dangle
                id: note.id,
                title: note.title || '',
                description: note.description || '',
                ...(note.hasOwnProperty('body') && {body: sanitize(note.body)}),
            });
        }
    }, [note]);

    useEffect(() => {
        if (noteState.saved) {
            setTimeout(() => {
                setNoteState({
                    ...noteState,
                    saved: false,
                });
            }, 100);
        }
    }, [noteState.saved]);

    const saveNote = useMemo(() => throttle(2000, false, (note) => {
        actions.updateNote(note)
            .catch((error) => {
                toast.error(error);
            });
    }), [noteState.id]);

    const onMetaChange = ({target:{name:field, value}}) => {
        if (field === 'title' && !value) {
            toast.warn('Title cannot be empty', {position:'bottom-right'});
            return;
        }
        const noteData = {
            ...noteState,
            [field]: value
        };
        setNoteState(noteData);
        saveNote(noteData);
    };

    const onInput = (event) => {
        saveNote({
            ...noteState,
            body: event.target.innerHTML,
        });
    };

    return (
        <div className="editor">
            <div className="meta">
                <TextInput
                    name="title"
                    placeholder="note title"
                    onChange={onMetaChange}
                    className="note-title"
                    value={noteState.title}
                />
                <TextInput
                    name="description"
                    placeholder="enter a description"
                    onChange={onMetaChange}
                    className="note-description"
                    value={noteState.description}
                />
            </div>
            <div ref={editor} contentEditable="true" onInput={onInput} spellCheck="false" dangerouslySetInnerHTML={{ __html: noteState.body }} />
        </div>
    );
});
Editor.displayName = 'Editor';

Editor.propTypes = {
    id: PropTypes.string.isRequired,
    note: PropTypes.shape().isRequired,
    updateNote: PropTypes.func.isRequired,
    getNote: PropTypes.func.isRequired,
    editor: PropTypes.object,
};

const mapStateToProps = (state, ownProps) => ({
    note: state.notes[ownProps.id] || {},
});

const mapDispatchToProps = {
    updateNote,
    getNote,
};

export default connect(mapStateToProps, mapDispatchToProps,null,{forwardRef: true})(Editor);
