package com.flag.chart.service;

import com.flag.chart.domain.Chart;
import com.flag.chart.dto.CreateChartRequest;
import com.flag.chart.repository.ChartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class ChartService {
    private final ChartRepository chartRepository;

    public Chart save(CreateChartRequest request) {
        return chartRepository.save(request.toEntity());
    }

}
