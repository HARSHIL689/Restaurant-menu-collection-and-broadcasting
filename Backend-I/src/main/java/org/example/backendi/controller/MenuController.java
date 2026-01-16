package org.example.backendi.controller;

import org.example.backendi.model.dto.MenuResponse;
import org.example.backendi.model.dto.orderRequest;
import org.example.backendi.service.MenuService;
import org.example.backendi.service.orderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins="http://localhost:5173")
@RestController
public class MenuController {

    @Autowired
    MenuService menuService;

    @Autowired
    private orderService orderService;

    @GetMapping("api/message")
    public List<MenuResponse> getMenus(){
        return menuService.getmenu();
    }

    @PostMapping("api/response")
    public void fetchdata(
            @RequestBody orderRequest request,
            @RequestHeader("X-USER-PHONE") String userPhone
    ){
        orderService.fetchorder(request, userPhone);
    }
}
