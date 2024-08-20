package com.todolist.todolist.services;

import com.todolist.todolist.dtos.UserListDto;
import com.todolist.todolist.models.ToDoList;
import com.todolist.todolist.models.User;
import com.todolist.todolist.repos.ToDoListRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Date;

@Data
@AllArgsConstructor
@Service
public class ToDoListService {
    private final ToDoListRepository toDoListRepository;
    public ToDoList createList(String listname, User user){
        ToDoList list=ToDoList.builder().listName(listname).owner(user).dateCreated(new Date(System.currentTimeMillis())).build();
        toDoListRepository.save(list);
        return list;
    }

    public ToDoList getById(Integer id){
        return toDoListRepository.getToDoListById(id);
    }

    public Page<UserListDto> findAllListsOfUser(User user, Pageable pageable){
        Page<ToDoList> page=toDoListRepository.findAllByOwnerOrderByDateCreated(user, pageable);
        var t=page.stream().map(a->new UserListDto(a.getId(), a.getListName(), a.getDateCreated())).toList();
        return new PageImpl<>(t, pageable, page.getTotalElements());
    }

    @Transactional
    public void deleteListById(Integer id) {
        toDoListRepository.deleteById(id);
    }

    @Transactional
    public void saveList(ToDoList list){
        toDoListRepository.save(list);
    }
}
