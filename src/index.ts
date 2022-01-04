import { LCDClient } from '@terra-money/terra.js';
import {
  AddressProviderFromJson,
  bAssetBombay12,
  bombay12,
  MARKET_DENOMS,
} from './address-provider';
import { Anchor } from './facade';

export * from './address-provider';
export * from './constants';
export * from './fabricators';
export * from './queries';
export * from './facade';

const main = async () => {
  const lcd = new LCDClient({
    URL: 'https://bombay-lcd.terra.dev',
    chainID: 'bombay-12',
  });

  const anchor = new Anchor(lcd, new AddressProviderFromJson(bombay12));

  const collaterals = await anchor.moneyMarket.getCollateralWhitelist({
    market: MARKET_DENOMS.UUSD,
  });

  const [collateral] = collaterals.filter(
    (collateral) => collateral.symbol === 'BETH',
  );

  const bAsset = await anchor.bAsset(bAssetBombay12['bLUNA']);

  const operation = bAsset.claim({ recipient: 'terra1...' });
};

main();
