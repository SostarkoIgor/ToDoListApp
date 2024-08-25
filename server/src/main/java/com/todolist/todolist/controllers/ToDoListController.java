package com.todolist.todolist.controllers;

import com.todolist.todolist.auth.AuthenticationService;
import com.todolist.todolist.dtos.TaskDto;
import com.todolist.todolist.dtos.ToDoListCreateDto;
import com.todolist.todolist.dtos.ToDoListResponseDto;
import com.todolist.todolist.dtos.UserListDto;
import com.todolist.todolist.models.ToDoList;
import com.todolist.todolist.services.TaskService;
import com.todolist.todolist.services.ToDoListService;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Repository;
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
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
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
            taskService.addTask(l, list, false);
        }
        return ResponseEntity.ok(toDoListCreateDto);
    }

    @GetMapping("/user")
    public ResponseEntity<Page<UserListDto>> getUserLists(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "8") int size,
            @RequestParam(defaultValue = "") String title,
            @RequestParam(defaultValue = "desc") String order,
            @RequestParam(defaultValue = "date") String orderby
    ){
        var currentUser=authenticationService.getCurrentlyLoggedInUser();
        return ResponseEntity.ok(toDoListService.findAllListsOfUser(currentUser, page, size, title, order, orderby));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteList(@PathVariable int id){
        var list= toDoListService.getById(id);
        if (list==null) return ResponseEntity.notFound().build();
        if (!authenticationService.getCurrentlyLoggedInUser().getId().equals(list.getOwner().getId())){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        toDoListService.deleteListById(list.getId());
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping
    public ResponseEntity<ToDoListResponseDto> updateList(@RequestBody ToDoListResponseDto listDto){
        var list=toDoListService.getById(listDto.getId());
        if (list==null) return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        if (!list.getOwner().getId().equals(authenticationService.getCurrentlyLoggedInUser().getId())){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
        list.setListName(listDto.getListname());
        taskService.updateListTasks(list, listDto.getTasks());
        toDoListService.saveList(list);
        return ResponseEntity.ok(listDto);
    }

}
