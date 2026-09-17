package org.jeecg.modules.teaching.controller;

import org.jeecg.modules.teaching.BaseControllerTest;
import org.junit.Test;
import org.springframework.http.MediaType;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class TeachingMenuControllerTest extends BaseControllerTest {

  @Test
  public void testHealthCheck() throws Exception {
    mockMvc.perform(get("/teaching/teachingNews/newsList")
        .contentType(MediaType.APPLICATION_JSON))
      .andExpect(status().isOk());
  }
}
