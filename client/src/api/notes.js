import { apiGet, apiPut, apiUrl } from './api-util';

export const getNote = (getState, dispatch, id) => {
    return apiGet(getState, dispatch, {url: `${apiUrl}/notes/${id}`});
};

// let pendingPutNote;
// let putNoteInProgress;
// let putNoteThrottle;
export const putNote = (getState, dispatch, note) => {

    return apiPut(getState, dispatch, {
        url: `${apiUrl}/notes/${note.id}`,
        body: note
    });

    // // debugger;
    // if (pendingPutNote) {
    //     pendingPutNote.resolve('throttled');
    // }
    // return new Promise((resolve,reject) => {
    // // debugger;
    //     if (putNoteThrottle || putNoteInProgress) {
    //         pendingPutNote = {resolve, reject, note};
    //     } else {
    //         startThrottleTimer(getState, dispatch);
    //         putNoteInProgress = putNoteDirect(getState, dispatch, note);
    //         resolve(putNoteInProgress);
    //     }
    // });
};

// const startThrottleTimer = (getState, dispatch) => {
//     putNoteThrottle = setTimeout(() => {
//         if (pendingPutNote) {
//             putNoteInProgress = putNoteDirect(getState, dispatch, pendingPutNote.note);
//             pendingPutNote.resolve(putNoteInProgress);
//             pendingPutNote = undefined;
//             startThrottleTimer(getState, dispatch);
//         } else {
//             putNoteThrottle = undefined;
//         }
//     }, 2000);
// };

// const putNoteDirect = (getState, dispatch, note) => {
//     // debugger;
//     return apiPut(getState, dispatch, {
//         url: `${apiUrl}/notes/${note.id}`,
//         body: note
//     });

// };
