import * as types from './types/subject_types'
import axios from 'axios';
import store from '../store';

export function getSubjects () {
    store.dispatch({
        type: types.getSubjects,
        payload: axios.get('/api/subjects')
    });
}
