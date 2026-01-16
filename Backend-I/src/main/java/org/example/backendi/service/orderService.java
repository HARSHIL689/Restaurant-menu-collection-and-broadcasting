package org.example.backendi.service;

import org.example.backendi.model.MenuStore;
import org.example.backendi.model.Order;
import org.example.backendi.model.User;
import org.example.backendi.model.dto.orderRequest;
import org.example.backendi.repo.MenuStoreRepository;
import org.example.backendi.repo.UserRepository;
import org.example.backendi.repo.orderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class orderService {

    @Autowired
    private orderRepo orderRepo;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private WhatsappClientApi wap;
    @Autowired
    private MenuStoreRepository menuStoreRepository;

    public void fetchorder(orderRequest request, String userPhone) {

        System.out.println(userPhone);
        User user = userRepository.findByPhone(userPhone);
        if (user == null) {
            throw new RuntimeException("User not found");
        }


        MenuStore menuStore = menuStoreRepository
                .findById(request.restaurantPhoneNumber())
                .orElseThrow(() -> new RuntimeException("Menu not found"));


        if (menuStore.getOrerCount() >= menuStore.getLimit()) {
            throw new RuntimeException("Order limit reached");
        }


        int newCount = menuStore.getOrerCount() + 1;
        menuStore.setOrerCount(newCount);
        menuStoreRepository.save(menuStore);


        Order order = new Order();
        order.setUser(user);
        order.setMenuStore(menuStore);
        order.setAddress(request.address());
        orderRepo.save(order);


        String to = menuStore.getPhoneNumber();
        if (!to.startsWith("+")) {
            to = "+" + to;
        }

        wap.sendOrderMessage(
                to,
                user.getName(),
                user.getPhone(),
                request.address(),
                newCount
        );
    }
}
