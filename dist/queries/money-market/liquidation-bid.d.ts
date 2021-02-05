import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    collateralToken: string;
    bidder: string;
}
interface BidResponse {
    collateralToken: string;
    bidder: string;
    amount: string;
    premiumRate: string;
}
export declare const queryLiquidationBid: ({ lcd, collateralToken, bidder, }: Option) => (addressProvider: AddressProvider) => Promise<BidResponse>;
export {};
