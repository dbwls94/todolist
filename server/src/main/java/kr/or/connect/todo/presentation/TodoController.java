package kr.or.connect.todo.presentation;

import java.util.Collection;

import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.service.TodoService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/todo") //common
public class TodoController {
	private final TodoService service; //TodoService를 주입받음
	private final Logger log = LoggerFactory.getLogger(TodoController.class);
	
	@Autowired
	public TodoController(TodoService service) {
		this.service = service;
	}
	
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	Todo create(@RequestBody String todo) {
		String ntodo = todo.substring(0, todo.length()-1);
		return service.create(ntodo);
	}
	
	@GetMapping
	Collection<Todo> get(){
        return service.findAll();
    }

}
