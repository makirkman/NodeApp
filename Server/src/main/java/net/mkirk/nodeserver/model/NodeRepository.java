package net.mkirk.nodeserver.model;

import org.springframework.data.jpa.repository.JpaRepository ;

public interface NodeRepository extends JpaRepository<Node, Long> {

}
