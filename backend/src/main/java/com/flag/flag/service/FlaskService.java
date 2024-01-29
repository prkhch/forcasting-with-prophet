package com.flag.flag.service;

import com.flag.flag.dto.DataFileFlaskRequest;
import com.flag.flag.dto.ProphetOptionsDto;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@RequiredArgsConstructor
@Service
public class FlaskService {
    private final RestTemplate restTemplate;

    public ResponseEntity<String> sendFileToPandas(DataFileFlaskRequest dataFileFlaskRequest) {
        String url = "http://127.0.0.1:5000/api/pandas";

        // 헤더
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        // 바디
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new ByteArrayResource(dataFileFlaskRequest.getFileData()) {
            @Override
            public String getFilename() {
                return dataFileFlaskRequest.getFileName();
            }
        });

        // RequestEntity
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        return restTemplate.postForEntity(url, requestEntity, String.class);
    }

    public ResponseEntity<String> sendFileToProphet(DataFileFlaskRequest dataFileFlaskRequest, ProphetOptionsDto options) {
        String url = "http://127.0.0.1:5000/api/prophet";

        // 헤더
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        // 바디
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new ByteArrayResource(dataFileFlaskRequest.getFileData()) {
            @Override
            public String getFilename() {
                return dataFileFlaskRequest.getFileName();
            }
        });

        body.add("options", options);

        // RequestEntity
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        return restTemplate.postForEntity(url, requestEntity, String.class);
    }

}
