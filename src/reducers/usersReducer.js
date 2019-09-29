import {
    REQUESTED_ALL_USERS,
    REQUESTED_ALL_USERS_SUCCEEDED,
    REQUESTED_ALL_USERS_FAILED,
    POST_NEW_USER_START,
    POST_NEW_USER_SUCCESS,
    POST_NEW_USER_FAIL
} from "../actions/usersActions";

const initialState = {
    users: [],
    loading: false,
    error: false,
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case REQUESTED_ALL_USERS: {
            return {
                ...state,
                loading: true,
            }
        }
        case REQUESTED_ALL_USERS_SUCCEEDED: {
            return {
                ...state,
                users: action.users,
                loading: false,
            }
        }
        case REQUESTED_ALL_USERS_FAILED: {
            return {
                ...state,
                error: true,
            }
        }
        case POST_NEW_USER_START: {
            return {
                ...state,
                loading: true,
            }
        }
        case POST_NEW_USER_SUCCESS: {
            return {
                ...state,
                users: [...state.users, action.newUser],
                loading: false,
            }
        }
        case POST_NEW_USER_FAIL: {
            return {
                ...state,
                error: true,
            }
        }
        default: {
            return state;
        }
    }
};