package com.todolist.todolist.models;

import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Data
@ToString(exclude = {"owner", "tasks"})
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ToDoList {
    @Id
    @GeneratedValue
    private Integer id;
    @Column(unique = true)
    private String listName;

    private Date dateCreated;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "parentList", orphanRemoval = true, cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Task> tasks;
}
