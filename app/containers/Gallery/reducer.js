/*
 *
 * Gallery reducer
 *
 */

import { fromJS } from 'immutable';
import {
  IMAGE_UPLOADED,
  IMAGE_DELETED
} from './constants';

const initialState = fromJS({images: []});

function galleryReducer(state = initialState, action) {
  switch (action.type) {
    case IMAGE_UPLOADED:
      return state.update('images', l => l.concat(action.images.map(img => ({file: img, galleryId: action.galleryId}))));
    case IMAGE_DELETED:
      return state.update('images', l => l.filter(img => img.file.id !== action.id));
    default:
      return state;
  }
}

export default galleryReducer;
