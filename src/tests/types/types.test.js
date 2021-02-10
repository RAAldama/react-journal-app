import { types } from "../../types/types"

describe('tests on types.js', () => {
    
    test('should be the correct object', () => {

        expect(types).toEqual({
            login: '[Auth] Login',
            logout: '[Auth] Logout',
        
            uiSetError: '[Ui] SetError',
            uiRemoveError: '[Ui] RemoveError',
        
            uiStartLoading: '[UI] Start loading',
            uiFinishLoading: '[UI] Finish loading',
        
            notesAddNew: '[Notes] New note',
            notesActive: '[Notes] Set active note',
            notesLoad: '[Notes] Load notes',
            notesUpdated: '[Notes] Updated note',
            notesFileUrl: '[Notes] Updated image url',
            notesDelete: '[Notes] Delete note',
            notesLogOutClean: '[Notes] Logout cleaning',
        });
        
    })
    

})
