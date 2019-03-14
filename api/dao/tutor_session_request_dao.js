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
        TutorSessionRequest.find({'_id.tutor_id':tutorId, 'status':'pending'}, (err, docs) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                callback(null, docs);
            }
        });
    },
    /**
     * get all pending join requests for a certain student
     * @param student_id
     * @param callback
     */
    getPendingRequestsByStudent(student_id, callback) {
        TutorSessionRequest.find({'_id.student_id':student_id, 'status':'pending'}, (err, docs) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                callback(null, docs);
            }
        });
    },
    /**
     * get a pending join request for a certain tutor
     * by student
     * @param data
     * @param callback
     */
    getPendingRequestsByTutorAndStudent(data, callback) {
        TutorSessionRequest.find({'_id.tutor_id':data.tutor_id, '_id.student_id':data.student_id, 'status':'pending'}, (err, docs) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                callback(null, docs);
            }
        });
    },
    /**
     * Update a sessionRequest to approved or rejected
     * @param sessionRequest
     * @param callback
     */
    updateRequest(sessionRequest, callback) {
        TutorSessionRequest.findOneAndUpdate({
            '_id.tutor_id':sessionRequest._id.tutor_id,
            '_id.student_id':sessionRequest._id.student_id,
            '_id.create_time':sessionRequest._id.create_time
        }, {
            $set: {
                'status':sessionRequest.status,
                'tutor_comment':sessionRequest.tutor_comment
            }
        },
        { new:true },
        (err, updatedRequest) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                callback(null, updatedRequest);
            }
        });
    },
    /**
     * Cancel all open session requests for a student
     * @param student_id
     * @param callback
     */
    cancelAllStudentRequests(student_id, callback) {
        TutorSessionRequest.remove({'_id.student_id':student_id, 'status':'pending'}, (err) => {
            if (err) {
                console.log(err);
                callback(err);
            } else {
                callback(null);
            }
        });
    }
};