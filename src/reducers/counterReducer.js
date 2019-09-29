import { 
    INCREMENT,
    DECREMENT,
} from "../actions/counterActions";

const initialState = {
    count: 0,
};

export const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case INCREMENT: {
            return {
                ...state,
                count: state.count++,
            };
        }
        case DECREMENT: {
            return {
                ...state,
                count: state.count--,
            };
        }
        default: {
            return state;
        }
    }
};