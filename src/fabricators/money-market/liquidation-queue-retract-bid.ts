import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateAddress } from '../../utils/validation/address';
import { validateInput } from '../../utils/validate-input';
import { validateIsNumber } from '../../utils/validation/number';
import { validateTrue } from '../../utils/validation/true';
import { AddressProvider } from '../../address-provider/provider';
import { isAmountSet } from '../../utils/validation/amount';

interface Option {
  address: string;
  bid_idx: string;
  amount: string | undefined;
}

export const fabricateLiquidationQueueRetractBid =
  ({ address, bid_idx, amount }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      amount ? validateIsNumber(amount) : validateTrue,
    ]);

    const mmContractAddress = addressProvider.liquidationQueue();

    return [
      new MsgExecuteContract(address, mmContractAddress, {
        retract_bid: {
          bid_idx: bid_idx,
          amount: isAmountSet(amount)
            ? new Int(new Dec(amount).mul(1000000)).toString()
            : undefined,
        },
      }),
    ];
  };
