package com.flag.article.repository;

import com.flag.article.domain.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlagRepository extends JpaRepository<Article, Long> {
}
