/* golden_frame.jsx --- a frame sliced to two contains by golden ratio.
 *
 * Maintainer: Mephis Pheies ( MephistoMMM )
 * Email: mephistommm@gmail.com
 */

import React, { Component } from "react";

let baseStyle = {
  margin: 0,
  padding: 0,
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  flexFlow: "column"
};

let childBaseStyle = {
  margin: 0,
  padding: 0
};

export default class GoldenFrame extends Component {
  // GoldenFrame is a frame component, this component wraps two children, and its children
  // will be made up by golden ratio.
  //
  // props:
  // - flow: "column" or "row", this defines orient of GoldenFrame slicing container
  //         [default: "column"]
  // - reverse: By default, the ratio of the first part is 0.618 and that of the second is
  //         0.382. But you could set 'reverse' true to reverse ratioes.

  constructor(props){
    super(props);
  }

  render() {
    let goldenFrameStyle = Object.assign({}, baseStyle, this.props.style);
    goldenFrameStyle["flexFlow"] = this.props.flow === "column" ? "column": "row" ;

    let firstChildRatio = this.props.reverse ?  1 - 0.618 : 0.618;
    let firstChildStyle = Object.assign({}, childBaseStyle, {flexGrow: firstChildRatio});
    let secondChildStyle = Object.assign({}, childBaseStyle, {flexGrow: 1 - firstChildRatio});

    return (
      <div style={goldenFrameStyle}>{/* golden frame */}
        <div style={firstChildStyle}>{/* child 1 */}
          {this.props.children[0]}
        </div>
        <div style={secondChildStyle}>{/* child 2 */}
          {this.props.children[1]}
        </div>
      </div>
    );
  }
}
GoldenFrame.propTypes = {
  style: React.PropTypes.object,
  flow: React.PropTypes.string,
  reverse: React.PropTypes.bool
};
GoldenFrame.defaultProps = {
  style: {},
  flow: "column",
  reverse: false,
};



/* golden_frame.jsx ends here */
