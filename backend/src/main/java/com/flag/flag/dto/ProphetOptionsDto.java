package com.flag.flag.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
public class ProphetOptionsDto {
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
    private Object yearlyScale;
    private Object weeklyScale;
    private String seasonMode;
    private double seasonScale;
}
