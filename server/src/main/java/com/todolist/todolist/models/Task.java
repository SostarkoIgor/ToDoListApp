package com.todolist.todolist.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Task {

    @Id
    @GeneratedValue
    private Integer id;

    private String taskText;

    private boolean taskCompleted=false;

    @JoinColumn(name = "parentList")
    @ManyToOne(fetch = FetchType.LAZY)
    private ToDoList parentList;
}
