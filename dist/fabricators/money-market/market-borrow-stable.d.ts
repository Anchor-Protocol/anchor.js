import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    market: string;
    amount: string;
    withdrawTo?: string;
}
/**
 *
 * @param address Client’s Terra address.
 * @param market Type of stablecoin money market to borrow.
 * @param loan_id ID of address’s loan position to add borrows.
 * @param amount Amount of stablecoin to borrow.
 * @param withdraw_to (optional) Terra address to withdraw borrowed stablecoin. If null, withdraws to address
 */
export declare const fabricateBorrow: ({ address, market, amount, withdrawTo, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};
