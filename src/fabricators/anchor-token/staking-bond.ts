import { MsgExecuteContract, Int, Dec } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';
import { createHookMsg } from '../../utils/cw20/create-hook-msg';

interface Option {
  address: string;
  amount: string;
}

export const fabricateStakingBond =
  ({ address, amount }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    const lpToken = addressProvider.terraswapAncUstLPToken();

    return [
      new MsgExecuteContract(address, lpToken, {
        send: {
          contract: addressProvider.staking(),
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
          msg: createHookMsg({
            bond: {},
          }),
        },
      }),
    ];
  };
