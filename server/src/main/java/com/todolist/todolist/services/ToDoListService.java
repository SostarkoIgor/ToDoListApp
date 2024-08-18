package com.todolist.todolist.services;

import com.todolist.todolist.models.Task;
import com.todolist.todolist.models.ToDoList;
import com.todolist.todolist.models.User;
import com.todolist.todolist.repos.ToDoListRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Data
@AllArgsConstructor
@Service
public class ToDoListService {
    private final ToDoListRepository toDoListRepository;
    public ToDoList createList(String listname, User user){
        ToDoList list=ToDoList.builder().listName(listname).owner(user).build();
        toDoListRepository.save(list);
        return list;
    }

    public ToDoList getById(Integer id){
        return toDoListRepository.getToDoListsById(id);
    }
}
