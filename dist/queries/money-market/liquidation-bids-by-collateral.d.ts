import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    collateralToken: string;
    startAfter?: string;
    limit?: number;
}
interface BidsByCollateralResponse {
    bids: object[];
}
export declare const queryLiquidationBidsByCollateral: ({ lcd, collateralToken, startAfter, limit, }: Option) => (addressProvider: AddressProvider) => Promise<BidsByCollateralResponse>;
export {};
