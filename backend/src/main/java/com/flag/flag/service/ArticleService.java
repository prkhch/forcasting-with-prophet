package com.flag.flag.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.flag.flag.domain.Article;
import com.flag.flag.domain.Category;
import com.flag.flag.domain.DataFile;
import com.flag.flag.dto.ArticleResponse;
import com.flag.flag.dto.CreateArticleRequest;
import com.flag.flag.repository.CategoryRepository;
import com.flag.flag.repository.FlagRepository;
import com.flag.flag.repository.StorageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class ArticleService {
    private final FlagRepository flagRepository;
    private final StorageService storageService;
    private final StorageRepository storageRepository;
    private final CategoryRepository categoryRepository;

    public Page<ArticleResponse> findAll(Pageable pageable) {
        Page<Article> articles = flagRepository.findAll(pageable);
        return articles.map(ArticleResponse::new);
    }

    public Page<ArticleResponse> findAllByCategory(Integer categoryId, Pageable pageable) {
        Page<Article> articles = flagRepository.findByCategoryId(categoryId, pageable);
        return articles.map(ArticleResponse::new);
    }

    public ArticleResponse findById(long id) {
        Article article = flagRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("not found : " + id));
        return new ArticleResponse(article);
    }

    public Article save(CreateArticleRequest request) throws JsonProcessingException {
        Article article = flagRepository.save(request.toEntity());

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category Exception"));

        article.setCategory(category);

        for (MultipartFile file : request.getFiles()) {
            Path savedFilePath = storageService.saveFile(file, article.getId());
            String fileName = savedFilePath.getFileName().toString();
            String filePath = savedFilePath.getParent().toString();

            DataFile dataFile = DataFile.builder()
                    .article(article)
                    .fileName(fileName)
                    .filePath(filePath)
                    .build();

            storageRepository.save(dataFile);
        }

        return article;
    }

}
