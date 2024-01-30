package com.flag.flag.service;

import com.flag.flag.domain.DataFile;
import com.flag.flag.dto.DataFileResponse;
import com.flag.flag.repository.StorageRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class StorageService {

    private final StorageRepository storageRepository;

    public Path saveFile(MultipartFile file, Long id) {
        String fileDir = "src/main/resources/article/" + id;
        String fileName = file.getOriginalFilename();

        Path path = Paths.get(fileDir + File.separator +fileName);

        try {
            Files.createDirectories(path.getParent());
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
        }

        return path;
    }

    public List<DataFileResponse> getFilesByArticleId(Long articleId) {
        List<DataFile> dataFiles = storageRepository.findByArticleId(articleId);
        return dataFiles.stream()
                .map(DataFileResponse::new)
                .collect(Collectors.toList());
    }

    public DataFile getFileById(Long fileId) {
        return storageRepository.findById(fileId)
                .orElseThrow(() -> new EntityNotFoundException("DataFile not found for id: " + fileId));
    }

}
