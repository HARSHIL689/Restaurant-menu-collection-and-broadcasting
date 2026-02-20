package org.example.backendi.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Service
public class TranslationService {
    private static final Pattern GUJARATI_PATTERN = Pattern.compile("[\\u0A80-\\u0AFF]");
    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String translateGujaratiToEnglish(String text) {
        try {
            int MAX_CHUNK_SIZE = 400; // keep safe margin
            StringBuilder result = new StringBuilder();

            int start = 0;

            while (start < text.length()) {
                int end = Math.min(start + MAX_CHUNK_SIZE, text.length());

                String chunk = text.substring(start, end);

                String encodedText = URLEncoder.encode(chunk, StandardCharsets.UTF_8);

                String url = "https://api.mymemory.translated.net/get"
                        + "?q=" + encodedText
                        + "&langpair=gu|en";

                String response = restTemplate.getForObject(url, String.class);

                JsonNode root = objectMapper.readTree(response);
                String translated = root
                        .path("responseData")
                        .path("translatedText")
                        .asText();

                result.append(translated);

                start = end;
            }

            return result.toString();

        } catch (Exception e) {
            e.printStackTrace();
            return text;
        }
    }

    public boolean containsGujarati(String text) {
        return GUJARATI_PATTERN.matcher(text).find();
    }
}