export const actions = ['user_action'];


export function setUserAction (user) {
    return {
        type: actions[0], 
        payload: user
    };
}