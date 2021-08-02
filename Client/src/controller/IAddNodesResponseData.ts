import { INode } from '../model'

/**
 * The expected format of a response from an addNodes call.
 */
interface IAddNodesResponseData extends INode {
	links: {
		[key: string]: {
			href: string
		}
	}
} ;

export default IAddNodesResponseData ;
export type { IAddNodesResponseData } ;