import { testCw20Fabricator } from '../utils/test-fabricators/test-fabricator';
import {
  Expire,
  fabricateCw20IncreaseAllowance,
  fabricateCw20Burn,
  fabricateCw20BurnFrom,
  fabricateCw20Send,
  fabricateCw20SendFrom,
  fabricateCw20Transfer,
  fabricateCw20TransferFrom,
  fabricateCw20DecreaseAllowance,
} from '../fabricators';
import { addressProvider } from '../__tests__/common';
import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { createHookMsg } from '../utils/cw20/create-hook-msg';

/* eslint-disable */
describe('cw20', () => {
  it('transfer', async () => {
    testCw20Fabricator(
      expect,
      fabricateCw20Transfer,
      {
        address: 'address',
        contract_address: addressProvider.ANC(),
        amount: '1000',
        recipient: 'recipient',
      },
      [
        new MsgExecuteContract('address', addressProvider.ANC(), {
          transfer: {
            recipient: 'recipient',
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
          },
        }),
      ],
    );
  });

  it('transfer-from', async () => {
    testCw20Fabricator(
      expect,
      fabricateCw20TransferFrom,
      {
        address: 'address',
        contract_address: addressProvider.ANC(),
        owner: 'owner',
        amount: '1000',
        recipient: 'recipient',
      },
      [
        new MsgExecuteContract('address', addressProvider.ANC(), {
          transfer_from: {
            owner: 'owner',
            recipient: 'recipient',
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
          },
        }),
      ],
    );
  });

  it('burn', async () => {
    testCw20Fabricator(
      expect,
      fabricateCw20Burn,
      {
        address: 'address',
        contract_address: addressProvider.ANC(),
        amount: '1000',
      },
      [
        new MsgExecuteContract('address', addressProvider.ANC(), {
          burn: {
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
          },
        }),
      ],
    );
  });

  it('burn-from', async () => {
    testCw20Fabricator(
      expect,
      fabricateCw20BurnFrom,
      {
        address: 'address',
        contract_address: addressProvider.ANC(),
        owner: 'owner',
        amount: '1000',
      },
      [
        new MsgExecuteContract('address', addressProvider.ANC(), {
          burn_from: {
            owner: 'owner',
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
          },
        }),
      ],
    );
  });

  it('send', async () => {
    testCw20Fabricator(
      expect,
      fabricateCw20Send,
      {
        address: 'address',
        amount: '1000',
        contract_address: addressProvider.ANC(),
        contract: 'contract',
        msg: { msg: {} },
      },
      [
        new MsgExecuteContract('address', addressProvider.ANC(), {
          send: {
            contract: 'contract',
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            msg: createHookMsg({ msg: {} }),
          },
        }),
      ],
    );
  });

  it('send-from', async () => {
    testCw20Fabricator(
      expect,
      fabricateCw20SendFrom,
      {
        address: 'address',
        amount: '1000',
        contract_address: addressProvider.ANC(),
        owner: 'owner',
        contract: 'contract',
        msg: { msg: {} },
      },
      [
        new MsgExecuteContract('address', addressProvider.ANC(), {
          send_from: {
            owner: 'owner',
            contract: 'contract',
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            msg: createHookMsg({ msg: {} }),
          },
        }),
      ],
    );
  });

  it('increase-allowance', async () => {
    testCw20Fabricator(
      expect,
      fabricateCw20IncreaseAllowance,
      {
        address: 'address',
        contract_address: addressProvider.ANC(),
        amount: '1000',
        spender: 'spender',
        expires: { never: {} } as Expire,
      },
      [
        new MsgExecuteContract('address', addressProvider.ANC(), {
          increase_allowance: {
            spender: 'spender',
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            expires: { never: {} },
          },
        }),
      ],
    );
  });

  it('decrease-allowance', async () => {
    testCw20Fabricator(
      expect,
      fabricateCw20DecreaseAllowance,
      {
        address: 'address',
        amount: '1000',
        contract_address: addressProvider.ANC(),
        spender: 'spender',
        expires: { never: {} } as Expire,
      },
      [
        new MsgExecuteContract('address', addressProvider.ANC(), {
          decrease_allowance: {
            spender: 'spender',
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            expires: { never: {} },
          },
        }),
      ],
    );
  });
});
