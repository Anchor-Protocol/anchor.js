import { testFabricator } from '../utils/test-fabricators/test-fabricator';
import {
  fabricatebAssetClaimRewards,
  fabricatebAssetTransfer,
  fabricatebAssetSend,
  fabricatebAssetIncreaseAllowance,
  fabricatebAssetDecreaseAllowance,
  fabricatebAssetBurn,
  fabricatebAssetTransferFrom,
  fabricatebAssetBurnFrom,
  fabricatebAssetSendFrom,
  Expire,
  fabricatebAssetConvertFromWormhole,
  fabricatebAssetConvertToWormhole,
} from '../fabricators';
import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { createHookMsg } from '../utils/cw20/create-hook-msg';
import {
  BAssetAddressProvider,
  BAssetAddressProviderImpl,
  bAssetBombay12,
} from '..';

const addressProvider: BAssetAddressProvider = new BAssetAddressProviderImpl(
  bAssetBombay12['bETH'],
);

/* eslint-disable */
describe('bAsset', () => {
  it('claim-rewards', async () => {
    testFabricator(
      expect,
      fabricatebAssetClaimRewards,
      {
        address: 'address',
        recipient: undefined,
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.reward(), {
          claim_rewards: { recipient: undefined },
        }),
      ],
    );
  });

  it('transfer', async () => {
    testFabricator(
      expect,
      fabricatebAssetTransfer,
      {
        address: 'address',
        amount: '1000',
        recipient: 'recipient',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.token(), {
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
      fabricatebAssetTransferFrom,
      {
        address: 'address',
        owner: 'owner',
        amount: '1000',
        recipient: 'recipient',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.token(), {
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
      fabricatebAssetBurn,
      {
        address: 'address',
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.token(), {
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
      fabricatebAssetBurnFrom,
      {
        address: 'address',
        owner: 'owner',
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.token(), {
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
      fabricatebAssetSend,
      {
        address: 'address',
        amount: '1000',
        contract: 'contract',
        msg: { msg: {} },
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.token(), {
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
      fabricatebAssetSendFrom,
      {
        address: 'address',
        amount: '1000',
        owner: 'owner',
        contract: 'contract',
        msg: { msg: {} },
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.token(), {
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
      fabricatebAssetIncreaseAllowance,
      {
        address: 'address',
        amount: '1000',
        spender: 'spender',
        expires: { never: {} } as Expire,
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.token(), {
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
      fabricatebAssetDecreaseAllowance,
      {
        address: 'address',
        amount: '1000',
        spender: 'spender',
        expires: { never: {} } as Expire,
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.token(), {
          decrease_allowance: {
            spender: 'spender',
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            expires: { never: {} },
          },
        }),
      ],
    );
  });

  it('convert-from-wormhole', async () => {
    testFabricator(
      expect,
      fabricatebAssetConvertFromWormhole,
      {
        address: 'address',
        amount: '1000',
        msg: { msg: {} },
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.token(), {
          send: {
            contract: addressProvider.converter(),
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            msg: createHookMsg({ convertWormholeToAnchor: {} }),
          },
        }),
      ],
    );
  });

  it('convert-to-wormhole', async () => {
    testFabricator(
      expect,
      fabricatebAssetConvertToWormhole,
      {
        address: 'address',
        amount: '1000',
        msg: { msg: {} },
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.token(), {
          send: {
            contract: addressProvider.converter(),
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            msg: createHookMsg({ convertAnchorToWormhole: {} }),
          },
        }),
      ],
    );
  });
});
