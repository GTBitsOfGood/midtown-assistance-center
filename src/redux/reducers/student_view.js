export default function change_tutors(state = {}, action) {
  let new_state = Object.assign({}, state);

  switch (action.type) {
    case 'CHANGE_ONLINE_TUTORS':
      new_state.filtered_tutors = action.payload;
      break;
  }

  return new_state;
}