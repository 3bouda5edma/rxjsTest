import { setAPIStatus } from './app.action';
import { Appstate } from '../appstate';

describe('API Actions', () => {
  it('should create setAPIStatus action', () => {
    const apiStatus: Appstate = {apiStatus:'success',apiResponseMessage:'API call successful'};
    const action = setAPIStatus({ apiStatus });
    expect({ ...action }).toEqual({
      type: '[API] success or failure status',
      apiStatus
    });
  });
});
