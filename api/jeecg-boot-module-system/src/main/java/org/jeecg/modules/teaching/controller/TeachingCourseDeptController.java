package org.jeecg.modules.teaching.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jeecg.common.api.vo.Result;
import org.jeecg.common.system.query.QueryGenerator;
import org.jeecg.common.util.oConvertUtils;
import org.jeecg.modules.teaching.entity.TeachingCourseDept;
import org.jeecg.modules.teaching.enums.DepartDayLogType;
import org.jeecg.modules.teaching.model.CourseDeptModel;
import org.jeecg.modules.teaching.service.ITeachingCourseDeptService;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;

import org.jeecg.modules.teaching.service.ITeachingDepartDayLogService;
import org.jeecg.modules.teaching.vo.DepartCourseVO;
import org.jeecgframework.poi.excel.ExcelImportUtil;
import org.jeecgframework.poi.excel.def.NormalExcelConstants;
import org.jeecgframework.poi.excel.entity.ExportParams;
import org.jeecgframework.poi.excel.entity.ImportParams;
import org.jeecgframework.poi.excel.view.JeecgEntityExcelView;
import org.jeecg.common.system.base.controller.JeecgController;
import org.jeecg.common.aspect.annotation.AutoLog;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import com.alibaba.fastjson.JSON;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

 /**
 * @Description: 班级课程表
 * @Author: jeecg-boot
 * @Date:   2020-04-14
 * @Version: V1.0
 */
@Api(tags="班级课程表")
@RestController
@RequestMapping("/teaching/teachingCourseDept")
@Slf4j
public class TeachingCourseDeptController extends JeecgController<TeachingCourseDept, ITeachingCourseDeptService> {
	@Autowired
	private ITeachingCourseDeptService teachingCourseDeptService;
	@Autowired
	private ITeachingDepartDayLogService teachingDepartDayLogService;
	
	/**
	 * 分页列表查询
	 *
	 * @param teachingCourseDept
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	@AutoLog(value = "班级课程表-分页列表查询")
	@ApiOperation(value="班级课程表-分页列表查询", notes="班级课程表-分页列表查询")
	@GetMapping(value = "/list")
	@RequiresPermissions("teaching:courseDept:list")
	public Result<?> queryPageList(CourseDeptModel teachingCourseDept,
														@RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
														@RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
														HttpServletRequest req) {
		// list 为三表 join,多表都有 create_time;前端默认排序会产生 ambiguous order clause,
		// 统一限定为课程班级表的列
		Map<String, String[]> params = new HashMap<>(req.getParameterMap());
		if (params.containsKey("column")) {
			String col = params.get("column")[0];
			if ("createTime".equals(col) || "create_time".equals(col)) {
				params.put("column", new String[]{"teaching_course_dept.create_time"});
			}
		}
		QueryWrapper<CourseDeptModel> queryWrapper = QueryGenerator.initQueryWrapper(teachingCourseDept, params);
		Page<CourseDeptModel> page = new Page<CourseDeptModel>(pageNo, pageSize);
		IPage<CourseDeptModel> pageList = teachingCourseDeptService.list(page, queryWrapper);
		return Result.ok(pageList);
	}

	 @PostMapping(value = "/addOrUpdate")
	 @RequiresPermissions("teaching:courseDept:edit")
	 public Result<TeachingCourseDept> addOrUpdate(@RequestBody DepartCourseVO departCourseVO) {
		 Result<TeachingCourseDept> result = new Result<TeachingCourseDept>();
		 try {
			 String sysDepId = departCourseVO.getDeptId();
			 for(String courseId:departCourseVO.getCourseIdList()) {
				 TeachingCourseDept teachingCourseDept = new TeachingCourseDept();
				 teachingCourseDept.setCourseId(courseId);
				 teachingCourseDept.setDeptId(sysDepId);
				 QueryWrapper<TeachingCourseDept> queryWrapper = new QueryWrapper<TeachingCourseDept>();
				 queryWrapper.eq("dept_id", sysDepId).eq("course_id",courseId);
				 TeachingCourseDept one = teachingCourseDeptService.getOne(queryWrapper);
				 if(one==null){
					 teachingCourseDeptService.save(teachingCourseDept);
				 }else{
					 teachingCourseDept.setId(one.getId());
					 teachingCourseDeptService.updateById(teachingCourseDept);
				 }
			 }
			 result.success("操作成功！");
		 } catch (Exception e) {
			 log.error(e.getMessage(),e);
			 result.error500("操作失败");
		 }
		 return result;
	 }

	/**
	 *   添加
	 *
	 * @param teachingCourseDept
	 * @return
	 */
	@AutoLog(value = "班级课程表-添加")
	@ApiOperation(value="班级课程表-添加", notes="班级课程表-添加")
	@PostMapping(value = "/add")
	@RequiresPermissions("teaching:courseDept:add")
	public Result<?> add(@RequestBody TeachingCourseDept teachingCourseDept) {
		teachingCourseDeptService.save(teachingCourseDept);
		return Result.ok("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param teachingCourseDept
	 * @return
	 */
	@AutoLog(value = "班级课程表-编辑")
	@ApiOperation(value="班级课程表-编辑", notes="班级课程表-编辑")
	@PutMapping(value = "/edit")
	@RequiresPermissions("teaching:courseDept:edit")
	public Result<?> edit(@RequestBody TeachingCourseDept teachingCourseDept) {
		teachingCourseDeptService.updateById(teachingCourseDept);
		return Result.ok("编辑成功!");
	}
	
	/**
	 *   通过id删除
	 *
	 * @param id
	 * @return
	 */
	@AutoLog(value = "班级课程表-通过id删除")
	@ApiOperation(value="班级课程表-通过id删除", notes="班级课程表-通过id删除")
	@DeleteMapping(value = "/delete")
	@RequiresPermissions("teaching:courseDept:delete")
	public Result<?> delete(@RequestParam(name="id",required=true) String id) {
		teachingCourseDeptService.removeById(id);
		return Result.ok("删除成功!");
	}
	
	/**
	 *  批量删除
	 *
	 * @param ids
	 * @return
	 */
	@AutoLog(value = "班级课程表-批量删除")
	@ApiOperation(value="班级课程表-批量删除", notes="班级课程表-批量删除")
	@DeleteMapping(value = "/deleteBatch")
	@RequiresPermissions("teaching:courseDept:delete")
	public Result<?> deleteBatch(@RequestParam(name="ids",required=true) String ids) {
		this.teachingCourseDeptService.removeByIds(Arrays.asList(ids.split(",")));
		return Result.ok("批量删除成功!");
	}
	
	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	@AutoLog(value = "班级课程表-通过id查询")
	@ApiOperation(value="班级课程表-通过id查询", notes="班级课程表-通过id查询")
	@GetMapping(value = "/queryById")
	@RequiresPermissions("teaching:courseDept:query")
	public Result<?> queryById(@RequestParam(name="id",required=true) String id) {
		TeachingCourseDept teachingCourseDept = teachingCourseDeptService.getById(id);
		if(teachingCourseDept==null) {
			return Result.error("未找到对应数据");
		}
		return Result.ok(teachingCourseDept);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param teachingCourseDept
    */
    @RequestMapping(value = "/exportXls")
    @RequiresPermissions("teaching:courseDept:export")
    public ModelAndView exportXls(HttpServletRequest request, TeachingCourseDept teachingCourseDept) {
        return super.exportXls(request, teachingCourseDept, TeachingCourseDept.class, "班级课程表");
    }

    /**
      * 通过excel导入数据
    *
    * @param request
    * @param response
    * @return
    */
    @RequestMapping(value = "/importExcel", method = RequestMethod.POST)
    @RequiresPermissions("teaching:courseDept:import")
    public Result<?> importExcel(HttpServletRequest request, HttpServletResponse response) {
        return super.importExcel(request, response, TeachingCourseDept.class);
    }

}
