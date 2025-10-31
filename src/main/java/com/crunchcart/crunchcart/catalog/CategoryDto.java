package com.crunchcart.crunchcart.catalog;

public class CategoryDto {

    private long id;
    private String name;
    private String slug;

    public CategoryDto(long id, String name, String slug) {
        this.id = id;
        this.name = name;
        this.slug = slug;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSlug() {
        return slug;
    }
}
