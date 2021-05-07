import {IApplicationContext, providerWrapper} from 'midway';
import {RouterComponentNameEnum} from '../../enum';
import {ICommonComponentHandler} from '../../interface';

export function adapterFactory(context: IApplicationContext) {
    return (gatewayComName: RouterComponentNameEnum): ICommonComponentHandler => {
        return context.get<ICommonComponentHandler>(`gateway_com_${gatewayComName}`);
    };
}

providerWrapper([
    {
        id: 'gatewayComHandlerFactory',
        provider: adapterFactory,
        scope: 'Singleton'
    }
]);
