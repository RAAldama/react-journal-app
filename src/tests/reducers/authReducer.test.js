import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const user = {uid: 'sfhishdifnsikjnkj', displayName: 'Albus'};

describe('tests on the authReducer', () => {
    
    test('should return the default state', () => {
        const state = authReducer({}, {type: 'OwO'});
        expect(state).toEqual({});
    })

    test('should logged the user', () => {
        const state = authReducer({}, {type: types.login, payload: user});
        expect(state).toEqual({uid: user.uid, name: user.displayName});
    })

    test('should logged out', () => {
        const state = authReducer({user}, {type: types.logout});
        expect(state.uid).toBe(undefined);
    })
    
})
