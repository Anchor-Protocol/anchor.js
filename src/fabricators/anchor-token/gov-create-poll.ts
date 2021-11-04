import { MsgExecuteContract, Int, Dec } from '@terra-money/terra.js';
import { validateInput } from '../../utils/validate-input';
import { validateAddress } from '../../utils/validation/address';
import { AddressProvider } from '../../address-provider/provider';
import { createHookMsg } from '../../utils/cw20/create-hook-msg';

export interface ExecuteMsg {
  order: number;
  contract: string;
  msg: string;
}

interface Option {
  address: string;
  amount: string;
  title: string;
  description: string;
  link?: string;
  execute_msgs?: ExecuteMsg[];
}

export const fabricateGovCreatePoll =
  ({ address, amount, title, description, link, execute_msgs }: Option) =>
  (addressProvider: AddressProvider): MsgExecuteContract[] => {
    validateInput([validateAddress(address)]);

    const anchorToken = addressProvider.ANC();

    return [
      new MsgExecuteContract(address, anchorToken, {
        send: {
          contract: addressProvider.gov(),
          amount: new Int(new Dec(amount).mul(1000000)).toString(),
          msg: createHookMsg({
            create_poll: {
              title,
              description,
              link,
              execute_msgs,
            },
          }),
        },
      }),
    ];
  };
