/*
 *
 * Gallery actions
 *
 */

import { isArray } from 'lodash';

import {
  IMAGE_UPLOADED,
  IMAGE_DELETED
} from './constants';

import { guid } from '../../utils/tools.js'

export function imageUploaded(images, galleryId) {
  return {
    type: IMAGE_UPLOADED,
    images: (isArray(images) ? images : [images]).map(img => ({...img, id: guid()})),
    galleryId
  };
}

export function imageDeleted(id) {
  return {
    type: IMAGE_DELETED,
    id
  }
}
