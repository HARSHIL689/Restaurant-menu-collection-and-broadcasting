package org.example.backendi.service;


import org.example.backendi.model.Restaurant;
import org.example.backendi.model.dto.RestaurantRequest;
import org.example.backendi.repo.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    RestaurantRepository restaurantRepository;

    public ResponseEntity<?> addRestaurant(RestaurantRequest restaurantRequest) {
        Restaurant restaurant = new Restaurant();
        restaurant.setRestaurantName(restaurantRequest.RestaurantName());
        restaurant.setName(restaurantRequest.name());
        restaurant.setPhone(restaurantRequest.Phone());
        restaurantRepository.save(restaurant);
        return ResponseEntity.ok().build();
    }
}
