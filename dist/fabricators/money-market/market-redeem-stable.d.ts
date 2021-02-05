import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    symbol: string;
    amount: string;
}
/**
 * @param address Client’s Terra address.
 * @param symbol Symbol of stablecoin to redeem, or its aToken equivalent.
 * @param amount Amount of a stablecoin to redeem, or amount of an aToken (aTerra) to redeem (specified by symbol).
 */
export declare const fabricateRedeemStable: ({ address, symbol, amount }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};
