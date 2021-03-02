import { Dec, Int, MsgExecuteContract } from "@terra-money/terra.js";
import { validateInput } from "../../utils/validate-input";
import { validateAddress } from "../../utils/validation/address";
import {
  validateIsGreaterThanZero,
  validateIsNumber,
} from "../../utils/validation/number";
import { createHookMsg } from "../../utils/cw20/create-hook-msg";
import { AddressProvider } from "../../address-provider/provider";

interface Option {
  address: string;
  amount: string;
  to?: string;
  beliefPrice?: string;
  maxSpread?: string;
}

export const fabricatebSwapANC = ({
  address,
  amount,
  to,
  beliefPrice,
  maxSpread,
}: Option) => (addressProvider: AddressProvider): MsgExecuteContract[] => {
  validateInput([
    validateAddress(address),
    validateIsNumber(amount),
    validateIsGreaterThanZero(amount),
  ]);

  const ancTokenAddress = addressProvider.ANC();
  const pairAddress = addressProvider.terraswapAncUstPair();

  return [
    new MsgExecuteContract(address, ancTokenAddress, {
      send: {
        contract: pairAddress,
        amount: new Int(new Dec(amount).mul(1000000)).toString(),
        msg: createHookMsg({
          swap: {
            belief_price: beliefPrice,
            max_spread: maxSpread,
            to: to,
          },
        }),
      },
    }),
  ];
};
