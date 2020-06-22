export function fetchNews(pageNumber) {
  let fetchURL = pageNumber ? "https://hn.algolia.com/api/v1/search?page="+pageNumber : "https://hn.algolia.com/api/v1/search?tags=front_page" 
  return dispatch => {
    dispatch(fetchNewsBegin(pageNumber));
    return fetch(fetchURL)
      .then(handleErrors)
      .then(res => res.json())
      .then(json => {
        dispatch(fetchNewsSuccess(json));
        return json;
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