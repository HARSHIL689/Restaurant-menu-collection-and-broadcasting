package org.example.backendi.model.dto;

import java.time.LocalDateTime;

public record MenuResponse (
        String phoneNumber,
        String message,
        int price,
        LocalDateTime createdDate,
        String RestaurantName,
        int limit,
        int orderCount
){}
