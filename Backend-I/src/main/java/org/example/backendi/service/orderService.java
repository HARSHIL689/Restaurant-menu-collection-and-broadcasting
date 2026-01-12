package org.example.backendi.service;

import org.example.backendi.model.CustomerInfo;
import org.example.backendi.model.MenuStore;
import org.example.backendi.model.Restaurant;
import org.example.backendi.model.dto.orderRequest;
import org.example.backendi.repo.MenuStoreRepository;
import org.example.backendi.repo.RestaurantRepository;
import org.example.backendi.repo.orderRepo;
import org.example.backendi.repo.orderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class orderService {

    @Autowired
    orderRepo orderRepo;
    @Autowired
    WhatsappClientApi wap;
    @Autowired
    MenuStoreRepository menuStoreRepository;
    int previouscount=0;
    int newcount=0;
    public void fetchorder(orderRequest orderRequest) {
        MenuStore mn=menuStoreRepository.findById(orderRequest.RestaurantPhoneNumber()).orElse(null);
        CustomerInfo customerInfo = new CustomerInfo();
        customerInfo.setPhoneNumber(orderRequest.PhoneNumber());
        customerInfo.setAddress(orderRequest.Address());
        customerInfo.setName(orderRequest.name());
        customerInfo.setRestaurantName(orderRequest.RestaurantName());
        customerInfo.setRestaurantPhoneNumber(orderRequest.RestaurantPhoneNumber());
        orderRepo.save(customerInfo);

        try {
            wap.sendOrderMessage(
                    orderRequest.RestaurantPhoneNumber(),
                    orderRequest.name(),
                    orderRequest.PhoneNumber(),
                    orderRequest.Address(),
                    newcount
            );
        } catch (Exception e) {
            System.out.println("WhatsApp failed: " + e.getMessage());
        }
    }


}