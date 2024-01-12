package com.flag.chart.domain;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class DataPoint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "date")
    private LocalDate date; // 또는 LocalDateTime, Date 등

    @Column(name = "value")
    private Double value;

    @ManyToOne
    @JoinColumn(name = "chart_id", nullable = false)
    private Chart chart;
}
