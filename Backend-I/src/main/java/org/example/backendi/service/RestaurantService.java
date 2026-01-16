package org.example.backendi.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.example.backendi.model.MenuStore;
import org.example.backendi.model.Restaurant;
import org.example.backendi.repo.MenuStoreRepository;
import org.example.backendi.repo.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private MenuStoreRepository menuStoreRepository;

    @Autowired
    private WhatsappClientApi wap;

    public void getRestaurantdetails(JsonNode messagesNode) {

        String phone = messagesNode.path("from").asText();
        String text = messagesNode.path("text").path("body").asText().trim();

        Restaurant res = restaurantRepository.findByPhone(phone);
        if (res == null) return;

        MenuStore mn = menuStoreRepository
                .findById(res.getPhone())
                .orElse(new MenuStore());

        mn.setPhoneNumber(res.getPhone());
        mn.setRestaurant(res);


        if (mn.getState() == null) {
            mn.setState("WAITING_MENU");
            menuStoreRepository.save(mn);
        }

        if (text.equalsIgnoreCase("RESET")) {
            resetMenu(mn);
            menuStoreRepository.save(mn);
            wap.sendText(phone, "🔄 Menu reset. Please send menu name again.");
            return;
        }

        switch (mn.getState()) {

            case "WAITING_MENU":
                mn.setMessage(text);
                mn.setState("WAITING_PRICE");
                menuStoreRepository.save(mn);
                wap.sendText(phone, "💰 Please enter price");
                break;

            case "WAITING_PRICE":
                try {
                    mn.setPrice(Integer.parseInt(text));
                    mn.setState("WAITING_LIMIT");
                    menuStoreRepository.save(mn);
                    wap.sendText(phone, "⚠ Please enter order limit");
                } catch (NumberFormatException e) {
                    wap.sendText(phone, "❌ Invalid price. Enter a number.");
                }
                break;

            case "WAITING_LIMIT":
                try {
                    mn.setLimit(Integer.parseInt(text));
                    mn.setOrerCount(0);
                    mn.setState("WAITING_TIME");
                    menuStoreRepository.save(mn);
                    wap.sendText(phone, "⏰ Please enter time limit (e.g. 10:30 AM)");
                } catch (NumberFormatException e) {
                    wap.sendText(phone, "❌ Invalid limit. Enter a number.");
                }
                break;

            case "WAITING_TIME":
                mn.setTime_limit(text);
                mn.setState("COMPLETED");
                menuStoreRepository.save(mn);
                wap.sendText(phone, "✅ Menu setup completed successfully");
                break;

            case "COMPLETED":
                wap.sendText(phone, "ℹ Menu already configured. Type RESET to reconfigure.");
                break;

            default:
                wap.sendText(phone, "❓ Unknown state. Type RESET to start again.");
        }
    }
    private void resetMenu(MenuStore mn) {
        mn.setMessage(null);
        mn.setPrice(0);
        mn.setLimit(null);
        mn.setTime_limit(null);
        mn.setOrerCount(0);
        mn.setState("WAITING_MENU");
    }
}
