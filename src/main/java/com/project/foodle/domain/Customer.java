package com.project.foodle.domain;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name="CUSTOMERS", schema="foodle")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ID", nullable = true)
    private Long ID;

    @Column(name="name", nullable = false)
    private String name;

    @Column(name="surname", nullable = false)
    private String surname;

    @Column(name="phone")
    private String phone;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    public Customer() {

    }

    public Customer(Long ID, String name, String surname, String phone, User user) {
        this.ID = ID;
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.user = user;
    }

    public Long getId() {
        return ID;
    }

    public void setId(Long id) {
        this.ID = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Customer customer = (Customer) o;
        return Objects.equals(ID, customer.ID) && name.equals(customer.name) && surname.equals(customer.surname) && phone.equals(customer.phone) && user.equals(customer.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(ID, name, surname, phone, user);
    }

    @Override
    public String toString() {
        return "Customer{" +
                "ID=" + ID +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", phone='" + phone + '\'' +
                ", user=" + user +
                '}';
    }
}
