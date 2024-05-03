package com.qualiagenda.nsurancecontrol.services;

import com.qualiagenda.nsurancecontrol.models.Policy;
import com.qualiagenda.nsurancecontrol.repositories.PolicyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class PolicyService {
    @Autowired
    PolicyRepository repository;

    public Policy savePolicy(Policy policy){
        String policyNumber = policy.getPolicyNumber();
        if (repository.findPolicyByPolicyNumber(policyNumber).toString().equals("Optional[]")){
            return repository.save(policy);
        }
        else {
            Policy policyError = new Policy();
            policyError.setId(-1L);
            return policyError;
        }
    }
    public ArrayList<Policy> getAllPolicies() {
        return (ArrayList<Policy>) repository.findAll();
    }
    public Optional<Policy> findPolicyById(Long ID){
        return repository.findPolicyById(ID);
    }
    public String deletePolicyById(Long ID){
        if (findPolicyById(ID).isPresent()) {
        repository.deleteById(ID);
        return "Policy deleted";
        }
        else{
            return "Policy not found";
        }
    }
    public Policy editPolicy(Policy policy) {
        return repository.save(policy);
    }

}
