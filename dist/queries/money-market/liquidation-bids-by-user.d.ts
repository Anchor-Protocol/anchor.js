import { LCDClient } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    lcd: LCDClient;
    bidder: string;
    startAfter?: string;
    limit?: number;
}
interface BidsByUserResponse {
    bids: object[];
}
export declare const queryLiquidationBidsByUser: ({ lcd, bidder, startAfter, limit, }: Option) => (addressProvider: AddressProvider) => Promise<BidsByUserResponse>;
export {};
