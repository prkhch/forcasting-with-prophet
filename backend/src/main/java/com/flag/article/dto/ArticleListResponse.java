package com.flag.article.dto;

import com.flag.article.domain.Article;
import lombok.Getter;

@Getter
public class ArticleListResponse {
    private final Long id;
    private final String title;
    private final String content;
    private final String memberId;



    public ArticleListResponse(Article article) {
        this.id = article.getId();
        this.title = article.getTitle();
        this.content = article.getContent();
        this.memberId = article.getMemberId();
    }
}
