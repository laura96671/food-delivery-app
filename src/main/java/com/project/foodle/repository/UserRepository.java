package com.project.foodle.repository;

import com.project.foodle.domain.Restaurant;
import com.project.foodle.domain.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface UserRepository extends JpaRepository<User, Long> {

    List<User> findByUsername(String username);
    List<User> findByEmail(String email);

    void deleteByUsername(String username);
    void deleteByEmail(String email);
    void deleteByPassword(String password);

    @Query(nativeQuery = true,
            value = "select * from users where username = :username")
    Map<User, User> getUserInfo(@Param("username") String username);
}
