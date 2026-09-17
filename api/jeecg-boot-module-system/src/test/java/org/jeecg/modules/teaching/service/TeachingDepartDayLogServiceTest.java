package org.jeecg.modules.teaching.service;

import org.jeecg.modules.teaching.BaseServiceTest;
import org.jeecg.modules.teaching.entity.TeachingDepartDayLog;
import org.jeecg.modules.teaching.mapper.TeachingDepartDayLogMapper;
import org.jeecg.modules.teaching.service.impl.TeachingDepartDayLogServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class TeachingDepartDayLogServiceTest extends BaseServiceTest {
  @Mock private TeachingDepartDayLogMapper teachingDepartDayLogMapper;
  @InjectMocks private TeachingDepartDayLogServiceImpl teachingDepartDayLogService;
  private TeachingDepartDayLog testEntity;
  @Before
  public void setUp() {
    testEntity = new TeachingDepartDayLog();
    try { testEntity.getClass().getMethod("setId", String.class).invoke(testEntity, "test-123"); } catch (Exception e) {}
  }
  @Test public void testSave() { teachingDepartDayLogService.save(testEntity); verify(teachingDepartDayLogMapper).insert(testEntity); }
  @Test public void testGetById() { when(teachingDepartDayLogMapper.selectById("test-123")).thenReturn(testEntity); teachingDepartDayLogService.getById("test-123"); verify(teachingDepartDayLogMapper).selectById("test-123"); }
  @Test public void testUpdate() { teachingDepartDayLogService.updateById(testEntity); verify(teachingDepartDayLogMapper).updateById(testEntity); }
  @Test public void testDelete() { teachingDepartDayLogService.removeById("test-123"); verify(teachingDepartDayLogMapper).deleteById("test-123"); }
}
