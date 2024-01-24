package com.flag.article.service;

import com.flag.article.domain.DataFile;
import com.flag.article.repository.StorageRepository;
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

@RequiredArgsConstructor
@Service
public class StorageService {

    private final StorageRepository storageRepository;

    public Path saveFile(MultipartFile file, Long id) {
        String fileDir = "src/main/resources/article/" + id;
        String fileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();

        Path path = Paths.get(fileDir + File.separator +fileName);

        try {
            Files.createDirectories(path.getParent());
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
        }

        return path;
    }

    public String getFilePath(Long id) {
        DataFile dataFile = storageRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("DataFile not found for id: " + id));
        return dataFile.getFilePath();
    }

}
