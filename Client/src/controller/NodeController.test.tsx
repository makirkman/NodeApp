import NodeController from "./NodeController" ;
import { INode } from "../model" ;

/* Get Nodes test constants */
const expectedGetNodes: Array<INode> = [
	{ name: "File Reader", location: "Source", isStreamable: true },
	{ name: "File Writer", location: "Source", isStreamable: false },
	{ name: "Jan Hus", location: "Bohemia", isStreamable: false },
	{ name: "Frederick II", location: "Sicily", isStreamable: true },
] ;
/* ------------------------ */

/* Add node test constants */
const nodeToAdd = { name: "Alexandros", location: "Pella", isStreamable: true } ;
const expectedAddNodes: Array<INode> = [
	...expectedGetNodes,
	nodeToAdd,
] ;
/* ----------------------- */

/* Delete node test constants */
const nodeToDelete = "5" ;
const expectedDeleteNodes: Array<INode> = expectedGetNodes ;
/* -------------------------- */

describe("Node Controller", () => {
	let nodes = new Array<INode>() ;
	const updateNodes = () => {nodes = nodeController.nodes} ;
	const nodeController = new NodeController(updateNodes) ;

	it("Should update nodes after getNodes", async () => {
		await nodeController.getNodes() ;
		expect(nodes).toEqual(expectedGetNodes) ;
	}) ;
	it("Should add a node after addNode", async () => {
		await nodeController.addNode(nodeToAdd) ;
		expect(nodes).toEqual(expectedAddNodes) ;
	}) ;
	it("Should delete a node after deleteNodes", async () => {
		await nodeController.deleteNode(nodeToDelete) ;
		expect(nodes).toEqual(expectedDeleteNodes) ;
	}) ;
})


export {}