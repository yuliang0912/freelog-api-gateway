"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subscription = require('egg').Subscription;
module.exports = class SyncGatewayConfigJob extends Subscription {
    static get schedule() {
        return {
            type: 'all',
            cron: '*/30 * * * * *',
            immediate: true,
            disable: false
        };
    }
    //定时同步DB中的路由信息到内存中,由于数据量不大,所以全部拉取
    //获取数据后,发送路由信息到所有的cluster-app上,然后每个子进程都同步一份
    async subscribe() {
        const gatewayService = this.app.applicationContext.get('gatewayService');
        await gatewayService.updateRouterConfig().then(result => {
            if (!result) {
                console.log('同步失败');
            }
        }).catch(error => {
            console.log('路由配置同步异常.', error, '================end======================');
        });
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3luYy1nYXRld2F5LWNvbmZpZy1qb2IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL3NjaGVkdWxlL3N5bmMtZ2F0ZXdheS1jb25maWctam9iLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBTSxZQUFZLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLFlBQVksQ0FBQztBQUVqRCxNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sb0JBQXFCLFNBQVEsWUFBWTtJQUU1RCxNQUFNLEtBQUssUUFBUTtRQUNmLE9BQU87WUFDSCxJQUFJLEVBQUUsS0FBSztZQUNYLElBQUksRUFBRSxnQkFBZ0I7WUFDdEIsU0FBUyxFQUFFLElBQUk7WUFDZixPQUFPLEVBQUUsS0FBSztTQUNqQixDQUFDO0lBQ04sQ0FBQztJQUVELGlDQUFpQztJQUNqQywyQ0FBMkM7SUFDM0MsS0FBSyxDQUFDLFNBQVM7UUFDWCxNQUFNLGNBQWMsR0FBb0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMxRixNQUFNLGNBQWMsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNwRCxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7YUFDdkI7UUFDTCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDYixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsMkNBQTJDLENBQUMsQ0FBQztRQUNqRixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDSixDQUFDIn0=