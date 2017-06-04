package kr.or.connect.todo.service;

import java.util.Collection;

import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.persistence.TodoDao;

import org.springframework.stereotype.Service;
import java.sql.Timestamp;

@Service
public class TodoService {
	private TodoDao dao; 
	
	public TodoService(TodoDao dao) {
		this.dao = dao;
	}
	
	public Todo create(String todo) {
		Todo newTodo = new Todo(todo, 0, new Timestamp(System.currentTimeMillis()));
		Integer id = dao.insert(newTodo);
		newTodo.setId(id);
		return newTodo;
	}
	
	public Collection<Todo> findAll() {
		return dao.selectAll();
	}
	
	public boolean update(Integer id) {
		int affected = dao.update(id);
		return affected == 1;
	}
	
	public int delete(Integer id) {
		int affected = dao.deleteById(id);
		return affected == 1 ? 1 : 0;
	}
	
	public int delete(){
        return dao.deleteCompleted();
    }
}
