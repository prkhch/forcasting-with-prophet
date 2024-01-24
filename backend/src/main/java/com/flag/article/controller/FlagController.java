package com.flag.article.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.flag.article.domain.Article;
import com.flag.article.domain.DataFile;
import com.flag.article.dto.*;
import com.flag.article.service.ArticleService;
import com.flag.article.service.StorageService;
import com.flag.article.service.FlaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RequiredArgsConstructor
@RestController
public class FlagController {

    private final ArticleService articleService;
    private final FlaskService flaskService;
    private final StorageService storageService;

    @GetMapping("/api/articles")
    public List<ArticleResponse> getArticles() {
        List<ArticleResponse> articles = articleService.findAll();
        return articles;
    }

    @GetMapping("/api/articles/{id}")
    public ArticleResponse getArticle(@PathVariable Long id) {
        ArticleResponse article = articleService.findById(id);
        return article;
    }

    @GetMapping("/api/datafile/{id}")
    public List<DataFileResponse> getDataFile(@PathVariable Long id) {
        List<DataFileResponse> filePath = storageService.getFilesByArticleId(id);
        return filePath;
    }

    @GetMapping("/api/files/download/{fileId}")
    public ResponseEntity<Resource> downloadFile(@PathVariable Long fileId) throws MalformedURLException, FileNotFoundException {
        DataFile dataFile = storageService.getFileById(fileId);
        String filePath = dataFile.getFilePath();
        String fileName = dataFile.getFileName();
        Path path = Paths.get(filePath, fileName);
        Resource resource = new UrlResource(path.toUri());

        String extension = StringUtils.getFilenameExtension(fileName).toLowerCase();
        String contentType;
        switch (extension) {
            case "jpeg":
            case "jpg":
                contentType = "image/jpeg";
                break;
            case "xlsx":
                contentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                break;
            case "xls":
                contentType = "application/vnd.ms-excel";
                break;
            case "csv":
                contentType = "text/csv";
                break;
            default:
                contentType = "application/octet-stream";
        }

        if (resource.exists() || resource.isReadable()) {
            return ResponseEntity.ok()
                    .contentType(MediaType.parseMediaType(contentType))
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                    .body(resource);
        } else {
            throw new FileNotFoundException("Could not read file: " + filePath);
        }
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
