package net.mkirk.nodeserver.model;

import java.util.Objects ;
import javax.persistence.Entity ;
import javax.persistence.GeneratedValue ;
import javax.persistence.Id ;

/**
 * The primary entity this server is built to store.
 *  Represents a collection of information about one thing for the front-end to display.
 */
@Entity
public class Node {
	/** Primary key identifier of this node. */
	private @Id @GeneratedValue Long id ;
	/** The name of this node - its primary human-friendly identifier. */
	private String name ;
	/** Where this node comes from in the wider application. */
	private String location ;
	/** Whether this node can be streamed. */
	private boolean isStreamable ;

	// empty constructor for JPA
	public Node() {}

	public Node(String name, String location, boolean isStreamable) {
		this.name = name ;
		this.location = location ;
		this.isStreamable = isStreamable ;
	}

	/* Getters and Setters */
	public Long getId() {
		return this.id ;
	}
	public String getName() {
		return this.name ;
	}
	public String getLocation() {
		return this.location ;
	}
	public boolean getIsStreamable() {
		return this.isStreamable ;
	}

	public void setId(Long newId) {
		this.id = newId ;
	}
	public void setName(String newName) {
		this.name = newName ;
	}
	public void setLocation(String newLocation) {
		this.location = newLocation ;
	}
	public void setIsStreamable(boolean newIsStreamable) {
		this.isStreamable = newIsStreamable ;
	}
	/* ------------------- */

	/* Helper overrides */
	@Override
	public boolean equals(Object o) {
		if (this == o) {
			return true ;
		} else if (!(o instanceof Node)) {
			return false ;
		}

		Node otherNode = (Node) o ;
		return (
			Objects.equals(this.id, otherNode.id) &&
			Objects.equals(this.name, otherNode.name) &&
			Objects.equals(this.location, otherNode.location) &&
			Objects.equals(this.isStreamable, otherNode.isStreamable)
		) ;
	}

	@Override
	public int hashCode() {
		return Objects.hash(this.id, this.name, this.location, this.isStreamable);
	}

	@Override
	public String toString() {
		return "Node {" + "id=" + this.id + ", name='" + this.name + '\'' + ", location='" + this.location + '\'' + ", isStreamable='" + this.isStreamable + '\'' + '}';
	}
	/* ---------------- */
}
