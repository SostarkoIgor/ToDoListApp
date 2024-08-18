package com.todolist.todolist.controllers;

import com.todolist.todolist.auth.AuthenticationService;
import com.todolist.todolist.dtos.TaskDto;
import com.todolist.todolist.dtos.ToDoListCreateDto;
import com.todolist.todolist.dtos.ToDoListResponseDto;
import com.todolist.todolist.models.ToDoList;
import com.todolist.todolist.repos.ToDoListRepository;
import com.todolist.todolist.services.TaskService;
import com.todolist.todolist.services.ToDoListService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.security.web.authentication.Http403ForbiddenEntryPoint;
import org.springframework.web.bind.annotation.*;

import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("/api/todolist")
@AllArgsConstructor

public class ToDoListController {
    private final ToDoListService toDoListService;
    private final AuthenticationService authenticationService;
    private final TaskService taskService;
    @GetMapping("/{id}")
    public ResponseEntity<ToDoListResponseDto> getToDoList(@PathVariable Integer id) {
        ToDoList list=toDoListService.getById(id);
        if (list==null){
            return ResponseEntity.notFound().build();
        }
        if (list.getOwner()!=authenticationService.getCurrentlyLoggedInUser()){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok().body(ToDoListResponseDto.builder()
                .listname(list.getListName())
                .id(list.getId())
                .tasks(list.getTasks().stream().map((a)-> TaskDto.builder()
                        .iscompleted(a.isTaskCompleted())
                        .text(a.getTaskText())
                        .id(a.getId())
                        .build()).toList())
                .build());
    }

    @PostMapping
    public ResponseEntity<ToDoListCreateDto> createList(@RequestBody ToDoListCreateDto toDoListCreateDto){
        var list=toDoListService.createList(toDoListCreateDto.getListname(), authenticationService.getCurrentlyLoggedInUser());
        for (var l : toDoListCreateDto.getTasks()){
            taskService.addTask(l, list);
        }
        return ResponseEntity.ok(toDoListCreateDto);
    }


}
