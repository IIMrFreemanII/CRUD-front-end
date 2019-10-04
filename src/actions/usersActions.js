export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_ALL_USERS_START = 'GET_ALL_USERS_START';
export const GET_ALL_USERS_SUCCESS = 'GET_ALL_USERS_SUCCESS';
export const GET_ALL_USERS_FAIL = 'GET_ALL_USERS_FAIL';

export const POST_NEW_USER = 'POST_NEW_USER';
export const POST_NEW_USER_START = 'POST_NEW_USER_START';
export const POST_NEW_USER_SUCCESS = 'POST_NEW_USER_SUCCESS';
export const POST_NEW_USER_FAIL = 'POST_NEW_USER_FAIL';

export const DELETE_USER = 'DELETE_USER';
export const DELETE_USER_START = 'DELETE_USER_START';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';

export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_USER_START = 'UPDATE_USER_START';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAIL = 'UPDATE_USER_FAIL';

export const getAllUsersStart = () => {
    return {
        type: GET_ALL_USERS_START,
    };
};
export const getAllUsersSuccess = (data) => {
    return {
        type: GET_ALL_USERS_SUCCESS,
        users: data,
    };
};
export const getAllUsersFail = (errorMessage) => {
    return {
        type: GET_ALL_USERS_FAIL,
        errorMessage,
    };
};
export const getAllUsers = () => {
    return {
        type: GET_ALL_USERS,
    };
};

//====================================================================

export const postNewUserStart = () => {
    return {
        type: POST_NEW_USER_START,
    };
};
export const postNewUserSuccess = (newUser) => {
    return {
        type: POST_NEW_USER_SUCCESS,
        newUser,
    };
};
export const postNewUserFail = (errorMessage) => {
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



//====================================================================

export const deleteUserStart = () => {
    return {
        type: DELETE_USER_START,
    }
};
export const deleteUserSuccess = (usersWithoutDeletedUser) => {
    return {
        type: DELETE_USER_SUCCESS,
        usersWithoutDeletedUser,
    }
};
export const deleteUserFail = (errorMessage) => {
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

//====================================================================

export const updateUser = (updatedUser) => {
    return {
        type: UPDATE_USER,
        updatedUser,
    };
};
export const updateUserStart = () => {
    return {
        type: UPDATE_USER_START,
    };
};
export const updateUserSuccess = (usersWithUpdatedUser) => {
    return {
        type: UPDATE_USER_SUCCESS,
        usersWithUpdatedUser,
    };
};
export const updateUserFail = (errorMessage) => {
    return {
        type: UPDATE_USER_FAIL,
        errorMessage,
    };
};

//====================================================================