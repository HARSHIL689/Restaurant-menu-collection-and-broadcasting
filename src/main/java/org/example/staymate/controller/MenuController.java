package org.example.staymate.controller;


import org.example.staymate.model.MenuStore;
import org.example.staymate.service.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Controller
@CrossOrigin
@RestController
public class MenuController {

    @Autowired
    MenuService menuService;

    @GetMapping("api/message")
    public List<MenuStore> getMenus(){
        return menuService.getmenu();
    }

}
