package net.mkirk.nodeserver ;

import java.util.List;
import java.util.stream.Collectors;

import net.mkirk.nodeserver.exceptions.NodeNotFoundException;
import net.mkirk.nodeserver.model.NodeModelAssembler;
import org.springframework.hateoas.CollectionModel;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import net.mkirk.nodeserver.model.Node ;
import net.mkirk.nodeserver.model.NodeRepository ;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;


/**
 * Controller for accessing the NodeRepository through HTTP methods.
 */
@RestController
@RequestMapping("/nodes")
@CrossOrigin
public class NodeController {

	/** The repository this Controller is a gateway to. */
	private final NodeRepository repository ;
	/** An assembler for converting Nodes from the repository into RESTful objects. */
	private final NodeModelAssembler assembler ;

	NodeController(NodeRepository repository, NodeModelAssembler assembler) {
		this.repository = repository ;
		this.assembler = assembler ;
	}

	/**
	 * Aggregate Root.
	 * Returns a collection of Node resources, made up of all stored Node objects from the database, assembled into
	 *  models.
	 * @return CollectionModel of Nodes
	 */
	@GetMapping
	public CollectionModel<EntityModel<Node>> all() {
		// gather all Nodes from the repository and wrap them in RESTful models
		List<EntityModel<Node>> nodes = this.repository.findAll().stream()
			.map(this.assembler::toModel)
			.collect(Collectors.toList()) ;

		return CollectionModel.of(nodes,
			linkTo(methodOn(NodeController.class).all()).withSelfRel()
		) ;
	}

	/**
	 * Adds a new node to the repository with the given details.
	 * @param newNode The node to add to the repository
	 * @return A ResponseModel representing the added node
	 */
	@PostMapping
	ResponseEntity<?> newNode(@RequestBody Node newNode) {
		// save the new node into our repository, and prepare the response as a RESTful model
		EntityModel<Node> entityModel = this.assembler.toModel(this.repository.save(newNode)) ;

		// return the model with an HTTP 201 response and the model's self link as the Location header
		return ResponseEntity
			.created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
			.body(entityModel) ;
	}

	/**
	 * Returns the node in the repository with the given id. Throws an exception if the node does not exist.
	 * @param id The node to search for in the repository
	 * @return A ResponseModel representing the found node
	 */
	@GetMapping("/{id}")
	public EntityModel<Node> one(@PathVariable Long id) {
		Node node = this.repository.findById(id)
			.orElseThrow(() -> new NodeNotFoundException(id)) ;

		// return the found Node wrapped in a RESTful model
		return this.assembler.toModel(node) ;
	}

	/**
	 * Overwrites a node at a given id with a new node.
	 * @param newNode The new node to store at the givenn id
	 * @param id The id of the node to replace
	 * @return A ResponseModel representing the stored node
	 */
	@PutMapping("/{id}")
	ResponseEntity<?> replaceNode(@RequestBody Node newNode, @PathVariable Long id) {
		// update the node in the repository and store the repository response
		Node updatedNode = this.repository.findById(id)
			.map(node -> {
				node.setName(newNode.getName()) ;
				node.setLocation(newNode.getLocation()) ;
				node.setIsStreamable(newNode.getIsStreamable()) ;

				return this.repository.save(node) ;
			})
			.orElseGet(() -> {
				newNode.setId(id) ;
				// FIX: if you delete a node and try to PUT to that id again, this call behaves like a POST and just stores it with a new id
				//  different to the id in newNode - on research this seems to be a JPA bug as it occurs also with a default springboot controller
				return this.repository.save(newNode) ;
			}) ;

		// return the response as a model, with an HTTP 201 response and the model's self link as the Location header
		EntityModel<Node> entityModel = this.assembler.toModel(updatedNode) ;

		return ResponseEntity
			.created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
			.body(entityModel) ;
	}

	/**
	 * Deletes a Node with the given id from the repository, and returns an HTTP 204 no content message.
	 * @param id The id of the node to delete
	 * @return An empty HTTP message indicating success
	 */
	@DeleteMapping("/{id}")
	ResponseEntity<?> deleteNode(@PathVariable Long id) {
		// make sure the node exists
		if (!this.repository.existsById(id)) {
			throw new NodeNotFoundException(id) ;
		} ;
		this.repository.deleteById(id) ;
		return ResponseEntity.noContent().build() ;
	}
}
