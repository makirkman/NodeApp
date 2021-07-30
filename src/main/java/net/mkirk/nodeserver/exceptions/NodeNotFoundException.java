package net.mkirk.nodeserver.exceptions;

/**
 * Reflects that a node matching a given id does not exist in the database - though it was expected to.
 */
public class NodeNotFoundException extends RuntimeException {
	public NodeNotFoundException(Long id) {
		super("Could not find node " + id) ;
	}

}
