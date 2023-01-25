package com.project.foodle.controller.web;

import ch.hsr.geohash.GeoHash;
import com.project.foodle.domain.Restaurant;
import com.project.foodle.domain.User;
import com.project.foodle.repository.RestaurantRepository;
import com.project.foodle.repository.UserRepository;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Map;

@RestController
public class RestaurantSignUpFormData {

    private static RestaurantRepository restaurantRepository;
    private static UserRepository userRepository;

    public RestaurantSignUpFormData(RestaurantRepository restaurantRepository, UserRepository userRepository) {
        this.restaurantRepository = restaurantRepository;
        this.userRepository = userRepository;
    }

    @RequestMapping(value = "restaurantRegistrationInfo", method = RequestMethod.POST)
    @CrossOrigin
    @Transactional
    public Restaurant saveRestaurantInfo(@RequestBody Map<String, String> params) {

        String username = params.get("username");
        String restaurantName = params.get("restaurantName");
        String address = params.get("address");
        String genre = params.get("genre");
        String description = params.get("description");
        Double latitude = Double.valueOf(params.get("latitude"));
        Double longitude = Double.valueOf(params.get("longitude"));
        String defaultImage = "https://t3.ftcdn.net/jpg/03/24/73/92/360_F_324739203_keeq8udvv0P2h1MLYJ0GLSlTBagoXS48.jpg";

        GeoHash geohash = GeoHash.withCharacterPrecision(latitude, longitude, 9);
        String geoHashString = geohash.toBase32();

        List<User> users = userRepository.findByUsername(username);
        User restaurantId = users.get(0);

        Restaurant restaurant = new Restaurant(
                null,
                restaurantName,
                description,
                null,
                genre,
                defaultImage,
                address,
                latitude,
                longitude,
                geoHashString,
                restaurantId
        );
        restaurantRepository.save(restaurant);

        return restaurant;

    }
}
