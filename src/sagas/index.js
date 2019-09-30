import { all } from "redux-saga/effects";

import {
    watchDeleteUser,
    watchFetchAllUsers,
    watchPostNewUser,
    watchUpdateUser
} from "./usersSagas";

export function* rootSaga() {
    yield all([
        watchFetchAllUsers(),
        watchPostNewUser(),
        watchDeleteUser(),
        watchUpdateUser(),
    ]);
}