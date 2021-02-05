import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    symbol: string;
    amount: string;
}
/**
 *
 * @param address Client’s Terra address.
 * @param symbol Symbol of a stablecoin to deposit.
 * @param amount Amount of a stablecoin to deposit.
 */
export declare const fabricateDepositStableCoin: ({ address, symbol, amount, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};
