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

    public Page<ProductDto> getProducts(String categorySlug, int page, int size, String sortBy, String direction, String query){

        //Define sorting
        Sort sort = direction.equalsIgnoreCase("asc")
                ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        var pageable = PageRequest.of(page, size, sort);

        Page<Product> productPage;

        //Apply filters

        boolean hasQuery = query != null && !query.trim().isEmpty();

        if(hasQuery){
            productPage = (categorySlug == null || categorySlug.isBlank())
                    ? productRepository.findByNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(query,query,pageable)
                    : productRepository.findByCategory_SlugAndNameContainingIgnoreCaseOrDescriptionContainingIgnoreCase(categorySlug,query,query,pageable);
        }else {

            productPage = (categorySlug == null || categorySlug.isBlank())
                    ? productRepository.findAll(pageable)
                    : productRepository.findByCategory_Slug(categorySlug, pageable);
        }

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
