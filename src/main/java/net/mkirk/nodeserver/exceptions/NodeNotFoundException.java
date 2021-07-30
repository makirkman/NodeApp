package net.mkirk.nodeserver.exceptions;

public class NodeNotFoundException extends RuntimeException {
	public NodeNotFoundException(Long id) {
		super("Could not find node " + id) ;
	}

}
