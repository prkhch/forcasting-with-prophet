package com.flag.flag.repository;

import com.flag.flag.domain.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlagRepository extends JpaRepository<Article, Long> {

    Page<Article> findByCategoryId(Integer categoryId, Pageable pageable);
}
