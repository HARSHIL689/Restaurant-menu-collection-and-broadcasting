package org.example.backendi.service;

import org.example.backendi.model.MenuStore;
import org.example.backendi.model.dto.MenuResponse;
import org.example.backendi.repo.MenuStoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


@Service
public class MenuService {
    @Autowired
    MenuStoreRepository menuStoreRepository;

    public void storeMenu(MenuStore menuStore){
        menuStoreRepository.save(menuStore);
    }

    public List<MenuResponse> getmenu() {
        List<MenuStore> mn = menuStoreRepository.findActiveMenus();
        List<MenuResponse> menuResponses = new ArrayList<>();

        for (MenuStore m : mn) {
            MenuResponse menuResponse = new MenuResponse(
                    m.getPhone(),
                    m.getMenu(),
                    m.getPrice(),
                    m.getId(),
                    m.getCreatedDate(),
                    m.getRestaurant().getRestaurantName(),
                    m.getLimit(),
                    m.getOrerCount()
            );
            menuResponses.add(menuResponse);
        }
        return menuResponses;
    }

    public List<MenuResponse> getmenubySearch(String keyword) {

        List<MenuStore> menus;

        if (keyword == null || keyword.trim().isEmpty()) {
            menus = menuStoreRepository.findActiveMenus();
        } else {
            menus = menuStoreRepository.searchActiveMenus(keyword);
        }

        List<MenuResponse> menuResponses = new ArrayList<>();

        for (MenuStore m : menus) {
            MenuResponse menuResponse = new MenuResponse(
                    m.getPhone(),
                    m.getMenu(),
                    m.getPrice(),
                    m.getId(),
                    m.getCreatedDate(),
                    m.getRestaurant().getRestaurantName(),
                    m.getLimit(),
                    m.getOrerCount()
            );
            menuResponses.add(menuResponse);
        }
        return menuResponses;
    }


}
