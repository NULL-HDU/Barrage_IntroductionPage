/*
*a frame to write a nav and feet
*author:yummyLcj
*email:luchenjiemail@gmail.com
*/

import React,{ Component } from "react";

let leftLetter = {
	color:"white",
	margin : 0,
	padding :0,
	float : "left",
	fontSize : 24,
	height : "28px"
}

let rightLetter = {
	color:"white",
	margin : 0,
	padding : 0,
	float : "right",
	fontSize : 24,
	height : "28px"
}

let totle = {
	height:"20px",
	width:"100%",
	display:"flex",
	alignItems:"center"
}

export default class BothEnd extends Component {
	constructor(props){
		super(props);
	}

	render() {

		let totleStyle = Object.assign({},totle,this.props.style);

		return (
			<div style={totleStyle}>
				<div style={{height:28+"px",marginRight:15,display:"flex",flex:"auto",justifyContent:"space-between"}}>
					<div style={leftLetter}>
						{this.props.children[0]}
					</div>
					<div style={rightLetter}>
						{this.props.children[1]}
					</div>
				</div>
				<div style={{Height:28+"px",float:"right",display:"flex"}}>
					{this.props.children[2]}
				</div>
			</div>
		)
	}
}