import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    market: string;
    borrower?: string;
    amount: string;
}
/**
 * @param address Client’s Terra address.
 * @param market Type of stablecoin money market to repay.
 * @param borrower (optional) Terra address of the entity that created the loan position.If null, repays address‘s loan
 * @param amount (optional) Amount of stablecoin to repay. Set to null if repay_all is set to true.
 */
export declare const fabricateRepay: ({ address, market, borrower, amount, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};
