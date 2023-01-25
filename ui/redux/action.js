export const GET_USERNAME = "GET_USERNAME";
export const GET_RESTAURANT = "GET_RESTAURANT";
export const RESET = "RESET";

export const RESET_ACTION = {
  type: RESET
}

export const getUsername = (response) => dispatch => {
    dispatch({
        type: GET_USERNAME,
        payload: response
    });
};

export const getRestaurant = (response) => dispatch => {
    dispatch({
        type: GET_RESTAURANT,
        payload: response
    });
};
