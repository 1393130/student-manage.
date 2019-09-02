import request from '@/utils/request';

// 注册接口
export let register = (code:any)=>{
  return request.post('/teacher/register', code);
}

//登录接口:
export let login = (code:any)=>{
  return request.post('/teacher/login', code);
}

//检查用户登录信息：
export let checkUser = ()=>{
  return request.get('/teacher/checkuser');
}

//获取用户列表：
export let userList = ()=>{
  return request.get('/teacher/userlist');
}

//班级列表：
export let classList = ()=>{
  return request.get('/class/lists');
}

//创建班级
export let createClass = (code:any)=>{
  return request.put('/class/create',code);
}

//添加重点学生：
export let createStudent = (code:any)=>{
  return request.put('/student/add',code);
}

//获取某一个班级的重点学生名单：student/lists
export let studentList = (params:any)=>{
  return request.get('/student/lists',{params});
}

//给某一学生添加成绩
export let addGrade = (code:any)=>{
  return request.put('/student/addrecord',code);
}

//获取成绩列表
export let gradeList = (params:any)=>{
  return request.get('/student/recordlists',{params});
}

//修改成绩
export let modifyInfo = (params:any)=>{
  return request.post('/student/modifyrecord',params);
}