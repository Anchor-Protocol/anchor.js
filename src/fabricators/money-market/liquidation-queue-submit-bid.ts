import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { validateAddress } from '../../utils/validation/address';
import { validateInput } from '../../utils/validate-input';
import {
  AddressProvider,
  MARKET_DENOMS,
} from '../../address-provider/provider';

interface Option {
  address: string;
  collateral_token: string;
  premium_slot: number;
  amount: string;
  denom: MARKET_DENOMS;
}

export const fabricateLiquidationQueueSubmitBid =
  ({ address, collateral_token, premium_slot, amount, denom }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateAddress(collateral_token),
    ]);

    const mmContractAddress = addressProvider.liquidationQueue();

    return [
      new MsgExecuteContract(
        address,
        mmContractAddress,
        {
          submit_bid: {
            collateral_token: collateral_token,
            premium_slot: premium_slot,
          },
        },
        {
          [`${denom}`]: new Int(new Dec(amount).mul(1000000)).toString(),
        },
      ),
    ];
  };
