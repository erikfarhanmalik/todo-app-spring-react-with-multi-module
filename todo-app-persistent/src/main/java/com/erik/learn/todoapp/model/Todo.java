package com.erik.learn.todoapp.model;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.springframework.data.annotation.Id;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Todo {

	@Id
	private String id;
	@NotNull
	private String content;
	@NotNull
	private TodoStatus status;
}
