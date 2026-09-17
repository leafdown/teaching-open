package org.jeecg.modules.teaching.service;

import org.jeecg.modules.teaching.BaseServiceTest;
import org.jeecg.modules.teaching.entity.TeachingCourseDept;
import org.jeecg.modules.teaching.mapper.TeachingCourseDeptMapper;
import org.jeecg.modules.teaching.service.impl.TeachingCourseDeptServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class TeachingCourseDeptServiceTest extends BaseServiceTest {
  @Mock private TeachingCourseDeptMapper teachingCourseDeptMapper;
  @InjectMocks private TeachingCourseDeptServiceImpl teachingCourseDeptService;
  private TeachingCourseDept testEntity;
  @Before
  public void setUp() {
    testEntity = new TeachingCourseDept();
    try { testEntity.getClass().getMethod("setId", String.class).invoke(testEntity, "test-123"); } catch (Exception e) {}
  }
  @Test public void testSave() { teachingCourseDeptService.save(testEntity); verify(teachingCourseDeptMapper).insert(testEntity); }
  @Test public void testGetById() { when(teachingCourseDeptMapper.selectById("test-123")).thenReturn(testEntity); teachingCourseDeptService.getById("test-123"); verify(teachingCourseDeptMapper).selectById("test-123"); }
  @Test public void testUpdate() { teachingCourseDeptService.updateById(testEntity); verify(teachingCourseDeptMapper).updateById(testEntity); }
  @Test public void testDelete() { teachingCourseDeptService.removeById("test-123"); verify(teachingCourseDeptMapper).deleteById("test-123"); }
}
