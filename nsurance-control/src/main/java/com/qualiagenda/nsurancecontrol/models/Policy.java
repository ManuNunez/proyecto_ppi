package com.qualiagenda.nsurancecontrol.models;

import jakarta.persistence.*;
@Entity
@Table(name = "polices")
public class Policy {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "policy_number")
    private String policyNumber;
    
    @ManyToOne
    @JoinColumn(name = "insured_id", nullable = false)
    private Insured insured;
    
    @Column(name = "insured_vehicle")
    private String insuredVehicle;
    
    @Column(name = "policy_type")
    private String policyType;

    public Long getId() {
        return id;
    }
    public void setId(Long ID) {
        this.id = ID;
    }
    public String getPolicyNumber() {
        return policyNumber;
    }
    public void setPolicyNumber(String policyNumber) {
        this.policyNumber = policyNumber;
    }
    public Insured getInsured() {
        return insured;
    }
    public void setInsured(Insured INSURED) {
        this.insured = INSURED;
    }
    public String getInsuredVehicle() {
        return insuredVehicle;
    }
    public void setInsuredVehicle(String INSUREDVEHICLE) {
        this.insuredVehicle = INSUREDVEHICLE;
    }
    public String getPolicyType(){
        return policyType;
    }
    public void setPolicyType(String POLICYTYPE){
        this.policyType = POLICYTYPE;
    }
}