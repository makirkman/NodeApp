package net.mkirk.nodeserver;

import net.mkirk.nodeserver.model.Node;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class NodeTests {


	@Test
	void nodesMatch() {
		Node nodeOne = new Node("Frederick II", "Sicily", true) ;
		Node nodeTwo = new Node("Frederick II", "Sicily", true) ;

		assertThat(nodeOne).isEqualTo(nodeTwo) ;
	}
}
