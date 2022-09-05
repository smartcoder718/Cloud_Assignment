import * as actionTypes from "./types";

export function USER_ADDED(user) {
    return {
        type: actionTypes.USER_ADDED,
        payload: user
    }
}