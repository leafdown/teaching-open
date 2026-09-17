package org.jeecg.modules.teaching.service;

import org.jeecg.modules.teaching.BaseServiceTest;
import org.jeecg.modules.teaching.entity.TeachingNews;
import org.jeecg.modules.teaching.mapper.TeachingNewsMapper;
import org.jeecg.modules.teaching.service.impl.TeachingNewsServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class TeachingNewsServiceTest extends BaseServiceTest {
  @Mock private TeachingNewsMapper teachingNewsMapper;
  @InjectMocks private TeachingNewsServiceImpl teachingNewsService;
  private TeachingNews testEntity;
  @Before
  public void setUp() {
    testEntity = new TeachingNews();
    try { testEntity.getClass().getMethod("setId", String.class).invoke(testEntity, "test-123"); } catch (Exception e) {}
  }
  @Test public void testSave() { teachingNewsService.save(testEntity); verify(teachingNewsMapper).insert(testEntity); }
  @Test public void testGetById() { when(teachingNewsMapper.selectById("test-123")).thenReturn(testEntity); teachingNewsService.getById("test-123"); verify(teachingNewsMapper).selectById("test-123"); }
  @Test public void testUpdate() { teachingNewsService.updateById(testEntity); verify(teachingNewsMapper).updateById(testEntity); }
  @Test public void testDelete() { teachingNewsService.removeById("test-123"); verify(teachingNewsMapper).deleteById("test-123"); }
}
