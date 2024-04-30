package com.qualiagenda.nsurancecontrol.controllers;


import com.qualiagenda.nsurancecontrol.models.Insured;
import com.qualiagenda.nsurancecontrol.services.InsuredService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
@RequestMapping("/insureds")
public class InsuredController {
    @Autowired
    InsuredService service;

    @PostMapping()
    public Insured saveInsured(@RequestBody Insured insured) {
        return saveInsured(insured);
    }
    @PutMapping()
    public Insured editInsured(@RequestBody Insured entity) {
        return service.editInsured(entity);
    }
    @GetMapping()
    public ArrayList<Insured> getAllInsureds() {
        return service.getAllInsureds();
    }
    @GetMapping("/findInsuredById/{id}")
    public Optional<Insured> findInsuredById(@PathVariable Long id) {
        return service.findInsuredByID(id);
    }
    @GetMapping("/findInsuredByName/{Name}")
    public Optional<ArrayList<Insured>> findInsuredByName(@PathVariable String param) {
        return service.findInsuredByName(param);
    }
    @DeleteMapping("/deleteInsuredById")
    public String deleteInsuredById(@RequestParam Long id) {
        return service.deleteInsuredById(id);
    }

}
