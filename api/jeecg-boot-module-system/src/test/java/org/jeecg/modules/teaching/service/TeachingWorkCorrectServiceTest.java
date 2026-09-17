package org.jeecg.modules.teaching.service;

import org.jeecg.modules.teaching.BaseServiceTest;
import org.jeecg.modules.teaching.entity.TeachingWorkCorrect;
import org.jeecg.modules.teaching.mapper.TeachingWorkCorrectMapper;
import org.jeecg.modules.teaching.service.impl.TeachingWorkCorrectServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class TeachingWorkCorrectServiceTest extends BaseServiceTest {
  @Mock private TeachingWorkCorrectMapper teachingWorkCorrectMapper;
  @InjectMocks private TeachingWorkCorrectServiceImpl teachingWorkCorrectService;
  private TeachingWorkCorrect testEntity;
  @Before
  public void setUp() {
    testEntity = new TeachingWorkCorrect();
    try { testEntity.getClass().getMethod("setId", String.class).invoke(testEntity, "test-123"); } catch (Exception e) {}
  }
  @Test public void testSave() { teachingWorkCorrectService.save(testEntity); verify(teachingWorkCorrectMapper).insert(testEntity); }
  @Test public void testGetById() { when(teachingWorkCorrectMapper.selectById("test-123")).thenReturn(testEntity); teachingWorkCorrectService.getById("test-123"); verify(teachingWorkCorrectMapper).selectById("test-123"); }
  @Test public void testUpdate() { teachingWorkCorrectService.updateById(testEntity); verify(teachingWorkCorrectMapper).updateById(testEntity); }
  @Test public void testDelete() { teachingWorkCorrectService.removeById("test-123"); verify(teachingWorkCorrectMapper).deleteById("test-123"); }
}
