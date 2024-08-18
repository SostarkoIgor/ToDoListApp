package com.todolist.todolist.models;

import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ToDoList {
    @Id
    @GeneratedValue
    private Integer id;
    @Column(unique = true)
    private String listName;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany(mappedBy = "parentList", orphanRemoval = true, cascade = CascadeType.ALL)
    private List<Task> tasks;
}
