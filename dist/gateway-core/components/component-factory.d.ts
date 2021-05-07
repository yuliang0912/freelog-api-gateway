import { IApplicationContext } from 'midway';
import { RouterComponentNameEnum } from '../../enum';
import { ICommonComponentHandler } from '../../interface';
export declare function adapterFactory(context: IApplicationContext): (gatewayComName: RouterComponentNameEnum) => ICommonComponentHandler;
