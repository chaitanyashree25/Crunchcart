package com.crunchcart.crunchcart.catalog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {

    ProductService productService;

    @Autowired
    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping("/all")
    public List<ProductDto> getAllProducts(){
       return productService.getAllProducts();
    }

    @GetMapping
    public Page<ProductDto> listProducts(
           @RequestParam(required = false) String category,
           @RequestParam(defaultValue = "0") int page,
           @RequestParam(defaultValue = "12") int size
    ){
        return productService.getProducts(category,page,size);
    }
}
