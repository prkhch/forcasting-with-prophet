package com.flag.chart.dto;

import com.flag.chart.domain.Chart;
import com.flag.chart.domain.DataPoint;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class CreateChartRequest {

    @NotNull
    @Size(min = 1, max = 16)
    private String title;

    private String content;

    @NotNull
    private String memberId;

    private List<DataPoint> dataPoints;

    public Chart toEntity() {
        return Chart.builder()
                .title(title)
                .content(content)
                .memberId(memberId)
                .dataPoints(dataPoints)
                .build();
    }
}
