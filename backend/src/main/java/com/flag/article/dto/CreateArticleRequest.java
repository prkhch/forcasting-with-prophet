package com.flag.article.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.flag.article.domain.Article;
import com.flag.article.service.StorageService;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class CreateArticleRequest {

    private String title;
    private String content;
    private String memberId;
    private String prophetOptions;

    private List<MultipartFile> files;

    public Article toEntity() throws JsonProcessingException {
        return Article.builder()
                .title(title)
                .content(content)
                .memberId(memberId)
                .prophetOptions(prophetOptions)
                .build();
    }
}
