import {Context, scope, provide, ScopeEnum} from 'midway';
import {isEqual, isObject} from 'lodash';
import {IIdentityTransmit} from '../../interface';

@scope(ScopeEnum.Singleton)
@provide()
export class identityTransmit implements IIdentityTransmit {

    transmit(ctx: Context): void {
        const identityInfo = ctx.gatewayInfo.identityInfo ?? {};
        if (!isEqual(identityInfo, {}) && isObject(identityInfo)) {
            ctx.headers['auth-token'] = Buffer.from(JSON.stringify(identityInfo)).toString("base64")
        } else {
            delete ctx.headers['auth-token'];
        }

    }
}