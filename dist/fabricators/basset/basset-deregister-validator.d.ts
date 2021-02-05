import { MsgExecuteContract } from '@terra-money/terra.js';
import { AddressProvider } from '../../address-provider/provider';
interface Option {
    address: string;
    validatorAddress: string;
}
/**
 * @param address Client’s Terra address.
 */
export declare const fabricateDeRegisterValidator: ({ address, validatorAddress, }: Option) => (addressProvider: AddressProvider) => MsgExecuteContract[];
export {};
