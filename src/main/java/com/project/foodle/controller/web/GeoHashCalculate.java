package com.project.foodle.controller.web;

import ch.hsr.geohash.GeoHash;
import com.project.foodle.domain.Restaurant;
import com.project.foodle.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.*;


@RestController
//@CrossOrigin(origins = "*", allowedHeaders = "*")
public class GeoHashCalculate {

    @Autowired
    private static RestaurantRepository restaurantRepository;

    public GeoHashCalculate(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    @RequestMapping(value = "/addGeohash", method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
    @CrossOrigin
    public List<Restaurant> addItems(@RequestBody Map<String, Double> items) {

        Double latitude = items.get("lat");
        Double longitude = items.get("lng");

        return geoHashCalculation(latitude, longitude);
    }

    @GetMapping(value="/getGeohash")
    public List<Restaurant> geoHashCalculation(Double latitude, Double longitude) {
        List<String> restaurantName = new ArrayList<>();

        GeoHash geohash = GeoHash.withCharacterPrecision(latitude, longitude, 9);
        String geoHashString = geohash.toBase32();
        System.out.println("geohash string is "+geoHashString);

        List<String> geoHashes = new ArrayList<String>();
        geoHashes.add(geoHashString);

        /*
        GeoHash length - Grid Area width x height
        1   ≤ 5,000km X 5,000 Km
        2   ≤ 1,250km X 625km
        3   ≤ 156km X 156km
        4	≤ 39.1km X 19.5km
        5	≤ 4.89km X 4.89km
        6	≤ 1.22km X 0.61km
        7	≤ 153m X 153m
        8	≤ 38.2m X 19.1m
        9	≤ 4.77m X 4.77m
        10	≤ 1.19m X 0.596m
        11	≤ 149mm X 149mm
        12	≤ 37.2mm X 18.6mm
        */

        List<Restaurant> coords = restaurantRepository.getParam(geoHashString.substring(0,5));
        System.out.println("coords are"+coords);
        for(Restaurant x:coords) {
            String restaurant = x.getRestaurant_name();
            String genre = x.getGenre();
            restaurantName.add(restaurant);
        }
        return coords;
    }
}

// The function must return a json with restaurant_name, genre, description, menu and price
