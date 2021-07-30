package net.mkirk.nodeserver ;

import java.util.List;

import net.mkirk.nodeserver.exceptions.NodeNotFoundException;
import org.springframework.web.bind.annotation.DeleteMapping ;
import org.springframework.web.bind.annotation.GetMapping ;
import org.springframework.web.bind.annotation.PathVariable ;
import org.springframework.web.bind.annotation.PostMapping ;
import org.springframework.web.bind.annotation.PutMapping ;
import org.springframework.web.bind.annotation.RequestBody ;
import org.springframework.web.bind.annotation.RestController ;

import net.mkirk.nodeserver.model.Node ;
import net.mkirk.nodeserver.model.NodeRepository ;



@RestController
public class NodeController {
	private final NodeRepository repository ;

	NodeController(NodeRepository repository) {
		this.repository = repository ;
	}

	@GetMapping("/nodes")
	List<Node> all() {
		return repository.findAll() ;
	}

	@PostMapping("/nodes")
	Node newNode(@RequestBody Node newNode) {
		return repository.save(newNode) ;
	}

	@GetMapping("/nodes/{id}")
	Node one(@PathVariable Long id) {
		return repository.findById(id)
			.orElseThrow(() -> new NodeNotFoundException(id)) ;
	}

	@PutMapping("/nodes/{id}")
	Node replaceNode(@RequestBody Node newNode, @PathVariable Long id) {
		return repository.findById(id)
			.map(node -> {
				// TODO: Ignore empty fields from newNode
				node.setName(newNode.getName()) ;
				node.setLocation(newNode.getLocation()) ;
				node.setIsStreamable(newNode.isStreamable()) ;

				return repository.save(node) ;
			})
			.orElseGet(() -> {
				newNode.setId(id) ;
				return repository.save(newNode) ;
			}) ;
	}

	@DeleteMapping("/nodes/{id}")
	void deleteNode(@PathVariable Long id) {
		repository.deleteById(id) ;
	}
}
