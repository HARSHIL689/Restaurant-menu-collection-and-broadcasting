package org.example.backendi.service;

import jakarta.transaction.Transactional;
import org.example.backendi.model.MenuStore;
import org.example.backendi.model.Order;
import org.example.backendi.model.User;
import org.example.backendi.model.dto.orderRequest;
import org.example.backendi.repo.MenuStoreRepository;
import org.example.backendi.repo.UserRepository;
import org.example.backendi.repo.orderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    @Transactional
    public void fetchorder(orderRequest request, String userPhone) {

        if (request.quantity() <= 0) {
            throw new IllegalArgumentException("Invalid quantity");
        }

        User user = userRepository.findByPhone(userPhone);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        MenuStore menuStore = menuStoreRepository
                .findForUpdate(request.restaurantPhoneNumber())
                .orElseThrow(() -> new IllegalArgumentException("Menu not found"));

        int currentCount = menuStore.getOrerCount();
        int limit = menuStore.getLimit();
        int newCount = currentCount + request.quantity();

        if (newCount > limit) {
            throw new IllegalStateException(
                    "Only " + (limit - currentCount) + " orders left"
            );
        }

        menuStore.setOrerCount(newCount);
        menuStoreRepository.save(menuStore);

        Order order = new Order();
        order.setUser(user);
        order.setMenuStore(menuStore);
        order.setAddress(request.address());
        order.setQuantity(request.quantity());
        orderRepo.save(order);

        String to = menuStore.getPhone();
        if (!to.startsWith("+")) {
            to = "+" + to;
        }

        wap.sendOrderMessage(
                to,
                user.getName(),
                user.getPhone(),
                request.address(),
                newCount,
                request.quantity()
        );
    }
}