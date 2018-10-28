import axios from 'axios';
import * as types from './types/tutor_types';

export const submitTutorReportOnFeedback = (user_id, rating_id, explanation) => ({
    type: types.submitTutorReportOnFeedback,
    payload: axios.post('/api/submitTutorReportOnFeedback', {user_id, rating_id, explanation})
});

export const submitTutorReportInSession = (user_id, student_id, explanation) => ({
    type: types.submitTutorReportInSession,
    payload: axios.post('/api/submitTutorReportInSession', {user_id, student_id, explanation})
});
