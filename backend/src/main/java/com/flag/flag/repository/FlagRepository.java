package com.flag.flag.repository;

import com.flag.flag.domain.Article;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlagRepository extends JpaRepository<Article, Long> {
}
