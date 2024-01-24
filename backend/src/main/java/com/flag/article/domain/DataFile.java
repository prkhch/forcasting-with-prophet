package com.flag.article.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Getter
public class DataFile {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", updatable = false)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "article_id")
    private Article article;
    private String fileName;
    private String filePath;

    @Builder
    public DataFile(Article article,
                   String fileName,
                   String filePath) {
        this.article = article;
        this.fileName = fileName;
        this.filePath = filePath;
    }
}
