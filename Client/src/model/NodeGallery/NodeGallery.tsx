import { useCallback, useEffect, useState } from "react" ;
import axios, { AxiosResponse } from "axios" ;
import { SourceNode, INode } from ".." ;
import INodeResponseData from "../INodeResponseData";
import NodeController from "../../controller/NodeController";

import './NodeGallery.css' ;

const getHashCode = (s: string) => s.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0) ;
const getNodeKey = (node: INode) => {
	return getHashCode(`${node.id}${node.name}${node.location}${node.isStreamable}${Date.now()}`) ;
}

/**
 * A Gallery component for displaying retrieved Nodes
 * @returns
 */
const NodeGallery = () => {
	/** The collection of nodes to display */
	const [ nodes, setNodes ] = useState(new Array<INode>()) ;

	const updateNodes = () => setNodes(nodeController.nodes) ;
	const nodeController = new NodeController(updateNodes) ;

	/* On component mount */
	useEffect(() => {
		nodeController.getNodes() ;
	}, []) ;

	const handleDeleteClick = async (nodeId: string) => {
		await nodeController.deleteNode(nodeId) ;
	}

	return (
		<div>
			<form>
				<label>
					<input type="text" name="name" />
				</label>
				<input type="button" name="button" />
			</form>
			<ul>
				{nodes.map(node => { return (
					<li key={getNodeKey(node)}>
						<SourceNode {...node}/>
						<button
							onClick={() => handleDeleteClick(node.id)}
						>Delete Node</button>
					</li>
				)})}
			</ul>
		</div>
	) ;
} ;

export default NodeGallery ;
export { NodeGallery } ;