package com.todolist.todolist.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ToDoListCreateDto {
    private String listname;
    private List<TaskDto> tasks;
}
