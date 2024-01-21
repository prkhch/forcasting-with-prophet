package com.flag.chart.controller;

import com.flag.chart.domain.Chart;
import com.flag.chart.dto.CreateChartRequest;
import com.flag.chart.dto.XlsFileResponse;
import com.flag.chart.service.ChartService;
import com.flag.chart.service.FlaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@RestController
public class ChartController {

    private final ChartService chartService;
    private final FlaskService flaskService;

    @PostMapping("/api/article")
    public ResponseEntity<Chart> createArticle(@RequestBody @Validated CreateChartRequest request) {
        Chart savedChart = chartService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedChart);
    }

    @PostMapping("/api/pandas")
    public ResponseEntity<String> postPandas(@RequestParam("file") MultipartFile file) throws IOException {
        XlsFileResponse xlsFileResponse = new XlsFileResponse();
        xlsFileResponse.setFileName(file.getOriginalFilename());
        xlsFileResponse.setFileSize(file.getSize());
        xlsFileResponse.setFileType(file.getContentType());
        xlsFileResponse.setFileData(file.getBytes());;
        ResponseEntity<String> flaskResponse = flaskService.sendFileToPandas(xlsFileResponse);
        return flaskResponse;
    }

    @PostMapping("/api/xls")
    public ResponseEntity<String> postXlsFile(@RequestParam("file") MultipartFile file) throws IOException {
        XlsFileResponse xlsFileResponse = new XlsFileResponse();
        xlsFileResponse.setFileName(file.getOriginalFilename());
        xlsFileResponse.setFileSize(file.getSize());
        xlsFileResponse.setFileType(file.getContentType());
        xlsFileResponse.setFileData(file.getBytes());;
        System.out.println("xlsFile : " + xlsFileResponse);

        ResponseEntity<String> flaskResponse = flaskService.sendFileToProphet(xlsFileResponse);

        return flaskResponse;
    }

}
