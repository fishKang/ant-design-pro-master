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
  },
  options?: { [key: string]: any },
) {
  return request<API.RuleList>('/api/deingManageSystem/queryProcessingDetails', {
    method: 'POST',
    // params: {
    //   ...params,
    // },
    headers: {
      'Content-Type': 'application/json',
    },
    data:{
      'dmscommon': {
        'serialno': 'f624097c-3a02-4c87-9b0a-afbf3268c897',
        "zoneno": "200",
        "service": "UserManage",
        "method": "userLogin",
        "logtype": "USERREGISTER",
        "department": "开发",
        "workdate": "2023-05-14",
        "worktime": "20:21:11"
      },
      "private": {
        "begindate": "1990-05-12",
        "enddate": "2023-05-12",
        "type": "线",
        "material": "羊绒",
        "createdate": "2023-05-12",
        "customer": "乔丹"
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
