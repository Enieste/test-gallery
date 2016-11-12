import styled from 'styled-components';
import React from 'react';

const Img = styled.img`
  max-width: 100%;
  cursor: pointer;
`;

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const DeleteLink = styled.div`
  opacity: 0.4;
  display: block;
  position: absolute;
  top: 0px;
  right: 8px;
  &:hover {
    opacity: 0.5;
  }
`;

const DeleteButton = (props) => {
  return <DeleteLink {...props}>
    <span className="fa-stack" style={{width: '1em', height: '1em', lineHeight: '1em'}}>
      <i className="fa fa-circle fa-lg fa-stack-1x" style={{color: 'white'}}/>
      <i className="fa fa-times-circle fa-lg fa-stack-1x" style={{color: 'black'}}/>
    </span>

  </DeleteLink>;
};

class GalleryThumbnail extends React.Component {
  onDeleteClick = (e) => {
    const { onDeleteClick, id } = this.props;
    e.stopPropagation();
    e.preventDefault();
    onDeleteClick(id);
  };
  render() {
    const { src } = this.props;
    return <Wrapper><Img src={src}/><DeleteButton onClick={this.onDeleteClick}/></Wrapper>;
  }
}

export default GalleryThumbnail;
