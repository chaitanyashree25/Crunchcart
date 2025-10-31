package com.crunchcart.crunchcart.catalog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository){
        this.productRepository = productRepository;
    }

    public List<ProductDto> getAllProducts(){
        return productRepository.findAll().stream()
                .map(product -> new ProductDto(
                        product.getId(),
                        product.getName(),
                        product.getSlug(),
                        product.getDescription(),
                        product.getPriceCents(),
                        product.getImageUrl(),
                        product.getRating(),product.getCategoryId(),product.getCategoryName())).toList();
    }

}
