import {call, put, takeEvery, all} from "redux-saga/effects";

export const FETCHED_ALL_USERS = 'FETCHED_ALL_USERS';
export const REQUESTED_ALL_USERS = 'REQUESTED_ALL_USERS';
export const REQUESTED_ALL_USERS_SUCCEEDED = 'REQUESTED_ALL_USERS_SUCCEEDED';
export const REQUESTED_ALL_USERS_FAILED = 'REQUESTED_ALL_USERS_FAILED';

export const POST_NEW_USER_START = 'POST_NEW_USER_START';
export const POST_NEW_USER_SUCCESS = 'POST_NEW_USER_SUCCESS';
export const POST_NEW_USER_FAIL = 'POST_NEW_USER_FAIL';
export const POST_NEW_USER = 'POST_NEW_USER';

const requestAllUsers = () => {
    return {
        type: REQUESTED_ALL_USERS,
    };
};

const requestAllUsersSuccess = (data) => {
    return {
        type: REQUESTED_ALL_USERS_SUCCEEDED,
        users: data,
    };
};

const requestAllUsersError = () => {
    return {
        type: REQUESTED_ALL_USERS_FAILED,
    };
};

export const fetchAllUsers = () => {
    return {
        type: FETCHED_ALL_USERS,
    };
};

function* watchFetchAllUsers() {
    yield takeEvery(FETCHED_ALL_USERS, fetchAllUsersAsync);
}

function* fetchAllUsersAsync() {
    try {
        yield put(requestAllUsers());
        const usersData = yield call(() => {
            return fetch('https://localhost:5001/api/users')
                .then(res => res.json());
        });
        yield put(requestAllUsersSuccess(usersData));
    } catch (error) {
        yield put(requestAllUsersError());
    }
}

//====================================================================

const postNewUserStart = () => {
    return {
        type: POST_NEW_USER_START,
    };
};

const postNewUserSuccess = (newUser) => {
    return {
        type: POST_NEW_USER_SUCCESS,
        newUser,
    };
};

const postNewUserFail = () => {
    return {
        type: POST_NEW_USER_FAIL,
    };
};

export const postNewUser = (newUser) => {
    return {
        type: POST_NEW_USER,
        newUser,
    };
};

function* watchPostNewUser() {
    yield takeEvery(POST_NEW_USER, postNewUserAsync);
}

function* postNewUserAsync(action) {
    try {
        yield put(postNewUserStart());
        const newUser = yield call(() => {
            return fetch('https://localhost:5001/api/users', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: action.newUser,
            }).then(res => res.json());
        });
        yield put(postNewUserSuccess(newUser));
    } catch (error) {
        yield put(postNewUserFail());
    }
}

//====================================================================

export function* rootSaga() {
    yield all([
        watchFetchAllUsers(),
        watchPostNewUser()
    ]);
    // It is the same as above.
    // yield takeEvery(FETCHED_ALL_USERS, fetchAllUsersAsync);
    // yield takeEvery(POST_NEW_USER, postNewUserAsync);
}