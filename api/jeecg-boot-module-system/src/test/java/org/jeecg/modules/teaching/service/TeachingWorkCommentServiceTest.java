package org.jeecg.modules.teaching.service;

import org.jeecg.modules.teaching.BaseServiceTest;
import org.jeecg.modules.teaching.entity.TeachingWorkComment;
import org.jeecg.modules.teaching.mapper.TeachingWorkCommentMapper;
import org.jeecg.modules.teaching.service.impl.TeachingWorkCommentServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class TeachingWorkCommentServiceTest extends BaseServiceTest {
  @Mock private TeachingWorkCommentMapper teachingWorkCommentMapper;
  @InjectMocks private TeachingWorkCommentServiceImpl teachingWorkCommentService;
  private TeachingWorkComment testEntity;
  @Before
  public void setUp() {
    testEntity = new TeachingWorkComment();
    try { testEntity.getClass().getMethod("setId", String.class).invoke(testEntity, "test-123"); } catch (Exception e) {}
  }
  @Test public void testSave() { teachingWorkCommentService.save(testEntity); verify(teachingWorkCommentMapper).insert(testEntity); }
  @Test public void testGetById() { when(teachingWorkCommentMapper.selectById("test-123")).thenReturn(testEntity); teachingWorkCommentService.getById("test-123"); verify(teachingWorkCommentMapper).selectById("test-123"); }
  @Test public void testUpdate() { teachingWorkCommentService.updateById(testEntity); verify(teachingWorkCommentMapper).updateById(testEntity); }
  @Test public void testDelete() { teachingWorkCommentService.removeById("test-123"); verify(teachingWorkCommentMapper).deleteById("test-123"); }
}
