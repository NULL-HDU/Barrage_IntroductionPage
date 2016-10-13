/*a frame for two column layout
*author:luchenjieLcj
*email:luchenjiemail@gmail.com
*/

import React,{Component} from "react";
import AppCss from "../app.css"

let rightStyle = {
	width:"352px",
	height:"348px",
	marginLeft:"-2px",
	display:"inline-block"
}

export default class Content extends Component {
	
	constructor(props){
		super(props);
	}

	render() {
		return(
			<div style={this.props.style}>
				<div style={{width:"648px",float:"left",display:"inline-block"}}>
					{this.props.children[0]}
				</div>
				<div style={rightStyle}>
					{this.props.children[1]}
				</div>
			</div>
		)
	}

}