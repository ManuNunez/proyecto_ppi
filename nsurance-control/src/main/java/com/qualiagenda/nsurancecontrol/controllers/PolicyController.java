package com.qualiagenda.nsurancecontrol.controllers;


import com.qualiagenda.nsurancecontrol.models.Policy;
import com.qualiagenda.nsurancecontrol.services.PolicyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/polices")
public class PolicyController {
    @Autowired
    PolicyService service;
}
