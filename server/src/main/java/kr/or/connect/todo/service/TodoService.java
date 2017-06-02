package kr.or.connect.todo.service;

import java.util.Collection;

import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.persistence.TodoDao;

import org.springframework.stereotype.Service;

@Service
public class TodoService {
	private TodoDao dao; 
	
	public TodoService(TodoDao dao) {
		this.dao = dao;
	}
	
	public Todo create(String todo) {
		Todo newTodo = new Todo(todo, 0);
		Integer id = dao.insert(newTodo);
		newTodo.setId(id);
		return newTodo;
	}
	
	public Collection<Todo> findAll() {
		return dao.selectAll();
	}
}
