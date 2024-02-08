package com.flag.flag.service;

import com.flag.flag.domain.Category;
import com.flag.flag.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public Category createCategory(String name) {
        Category category = new Category(name);
        return categoryRepository.save(category);
    }
}
