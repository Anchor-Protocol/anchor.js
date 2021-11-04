import { testFabricator } from '../utils/test-fabricators/test-fabricator';
import {
  Expire,
  fabricatebEthBurn,
  fabricatebEthBurnFrom,
  fabricatebEthDecreaseAllowance,
  fabricatebEthIncreaseAllowance,
  fabricatebEthSend,
  fabricatebEthSendFrom,
  fabricatebEthTransfer,
  fabricatebEthTransferFrom,
} from '../fabricators';
import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { createHookMsg } from '../utils/cw20/create-hook-msg';
import { addressProvider } from '../__tests__/common';
import {
  fabricatebEthClaimRewards,
  fabricatebEthUpdateConfig,
} from '../../src/fabricators';

/* eslint-disable */
describe('bEth', () => {
  it('update-config', async () => {
    testFabricator(
      expect,
      fabricatebEthUpdateConfig,
      {
        address: 'address',
        owner: 'new-owner',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bEthReward(), {
          update_config: {
            owner: 'new-owner',
          },
        }),
      ],
    );
  });

  it('claim-rewards', async () => {
    testFabricator(
      expect,
      fabricatebEthClaimRewards,
      {
        address: 'address',
        recipient: undefined,
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bEthReward(), {
          claim_rewards: { recipient: undefined },
        }),
      ],
    );
  });

  it('transfer', async () => {
    testFabricator(
      expect,
      fabricatebEthTransfer,
      {
        address: 'address',
        amount: '1000',
        recipient: 'recipient',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bEthToken(), {
          transfer: {
            recipient: 'recipient',
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
          },
        }),
      ],
    );
  });

  it('transfer-from', async () => {
    testFabricator(
      expect,
      fabricatebEthTransferFrom,
      {
        address: 'address',
        owner: 'owner',
        amount: '1000',
        recipient: 'recipient',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bEthToken(), {
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
    testFabricator(
      expect,
      fabricatebEthBurn,
      {
        address: 'address',
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bEthToken(), {
          burn: {
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
          },
        }),
      ],
    );
  });

  it('burn-from', async () => {
    testFabricator(
      expect,
      fabricatebEthBurnFrom,
      {
        address: 'address',
        owner: 'owner',
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bEthToken(), {
          burn_from: {
            owner: 'owner',
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
          },
        }),
      ],
    );
  });

  it('send', async () => {
    testFabricator(
      expect,
      fabricatebEthSend,
      {
        address: 'address',
        amount: '1000',
        contract: 'contract',
        msg: { msg: {} },
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bEthToken(), {
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
    testFabricator(
      expect,
      fabricatebEthSendFrom,
      {
        address: 'address',
        amount: '1000',
        owner: 'owner',
        contract: 'contract',
        msg: { msg: {} },
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bEthToken(), {
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
    testFabricator(
      expect,
      fabricatebEthIncreaseAllowance,
      {
        address: 'address',
        amount: '1000',
        spender: 'spender',
        expires: { never: {} } as Expire,
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bEthToken(), {
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
    testFabricator(
      expect,
      fabricatebEthDecreaseAllowance,
      {
        address: 'address',
        amount: '1000',
        spender: 'spender',
        expires: { never: {} } as Expire,
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.bEthToken(), {
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
