package com.flag.article.repository;

import com.flag.article.domain.DataFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

public interface StorageRepository extends JpaRepository<DataFile, Long> {
//    Optional<DataFile> findById(Long id);
}
