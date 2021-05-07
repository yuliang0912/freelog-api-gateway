export enum RouterComponentLevelEnum {
    RequestBefore = 'RequestBefore',
    InProcessing = 'PnProcessing',
    ResponseAfter = 'ResponseAfter'
}

export enum RouterComponentTypeEnum {
    /**
     * 认证
     */
    Authentication = 'authentication',
    /**
     * 授权
     */
    Authorization = 'authorization',
    /**
     * 统计
     */
    Statistics = 'statistics'
}

export enum RouterComponentNameEnum {

    Client_Authentication = 'client',

    Client_Internal_Identity_Authentication = 'client-internal-identity',

    IP_Black_White_List_Authentication = 'ip-black-white-list',

    JWT_Authentication = 'jwt',

    JWT_Node_Authentication = 'jwt-node',

    Null_Identity_Authentication = 'null-identity',

    Refuse_All_Request_Authorization = 'refuse-all-request',

    AdminAccountAuthorization = 'admin-account',

    Traffic_Statistics = 'traffic-statistics',

    Request_record = 'request-record'
}
