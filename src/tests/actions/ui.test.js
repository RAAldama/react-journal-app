import { removeError, setError, uiFinishLoading, uiStartLoading } from "../../actions/ui"
import { types } from "../../types/types";

describe('tests on the ui-actions', () => {
    
    test('should function all sync actions', () => {      
        const errorAction = setError('AIUDA!');
        const removeAction = removeError();
        const uiStartAction = uiStartLoading();
        const uiFinishAction = uiFinishLoading();

        expect(errorAction).toEqual({type: types.uiSetError, payload: 'AIUDA!'});
        expect(removeAction).toEqual({type: types.uiRemoveError});
        expect(uiStartAction).toEqual({type: types.uiStartLoading});
        expect(uiFinishAction).toEqual({type: types.uiFinishLoading});
    })
    
})
