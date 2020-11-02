"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterComponentNameEnum = exports.RouterComponentTypeEnum = exports.RouterComponentLevelEnum = void 0;
var RouterComponentLevelEnum;
(function (RouterComponentLevelEnum) {
    RouterComponentLevelEnum["RequestBefore"] = "RequestBefore";
    RouterComponentLevelEnum["InProcessing"] = "PnProcessing";
    RouterComponentLevelEnum["ResponseAfter"] = "ResponseAfter";
})(RouterComponentLevelEnum = exports.RouterComponentLevelEnum || (exports.RouterComponentLevelEnum = {}));
var RouterComponentTypeEnum;
(function (RouterComponentTypeEnum) {
    /**
     * 认证
     */
    RouterComponentTypeEnum["Authentication"] = "authentication";
    /**
     * 授权
     */
    RouterComponentTypeEnum["Authorization"] = "authorization";
    /**
     * 统计
     */
    RouterComponentTypeEnum["Statistics"] = "statistics";
})(RouterComponentTypeEnum = exports.RouterComponentTypeEnum || (exports.RouterComponentTypeEnum = {}));
var RouterComponentNameEnum;
(function (RouterComponentNameEnum) {
    RouterComponentNameEnum["Client_Authentication"] = "client";
    RouterComponentNameEnum["Client_Internal_Identity_Authentication"] = "client-internal-identity";
    RouterComponentNameEnum["IP_Black_White_List_Authentication"] = "ip-black-white-list";
    RouterComponentNameEnum["JWT_Authentication"] = "jwt";
    RouterComponentNameEnum["JWT_Node_Authentication"] = "jwt-node";
    RouterComponentNameEnum["Null_Identity_Authentication"] = "null-identity";
    RouterComponentNameEnum["Refuse_All_Request_Authorization"] = "refuse-all-request";
    RouterComponentNameEnum["Traffic_Statistics"] = "traffic-statistics";
    RouterComponentNameEnum["Request_record"] = "request-record";
})(RouterComponentNameEnum = exports.RouterComponentNameEnum || (exports.RouterComponentNameEnum = {}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL2VudW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsSUFBWSx3QkFJWDtBQUpELFdBQVksd0JBQXdCO0lBQ2hDLDJEQUErQixDQUFBO0lBQy9CLHlEQUE2QixDQUFBO0lBQzdCLDJEQUErQixDQUFBO0FBQ25DLENBQUMsRUFKVyx3QkFBd0IsR0FBeEIsZ0NBQXdCLEtBQXhCLGdDQUF3QixRQUluQztBQUVELElBQVksdUJBYVg7QUFiRCxXQUFZLHVCQUF1QjtJQUMvQjs7T0FFRztJQUNILDREQUFpQyxDQUFBO0lBQ2pDOztPQUVHO0lBQ0gsMERBQStCLENBQUE7SUFDL0I7O09BRUc7SUFDSCxvREFBeUIsQ0FBQTtBQUM3QixDQUFDLEVBYlcsdUJBQXVCLEdBQXZCLCtCQUF1QixLQUF2QiwrQkFBdUIsUUFhbEM7QUFFRCxJQUFZLHVCQW1CWDtBQW5CRCxXQUFZLHVCQUF1QjtJQUUvQiwyREFBZ0MsQ0FBQTtJQUVoQywrRkFBb0UsQ0FBQTtJQUVwRSxxRkFBMEQsQ0FBQTtJQUUxRCxxREFBMEIsQ0FBQTtJQUUxQiwrREFBb0MsQ0FBQTtJQUVwQyx5RUFBOEMsQ0FBQTtJQUU5QyxrRkFBdUQsQ0FBQTtJQUV2RCxvRUFBeUMsQ0FBQTtJQUV6Qyw0REFBaUMsQ0FBQTtBQUNyQyxDQUFDLEVBbkJXLHVCQUF1QixHQUF2QiwrQkFBdUIsS0FBdkIsK0JBQXVCLFFBbUJsQyJ9