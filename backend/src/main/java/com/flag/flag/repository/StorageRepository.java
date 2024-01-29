package com.flag.flag.repository;

import com.flag.flag.domain.DataFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StorageRepository extends JpaRepository<DataFile, Long> {
    List<DataFile> findByArticleId(Long articleId);
}
