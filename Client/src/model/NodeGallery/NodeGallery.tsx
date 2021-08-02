import { useEffect, useState } from "react" ;
import { SourceNode, INode } from ".." ;
import NodeController from "../../controller/NodeController";

import './NodeGallery.css' ;
import AddNodeForm from "./AddNodeForm";

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

	/**
	 * A callback to update the gallery whenever the nodeController updates
	 *  its stored nodes.
	 */
	const updateNodes = () => setNodes(nodeController.nodes) ;
	const nodeController = new NodeController(updateNodes) ;

	/* On component mount */
	useEffect(() => {
		nodeController.getNodes() ;
	}, []) ;

	const handleAddNodeClick = async (node: INode) => {
		nodeController.addNode(node) ;
	}

	const handleDeleteNodeClick = async (nodeId: string) => {
		nodeController.deleteNode(nodeId) ;
	}

	return (
		<div>
			<h2>Add a Node:</h2>
			<AddNodeForm onClick={handleAddNodeClick} />

			<h2>Nodes Retrieved:</h2>
			<ul>
				{nodes.map(node => { return (
					<li key={getNodeKey(node)}>
						<SourceNode {...node}/>
						<button
							onClick={() => handleDeleteNodeClick(node.id!)}
						>Delete Node</button>
					</li>
				)})}
			</ul>
		</div>
	) ;
} ;

export default NodeGallery ;
export { NodeGallery } ;