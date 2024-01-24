package com.flag.article.repository;

import com.flag.article.domain.Article;
import com.flag.article.domain.DataFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlagRepository extends JpaRepository<Article, Long> {
}
