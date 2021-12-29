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
import { addressProvider } from '../__tests__/common';
import { COLLATERAL_DENOMS } from '..';

/* eslint-disable */
describe('bAsset', () => {
  it('claim-rewards', async () => {
    testFabricator(
      expect,
      fabricatebAssetClaimRewards,
      {
        address: 'address',
        collateral: COLLATERAL_DENOMS.UBLUNA,
        recipient: undefined,
      },
      addressProvider,
      [
        new MsgExecuteContract(
          'address',
          addressProvider.bAssetReward(COLLATERAL_DENOMS.UBLUNA),
          {
            claim_rewards: { recipient: undefined },
          },
        ),
      ],
    );
  });

  it('transfer', async () => {
    testFabricator(
      expect,
      fabricatebAssetTransfer,
      {
        address: 'address',
        collateral: COLLATERAL_DENOMS.UBLUNA,
        amount: '1000',
        recipient: 'recipient',
      },
      addressProvider,
      [
        new MsgExecuteContract(
          'address',
          addressProvider.bAssetToken(COLLATERAL_DENOMS.UBLUNA),
          {
            transfer: {
              recipient: 'recipient',
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
            },
          },
        ),
      ],
    );
  });

  it('transfer-from', async () => {
    testFabricator(
      expect,
      fabricatebAssetTransferFrom,
      {
        address: 'address',
        collateral: COLLATERAL_DENOMS.UBLUNA,
        owner: 'owner',
        amount: '1000',
        recipient: 'recipient',
      },
      addressProvider,
      [
        new MsgExecuteContract(
          'address',
          addressProvider.bAssetToken(COLLATERAL_DENOMS.UBLUNA),
          {
            transfer_from: {
              owner: 'owner',
              recipient: 'recipient',
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
            },
          },
        ),
      ],
    );
  });

  it('burn', async () => {
    testFabricator(
      expect,
      fabricatebAssetBurn,
      {
        address: 'address',
        collateral: COLLATERAL_DENOMS.UBLUNA,
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract(
          'address',
          addressProvider.bAssetToken(COLLATERAL_DENOMS.UBLUNA),
          {
            burn: {
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
            },
          },
        ),
      ],
    );
  });

  it('burn-from', async () => {
    testFabricator(
      expect,
      fabricatebAssetBurnFrom,
      {
        address: 'address',
        collateral: COLLATERAL_DENOMS.UBLUNA,
        owner: 'owner',
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract(
          'address',
          addressProvider.bAssetToken(COLLATERAL_DENOMS.UBLUNA),
          {
            burn_from: {
              owner: 'owner',
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
            },
          },
        ),
      ],
    );
  });

  it('send', async () => {
    testFabricator(
      expect,
      fabricatebAssetSend,
      {
        address: 'address',
        collateral: COLLATERAL_DENOMS.UBLUNA,
        amount: '1000',
        contract: 'contract',
        msg: { msg: {} },
      },
      addressProvider,
      [
        new MsgExecuteContract(
          'address',
          addressProvider.bAssetToken(COLLATERAL_DENOMS.UBLUNA),
          {
            send: {
              contract: 'contract',
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
              msg: createHookMsg({ msg: {} }),
            },
          },
        ),
      ],
    );
  });

  it('send-from', async () => {
    testFabricator(
      expect,
      fabricatebAssetSendFrom,
      {
        address: 'address',
        collateral: COLLATERAL_DENOMS.UBLUNA,
        amount: '1000',
        owner: 'owner',
        contract: 'contract',
        msg: { msg: {} },
      },
      addressProvider,
      [
        new MsgExecuteContract(
          'address',
          addressProvider.bAssetToken(COLLATERAL_DENOMS.UBLUNA),
          {
            send_from: {
              owner: 'owner',
              contract: 'contract',
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
              msg: createHookMsg({ msg: {} }),
            },
          },
        ),
      ],
    );
  });

  it('increase-allowance', async () => {
    testFabricator(
      expect,
      fabricatebAssetIncreaseAllowance,
      {
        address: 'address',
        collateral: COLLATERAL_DENOMS.UBLUNA,
        amount: '1000',
        spender: 'spender',
        expires: { never: {} } as Expire,
      },
      addressProvider,
      [
        new MsgExecuteContract(
          'address',
          addressProvider.bAssetToken(COLLATERAL_DENOMS.UBLUNA),
          {
            increase_allowance: {
              spender: 'spender',
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
              expires: { never: {} },
            },
          },
        ),
      ],
    );
  });

  it('decrease-allowance', async () => {
    testFabricator(
      expect,
      fabricatebAssetDecreaseAllowance,
      {
        address: 'address',
        collateral: COLLATERAL_DENOMS.UBLUNA,
        amount: '1000',
        spender: 'spender',
        expires: { never: {} } as Expire,
      },
      addressProvider,
      [
        new MsgExecuteContract(
          'address',
          addressProvider.bAssetToken(COLLATERAL_DENOMS.UBLUNA),
          {
            decrease_allowance: {
              spender: 'spender',
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
              expires: { never: {} },
            },
          },
        ),
      ],
    );
  });

  it('convert-from-wormhole', async () => {
    testFabricator(
      expect,
      fabricatebAssetConvertFromWormhole,
      {
        address: 'address',
        collateral: COLLATERAL_DENOMS.UBETH,
        amount: '1000',
        msg: { msg: {} },
      },
      addressProvider,
      [
        new MsgExecuteContract(
          'address',
          addressProvider.bAssetToken(COLLATERAL_DENOMS.UBETH),
          {
            send: {
              contract: addressProvider.bAssetConverter(
                COLLATERAL_DENOMS.UBETH,
              ),
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
              msg: createHookMsg({ convertWormholeToAnchor: {} }),
            },
          },
        ),
      ],
    );
  });

  it('convert-to-wormhole', async () => {
    testFabricator(
      expect,
      fabricatebAssetConvertToWormhole,
      {
        address: 'address',
        collateral: COLLATERAL_DENOMS.UBETH,
        amount: '1000',
        msg: { msg: {} },
      },
      addressProvider,
      [
        new MsgExecuteContract(
          'address',
          addressProvider.bAssetToken(COLLATERAL_DENOMS.UBETH),
          {
            send: {
              contract: addressProvider.bAssetConverter(
                COLLATERAL_DENOMS.UBETH,
              ),
              amount: new Int(new Dec('1000').mul(1000000)).toString(),
              msg: createHookMsg({ convertAnchorToWormhole: {} }),
            },
          },
        ),
      ],
    );
  });
});
