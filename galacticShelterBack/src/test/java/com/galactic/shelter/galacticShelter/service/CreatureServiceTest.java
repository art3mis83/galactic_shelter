package com.galactic.shelter.galacticShelter.service;

import com.galactic.shelter.galacticShelter.model.Creature;
import com.galactic.shelter.galacticShelter.repository.CreatureRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class CreatureServiceTest {

    @Mock
    private CreatureRepository creatureRepository;

    @InjectMocks
    private CreatureService creatureService;

    @Test
    void getAllTest() {
        creatureService.getCreatures();

        verify(creatureRepository).findAll(); // je vérifie que j'ai bien appelé cette méthode
    }

    @Test
    void adoptCreatureFailAlreadyAdopted() {
        Creature existingCreature = new Creature();
        existingCreature.setAdopted(true);

        when(creatureRepository.findById(existingCreature.getId())).thenReturn(Optional.of(existingCreature));

        assertThrows(RuntimeException.class,
                () ->creatureService.adoptCreature(existingCreature.getId(), "tutu"));


    }

    /** TODO
     * ajouter des tests sur creatureService.adoptCreature pour vérifier toutes les infos de la créature
     * modifier le code pour ne plus avoir d'exception mais une gestion propre des cas non possibles
      */


}