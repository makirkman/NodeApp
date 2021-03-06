import axios, { AxiosResponse } from "axios" ;
import { IGetNodesResponseData, INode } from "../model" ;
import IAddNodesResponseData from "./IAddNodesResponseData";

/**
 * Controls access to the Node collection - provides interface to access and
 *  alter nodes, and tells its delegate when updates have occurred.
 */
class NodeController {
	nodeUrl = "http://localhost:8080/nodes" ;
	// nodeUrl = `${process.env.REACT_APP_ROOT_URL!}/nodes` ;
	/** The collection of nodes gathered from the API. */
	nodes = new Array<INode>() ;

	/**
	 * A callback function to tell the instantiator that the nodes have been updated.
	 */
	updateNodes: () => void ;

	constructor(updateNodes: () => void) {
		this.updateNodes = updateNodes ;
	} ;

	/** Fetches stores and returns all available nodes. */
	getNodes = async () => {
		try {
			this.nodes = await axios.get(this.nodeUrl)
				.then((res:AxiosResponse<IGetNodesResponseData>) => {
					let resNodes = res.data._embedded.nodeList ;
					let newNodes = new Array<INode>() ;

					// clean up the response before saving as INodes (remove links)
					for (let i=0 ; i<resNodes.length ; i++) {
						newNodes.push({
							id: resNodes[i].id,
							name: resNodes[i].name,
							location: resNodes[i].location,
							isStreamable: resNodes[i].isStreamable,
						}) ;
					}
					return newNodes ;
				}) ;
		} catch (e) {
			console.log(e) ;
			this.nodes = [] ;
		} finally {
			this.updateNodes() ;
		} ;

		return this.nodes ;
	} ;

	/** Adds the given node. */
	addNode = async (node: INode) => {
		const links = await axios.post(this.nodeUrl, node)
			.then( (res: AxiosResponse<IAddNodesResponseData>) => {
				// return the links to the new node
				return res.data.links ;
			}) ;

		await this.getNodes() ;
		return links
	}

	/** Deletes a given node. */
	deleteNode = async (nodeId: string) => {
		await axios.delete(`${this.nodeUrl}/${nodeId}`) ;
		// do a separate get to make sure the deletion was successful in the backend
		await this.getNodes() ;
	} ;
} ;

export default NodeController ;

export { NodeController } ;