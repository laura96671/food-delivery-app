package com.project.foodle.domain;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name="RESTAURANTS", schema="foodle")
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private Long id;

    @Column(name="restaurant_name", nullable = false)
    private String restaurant_name;

    @Column(name="description", nullable = false)
    private String description;

    @Column(name="menu", columnDefinition = "json")
    private String menu;

    @Column(name="genre", nullable = false)
    private String genre;

    @Column(name="cover_image")
    private String cover_image;

    @Column(name="address", nullable = false)
    private String address;

    @Column(name="latitude")
    private double latitude;

    @Column(name="longitude")
    private double longitude;

    @Column(name="geohash")
    private String geohash;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name="restaurant_id", referencedColumnName="id")
    private User user;

    public Restaurant() {

    }

    public Restaurant(Long id, String restaurant_name, String description, String menu, String genre, String cover_image, String address, double latitude, double longitude, String geohash, User user) {
        this.id = id;
        this.restaurant_name = restaurant_name;
        this.description = description;
        this.menu = menu;
        this.genre = genre;
        this.cover_image = cover_image;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.geohash = geohash;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRestaurant_name() {
        return restaurant_name;
    }

    public void setRestaurant_name(String restaurant_name) {
        this.restaurant_name = restaurant_name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getMenu() {
        return menu;
    }

    public void setMenu(String menu) {
        this.menu = menu;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public String getCover_image() {
        return cover_image;
    }

    public void setCover_image(String cover_image) {
        this.cover_image = cover_image;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getGeohash() {
        return geohash;
    }

    public void setGeohash(String geohash) {
        this.geohash = geohash;
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
        Restaurant that = (Restaurant) o;
        return Double.compare(that.latitude, latitude) == 0 && Double.compare(that.longitude, longitude) == 0 && Objects.equals(id, that.id) && restaurant_name.equals(that.restaurant_name) && description.equals(that.description) && menu.equals(that.menu) && genre.equals(that.genre) && cover_image.equals(that.cover_image) && address.equals(that.address) && geohash.equals(that.geohash) && user.equals(that.user);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, restaurant_name, description, menu, genre, cover_image, address, latitude, longitude, geohash, user);
    }

    @Override
    public String toString() {
        return "Restaurant{" +
                "id=" + id +
                ", restaurant_name='" + restaurant_name + '\'' +
                ", description='" + description + '\'' +
                ", menu='" + menu + '\'' +
                ", genre='" + genre + '\'' +
                ", cover_image='" + cover_image + '\'' +
                ", address='" + address + '\'' +
                ", latitude=" + latitude +
                ", longitude=" + longitude +
                ", geohash='" + geohash + '\'' +
                ", user=" + user +
                '}';
    }
}
