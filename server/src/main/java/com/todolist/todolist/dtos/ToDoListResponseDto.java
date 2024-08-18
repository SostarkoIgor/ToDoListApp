package com.todolist.todolist.dtos;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ToDoListResponseDto {
    private Integer id;
    private String listname;
    private List<TaskDto> tasks;
}
