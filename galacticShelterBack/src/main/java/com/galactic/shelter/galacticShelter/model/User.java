package com.galactic.shelter.galacticShelter.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.UUID;


@Entity
@Table(name = "users")
public class User {

    @Getter
    @Id
    @GeneratedValue
    private UUID id;

    @Getter
    @Column(unique = true, nullable = false)
    private String username;

    @Getter
    @Column(nullable = false)
    private String password;

    @Getter
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;

}