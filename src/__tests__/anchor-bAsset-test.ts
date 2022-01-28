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
  fabricatebAssetConvertWormholeToAnchor,
  fabricatebAssetConvertAnchorToWormhole,
} from '../fabricators';
import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
import { createHookMsg } from '../utils/cw20/create-hook-msg';
import { addressProvider } from '../__tests__/common';
import { bETH as bAsset } from './common';

/* eslint-disable */
describe('bAsset', () => {
  it('claim-rewards', async () => {
    testFabricator(
      expect,
      fabricatebAssetClaimRewards,
      {
        address: 'address',
        bAsset,
        recipient: undefined,
      },
      addressProvider,
      [
        new MsgExecuteContract('address', bAsset.reward(), {
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
        bAsset,
        amount: '1000',
        recipient: 'recipient',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', bAsset.token(), {
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
        bAsset,
        owner: 'owner',
        amount: '1000',
        recipient: 'recipient',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', bAsset.token(), {
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
        bAsset,
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', bAsset.token(), {
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
        bAsset,
        owner: 'owner',
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', bAsset.token(), {
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
        bAsset,
        amount: '1000',
        contract: 'contract',
        msg: { msg: {} },
      },
      addressProvider,
      [
        new MsgExecuteContract('address', bAsset.token(), {
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
        bAsset,
        amount: '1000',
        owner: 'owner',
        contract: 'contract',
        msg: { msg: {} },
      },
      addressProvider,
      [
        new MsgExecuteContract('address', bAsset.token(), {
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
        bAsset,
        amount: '1000',
        spender: 'spender',
        expires: { never: {} } as Expire,
      },
      addressProvider,
      [
        new MsgExecuteContract('address', bAsset.token(), {
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
        bAsset,
        amount: '1000',
        spender: 'spender',
        expires: { never: {} } as Expire,
      },
      addressProvider,
      [
        new MsgExecuteContract('address', bAsset.token(), {
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
      fabricatebAssetConvertWormholeToAnchor,
      {
        address: 'address',
        bAsset,
        amount: '1000',
        wormholeTokenDecimals: 8,
        msg: { msg: {} },
      },
      addressProvider,
      [
        new MsgExecuteContract('address', bAsset.token(), {
          send: {
            contract: bAsset.converter(),
            amount: new Int(new Dec('1000').mul(100000000)).toString(),
            msg: createHookMsg({ convert_wormhole_to_anchor: {} }),
          },
        }),
      ],
    );
  });

  it('convert-to-wormhole', async () => {
    testFabricator(
      expect,
      fabricatebAssetConvertAnchorToWormhole,
      {
        address: 'address',
        bAsset,
        amount: '1000',
        msg: { msg: {} },
      },
      addressProvider,
      [
        new MsgExecuteContract('address', bAsset.token(), {
          send: {
            contract: bAsset.converter(),
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
            msg: createHookMsg({ convert_anchor_to_wormhole: {} }),
          },
        }),
      ],
    );
  });
});
