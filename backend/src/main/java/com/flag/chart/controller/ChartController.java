package com.flag.chart.controller;

import com.flag.chart.domain.Chart;
import com.flag.chart.dto.CreateChartRequest;
import com.flag.chart.dto.XlsFileResponse;
import com.flag.chart.service.ChartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
public class ChartController {

    private final ChartService chartService;

    @PostMapping("/api/chart")
    public ResponseEntity<Chart> createChart(@RequestBody @Validated CreateChartRequest request) {
        Chart savedChart = chartService.save(request);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(savedChart);
    }

    @PostMapping("/api/xls")
    public ResponseEntity<XlsFileResponse> postXlsFile(@RequestParam("file") MultipartFile file) {
        XlsFileResponse xlsFileResponse = new XlsFileResponse();
        xlsFileResponse.setFileName(file.getOriginalFilename());
        xlsFileResponse.setFileSize(file.getSize());
        xlsFileResponse.setFileType(file.getContentType());
        return ResponseEntity.ok(xlsFileResponse);
    }

}
