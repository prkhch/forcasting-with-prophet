package com.flag.flag.service;

import com.flag.flag.config.jwt.JwtProvider;
import com.flag.flag.domain.Member;
import com.flag.flag.domain.RefreshToken;
import com.flag.flag.dto.TokenDto;
import com.flag.flag.repository.MemberRepository;
import com.flag.flag.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Slf4j
@Service
@RequiredArgsConstructor
public class SecurityService {

    private final MemberRepository memberRepository;
    private final RefreshTokenRepository tokenRepository;
    private final JwtProvider jwtProvider;

    @Transactional
    public TokenDto login(String email) {
        Member member = memberRepository.findByEmail(email)
                .orElseGet(() -> {
                    Member newMember = Member.builder()
                            .email(email)
                            .authority("ROLE_USER")
                            .build();
                    return memberRepository.saveAndFlush(newMember);
                });

        log.info("[login] 계정을 찾았습니다. " + member);

        TokenDto tokenDto = jwtProvider.generateTokenDto(email);

        RefreshToken refreshToken = RefreshToken.builder()
                .memberId(member.getId())
                .refreshToken(tokenDto.getRefreshToken())
                .build();
        tokenRepository.save(refreshToken);
        return tokenDto;
    }

    public HttpHeaders setTokenHeaders(TokenDto tokenDto) {
        HttpHeaders headers = new HttpHeaders();
        ResponseCookie cookie = ResponseCookie.from("RefreshToken", tokenDto.getRefreshToken())
                .path("/")
                .maxAge(60*60*24*7) // 쿠키 유효기간 7일로 설정
                .secure(true)
                .sameSite("None")
                .httpOnly(true)
                .build();
        headers.add("Set-cookie", cookie.toString());
        headers.add("Authorization", tokenDto.getAccessToken());

        return headers;
    }
}