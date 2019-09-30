import {
    GET_ALL_USERS_START,
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAIL,

    POST_NEW_USER_START,
    POST_NEW_USER_SUCCESS,
    POST_NEW_USER_FAIL,

    DELETE_USER_START,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,

    UPDATE_USER_START,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
} from "../actions/usersActions";

const initialState = {
    users: [],

    getUsersLoading: false,
    getUsersError: false,
    getUsersErrorMessage: null,

    postUserLoading: false,
    postUserError: false,
    postUserErrorMessage: null,

    deleteUserLoading: false,
    deleteUserError: false,
    deleteUserErrorMessage: null,

    updateUserLoading: false,
    updateUserError: false,
    updateUserErrorMessage: null,
};

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_USERS_START: {
            return {
                ...state,
                getUsersLoading: true,
            }
        }
        case GET_ALL_USERS_SUCCESS: {
            return {
                ...state,
                users: action.users,
                getUsersLoading: false,
            }
        }
        case GET_ALL_USERS_FAIL: {
            return {
                ...state,
                getUsersError: true,
                getUsersLoading: false,
                getUsersErrorMessage: action.errorMessage,
            }
        }
        //=================================================
        case POST_NEW_USER_START: {
            return {
                ...state,
                postUserLoading: true,
            }
        }
        case POST_NEW_USER_SUCCESS: {
            return {
                ...state,
                // I get new user and add him to the users in the store.
                users: [...state.users, action.newUser],
                postUserLoading: false,
            }
        }
        case POST_NEW_USER_FAIL: {
            return {
                ...state,
                postUserError: true,
                postUserLoading: false,
                postUserErrorMessage: action.errorMessage,
            }
        }
        //=================================================
        case DELETE_USER_START: {
            return {
                ...state,
                deleteUserLoading: true,
            }
        }
        case DELETE_USER_SUCCESS: {
            // I get deleted user from API and delete him from the users in the store.
            return {
                ...state,
                // I get all users without deleted user.
                users: [...action.usersWithoutDeletedUser],
                deleteUserLoading: false,
            }
        }
        case DELETE_USER_FAIL: {
            return {
                ...state,
                deleteUserError: true,
                deleteUserLoading: false,
                deleteUserErrorMessage: action.errorMessage,
            }
        }
        case UPDATE_USER_START: {
            return {
                ...state,
                updateUserLoading: true,
            }
        }
        case UPDATE_USER_SUCCESS: {
            return {
                ...state,
                users: [...action.usersWithUpdatedUser],
                updateUserLoading: false,
            }
        }
        case UPDATE_USER_FAIL: {
            return {
                ...state,
                updateUserError: true,
                updateUserLoading: false,
                updateUserErrorMessage: action.errorMessage,
            }
        }
        //=================================================
        default: {
            return state;
        }
    }
};