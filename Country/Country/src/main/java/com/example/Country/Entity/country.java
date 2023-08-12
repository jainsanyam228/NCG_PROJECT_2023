package com.example.Country.Entity;

public class country {
    String id;
    public country(String id, String val) {
        this.id = id;
        this.val = val;
    }
    String val;
    public String getId() {
        return id;
    }
    public void setId(String id) {
        this.id = id;
    }
    public String getVal() {
        return val;
    }
    public void setVal(String val) {
        this.val = val;
    }
    
}
