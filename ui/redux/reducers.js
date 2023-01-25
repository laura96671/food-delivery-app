import { GET_USERNAME } from "./action";
import { GET_RESTAURANT } from "./action";
import { RESET } from "./action";

const initialState = {
    user: [],
    restaurant: []
};

export function actionReducer(state = initialState, action) {
    switch (action.type) {
        case GET_USERNAME:
            return Object.assign({}, state, {
                user: [...state.user, action.payload],
            });
        case GET_RESTAURANT:
            return Object.assign({}, state, {
                restaurant: [...state.restaurant, action.payload],
            });
        case RESET:
            return initialState;
        default:
            return state;
    }
}
