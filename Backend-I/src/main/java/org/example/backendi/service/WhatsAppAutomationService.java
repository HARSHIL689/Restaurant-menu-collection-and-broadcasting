package org.example.backendi.service;

import org.example.backendi.model.MenuStore;
import org.example.backendi.model.Restaurant;
import org.example.backendi.repo.MenuStoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class WhatsAppAutomationService {

    @Autowired
    WhatsappClientApi wap;

    @Autowired
    MenuStoreRepository menuStoreRepository;

    private final Map<String, ScheduledExecutorService> restaurantSchedulers =
            new ConcurrentHashMap<>();

    private ScheduledExecutorService getScheduler(String restaurantPhone) {
        return restaurantSchedulers.computeIfAbsent(
                restaurantPhone,
                k -> Executors.newSingleThreadScheduledExecutor()
        );
    }

    public void startMenuFlow(Restaurant res) {

        MenuStore menu = menuStoreRepository
                .findByPhone(res.getPhone())
                .orElse(null);

        if (menu == null) return;

        String studentPhone = menu.getPhone(); // mapped user

        ScheduledExecutorService scheduler =
                getScheduler(res.getPhone());

        scheduler.schedule(() ->
                        wap.sendText(studentPhone, "🍽 MENU:\n" + menu.getMenu()),
                0, TimeUnit.SECONDS);

        scheduler.schedule(() ->
                        wap.sendText(studentPhone, "💰 PRICE: ₹" + menu.getPrice()),
                2, TimeUnit.SECONDS);

        scheduler.schedule(() ->
                        wap.sendText(studentPhone, "⚠ LIMIT: " + menu.getLimit()),
                4, TimeUnit.SECONDS);

        scheduler.schedule(() ->
                        wap.sendText(studentPhone, "⏰ Order till 10:30 AM"),
                6, TimeUnit.SECONDS);

    }
}

