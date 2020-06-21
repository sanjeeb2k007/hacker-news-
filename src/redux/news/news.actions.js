export function fetchNews() {
  return dispatch => {
    dispatch(fetchNewsBegin());
    return fetch("http://hn.algolia.com/api/v1/search?tags=front_page")
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchNewsSuccess(json.hits));
        return json.hits;
      })
      .catch(error => dispatch(fetchNewsFailure(error)));
  };
}

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const FETCH_NEWS_BEGIN   = 'FETCH_NEWS_BEGIN';
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS';
export const FETCH_NEWS_FAILURE = 'FETCH_NEWS_FAILURE';

export const fetchNewsBegin = () => ({
  type: FETCH_NEWS_BEGIN
});

export const fetchNewsSuccess = news => ({
  type: FETCH_NEWS_SUCCESS,
  payload: { news }
});

export const fetchNewsFailure = error => ({
  type: FETCH_NEWS_FAILURE,
  payload: { error }
});