package com.flag.chart.repository;

import com.flag.chart.domain.Chart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChartRepository extends JpaRepository<Chart, Long> {
}
