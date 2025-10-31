package com.crunchcart.crunchcart.catalog;


public class ProductDto {

    private long id;
    private String name;
    private String slug;
    private String description;
    private int priceCents;
    private String imageUrl;
    private double rating;
    private long categoryId;
    private String categoryName;



    public ProductDto() {
    }


    public ProductDto(long id, String name, String slug, String description, int priceCents, String imageUrl, double rating, long categoryId, String categoryName) {
        this.id = id;
        this.name = name;
        this.slug = slug;
        this.description = description;
        this.priceCents = priceCents;
        this.imageUrl = imageUrl;
        this.rating = rating;
        this.categoryId = categoryId;
        this.categoryName = categoryName;
    }

    public long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(long categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
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

    public String getDescription() {
        return description;
    }

    public int getPriceCents() {
        return priceCents;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public double getRating() {
        return rating;
    }
}
