package com.project.foodle.controller.web;

import com.project.foodle.domain.Restaurant;
import com.project.foodle.domain.User;
import com.project.foodle.repository.RestaurantRepository;
import com.project.foodle.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
public class LoginFormData {

    @Autowired
    private static UserRepository userRepository;
    private static RestaurantRepository restaurantRepository;

    public LoginFormData(UserRepository userRepository, RestaurantRepository restaurantRepository) {
        this.userRepository = userRepository;
        this.restaurantRepository = restaurantRepository;
    }

    @RequestMapping(value="getLoginInfo", method = RequestMethod.POST)
    @CrossOrigin
    public Map<User, User> getLoginFormData(@RequestBody Map<String, String> params) {

        String username = params.get("username");
        Map<User, User> loginData = userRepository.getUserInfo(username);

        return loginData;
    }

    @RequestMapping(value="getUserRestaurant", method = RequestMethod.POST)
    @CrossOrigin
    public Map<String, String> getRestaurantInfo(@RequestBody Map<String, String> params) {

        String username = params.get("username");

        List<User> userInfo = userRepository.findByUsername(username);
        Long restaurantId = userInfo.get(0).getId();

        Map<String, String> restaurantInfo = restaurantRepository.restaurantInfo(restaurantId);

        return restaurantInfo;

    }
}
