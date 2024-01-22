package com.flag.chart.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.flag.chart.domain.Chart;
import com.flag.chart.dto.CreateChartRequest;
import com.flag.chart.dto.ProphetOptions;
import com.flag.chart.dto.DataSet;
import com.flag.chart.dto.ProphetRequest;
import com.flag.chart.service.ChartService;
import com.flag.chart.service.FlaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
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
        DataSet dataSet = new DataSet();
        dataSet.setFileName(file.getOriginalFilename());
        dataSet.setFileSize(file.getSize());
        dataSet.setFileType(file.getContentType());
        dataSet.setFileData(file.getBytes());;

        ResponseEntity<String> flaskResponse = flaskService.sendFileToPandas(dataSet);
        return flaskResponse;
    }

    @PostMapping("/api/prophet")
    public ResponseEntity<String> postProphet(@ModelAttribute ProphetRequest request) throws IOException {
        MultipartFile file = request.getFile();

        String optionsString = request.getOptions();
        ProphetOptions options = new ObjectMapper().readValue(optionsString, ProphetOptions.class);

        DataSet dataSet = new DataSet();

        dataSet.setFileName(file.getOriginalFilename());
        dataSet.setFileSize(file.getSize());
        dataSet.setFileType(file.getContentType());
        dataSet.setFileData(file.getBytes());;

        ResponseEntity<String> flaskResponse = flaskService.sendFileToProphet(dataSet, options);

        return flaskResponse;
    }

}
