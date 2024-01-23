package com.flag.article.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.flag.article.domain.Article;
import com.flag.article.dto.*;
import com.flag.article.service.ArticleService;
import com.flag.article.service.StorageService;
import com.flag.article.service.FlaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class FlagController {

    private final ArticleService articleService;
    private final FlaskService flaskService;
    private final StorageService storageService;

    @GetMapping("api/articles")
    public List<ArticleListResponse> getArticles() {
        List<ArticleListResponse> articles = articleService.findAll()
                .stream()
                .map(ArticleListResponse::new)
                .toList();
        return articles;
    }

    @PostMapping("/api/article")
    public ResponseEntity<Article> createArticle(@ModelAttribute CreateArticleRequest request) throws JsonProcessingException {
        Article savedArticle = articleService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedArticle);
    }

    @PostMapping("/api/pandas")
    public ResponseEntity<String> postPandas(@RequestParam("files") MultipartFile file) throws IOException {
        DataFileFlask dataFileFlask = new DataFileFlask();
        dataFileFlask.setFileName(file.getOriginalFilename());
        dataFileFlask.setFileSize(file.getSize());
        dataFileFlask.setFileType(file.getContentType());
        dataFileFlask.setFileData(file.getBytes());;

        ResponseEntity<String> flaskResponse = flaskService.sendFileToPandas(dataFileFlask);
        return flaskResponse;
    }

    @PostMapping("/api/prophet")
    public ResponseEntity<String> postProphet(@ModelAttribute ProphetRequestDTO request) throws IOException {
        MultipartFile file = request.getFiles();
        String optionsString = request.getProphetOptions();

        DataFileFlask dataFileFlask = new DataFileFlask();
        ProphetOptionsDTO options = new ObjectMapper().readValue(optionsString, ProphetOptionsDTO.class);

        dataFileFlask.setFileName(file.getOriginalFilename());
        dataFileFlask.setFileSize(file.getSize());
        dataFileFlask.setFileType(file.getContentType());
        dataFileFlask.setFileData(file.getBytes());;

        ResponseEntity<String> flaskResponse = flaskService.sendFileToProphet(dataFileFlask, options);

        return flaskResponse;
    }

}
