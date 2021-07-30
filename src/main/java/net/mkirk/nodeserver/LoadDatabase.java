package net.mkirk.nodeserver;

import net.mkirk.nodeserver.model.Node;
import net.mkirk.nodeserver.model.NodeRepository;
import org.slf4j.Logger ;
import org.slf4j.LoggerFactory ;
import org.springframework.boot.CommandLineRunner ;
import org.springframework.context.annotation.Bean ;
import org.springframework.context.annotation.Configuration ;

@Configuration
public class LoadDatabase {

	private static final Logger log = LoggerFactory.getLogger(LoadDatabase.class) ;

	@Bean
	CommandLineRunner initDatabase(NodeRepository repository) {

		Node[] initialNodes = {
			new Node("File Reader", "Source", true),
			new Node("File Writer", "Source", false),
			new Node("Jan Hus", "Bohemia", false),
			new Node("Frederick II", "Sicily", true),
		} ;

		return args -> {
			for (Node node : initialNodes) {
				log.info("Preloading database: " + repository.save(node));
			}
		} ;
	}
}
