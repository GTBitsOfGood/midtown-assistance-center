export function updateUser (user) {
    return {
        type: 'UPDATE_IN_USER',
        payload: user
    };
}