package com.galactic.shelter.galacticShelter.controller;

import com.galactic.shelter.galacticShelter.model.Creature;
import com.galactic.shelter.galacticShelter.service.CreatureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class CreatureController {

    @Autowired
    private CreatureService creatureService;

    @GetMapping("/creatures")
    public Iterable<Creature> getCreatures() {
        return creatureService.getCreatures();
    }

    @GetMapping("/creatures/{id}")
    public Creature getCreature(@PathVariable("id")UUID id) {
        System.out.println("Try to get creature " + id);
        Optional<Creature> creature = creatureService.getCreature(id);
        return creature.orElse(null);
    }

    @PostMapping("/saveCreature")
    public ResponseEntity<Creature> saveEmployee(@RequestBody Creature creature) {
        System.out.println("Try to save " + creature);
        Creature saved = creatureService.saveCreature(creature);
        return ResponseEntity.ok(saved);
    }

    @DeleteMapping("/creatures/{id}")
    public void deleteCreature(@PathVariable("id")UUID id) {
        System.out.println("Try to delete " + id);
        creatureService.deleteCreature(id);
    }

    @PutMapping("/creatures/{id}/adopt")
    public ResponseEntity<Creature> adoptCreature(@PathVariable UUID id, Authentication auth) {
        System.out.println("Try to adopt " + id);
        String username = ((User) auth.getPrincipal()).getUsername();
        Creature creature = creatureService.adoptCreature(id, username);
        return ResponseEntity.ok(creature);
    }

}