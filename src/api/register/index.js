import request from '@/utils/request'
//预约挂号-左边显示
export const listSourceByDay = (params) => {
    return request({
        method: 'get',
        url: '/sto/appointment/listSourceByDay',
        params
    });
}

//预约挂号-右边显示-显示订单信息
export const listOrderByDay = (params) => {
    return request({
        method: 'get',
        url: '/sto/appointment/listOrderByDay',
        params
    });
}

//获取会员信息
export const listUser = (params) => {
    return request({
        method: 'get',
        url: '/sto/appoint/query-user',
        params
    });
}
//获取患者详情
export const getAppointUser = (params) => {
    return request({
        method: 'get',
        url: '/sto/appointment/getAppointUser',
        params
    });
}
//收费-右边明细-获取会员资料-根据机构id和身份证号码查询患者信息
export const getAppointUserByCertno = (params) => {
    return request({
        method: 'get',
        url: '/sto/appointment/getAppointUserByCertno',
        params
    });
}
//挂号-弹框显示可挂号的医生等明细
export const listRegister = (params) => {
    return request({
        method: 'get',
        url: '/sto/appoint/source-today-new',
        params
    });
}

//预约-弹框显示可预约的医生等明细
export const listSource = (params) => {
    return request({
        method: 'get',
        url: '/sto/appointment/source',
        params
    });
}

//挂号-完成挂号  scene-register-define.ftl -- 386
export const offer = (params) => {
    return request({
        method: 'post',
        url: '/sto/appoint/saveOffer',
        params
    });
}
//预约-签到
export const offerReg = (params) => {
    return request({
        method: 'post',
        url: '/sto/appointment/offer',
        params
    });
}

//新增就诊人信息,若是信息不存在则新增-- scene-appoint-define.ftl -- 290
export const saveUser = (params) => {
    return request({
        method: 'post',
        url: '/sto/appoint/add-user',
        params
    });
}
export const updateUser = (params) => {
    return request({
        method: 'post',
        url: '/sto/appoint/update-user',
        params
    });
}

//预约挂号 弹框-来源
export const listType = (params) => {
    return request({
        method: 'get',
        url: '/sto/appoint/getType',
        params
    });
}

//预约挂号 预约-弹框-时间段选择
export const listAppointTime = (params) => {
    return request({
        method: 'get',
        url: '/sto/appointment/appointTime',
        params
    });
}

//预约挂号 预约-弹框-时间段选择
export const payType = (params) => {
    return request({
        method: 'get',
        url: '/sto/vc/payType',
        params
    });
}

//预约挂号-取消预约
export const cancel = (params) => {
    return request({
        method: 'post',
        url: '/sto/appointment/cancel',
        params
    });
}

//预约挂号-查询复诊次数
export const getClinicNum = (params) => {
    return request({
        method: 'get',
        url: '/sto/clinic/getClinicNum',
        params
    });
}

//查询费用项目
export const listInspection = (params) => {
    return request({
        method: 'get',
        url: '/sto/clinic/listInspection',
        params
    });
}

//显示会员卡/储值信息
export const getVcMem = (params) => {
    return request({
        method: 'get',
        url: '/sto/clinic/getVcMem',
        params
    });
}
//校验储值密码
export const checkPwd = (params) => {
    return request({
        method: 'get',
        url: '/sto/clinic/checkPwd',
        params
    });
}

//获取医保读卡信息
export const listReadCard = (params) => {
    return request({
        method: 'get',
        url: '/sto/appoint/listReadCard',
        params
    });
}
//根据orderNo查询读卡记录
export const getReadCard = (params) => {
    return request({
        method: 'get',
        url: '/sto/appoint/getReadCard',
        params
    });
}
//查询医保字典-广东医保
export const listGdYbType = (params) => {
    return request({
        method: 'get',
        url: '/sto/appoint/listGdYbType',
        params
    });
}
//医保挂号
export const getYbGh = (params) => {
    return request({
        method: 'post',
        url: '/sto/gdyb/down/yb_appoint',
        params
    });
}
//医保挂号-费用明细上传
export const getYbGhUp = (params) => {
    return request({
        method: 'post',
        url: '/sto/gdyb/down/yb_appoint_upload',
        params
    });
}
//医保挂号-预结算
export const getYbGhPlan = (params) => {
    return request({
        method: 'post',
        url: '/sto/gdyb/down/yb_appoint_plan_setter',
        params
    });
}
//医保挂号-结算
export const getYbGhSetter = (params) => {
    return request({
        method: 'post',
        url: '/sto/gdyb/down/yb_appoint_setter',
        params
    });
}
//根据类型从数据库获取字典列表
export const getDict = (params) => {
    return request({
        method: 'get',
        url: '/sto/gdyb/down/get_dict',
        params
    });
}


// 医保参保人密码验证
export const checkYbPw = (params) => {
    return request({
        method: 'post',
        url: '/sto/gdyb/down/checkYbPw',
        params
    });
}
