import { Dec, MsgExecuteContract } from '@terra-money/terra.js';
import { validateAddress } from '../../utils/validation/address';
import { validateInput } from '../../utils/validate-input';
import { AddressProvider } from '../../address-provider/provider';

interface Option {
  address: string;
  collateral_token: string;
  premium_rate: Dec;
}

export const fabricateSubmitBid = ({
  address,
  collateral_token,
  premium_rate,
}: Option) => (addressProvider: AddressProvider): MsgExecuteContract[] => {
  validateInput([
    validateAddress(address),
    validateAddress(collateral_token),
    //TODO: validate decimal
  ]);

  const mmContractAddress = addressProvider.liquidation();

  return [
    new MsgExecuteContract(address, mmContractAddress, {
      // @see https://github.com/Anchor-Protocol/money-market-contracts/blob/781abf462dc25aaed0ea4953dad14ba9736fa55d/contracts/liquidation/src/bid.rs#L15
      submit_bid: {
        collateral_token: collateral_token,
        premium_rate: premium_rate,
      },
    }),
  ];
};
