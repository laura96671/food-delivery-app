package com.project.foodle.repository;

import com.project.foodle.domain.Restaurant;
import com.project.foodle.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Map;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    @Query(nativeQuery = true,
            value = "select * from restaurants where geohash like concat(:geohash,'%')")
    List<Restaurant> getParam(@Param("geohash") String geohash);

    @Query(nativeQuery = true,
            value = "select u.username, r.restaurant_name, r.genre, r.address " +
                    "from restaurants r right join users u on r.restaurant_id=u.id where u.id=:id")
    Map<String, String> restaurantInfo(@Param("id") Long id);
}