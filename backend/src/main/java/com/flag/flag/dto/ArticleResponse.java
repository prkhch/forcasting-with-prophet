package com.flag.flag.dto;

import com.flag.flag.domain.Article;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class ArticleResponse {
    private Long id;
    private String title;
    private String content;
    private Long categoryId;
    private String prophetOptions;

    public ArticleResponse(Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.categoryId = article.getCategory().getId();
        this.prophetOptions = article.getProphetOptions();
    }
}
