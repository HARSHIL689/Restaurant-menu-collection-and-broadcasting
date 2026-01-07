package org.example.backendi.service;

import org.example.backendi.model.CustomerInfo;
import org.example.backendi.model.dto.orderRequest;
import org.example.backendi.repo.orderRepo;
import org.example.backendi.repo.orderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class orderService {

    @Autowired
    orderRepo orderRepo;
    @Autowired
    WhatsappClientApi wap;
    public void fetchorder(orderRequest orderRequest) {
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
                    orderRequest.PhoneNumber()
            );
        } catch (Exception e) {
            System.out.println("WhatsApp failed: " + e.getMessage());
        }
    }


}
