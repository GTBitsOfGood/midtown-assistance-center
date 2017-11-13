let initial_state = {
  // TODO tutoring session state
  filteredTutors: [],
  searchType: 'online',
  searchSubject: undefined,
  searchTime: undefined
};

export default function change_tutors(state = initial_state, action) {
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