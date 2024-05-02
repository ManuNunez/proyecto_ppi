package com.qualiagenda.nsurancecontrol.controllers;


import com.qualiagenda.nsurancecontrol.models.Policy;
import com.qualiagenda.nsurancecontrol.services.PolicyService;

import org.hibernate.annotations.processing.Find;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("/polices")
public class PolicyController {
    @Autowired
    PolicyService service;

    @PostMapping()
    public Policy savePolicy(@RequestBody Policy entity) {
        return service.savePolicy(entity);
    }
    @PutMapping()
    public Policy editPolicy(@RequestBody Policy policy) {
        return service.editPolicy(policy);
    }
    @GetMapping()
    public ArrayList<Policy> get() {
        return service.getAllPolicies();
    }
    
    @GetMapping("/findPolicyById/{id}")
    public Optional<Policy> findPolicyById(@PathVariable Long id) {
        return service.findPolicyById(id);
    }
    @DeleteMapping()
    public String deletePolicyById(@PathVariable Long id){
        return service.deletePolicyById(id);
    }
}
