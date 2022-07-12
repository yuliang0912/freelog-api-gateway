import {scope, provide, ScopeEnum} from 'midway';
import {isEqual, isObject} from 'lodash';
import {IIdentityTransmit} from '../../interface';
import {FreelogContext, GatewayUserFreezeError} from 'egg-freelog-base';

@scope(ScopeEnum.Singleton)
@provide()
export class identityTransmit implements IIdentityTransmit {

    transmit(ctx: FreelogContext): void {
        const identityInfo = ctx.gatewayInfo.identityInfo ?? {};
        if (identityInfo.userInfo?.status === 1) {
            new GatewayUserFreezeError('用户已被冻结,无法访问');
        }
        if (!isEqual(identityInfo, {}) && isObject(identityInfo)) {
            ctx.headers['auth-token'] = Buffer.from(JSON.stringify(identityInfo)).toString('base64');
        } else {
            delete ctx.headers['auth-token'];
        }
    }
}
