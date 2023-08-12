package com.example.Country.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.Country.Entity.Complete;
@Repository
public interface CompleteRepository extends JpaRepository<Complete,String>{
    
}
