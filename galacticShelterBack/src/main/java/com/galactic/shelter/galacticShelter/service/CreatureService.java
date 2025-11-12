package com.galactic.shelter.galacticShelter.service;

import com.galactic.shelter.galacticShelter.model.Creature;
import com.galactic.shelter.galacticShelter.repository.CreatureRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Data
@Service
public class CreatureService {

    @Autowired
    private CreatureRepository creatureRepository;

    public Optional<Creature> getCreature(final UUID id) {
        return creatureRepository.findById(id);
    }

    public Iterable<Creature> getCreatures() {
        return creatureRepository.findAll();
    }

    public void deleteCreature(final UUID id) {
        creatureRepository.deleteById(id);
    }

    public Creature saveCreature(Creature Creature) {
        return creatureRepository.save(Creature);
    }

    public Creature adoptCreature(UUID id, String username) {
        Creature creature = creatureRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Creature not found"));

        if (creature.isAdopted()) {
            throw new RuntimeException("Creature already adopted");
        }

        creature.setAdopted(true);
        creature.setAdoptedDate(LocalDateTime.now());
        creature.setAdopted_by(username);
        return creatureRepository.save(creature);

    }
}