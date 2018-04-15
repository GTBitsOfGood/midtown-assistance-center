import * as types from '../actions/types/student_view_types';

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
    case types.updateOnlineTutors:
      new_state.filteredTutors = action.payload.filteredTutors;
      break;

    case types.onSearchClicked:
      new_state = Object.assign(new_state, action.payload);
      break;
  }

  return new_state;
}
