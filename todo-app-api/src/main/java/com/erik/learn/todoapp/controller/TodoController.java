package com.erik.learn.todoapp.controller;

import com.erik.learn.todoapp.model.Todo;
import com.erik.learn.todoapp.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:8000")
public class TodoController {

	private final TodoRepository todoRepository;

	@GetMapping
	public List<Todo> getTodoList() {

		return todoRepository.findAll();
	}

	@GetMapping("/{id}")
	public Todo getTodo(@PathVariable("id") String id) {

		return todoRepository.findById(id).orElseThrow(ResourceNotFoundException::new);
	}

	@PostMapping
	public ResponseEntity<Todo> createTodo(@RequestBody Todo todo) {
		Todo savedTodo = todoRepository.save(todo);
		return new ResponseEntity<>(savedTodo, HttpStatus.CREATED);
	}

	@PutMapping("/{id}")
	public Todo updateTodo(@PathVariable("id") String id, @RequestBody Todo todo) {
		todo.setId(id);
		return todoRepository.save(todo);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity deleteTodo(@PathVariable("id") String id) {

		todoRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
