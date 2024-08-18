package com.todolist.todolist.repos;

import com.todolist.todolist.models.ToDoList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ToDoListRepository extends JpaRepository<ToDoList, Integer> {
    public ToDoList getToDoListsById(Integer id);
}
