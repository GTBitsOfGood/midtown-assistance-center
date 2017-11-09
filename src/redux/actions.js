export function updateUser (user) {
    return {
        type: 'UPDATE_IN_USER',
        payload: user
    };
}

export function changeOnlineTutors(tutors) {
  return {
    type: 'CHANGE_ONLINE_TUTORS',
    payload: tutors
  };
}