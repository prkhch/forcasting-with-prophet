package com.flag.flag.service;

import com.flag.flag.dto.GoogleInfoResponse;
import com.flag.flag.dto.GoogleRequest;
import com.flag.flag.dto.GoogleResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberService {

    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    String clientId;

    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    String clientSecret;

    @Transactional
    @RequestMapping(value="/api/v1/oauth2/google", method = RequestMethod.GET)
    public String getGoogleInfo(@RequestParam(value = "code") String authCode){
        RestTemplate restTemplate = new RestTemplate();
        GoogleRequest googleOAuthRequestParam = GoogleRequest
                .builder()
                .clientId(clientId)
                .clientSecret(clientSecret)
                .code(authCode)
                .redirectUri("http://localhost:8080/login/oauth2/code/google")
                .grantType("authorization_code").build();
        ResponseEntity<GoogleResponse> response = restTemplate.postForEntity("https://oauth2.googleapis.com/token",
                googleOAuthRequestParam, GoogleResponse.class);
        String jwtToken=response.getBody().getId_token();
        Map<String, String> map=new HashMap<>();
        map.put("id_token",jwtToken);
        ResponseEntity<GoogleInfoResponse> infoResponse = restTemplate.postForEntity("https://oauth2.googleapis.com/tokeninfo",
                map, GoogleInfoResponse.class);
        String email=infoResponse.getBody().getEmail();

        log.info("이메일 "+ email);
        return email;
    }

}
