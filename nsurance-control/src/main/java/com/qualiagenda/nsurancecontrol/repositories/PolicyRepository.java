package com.qualiagenda.nsurancecontrol.repositories;

import com.qualiagenda.nsurancecontrol.models.Policy;
import com.qualiagenda.nsurancecontrol.models.Insured;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface PolicyRepository extends CrudRepository <Policy, Long>{
    public Optional<ArrayList<Policy>> FindPolicyByPolicyNumber(String policyNumber);
    public Optional<ArrayList<Policy>> FindPolicyByInsured(Insured insured);


}
