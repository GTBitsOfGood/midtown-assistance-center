export function changeTutorsAction(tutors) {
  return {
    type: 'CHANGE_ONLINE_TUTORS',
    payload: tutors
  };
}

export function onSearchAction(search_type, search_subject, search_time) {
  return {
    type: 'ON_SEARCH',
    payload: {
      searchType: search_type,
      searchSubject: search_subject,
      searchTime: search_time
    }
  }
}