package org.example.backendi.model.dto;
public record orderRequest(
        String restaurantName,
        String restaurantPhoneNumber,
        String address
) {}
