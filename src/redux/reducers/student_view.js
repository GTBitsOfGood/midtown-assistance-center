export default function change_tutors(state = {}, action) {
  let new_state = Object.assign({}, state);

  switch (action.type) {
    case 'CHANGE_ONLINE_TUTORS':
      new_state.filteredTutors = action.payload;
      break;

    case 'ON_SEARCH':
      new_state = Object.assign(new_state, action.payload);
      break;
  }

  return new_state;
}