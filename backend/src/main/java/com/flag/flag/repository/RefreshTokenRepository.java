package com.flag.flag.repository;

import com.flag.flag.domain.Member;
import com.flag.flag.domain.RefreshToken;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

    @Override
    Optional<RefreshToken> findById(Long id);
//    Optional<RefreshToken> findByToken(String token);
//
//    int deleteByMemberId(Long memberId);
}