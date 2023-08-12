package com.example.Country.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Complete {
    @Id
    @GeneratedValue
    int id;
    String name;
    
    public Complete() {
    }
    public Complete(int id, String name, String cvalue, String unit, String obsStatus, String decimal_1, String idc,
            String country, String idi, String indicator) {
        this.id = id;
        this.name = name;
        this.cvalue = cvalue;
        this.unit = unit;
        this.obsStatus = obsStatus;
        this.decimal_1 = decimal_1;
        this.idc = idc;
        this.country = country;
        this.idi = idi;
        this.indicator = indicator;
    }
    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getCvalue() {
        return cvalue;
    }
    public void setCvalue(String cvalue) {
        this.cvalue = cvalue;
    }
    public String getUnit() {
        return unit;
    }
    public void setUnit(String unit) {
        this.unit = unit;
    }
    public String getObsStatus() {
        return obsStatus;
    }
    @Override
    public String toString() {
        return "Complete [id=" + id + ", name=" + name + ", cvalue=" + cvalue + ", unit=" + unit + ", obsStatus="
                + obsStatus + ", decimal_1=" + decimal_1 + ", idc=" + idc + ", country=" + country + ", idi=" + idi
                + ", indicator=" + indicator + "]";
    }
    public void setObsStatus(String obsStatus) {
        this.obsStatus = obsStatus;
    }
    public String getDecimal_1() {
        return decimal_1;
    }
    public void setDecimal_1(String decimal_1) {
        this.decimal_1 = decimal_1;
    }
    public String getIdc() {
        return idc;
    }
    public void setIdc(String idc) {
        this.idc = idc;
    }
    public String getCountry() {
        return country;
    }
    public void setCountry(String country) {
        this.country = country;
    }
    public String getIdi() {
        return idi;
    }
    public void setIdi(String idi) {
        this.idi = idi;
    }
    public String getIndicator() {
        return indicator;
    }
    public void setIndicator(String indicator) {
        this.indicator = indicator;
    }
    String cvalue;
    String unit;
    String obsStatus;
    String decimal_1;
    String idc;
    String country;
    String idi;
    String indicator;
   
}
