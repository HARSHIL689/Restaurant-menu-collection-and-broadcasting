package org.example.backendi.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class TranslationService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String translateGujaratiToEnglish(String text) {
        try {
            String encodedText = URLEncoder.encode(text, StandardCharsets.UTF_8);

            String url = "https://api.mymemory.translated.net/get"
                    + "?q=" + encodedText
                    + "&langpair=gu|en";

            String response = restTemplate.getForObject(url, String.class);

            JsonNode root = objectMapper.readTree(response);
            return root
                    .path("responseData")
                    .path("translatedText")
                    .asText();

        } catch (Exception e) {
            return text;
        }
    }

    public boolean containsGujarati(String text) {
        return text.matches(".*[\\u0A80-\\u0AFF].*");
    }
}