package com.kob.backend;


import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class indexController {
    @RequestMapping("/")
    public String index() {
        return "/pk/index.html";
    }
}
