import { INode } from '../model'


/**
 * The expected format of a response from a getNodes call.
 */
interface IGetNodesResponseData {
	_embedded: {
		nodeList: INode[],
	},
	links: {
		[key: string]: {
			href: string
		}
	}
} ;

export default IGetNodesResponseData ;
export type { IGetNodesResponseData } ;