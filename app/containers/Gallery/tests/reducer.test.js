import expect from 'expect';
import galleryReducer from '../reducer';
import { fromJS } from 'immutable';

describe('galleryReducer', () => {
  it('returns the initial state', () => {
    expect(galleryReducer(undefined, {})).toEqual(fromJS({}));
  });
});
