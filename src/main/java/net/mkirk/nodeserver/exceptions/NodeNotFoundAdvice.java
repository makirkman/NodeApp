package net.mkirk.nodeserver.exceptions ;

import org.springframework.http.HttpStatus ;
import org.springframework.web.bind.annotation.ControllerAdvice ;
import org.springframework.web.bind.annotation.ExceptionHandler ;
import org.springframework.web.bind.annotation.ResponseBody ;
import org.springframework.web.bind.annotation.ResponseStatus ;

/**
 * Responds to NodeNotFoundExceptions by returning a 404 with the error message, as a response body.
 */
@ControllerAdvice
public class NodeNotFoundAdvice {
	@ResponseBody
	@ExceptionHandler(NodeNotFoundException.class)
	@ResponseStatus(HttpStatus.NOT_FOUND)
	String nodeNotFoundHandler(NodeNotFoundException ex) {
		return ex.getMessage() ;
	}
}
