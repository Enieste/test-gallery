import React from 'react';
import Helmet from 'react-helmet';

import Gallery from '../Gallery';

export default class GalleryPage extends React.Component { // eslint-disable-line react/prefer-stateless-function

  render() {
    return (
      <div>
        <Helmet
          title="Gallery Page"
          meta={[
            { name: 'description', content: 'Gallery page' },
          ]}
        />
        <Gallery {...this.props} />
      </div>
    );
  }
}
