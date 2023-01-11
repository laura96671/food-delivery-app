package com.project.foodle.controller.web;

import com.project.foodle.domain.User;
import com.project.foodle.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
public class LoginFormData {

    @Autowired
    private static UserRepository userRepository;

    public LoginFormData(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @RequestMapping(value="getLoginInfo", method = RequestMethod.POST)
    @CrossOrigin
    public Map<User, User> getLoginFormData(@RequestBody Map<String, String> params) {

        String username = params.get("username");
        Map<User, User> loginData = userRepository.getUserInfo(username);

        return loginData;
    }
}
