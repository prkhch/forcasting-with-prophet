package com.flag.flag.dto;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.flag.flag.domain.Article;
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
    private String prophetOptions;
    private Long categoryId;
    private List<MultipartFile> files;

    public Article toEntity() throws JsonProcessingException {
        return Article.builder()
                .title(title)
                .content(content)
                .prophetOptions(prophetOptions)
                .build();
    }
}
