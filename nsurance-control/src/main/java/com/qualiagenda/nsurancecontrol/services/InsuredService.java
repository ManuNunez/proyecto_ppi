package com.qualiagenda.nsurancecontrol.services;

import com.qualiagenda.nsurancecontrol.repositories.InsuredRepository;
import com.qualiagenda.nsurancecontrol.models.Insured;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class InsuredService {
    @Autowired
    InsuredRepository repository;

    public Insured saveInsured(Insured insured){
        String SearchName = insured.getName();
        if (repository.FindInsuredByName(SearchName).isEmpty()) {
            return repository.save(insured);
        }
        else {
            Insured insured2 = new Insured();
            insured2.setID(-1L);
            return insured2;
        }
    }
    public ArrayList<Insured> getAllInsureds(){
        return(ArrayList<Insured>) repository.findAll();
        
    }

}
