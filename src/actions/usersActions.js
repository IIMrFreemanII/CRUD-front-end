import {call, put, takeEvery, all, select} from "redux-saga/effects";
import { getUsers } from "../selectors";

export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_ALL_USERS_START = 'GET_ALL_USERS_START';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAIL = 'GET_ALL_USERS_FAIL';

export const POST_NEW_USER_START = 'POST_NEW_USER_START';
export const POST_NEW_USER_SUCCESS = 'POST_NEW_USER_SUCCESS';
export const POST_NEW_USER_FAIL = 'POST_NEW_USER_FAIL';
export const POST_NEW_USER = 'POST_NEW_USER';

export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_START = 'DELETE_USER_START';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_START = 'UPDATE_USER_START';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

const getAllUsersStart = () => {
    return {
        type: GET_ALL_USERS_START,
    };
};

const getAllUsersSuccess = (data) => {
    return {
        type: GET_ALL_USERS_SUCCESS,
        users: data,
    };
};

const getAllUsersFail = (errorMessage) => {
    return {
        type: GET_ALL_USERS_FAIL,
        errorMessage
    };
};

export const getAllUsers = () => {
    return {
        type: GET_ALL_USERS,
    };
};

function* watchFetchAllUsers() {
    yield takeEvery(GET_ALL_USERS, fetchAllUsersAsync);
}

function* fetchAllUsersAsync() {
    try {
        yield put(getAllUsersStart());
        const usersData = yield call(() => {
            return fetch('https://localhost:5001/api/users')
                .then(res => res.json());
        });
        yield put(getAllUsersSuccess(usersData));
    } catch (error) {
        yield put(getAllUsersFail(error));
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

const postNewUserFail = (errorMessage) => {
    return {
        type: POST_NEW_USER_FAIL,
        errorMessage,
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

        // I get new user and add him to the users in the store.
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
        yield put(postNewUserFail(error));
    }
}

//====================================================================

const deleteUserStart = () => {
    return {
        type: DELETE_USER_START,
    }
};

const deleteUserSuccess = (usersWithoutDeletedUser) => {
    return {
        type: DELETE_USER_SUCCESS,
        usersWithoutDeletedUser,
    }
};

const deleteUserFail = (errorMessage) => {
    return {
        type: DELETE_USER_FAIL,
        errorMessage,
    }
};

export const deleteUser = (user) => {
    return {
        type: DELETE_USER,
        user,
    }
};

function* watchDeleteUser() {
    yield takeEvery(DELETE_USER, deleteUserAsync);
}

function* deleteUserAsync(action) {
    try {
        // users from state.
        const users = yield select(getUsers);
        // user from action.
        const userToDelete = yield action.user;
        // user index in state is in property tableData of the userToDelete.
        const userIndexInState = yield userToDelete.tableData.id;
        // delete user from state.
        yield users.splice(userIndexInState, 1);

        //uses id for deleting in API.
        const userId = yield action.user.id;

        yield put(deleteUserStart());

        // I get deleted user from API and delete him from the users in the store.
        yield call(() => {
            return fetch(`https://localhost:5001/api/users/${userId}`, {
                method: "DELETE",
            }).then(res => res.json());
        });
        yield put(deleteUserSuccess(users));
    } catch (error) {
        yield put(deleteUserFail(error));
    }
}

//====================================================================

export const updateUser = (updatedUser) => {
    return {
        type: UPDATE_USER,
        updatedUser,
    };
};

const updateUserStart = () => {
    return {
        type: UPDATE_USER_START,
    };
};

const updateUserSuccess = (usersWithUpdatedUser) => {
    return {
        type: UPDATE_USER_SUCCESS,
        usersWithUpdatedUser,
    };
};

const updateUserFail = (errorMessage) => {
    return {
        type: UPDATE_USER_FAIL,
        errorMessage,
    };
};

function* watchUpdateUser() {
    yield takeEvery(UPDATE_USER, updateUserAsync);
}

function* updateUserAsync(action) {
    try {
        const usersFromState = yield select(getUsers);
        const userIdInTableData = yield action.updatedUser.tableData.id;
        const {id, name, age} = yield action.updatedUser;
        const userToUpdate = yield {
            id,
            name,
            age,
        };
        const userToUpdateInJSON = yield JSON.stringify(userToUpdate);
        yield usersFromState[userIdInTableData] = userToUpdate;
        const allUsersWithUpdatedUser = yield usersFromState;

        yield put(updateUserStart());
        yield call(() => fetch('https://localhost:5001/api/users', {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: userToUpdateInJSON,
            }).then((response) => response.json())
        );
        yield put(updateUserSuccess(allUsersWithUpdatedUser));
    } catch (error) {
        yield put(updateUserFail(error));
    }
}

//====================================================================

export function* rootSaga() {
    yield all([
        watchFetchAllUsers(),
        watchPostNewUser(),
        watchDeleteUser(),
        watchUpdateUser(),
    ]);
    // It is the same as above.
    // yield takeEvery(GET_ALL_USERS, fetchAllUsersAsync);
    // yield takeEvery(POST_NEW_USER, postNewUserAsync);
}