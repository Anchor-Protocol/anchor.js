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
  premium_rate: string;
  amount: string;
  denom: MARKET_DENOMS;
}

export const fabricateLiquidationSubmitBid =
  ({ address, collateral_token, premium_rate, amount, denom }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([
      validateAddress(address),
      validateAddress(collateral_token),
    ]);

    const mmContractAddress = addressProvider.liquidation();

    return [
      new MsgExecuteContract(
        address,
        mmContractAddress,
        {
          // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/781abf462dc25aaed0ea4953dad14ba9736fa55d/contracts/liquidation/src/bid.rs#L15
          submit_bid: {
            collateral_token: collateral_token,
            premium_rate: premium_rate,
          },
        },
        {
          [`${denom}`]: new Int(new Dec(amount).mul(1000000)).toString(),
        },
      ),
    ];
  };
