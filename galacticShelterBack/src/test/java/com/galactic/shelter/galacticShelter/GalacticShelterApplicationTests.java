package com.galactic.shelter.galacticShelter;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.galactic.shelter.galacticShelter.model.Creature;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql("/test-data.sql")
class GalacticShelterApplicationTests {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private ObjectMapper objectMapper;

	// un joli commentaire inutile
	@Test
	void contextLoads() throws Exception {
		MvcResult result = mockMvc.perform(get("/creatures")
						.contentType(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
				.andReturn();
		String json = result.getResponse().getContentAsString();

		List<Creature> creatures= objectMapper.readValue(
				json,
				new TypeReference<List<Creature>>() {}
		);

		assertEquals(6, creatures.size());

	}

}
