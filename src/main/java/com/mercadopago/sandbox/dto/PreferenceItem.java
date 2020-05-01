package com.mercadopago.sandbox.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PreferenceItem implements Serializable {
    private String name;
    private Integer quantity;
    private Float price;
}
