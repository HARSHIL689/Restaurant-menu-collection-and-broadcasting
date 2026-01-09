package org.example.backendi.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Component
class WhatsappClientApi {

    @Value("${whatsapp.token}")
    private String token;

    @Value("${whatsapp.phone-id}")
    private String phoneId;

    private final RestTemplate restTemplate = new RestTemplate();

    public void sendOrderMessage(
            String restaurantPhone,
            String userName,
            String userMobile,
            String address,
            int count
    ) {

        String url = "https://graph.facebook.com/v19.0/" + phoneId + "/messages";

        Map<String, Object> text = new HashMap<>();
        text.put("body",
                "📦 *New Order Received*\n\n" +
                        "👤 Customer Name: " + userName + "\n\n" +
                        "📞 Customer Phone: " + userMobile + "\n\n" +
                        "📍 Customer Address:\n" +
                        address+ "\n\n" +
                        "👥 No. of Customers: " + count
        );

        Map<String, Object> body = new HashMap<>();
        body.put("messaging_product", "whatsapp");
        body.put("to", restaurantPhone);
        body.put("type", "text");
        body.put("text", text);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(body, headers);

        restTemplate.postForEntity(url, request, String.class);
    }
}