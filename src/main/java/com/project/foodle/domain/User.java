package com.project.foodle.domain;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name="USERS", schema="foodle")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id", nullable = true)
    private Long id;

    @Column(name="username", nullable = false)
    private String username;

    @Column(name="password", nullable = false)
    private String password;

    @Column(name="email")
    private String email;

    @Column(name="type", nullable = false)
    private String type;

    public User() {

    }

    public User(Long id, String username, String password, String email, String type) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.type = type;
    }

    public Long getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public String getEmail() {
        return email;
    }

    public String getType() {
        return type;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return id.equals(user.id) && username.equals(user.username) && password.equals(user.password) && email.equals(user.email) && type.equals(user.type);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, password, email, type);
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", type='" + type + '\'' +
                '}';
    }
}


