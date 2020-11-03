"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adapterFactory = void 0;
const midway_1 = require("midway");
function adapterFactory(context) {
    return (gatewayComName) => {
        return context.get(`gateway_com_${gatewayComName}`);
    };
}
exports.adapterFactory = adapterFactory;
midway_1.providerWrapper([
    {
        id: 'gatewayComHandlerFactory',
        provider: adapterFactory,
        scope: 'Singleton'
    }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcG9uZW50LWZhY3RvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZ2F0ZXdheS1jb3JlL2NvbXBvbmVudHMvY29tcG9uZW50LWZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQTREO0FBSTVELFNBQWdCLGNBQWMsQ0FBQyxPQUE0QjtJQUN2RCxPQUFPLENBQUMsY0FBdUMsRUFBMkIsRUFBRTtRQUN4RSxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQTBCLGVBQWUsY0FBYyxFQUFFLENBQUMsQ0FBQztJQUNqRixDQUFDLENBQUM7QUFDTixDQUFDO0FBSkQsd0NBSUM7QUFFRCx3QkFBZSxDQUFDO0lBQ1o7UUFDSSxFQUFFLEVBQUUsMEJBQTBCO1FBQzlCLFFBQVEsRUFBRSxjQUFjO1FBQ3hCLEtBQUssRUFBRSxXQUFXO0tBQ3JCO0NBQ0osQ0FBQyxDQUFDIn0=