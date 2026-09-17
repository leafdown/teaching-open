package org.jeecg.modules.teaching.service;

import org.jeecg.modules.teaching.BaseServiceTest;
import org.jeecg.modules.teaching.entity.TeachingScratchAssets;
import org.jeecg.modules.teaching.mapper.TeachingScratchAssetsMapper;
import org.jeecg.modules.teaching.service.impl.TeachingScratchAssetsServiceImpl;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class TeachingScratchAssetsServiceTest extends BaseServiceTest {
  @Mock private TeachingScratchAssetsMapper teachingScratchAssetsMapper;
  @InjectMocks private TeachingScratchAssetsServiceImpl teachingScratchAssetsService;
  private TeachingScratchAssets testEntity;
  @Before
  public void setUp() {
    testEntity = new TeachingScratchAssets();
    try { testEntity.getClass().getMethod("setId", String.class).invoke(testEntity, "test-123"); } catch (Exception e) {}
  }
  @Test public void testSave() { teachingScratchAssetsService.save(testEntity); verify(teachingScratchAssetsMapper).insert(testEntity); }
  @Test public void testGetById() { when(teachingScratchAssetsMapper.selectById("test-123")).thenReturn(testEntity); teachingScratchAssetsService.getById("test-123"); verify(teachingScratchAssetsMapper).selectById("test-123"); }
  @Test public void testUpdate() { teachingScratchAssetsService.updateById(testEntity); verify(teachingScratchAssetsMapper).updateById(testEntity); }
  @Test public void testDelete() { teachingScratchAssetsService.removeById("test-123"); verify(teachingScratchAssetsMapper).deleteById("test-123"); }
}
