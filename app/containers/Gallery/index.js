/*
 *
 * Gallery
 *
 */

// import 'react-image-gallery/styles/css/image-gallery.css';
import './gallery.scss';

// import ImageGallery from 'react-image-gallery';
import React from 'react';
import Dropzone from 'react-dropzone';
import { connect } from 'react-redux';
import { getGallery } from './selectors';
import Lightbox from 'react-image-lightbox';
import { imageUploaded, imageDeleted } from './actions';
import GalleryThumbnail from 'components/GalleryThumbnail';
import messages from './messages';
import { Link } from 'react-router';
import { injectIntl, intlShape } from 'react-intl';
import { groupBy, mapValues } from 'lodash';

const classNames = require('classnames');

const galleryIds = [
  'one', 'two', 'three',
];

const DEFAULT_GALLERY_ID = galleryIds[0];

export class Gallery extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      imageIndex: 0
    }
  }
  onDrop = (acceptedFiles, rejectedFiles) => {
    this.props.onImageUpload(acceptedFiles, this.props.galleryId || DEFAULT_GALLERY_ID); // supposingly images
  };
  showImage = (i) => {
    this.setState({fullscreen: true, imageIndex: i});
  };
  onDeleteClick = (id) => {
    confirm(this.props.intl.formatMessage(messages.imageDeleteConfirm)) && this.props.onImageDelete(id);
  };
  render() {
    const { gallery: { images }, galleryId, intl } = this.props;
    const { imageIndex, fullscreen } = this.state;
    const imagesCountByGid = _.mapValues(_.groupBy(images, 'galleryId'), 'length');
    const currentImages = images
      .filter(i => !galleryId || i.galleryId === galleryId);
    const currentSrcs = currentImages.map(i => i.file.preview);
    return (
      <div className="gallery">
        <div className="gallery__tabs">{galleryIds.map(gid =>
          <Link
            className={classNames('gallery__tabs_item', {
              'gallery__tabs_item-active': gid === galleryId,
              'gallery__tabs_item-empty': !imagesCountByGid[gid]
            })}
            to={`/gallery/${gid}`}
            key={gid}>
            Gallery {gid}{imagesCountByGid[gid] ? ` (${imagesCountByGid[gid]})` : ''}
          </Link>)}
        </div>
        <div className="gallery__board">
          {currentImages
            .map((image, i) =>
              <div className="gallery__board_img">
                <a key={image.file.id} href="#" onClick={() => this.showImage(i)}>
                  <GalleryThumbnail id={image.file.id} src={image.file.preview} onDeleteClick={this.onDeleteClick}/>
                </a>
              </div>
            )}
        </div>
        {fullscreen && <Lightbox
          mainSrc={currentSrcs[imageIndex]}
          nextSrc={currentSrcs[(imageIndex + 1) % currentSrcs.length]}
          prevSrc={currentSrcs[(imageIndex + currentSrcs.length - 1) % currentSrcs.length]}

          onCloseRequest={() => this.setState({ fullscreen: false })}
          onMovePrevRequest={() => this.setState({
                                imageIndex: (imageIndex + currentSrcs.length - 1) % currentSrcs.length,
                            })}
          onMoveNextRequest={() => this.setState({
                                imageIndex: (imageIndex + 1) % currentSrcs.length,
                            })}
        />}
        <div className="gallery__border">
          <Dropzone onDrop={this.onDrop} className="gallery__dropzone">
            <i className="fa fa-camera fa-3x gallery__icon" />
            <div className="gallery__dropzone_text">{intl.formatMessage(messages.dragAndDropHere)}</div>
          </Dropzone>
        </div>
      </div>
    );
  }
}

Gallery.propTypes = {
  galleryId: React.PropTypes.string,
  intl: intlShape.isRequired,
  gallery: React.PropTypes.object.isRequired
};

const mapStateToProps = (state, props) => {
  return {
    gallery: getGallery(state, props),
    galleryId: props.routeParams.galleryId
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onImageUpload: (img, gid) => dispatch(imageUploaded(img, gid)),
    onImageDelete: (id) => dispatch(imageDeleted(id))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Gallery));
