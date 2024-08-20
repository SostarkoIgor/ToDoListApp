package com.todolist.todolist.services;

import com.todolist.todolist.dtos.TaskDto;
import com.todolist.todolist.models.Task;
import com.todolist.todolist.models.ToDoList;
import com.todolist.todolist.repos.TaskRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Data
@AllArgsConstructor
@Service
public class TaskService {
    private final TaskRepository taskRepository;
    public Task addTask(String text, ToDoList list, Boolean completed){
        Task task=Task.builder().taskText(text).parentList(list).taskCompleted(completed).build();
        taskRepository.save(task);
        return task;
    }

    public void updateTask(TaskDto taskDto, ToDoList list){
        var task=taskRepository.findById(taskDto.getId());
        if (task.isEmpty() || !task.get().getParentList().getId().equals(list.getId())) return;
        var taskobj=task.get();
        taskobj.setTaskCompleted(taskDto.isIscompleted());
        taskobj.setTaskText(taskDto.getText());
        taskRepository.save(taskobj);
    }

    public void updateListTasks(ToDoList list, List<TaskDto> taskDtos){
        var listTasks= getListTasks(list).stream().map(Task::getId).toList();
        for (var task : taskDtos) {
            if (listTasks.contains(task.getId())){
                updateTask(task, list);
            }else{
                addTask(task.getText(), list, task.isIscompleted());
            }
        }
        var remainingtasks=taskDtos.stream().map(TaskDto::getId).toList();
        for (var task : listTasks){
            if (!remainingtasks.contains(task)){
                taskRepository.deleteById(task);
            }
        }
    }

    public List<Task> getListTasks(ToDoList list){
        return taskRepository.getTasksByParentList(list);
    }
}
