package com.example.Country.Controller;

import org.springframework.web.bind.annotation.*;

import com.example.Country.Entity.Complete;
import com.example.Country.Repository.CompleteRepository;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

@CrossOrigin(origins = "", allowedHeaders = "")
@RestController
public class WorldIndicator {
    @Autowired
    CompleteRepository completeRepository;


    @GetMapping("/Sanyam")
    public String index(){
        return "Sanyam Bhai ji";
    }

    @PostMapping("/Save")
    public Complete savComplete(@RequestBody Complete complete){
        completeRepository.save(complete);
        return complete;
    }
    @GetMapping("/GetAll")
    public List<Complete> geComplete(){
        List<Complete> mpList=completeRepository.findAll();
        return mpList;
    }
    @DeleteMapping("/DeleteComplete/{id}")
    public String deleteString(@PathVariable String id){
         Optional<Complete> complete= completeRepository.findById(id);
         if(complete.isPresent()){
            completeRepository.deleteById(id);
         }
        return "Deleted Successfully";
    }
}
