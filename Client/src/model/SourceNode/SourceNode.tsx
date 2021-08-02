// import React, { useState } from "react" ;
import SquareDisplay from "../SquareDisplay/SquareDisplay";

import './SourceNode.css' ;

export interface INode {
	id: string,
	name: string,
	location: string,
	isStreamable: boolean,
} ;

const SourceNode = ({
	name,
	location,
	isStreamable,
}: INode) => {

	return (
		<div className='Node'>
			<img
				className="NodeImage"
				src="https://hub.knime.com/site/png-icon/Node/*8Mn_4LtrzrbzyAti"
				alt="Node"
				height={100}
				width={100}
			/>
			<div className="NodeDetails">
				<p>{`Node / ${location}`}</p>
				<h3>{name}</h3>
				{isStreamable ? <SquareDisplay text="streamable" /> : null}
			</div>
		</div>
	) ;
} ;

export default SourceNode ;
export { SourceNode } ;