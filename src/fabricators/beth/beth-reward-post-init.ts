import { AddressProvider } from '../../address-provider/provider';
import { MsgExecuteContract } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';

/**
 * @param address Client’s Terra address (address of the message sender).
 * @param Client’s Terra address (address of beth token contract).
 */

interface Option {
  address: string;
  token_contract?: string;
}

export const fabricatebEthPostInit =
  ({ address, token_contract }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    const bEthRewardAddress = addressProvider.bEthReward();

    return [
      new MsgExecuteContract(address, bEthRewardAddress, {
        post_initialize: {
          token_contract,
        },
      }),
    ];
  };
