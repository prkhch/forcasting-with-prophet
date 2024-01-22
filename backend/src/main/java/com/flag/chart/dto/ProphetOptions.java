package com.flag.chart.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ProphetOptions {
    private String growth;
    private double dfCap;
    private double dfFloor;
    private double ftCap;
    private double ftFloor;
    private double cpScale;
    private String[] cpList;
    private double cpThreshold;
    private long periods;
    private String holidays;
    private double holidayScale;
    private double yearlyScale;
    private double weeklyScale;
    private String seasonMode;
}
