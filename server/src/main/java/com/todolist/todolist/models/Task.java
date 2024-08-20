package com.todolist.todolist.models;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@ToString(exclude = "parentList")
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
