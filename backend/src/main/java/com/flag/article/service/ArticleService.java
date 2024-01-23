package com.flag.article.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.flag.article.domain.Article;
import com.flag.article.domain.DataFile;
import com.flag.article.dto.CreateArticleRequest;
import com.flag.article.repository.FlagRepository;
import com.flag.article.repository.StorageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Service
public class ArticleService {
    private final FlagRepository flagRepository;
    private final StorageService storageService;
    private final StorageRepository storageRepository;

    public List<Article> findAll() {
        return flagRepository.findAll();
    }
    public Article save(CreateArticleRequest request) throws JsonProcessingException {
        Article article = flagRepository.save(request.toEntity());

        for (MultipartFile file : request.getFiles()) {
            Path savedFilePath = storageService.saveFile(file, article.getId());
            String fileName = savedFilePath.getFileName().toString();
            String filePath = savedFilePath.getParent().toString();

            DataFile dataFile = DataFile.builder()
                    .article(article)
                    .fileName(fileName)
                    .filePath(filePath) // filePath 설정 필요
                    .build();

            storageRepository.save(dataFile);
        }


        return article;
    }

}
