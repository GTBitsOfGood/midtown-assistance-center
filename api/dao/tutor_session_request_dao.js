import moment from 'moment';

const TutorSessionRequest = require('../../models/TutorSessionRequest.js');
const Tutor = require('../../models/Tutor.js');

module.exports = {
    /**
     * add a tutor session request object
     * @param session
     * @param callback
     */
    addSessionRequest(sessionRequest, callback) {
        TutorSessionRequest.create(sessionRequest, (err, request_instance) => {
            if (err) {
                console.error(
                    'Error creating a new session session request',
                    err
                );
                callback(err);
                
            } else {
                callback(null, request_instance);
            }
        });
    },
    /**
     * get all join requests for a certain tutor
     * @param tutorId
     * @param callback
     */
    getRequestsByTutor(tutorId, callback) {
        TutorSessionRequest.find(tutorId, (err, docs) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                callback(null, docs);
            }
        });
    },
    /**
     * get all pending join requests for a certain tutor
     * @param tutorId
     * @param callback
     */
    getPendingRequestsByTutor(tutorId, callback) {
        function isSessionPending(session) {
            return session.status === 'pending';
        }
        TutorSessionRequest.find({'_id.tutor_id':tutorId}, (err, docs) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                const filteredDocs = docs.filter(isSessionPending);
                callback(null, filteredDocs);
            }
        });
    }
};