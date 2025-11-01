package com.crunchcart.crunchcart.catalog;

import jakarta.persistence.Entity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;




public interface ProductRepository extends JpaRepository<Product,Long> {

    Page<Product> findAll(Pageable pageable);

    Page<Product> findByCategory_Slug(String slug, Pageable pageable);
}
