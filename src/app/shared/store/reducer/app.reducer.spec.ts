import { appReducer, initialState } from './app.reducer';
import { setAPIStatus } from '../action/app.action';
import { Appstate } from '../appstate';

describe('appReducer', () => {
  it('should return the default state', () => {
    const action = {} as any;
    const state = appReducer(undefined, action);

    expect(state).toBe(initialState);
  });

  it('should set the API status', () => {
    const apiStatus:Appstate = { apiStatus: 'success', apiResponseMessage: 'API call successful' };
    const action = setAPIStatus({apiStatus});
    const state = appReducer(initialState, action);

    expect(state.apiStatus).toBe(apiStatus.apiStatus);
    expect(state.apiResponseMessage).toBe(apiStatus.apiResponseMessage);
  });
});
