import * as types from './types/user_types'

export function updateUser (user) {
    return {
        type: types.updateUser,
        payload: user
    };
}