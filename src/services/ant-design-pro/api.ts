// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';
import { map } from '@umijs/utils/compiled/zod';

/** 获取当前的用户 GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 退出登录接口 POST /api/login/outLogin */
export async function outLogin(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/login/outLogin', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 登录接口 POST /api/login/account */
export async function login(body: API.LoginParams, options?: { [key: string]: any }) {
  return request<API.LoginResult>('/api/login/account', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/notices */
export async function getNotices(options?: { [key: string]: any }) {
  return request<API.NoticeIconList>('/api/notices', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/rule */
export async function rule(
  params: {
    // query
    /** 当前的页码 */
    current?: number;
    /** 页面的容量 */
    pageSize?: number;
    keyword?: string;
    data?:string;
    type?:string;
    customer?:string;
    begindate?:string;
    enddate?:string;
    createdate?:string;

  },
  options?: { [key: string]: any },
) {
  return request<API.RETINFO>('/api/deingManageSystem/queryProcessingDetails', {
    method: 'POST',
    // params: {
    //   ...params,
    // },
    headers: {
      'Content-Type': 'application/json',
    },
    data:{
      'dmscommon': {
        // 'serialno': 'f624097c-3a02-4c87-9b0a-afbf3268c897',
        'serialno': Math.floor(Math.random() * 100000000000000000000 + 1),
        "zoneno": "200",
        "service": "UserManage",
        "method": "userLogin",
        "logtype": "USERREGISTER",
        "department": "开发",
        "workdate": getNowDate(),
        "worktime": new Date().toTimeString().substring(0,8)
      },
      "private": {
        "begindate": params.begindate,
        "enddate": params.enddate,
        "type": params.type,
        "createdate": params.createdate,
        "customer": params.customer,
      }
    },
    ...(options || {}),
  });
}


/** 新建规则 PUT /api/rule */
export async function updateRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}

/** 新建规则 POST /api/rule */
export async function addRule(options?: { [key: string]: any }) {
  return request<API.RuleListItem>('/api/rule', {
    method: 'POST',
    ...(options || {}),
  });
}

/** 删除规则 DELETE /api/rule */
export async function removeRule(options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
function getNowDate(){
  const date = new Date();
  let month: string | number = date.getMonth() + 1;
  let strDate: string | number = date.getDate();

  if (month <= 9) {
    month = "0" + month;
  }

  if (strDate <= 9) {
    strDate = "0" + strDate;
  }

  return date.getFullYear() + "-" + month + "-" + strDate;
}
