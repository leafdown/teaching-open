package org.jeecg.modules.teaching.service;

import org.jeecg.modules.teaching.BaseServiceTest;
import org.jeecg.modules.teaching.entity.TeachingMenu;
import org.jeecg.modules.teaching.mapper.TeachingMenuMapper;
import org.jeecg.modules.teaching.service.impl.TeachingMenuServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class TeachingMenuServiceTest extends BaseServiceTest {
  @Mock private TeachingMenuMapper teachingMenuMapper;
  @InjectMocks private TeachingMenuServiceImpl teachingMenuService;
  private TeachingMenu testEntity;
  @Before
  public void setUp() {
    testEntity = new TeachingMenu();
    try { testEntity.getClass().getMethod("setId", String.class).invoke(testEntity, "test-123"); } catch (Exception e) {}
  }
  @Test public void testSave() { teachingMenuService.save(testEntity); verify(teachingMenuMapper).insert(testEntity); }
  @Test public void testGetById() { when(teachingMenuMapper.selectById("test-123")).thenReturn(testEntity); teachingMenuService.getById("test-123"); verify(teachingMenuMapper).selectById("test-123"); }
  @Test public void testUpdate() { teachingMenuService.updateById(testEntity); verify(teachingMenuMapper).updateById(testEntity); }
  @Test public void testDelete() { teachingMenuService.removeById("test-123"); verify(teachingMenuMapper).deleteById("test-123"); }
}
