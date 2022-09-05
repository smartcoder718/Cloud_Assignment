import * as actionTyes from "./Actions/types"

const initialValues = {
    addUser: { profile_pic: null, name: '', email: '', gender: '', birthday: '' }
}

function rootReducer(state = initialValues, action) {
    switch (action.type) {
        case actionTyes.USER_ADDED:

            console.log('here is redux store', action.payload)
            return {
                addUser: action.payload
            }

        default:
            return state;
    }
}

export default rootReducer;