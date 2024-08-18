package com.todolist.todolist.services;

import com.todolist.todolist.models.Task;
import com.todolist.todolist.models.ToDoList;
import com.todolist.todolist.repos.TaskRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

@Data
@AllArgsConstructor
@Service
public class TaskService {
    private final TaskRepository taskRepository;
    public Task addTask(String text, ToDoList list){
        Task task=Task.builder().taskText(text).parentList(list).build();
        taskRepository.save(task);
        return task;
    }
}
