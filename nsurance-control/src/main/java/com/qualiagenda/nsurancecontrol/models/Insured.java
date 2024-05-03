package com.qualiagenda.nsurancecontrol.models;

import jakarta.persistence.*;

@Entity
@Table(name = "insureds")
public class Insured {
    
    @Id
    @Column(unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String phone;

    public Long getID() {
        return id;
    }
    public void setID(Long ID) {
        id = ID;
    }
    public String getName() {
        return name;
    }
    public void setName(String Name){
        name = Name;
    }
    public String getPhone() {
        return phone;
    }
    public void setPhone(String Phone){
        phone = Phone;
    }

}