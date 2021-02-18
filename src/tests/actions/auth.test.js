import { login, logout } from "../../actions/auth"
import { types } from "../../types/types";

const uid = 'TESTING';
const displayName = 'Albus';

describe('tests on the auth actions', () => {
    
    test('should create the respective action, login and logout', () => {
        const loginAction = login(uid, displayName);
        const logoutAction = logout();

        expect(loginAction).toEqual({type: types.login, payload: {uid, displayName}});
        expect(logoutAction).toEqual({type: types.logout});
    })
    
})
