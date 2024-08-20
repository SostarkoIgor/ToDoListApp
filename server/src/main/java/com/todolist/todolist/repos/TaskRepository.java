package com.todolist.todolist.repos;

import com.todolist.todolist.models.Task;
import com.todolist.todolist.models.ToDoList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    public List<Task> getTasksByParentList(ToDoList parentList);
}
