package com.flag.chart.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.List;

@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Entity
public class Chart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content")
    private String content;

    @Column(name = "member_id", nullable = false)
    private String memberId;

    @OneToMany(mappedBy = "chart", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<DataPoint> dataPoints;

    @CreatedDate
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Builder
    public Chart(String title, String content, String memberId, List<DataPoint> dataPoints) {
        this.title = title;
        this.content = content;
        this.memberId = memberId;
        this.dataPoints = dataPoints;
    }

//    public void update(String title, String content) {
//        this.title = title;
//        this.content = content;
//    }

}
