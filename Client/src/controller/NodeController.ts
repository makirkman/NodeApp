import axios, { AxiosResponse } from "axios" ;
import React, { useState } from "react";
import { INodeResponseData, INode } from "../model" ;


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
				.then((res:AxiosResponse<INodeResponseData>) => {
					return res.data._embedded.nodeList ;
				}) ;
		} catch (e) {
			console.log(e) ;
			this.nodes = [] ;
		} finally {
			this.updateNodes() ;
		} ;

		return this.nodes ;
	} ;
	/** Deletes a given node. */
	deleteNode = async (nodeId: string) => {
		await axios.delete(`${this.nodeUrl}/${nodeId}`) ;
		// do a separate get to make sure the deletion was successful in the backend
		await this.getNodes() ;
		this.updateNodes() ;
	} ;
} ;

export default NodeController ;

export { NodeController } ;