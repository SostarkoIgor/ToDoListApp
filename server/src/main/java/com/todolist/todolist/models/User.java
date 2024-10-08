package com.todolist.todolist.models;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Data
@ToString(exclude = {"toDoLists"})
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "_user")
public class User implements UserDetails {

    @Id
    @GeneratedValue
    private Integer id;

    @Column(unique = true)
    private String username_;

    @Column(unique = true)
    private String email;
    private String pass;
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<ToDoList> toDoLists;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return pass;
    }

    //getUsername

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public String getUsername(){
        return email;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
