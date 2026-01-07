package org.example.backendi.repo;

import org.example.backendi.model.CustomerInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface orderRepo extends JpaRepository<CustomerInfo,Long>{
}
