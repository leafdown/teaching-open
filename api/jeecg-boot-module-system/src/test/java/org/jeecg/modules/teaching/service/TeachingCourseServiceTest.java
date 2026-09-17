package org.jeecg.modules.teaching.service;

import org.jeecg.modules.teaching.BaseServiceTest;
import org.jeecg.modules.teaching.entity.TeachingCourse;
import org.jeecg.modules.teaching.mapper.TeachingCourseMapper;
import org.jeecg.modules.teaching.service.impl.TeachingCourseServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class TeachingCourseServiceTest extends BaseServiceTest {
  @Mock private TeachingCourseMapper teachingCourseMapper;
  @InjectMocks private TeachingCourseServiceImpl teachingCourseService;
  private TeachingCourse testEntity;
  @Before
  public void setUp() {
    testEntity = new TeachingCourse();
    try { testEntity.getClass().getMethod("setId", String.class).invoke(testEntity, "test-123"); } catch (Exception e) {}
  }
  @Test public void testSave() { teachingCourseService.save(testEntity); verify(teachingCourseMapper).insert(testEntity); }
  @Test public void testGetById() { when(teachingCourseMapper.selectById("test-123")).thenReturn(testEntity); teachingCourseService.getById("test-123"); verify(teachingCourseMapper).selectById("test-123"); }
  @Test public void testUpdate() { teachingCourseService.updateById(testEntity); verify(teachingCourseMapper).updateById(testEntity); }
  @Test public void testDelete() { teachingCourseService.removeById("test-123"); verify(teachingCourseMapper).deleteById("test-123"); }
}
