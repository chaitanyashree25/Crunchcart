package com.crunchcart.crunchcart.catalog;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CategoryService {


   public final CategoryRepository categoryRepository;

    @Autowired
   public CategoryService(CategoryRepository categoryRepository){
       this.categoryRepository = categoryRepository;
   }

    public List<CategoryDto> getAllCategories(){
        return new ArrayList<>(categoryRepository.findAll().stream()
                .map(category -> new CategoryDto(category.getId(),category.getName(),category.getSlug())).toList());
    }
}
