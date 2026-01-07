package org.example.backendi.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class CustomerInfo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String RestaurantName;
    String RestaurantPhoneNumber;
    String name;
    String PhoneNumber;
    String Address;
    String status;
}
