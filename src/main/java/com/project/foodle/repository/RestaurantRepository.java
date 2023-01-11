package com.project.foodle.repository;

import com.project.foodle.domain.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant, Long> {

    @Query(nativeQuery = true,
            value = "select * from restaurants where geohash like concat(:geohash,'%')")
    List<Restaurant> getParam(@Param("geohash") String geohash);
}