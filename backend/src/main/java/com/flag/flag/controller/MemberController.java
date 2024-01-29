package com.flag.flag.controller;

import com.flag.flag.dto.TokenDto;
import com.flag.flag.service.MemberService;
import com.flag.flag.service.SecurityService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;
    private final SecurityService securityService;


    @GetMapping("/login")
    public ResponseEntity login(@RequestParam String code) {
        String email = memberService.getGoogleInfo(code);
        TokenDto tokenDto = securityService.login(email);
        HttpHeaders headers = securityService.setTokenHeaders(tokenDto);

        return ResponseEntity.ok().headers(headers).body("accessToken: " + tokenDto.getAccessToken());
    }
}