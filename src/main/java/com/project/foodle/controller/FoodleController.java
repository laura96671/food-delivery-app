package com.project.foodle.controller;

import com.project.foodle.repository.RestaurantRepository;
import com.project.foodle.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

@RestController
public class FoodleController {
    private final RestaurantRepository restaurantRepository;
    private final UserRepository userRepository;

    public FoodleController(RestaurantRepository restaurantRepository, UserRepository userRepository) {
        this.restaurantRepository = restaurantRepository;
        this.userRepository = userRepository;
    }

}
