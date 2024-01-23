package com.flag.article.repository;

import com.flag.article.domain.DataFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StorageRepository extends JpaRepository<DataFile, Long> {
}
