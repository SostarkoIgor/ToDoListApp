package com.todolist.todolist.repos;

import com.todolist.todolist.models.ToDoList;
import com.todolist.todolist.models.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ToDoListRepository extends JpaRepository<ToDoList, Integer> {
    public ToDoList getToDoListById(Integer id);

    public Page<ToDoList> findAllByOwnerAndListNameContainingIgnoreCase(User owner, String title, Pageable pageable);
}
