package org.jeecg.modules.teaching.service;

import org.jeecg.modules.teaching.BaseServiceTest;
import org.jeecg.modules.teaching.entity.TeachingAdditionalWork;
import org.jeecg.modules.teaching.mapper.TeachingAdditionalWorkMapper;
import org.jeecg.modules.teaching.service.impl.TeachingAdditionalWorkServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class TeachingAdditionalWorkServiceTest extends BaseServiceTest {
  @Mock private TeachingAdditionalWorkMapper teachingAdditionalWorkMapper;
  @InjectMocks private TeachingAdditionalWorkServiceImpl teachingAdditionalWorkService;
  private TeachingAdditionalWork testEntity;
  @Before
  public void setUp() {
    testEntity = new TeachingAdditionalWork();
    try { testEntity.getClass().getMethod("setId", String.class).invoke(testEntity, "test-123"); } catch (Exception e) {}
  }
  @Test public void testSave() { teachingAdditionalWorkService.save(testEntity); verify(teachingAdditionalWorkMapper).insert(testEntity); }
  @Test public void testGetById() { when(teachingAdditionalWorkMapper.selectById("test-123")).thenReturn(testEntity); teachingAdditionalWorkService.getById("test-123"); verify(teachingAdditionalWorkMapper).selectById("test-123"); }
  @Test public void testUpdate() { teachingAdditionalWorkService.updateById(testEntity); verify(teachingAdditionalWorkMapper).updateById(testEntity); }
  @Test public void testDelete() { teachingAdditionalWorkService.removeById("test-123"); verify(teachingAdditionalWorkMapper).deleteById("test-123"); }
}
