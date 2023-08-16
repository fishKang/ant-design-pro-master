// @ts-ignore
/* eslint-disable */

declare namespace API {
  type CurrentUser = {
    name?: string;
    avatar?: string;
    userid?: string;
    email?: string;
    signature?: string;
    title?: string;
    group?: string;
    tags?: { key?: string; label?: string }[];
    notifyCount?: number;
    unreadCount?: number;
    country?: string;
    access?: string;
    geographic?: {
      province?: { label?: string; key?: string };
      city?: { label?: string; key?: string };
    };
    address?: string;
    phone?: string;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    currentAuthority?: string;
  };

  type LoginDmsResult = {
    success?: boolean;
    type?: string;
    currentAuthority?: string;
  };

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type RuleListItem = {
    key?: number;
    disabled?: boolean;
    href?: string;
    avatar?: string;
    name?: string;
    owner?: string;
    desc?: string;
    callNo?: number;
    status?: number;
    updatedAt?: string;
    createdAt?: string;
    progress?: number;
  };


  type RuleList = {
    data?: RuleListItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };


  type RETINFO={
    id?: number;
    createtime?: string;
    amount?: number;
    settlementvolume?: number;
    colorcode?: string;
    createdate?: string;
    remark?: string;
    type?: string;
    plannedvolume?: number;
    material?: string;
    price?: number;
    netweight?: number;
    outbounddate?: string;
    pricetype?: number;
    plan?: string;
    customer?: string;
    status?: number;
  }

  type Private={
    RETINFO?: RETINFO[];
    RETMSG?: string;
    RETCODE?: string;
  }

  type RootObject={
    RETINFO?: any;
    RETMSG?: string;
    RETCODE?: string;
    current?: number;
    /** 页面的容量 */
    data?: Private;
  }
  type FakeCaptcha = {
    code?: number;
    status?: string;
  };

  type LoginParams = {
    name?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };


  type ErrorResponse = {
    /** 业务约定的错误码 */
    errorCode: string;
    /** 业务上的错误信息 */
    errorMessage?: string;
    /** 业务上的请求是否成功 */
    success?: boolean;
  };

  type NoticeIconList = {
    data?: NoticeIconItem[];
    /** 列表的内容总数 */
    total?: number;
    success?: boolean;
  };

  type NoticeIconItemType = 'notification' | 'message' | 'event';

  type NoticeIconItem = {
    id?: string;
    extra?: string;
    key?: string;
    read?: boolean;
    avatar?: string;
    title?: string;
    status?: string;
    datetime?: string;
    description?: string;
    type?: NoticeIconItemType;
  };
}
