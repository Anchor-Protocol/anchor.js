import { testFabricator } from '../utils/test-fabricators/test-fabricator';
import {
  fabricateGeneratorProxyWithdraw,
  fabricateGeneratorProxyEmergencyWithdraw,
  fabricateGeneratorProxySendRewards,
  fabricateGeneratorProxyUpdateRewards,
} from '../fabricators';
import { addressProvider } from './common';
import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';

/* eslint-disable */
describe('generator-proxy', () => {
  it('withdraw', async () => {
    testFabricator(
      expect,
      fabricateGeneratorProxyWithdraw,
      {
        address: 'address',
        account: 'terra123',
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.ancGeneratorProxy(), {
          withdraw: {
            account: 'terra123',
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
          },
        }),
      ],
    );
  });
  it('emergency-withdraw', async () => {
    testFabricator(
      expect,
      fabricateGeneratorProxyEmergencyWithdraw,
      {
        address: 'address',
        account: 'terra123',
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.ancGeneratorProxy(), {
          emergency_withdraw: {
            account: 'terra123',
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
          },
        }),
      ],
    );
  });
  it('send-rewards', async () => {
    testFabricator(
      expect,
      fabricateGeneratorProxySendRewards,
      {
        address: 'address',
        account: 'terra123',
        amount: '1000',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.ancGeneratorProxy(), {
          send_rewards: {
            account: 'terra123',
            amount: new Int(new Dec('1000').mul(1000000)).toString(),
          },
        }),
      ],
    );
  });
  it('update-rewards', async () => {
    testFabricator(
      expect,
      fabricateGeneratorProxyUpdateRewards,
      {
        address: 'address',
      },
      addressProvider,
      [
        new MsgExecuteContract('address', addressProvider.ancGeneratorProxy(), {
          update_rewards: {},
        }),
      ],
    );
  });
});
