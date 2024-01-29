package com.flag.article.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class DataFileFlask {
    private String fileName;
    private long fileSize;
    private String fileType;
    private byte[] fileData;
}