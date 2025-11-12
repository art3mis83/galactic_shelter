package com.galactic.shelter.galacticShelter.repository;

import com.galactic.shelter.galacticShelter.model.Creature;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CreatureRepository extends CrudRepository<Creature, UUID> {

}