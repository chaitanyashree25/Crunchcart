package com.crunchcart.crunchcart.catalog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
                        product.getRating(),
                        product.getCategory() != null ? product.getCategory().getId() : 0L,
                        product.getCategory() != null ? product.getCategory().getName() : null)).toList();
    }

    public Page<ProductDto> getProducts(String categorySlug, int page, int size){
        var pageable = PageRequest.of(page, size, Sort.by("id").descending());

        var productPage = (categorySlug == null || categorySlug.isBlank())
                ? productRepository.findAll(pageable)
                : productRepository.findByCategory_Slug(categorySlug, pageable);

        return productPage.map(p -> new ProductDto(
                p.getId(),
                p.getName(),
                p.getSlug(),
                p.getDescription(),
                p.getPriceCents(),
                p.getImageUrl(),
                p.getRating(),
                p.getCategory() !=null ? p.getCategory().getId() : 0L,
                p.getCategory() != null ? p.getCategory().getName() : null

        ));
    }

}
