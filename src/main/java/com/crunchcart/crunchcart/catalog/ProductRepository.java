package com.crunchcart.crunchcart.catalog;

import jakarta.persistence.Entity;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRepository extends JpaRepository<Product,Long> {
}
