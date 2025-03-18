package com.flag.flag.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.flag.flag.domain.Article;
import com.flag.flag.domain.DataFile;
import com.flag.flag.dto.*;
import com.flag.flag.service.ArticleService;
import com.flag.flag.service.CategoryService;
import com.flag.flag.service.StorageService;
import com.flag.flag.service.FlaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    @GetMapping("/api/spring/articles")
    public Page<ArticleResponse> getArticlesByCategory(
            @RequestParam(required = false) Integer categoryId,
            Pageable pageable
    ) {
        if (categoryId != null) {
            return articleService.findAllByCategory(categoryId, pageable);
        } else {
            return articleService.findAll(pageable);
        }
    }

    @GetMapping("/api/spring/articles/{id}")
    public ArticleResponse getArticle(@PathVariable Long id) {
        ArticleResponse article = articleService.findById(id);
        return article;
    }

    @GetMapping("/api/spring/datafile/{id}")
    public List<DataFileResponse> getDataFile(@PathVariable Long id) {
        List<DataFileResponse> filePath = storageService.getFilesByArticleId(id);
        return filePath;
    }

    @GetMapping("/api/spring/files/download/{fileId}")
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


    @PostMapping("/api/spring/article")
    public ResponseEntity<ArticleResponse> createArticle(@ModelAttribute CreateArticleRequest request) throws JsonProcessingException {
        Article savedArticle = articleService.save(request);
        ArticleResponse articleResponse = new ArticleResponse(savedArticle);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(articleResponse);
    }

    @PostMapping("/api/spring/pandas")
    public ResponseEntity<String> postPandas(@RequestParam("files") MultipartFile file) throws IOException {
        System.out.println("Received file: " + file.getOriginalFilename());
        DataFileFlaskRequest dataFileFlaskRequest = new DataFileFlaskRequest();
        dataFileFlaskRequest.setFileName(file.getOriginalFilename());
        dataFileFlaskRequest.setFileSize(file.getSize());
        dataFileFlaskRequest.setFileType(file.getContentType());
        dataFileFlaskRequest.setFileData(file.getBytes());;

        ResponseEntity<String> flaskResponse = flaskService.sendFileToPandas(dataFileFlaskRequest);
        return flaskResponse;
    }

    @PostMapping("/api/spring/prophet")
    public ResponseEntity<String> postProphet(@ModelAttribute ProphetRequestDto request) throws IOException {
        MultipartFile file = request.getFiles();
        String optionsString = request.getProphetOptions();

        DataFileFlaskRequest dataFileFlaskRequest = new DataFileFlaskRequest();
        ProphetOptionsDto options = new ObjectMapper().readValue(optionsString, ProphetOptionsDto.class);

        dataFileFlaskRequest.setFileName(file.getOriginalFilename());
        dataFileFlaskRequest.setFileSize(file.getSize());
        dataFileFlaskRequest.setFileType(file.getContentType());
        dataFileFlaskRequest.setFileData(file.getBytes());;

        ResponseEntity<String> flaskResponse = flaskService.sendFileToProphet(dataFileFlaskRequest, options);

        return flaskResponse;
    }

}
