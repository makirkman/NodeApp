package net.mkirk.nodeserver.model ;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.* ;

import org.springframework.hateoas.EntityModel ;
import org.springframework.hateoas.server.RepresentationModelAssembler ;
import org.springframework.stereotype.Component ;

import net.mkirk.nodeserver.NodeController ;

/**
 * An Assembler to handle generating a RESTful model representation of a given Node object.
 */
@Component
public class NodeModelAssembler implements RepresentationModelAssembler<Node, EntityModel<Node>> {

	/** Converts a Node object from the database into a RESTful model-based Node. */
	@Override
	public EntityModel<Node> toModel(Node node) {
		return EntityModel.of(node,
			linkTo(methodOn(NodeController.class).one(node.getId())).withSelfRel(),
			linkTo(methodOn(NodeController.class).all()).withRel("nodes")
		) ;
	}
}
