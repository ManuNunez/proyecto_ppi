package com.qualiagenda.nsurancecontrol.repositories;

import com.qualiagenda.nsurancecontrol.models.Insured;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface InsuredRepository extends CrudRepository<Insured, Long>{
    public Optional<ArrayList<Insured>> findInsuredByName(String name);
}