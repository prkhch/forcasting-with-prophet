package com.flag.chart.service;

import com.flag.chart.dto.DataSet;
import com.flag.chart.dto.ProphetOptions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class FlaskService {
    @Autowired
    private RestTemplate restTemplate;

    public ResponseEntity<String> sendFileToPandas(DataSet dataSet) {
        String url = "http://127.0.0.1:5000/api/pandas";

        // 헤더
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        // 바디
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new ByteArrayResource(dataSet.getFileData()) {
            @Override
            public String getFilename() {
                return dataSet.getFileName();
            }
        });

        // RequestEntity
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        return restTemplate.postForEntity(url, requestEntity, String.class);
    }

    public ResponseEntity<String> sendFileToProphet(DataSet dataSet, ProphetOptions options) {
        String url = "http://127.0.0.1:5000/api/prophet";

        // 헤더
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        // 바디
        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("file", new ByteArrayResource(dataSet.getFileData()) {
            @Override
            public String getFilename() {
                return dataSet.getFileName();
            }
        });

        body.add("options", options);

        // RequestEntity
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        return restTemplate.postForEntity(url, requestEntity, String.class);
    }

}
