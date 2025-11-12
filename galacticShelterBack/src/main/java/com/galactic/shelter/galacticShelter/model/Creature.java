package com.galactic.shelter.galacticShelter.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Entity
@Table(name = "creature")
public class Creature {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name="name")
    private String name;

    @Column(name="species")
    private String species;

    private String planet;

    @Column(name="danger_level")
    @Enumerated(EnumType.STRING)
    private DangerLevel dangerLevel;

    private int age;

    private String description;

    @Enumerated(EnumType.STRING)
    private Rarity rarity;

    @Convert(converter = StringListConverter.class)
    @Column(name="special_abilities")
    private List<String> specialAbilities;

    @Lob
    private String image;

    @JsonProperty("isAdopted")
    @Column(name="is_adopted")
    private boolean isAdopted;

    @Column(name="adopted_date")
    private LocalDateTime adoptedDate;

    @JsonProperty("adoptedBy")
    @Column(name="adopted_by")
    private String adopted_by;

}
