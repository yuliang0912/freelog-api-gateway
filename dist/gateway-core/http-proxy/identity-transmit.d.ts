import { IIdentityTransmit } from '../../interface';
import { FreelogContext } from 'egg-freelog-base';
export declare class identityTransmit implements IIdentityTransmit {
    transmit(ctx: FreelogContext): void;
    private freezeUserIsPass;
}
