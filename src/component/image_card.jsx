/* image_card.jsx --- define a component to show image card
 *
 * Maintainer: Mephis Pheies ( MephistoMMM )
 * Email: mephistommm@gmail.com
 */

import React, { Component } from "react";

let baseStyle = {
  margin: "0 auto",
  padding: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};

export default class ImageCard extends Component {
  // ImageCard provide a component for show a image consisted by a background image
  // and a img image(or just a single image).

  constructor(props){
    super(props);
  }

  render() {

    let divStyle = Object.assign({}, baseStyle, this.props.style);

    if(this.props.background){
      divStyle.background = "url("+this.props.background+")";
    }

    let imgElement = undefined;

    if(this.props.image){
      imgElement = <img src={this.props.image} />;
    }

    return (
      <div style={{padding: this.props.padding}}>
        <div style={divStyle}>
          {imgElement}
        </div>
      </div>
    );
  }
}
ImageCard.propTypes = {
  style: React.PropTypes.object,
  background: React.PropTypes.string,
  image: React.PropTypes.string,
  padding: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number
  ])
};
ImageCard.defaultProps = {
  style: {},
  padding: 5
};

/* image_card.jsx ends here */
