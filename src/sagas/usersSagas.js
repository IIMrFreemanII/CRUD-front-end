import {call, put, takeEvery, select} from "redux-saga/effects";
import {
    DELETE_USER,
    deleteUserFail,
    deleteUserStart,
    deleteUserSuccess,

    GET_ALL_USERS,
    getAllUsersFail,
    getAllUsersStart,
    getAllUsersSuccess,

    POST_NEW_USER,
    postNewUserFail,
    postNewUserStart,
    postNewUserSuccess,

    UPDATE_USER,
    updateUserFail,
    updateUserStart,
    updateUserSuccess
} from "../actions/usersActions";

import { getUsers } from "../selectors";

export function* watchFetchAllUsers() {
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

//=====================================================================

export function* watchPostNewUser() {
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

//=====================================================================

export function* watchDeleteUser() {
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

//=====================================================================

export function* watchUpdateUser() {
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