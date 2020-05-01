package com.mercadopago.sandbox.controller;

import com.mercadopago.exceptions.MPException;
import com.mercadopago.sandbox.dto.NewPreferenceDTO;
import com.mercadopago.sandbox.services.PreferenceService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MercadoPagoSandboxRestController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final PreferenceService preferenceService;

    public MercadoPagoSandboxRestController(PreferenceService preferenceService) {
        this.preferenceService = preferenceService;
    }

    @PostMapping(value = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity createPreference(
            @RequestBody NewPreferenceDTO preferenceDTO
            ) throws MPException {
        return this.preferenceService.create(preferenceDTO);
    }
}
