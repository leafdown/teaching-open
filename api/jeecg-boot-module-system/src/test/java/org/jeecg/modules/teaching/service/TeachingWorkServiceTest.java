package org.jeecg.modules.teaching.service;

import org.jeecg.modules.teaching.BaseServiceTest;
import org.jeecg.modules.teaching.entity.TeachingWork;
import org.jeecg.modules.teaching.mapper.TeachingWorkMapper;
import org.jeecg.modules.teaching.service.impl.TeachingWorkServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class TeachingWorkServiceTest extends BaseServiceTest {
  @Mock private TeachingWorkMapper teachingWorkMapper;
  @InjectMocks private TeachingWorkServiceImpl teachingWorkService;
  private TeachingWork testEntity;
  @Before
  public void setUp() {
    testEntity = new TeachingWork();
    try { testEntity.getClass().getMethod("setId", String.class).invoke(testEntity, "test-123"); } catch (Exception e) {}
  }
  @Test public void testSave() { teachingWorkService.save(testEntity); verify(teachingWorkMapper).insert(testEntity); }
  @Test public void testGetById() { when(teachingWorkMapper.selectById("test-123")).thenReturn(testEntity); teachingWorkService.getById("test-123"); verify(teachingWorkMapper).selectById("test-123"); }
  @Test public void testUpdate() { teachingWorkService.updateById(testEntity); verify(teachingWorkMapper).updateById(testEntity); }
  @Test public void testDelete() { teachingWorkService.removeById("test-123"); verify(teachingWorkMapper).deleteById("test-123"); }
}
