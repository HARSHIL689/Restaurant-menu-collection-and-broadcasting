package org.example.backendi.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
public class WhatsappClientApi {

    @Value("${whatsapp.token}")
    private String token;

    @Value("${whatsapp.phone-id}")
    private String phoneId;

    private final RestTemplate restTemplate = new RestTemplate();

    public void sendOrderMessage(
            String restaurantPhone,
            String userName,
            String userMobile) {

        String url = "https://graph.facebook.com/v19.0/" + phoneId + "/messages";

        String body = String.format(
                "{"
                        + "\"messaging_product\":\"whatsapp\","
                        + "\"to\":\"%s\","
                        + "\"type\":\"text\","
                        + "\"text\":{"
                        +   "\"body\":\"New Order Received\\n\\nCustomer Name: %s\\nCustomer Mobile: %s\""
                        + "}"
                        + "}",
                restaurantPhone,
                userName,
                userMobile
        );

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> request = new HttpEntity<>(body, headers);

        restTemplate.postForEntity(url, request, String.class);
    }
}
