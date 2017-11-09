export default function student_view(state = {}, action) {
  let new_state = Object.assign({}, state);

  switch (action.type) {
    case 'CHANGE_ONLINE_TUTORS':
      new_state.online_tutors = action.payload;
      break;
  }

  return new_state;
}