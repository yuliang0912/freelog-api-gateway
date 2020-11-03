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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9lbnVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLElBQVksd0JBSVg7QUFKRCxXQUFZLHdCQUF3QjtJQUNoQywyREFBK0IsQ0FBQTtJQUMvQix5REFBNkIsQ0FBQTtJQUM3QiwyREFBK0IsQ0FBQTtBQUNuQyxDQUFDLEVBSlcsd0JBQXdCLEdBQXhCLGdDQUF3QixLQUF4QixnQ0FBd0IsUUFJbkM7QUFFRCxJQUFZLHVCQWFYO0FBYkQsV0FBWSx1QkFBdUI7SUFDL0I7O09BRUc7SUFDSCw0REFBaUMsQ0FBQTtJQUNqQzs7T0FFRztJQUNILDBEQUErQixDQUFBO0lBQy9COztPQUVHO0lBQ0gsb0RBQXlCLENBQUE7QUFDN0IsQ0FBQyxFQWJXLHVCQUF1QixHQUF2QiwrQkFBdUIsS0FBdkIsK0JBQXVCLFFBYWxDO0FBRUQsSUFBWSx1QkFtQlg7QUFuQkQsV0FBWSx1QkFBdUI7SUFFL0IsMkRBQWdDLENBQUE7SUFFaEMsK0ZBQW9FLENBQUE7SUFFcEUscUZBQTBELENBQUE7SUFFMUQscURBQTBCLENBQUE7SUFFMUIsK0RBQW9DLENBQUE7SUFFcEMseUVBQThDLENBQUE7SUFFOUMsa0ZBQXVELENBQUE7SUFFdkQsb0VBQXlDLENBQUE7SUFFekMsNERBQWlDLENBQUE7QUFDckMsQ0FBQyxFQW5CVyx1QkFBdUIsR0FBdkIsK0JBQXVCLEtBQXZCLCtCQUF1QixRQW1CbEMifQ==