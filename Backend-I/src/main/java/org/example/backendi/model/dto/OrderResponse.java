package org.example.backendi.model.dto;

import java.time.LocalDateTime;

public record OrderResponse(
        String restaurantName,
        int quantity,
        int pricePerItem,
        int totalAmount,
        LocalDateTime orderedAt
) {}
