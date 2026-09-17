package org.jeecg.modules.teaching.service;

import org.jeecg.modules.teaching.BaseServiceTest;
import org.jeecg.modules.teaching.entity.TeachingCourseUnit;
import org.jeecg.modules.teaching.mapper.TeachingCourseUnitMapper;
import org.jeecg.modules.teaching.service.impl.TeachingCourseUnitServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class TeachingCourseUnitServiceTest extends BaseServiceTest {
  @Mock private TeachingCourseUnitMapper teachingCourseUnitMapper;
  @InjectMocks private TeachingCourseUnitServiceImpl teachingCourseUnitService;
  private TeachingCourseUnit testEntity;
  @Before
  public void setUp() {
    testEntity = new TeachingCourseUnit();
    try { testEntity.getClass().getMethod("setId", String.class).invoke(testEntity, "test-123"); } catch (Exception e) {}
  }
  @Test public void testSave() { teachingCourseUnitService.save(testEntity); verify(teachingCourseUnitMapper).insert(testEntity); }
  @Test public void testGetById() { when(teachingCourseUnitMapper.selectById("test-123")).thenReturn(testEntity); teachingCourseUnitService.getById("test-123"); verify(teachingCourseUnitMapper).selectById("test-123"); }
  @Test public void testUpdate() { teachingCourseUnitService.updateById(testEntity); verify(teachingCourseUnitMapper).updateById(testEntity); }
  @Test public void testDelete() { teachingCourseUnitService.removeById("test-123"); verify(teachingCourseUnitMapper).deleteById("test-123"); }
}
