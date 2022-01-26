/*
Due to the bETH wormhole migration on 2021–01-26, message fabricators for bETH burn (fabricatebEthBurn
and fabricatebEthBurnFrom) will no longer result in retrieval of ERC-20 bETH tokens on Ethereum,
(a functionality supported previously by Shuttle) but will just be used as regular CW20 token burn.
*/

// import { Dec, Int, MsgExecuteContract } from '@terra-money/terra.js';
// import { validateInput } from '../../utils/validate-input';
// import { validateAddress } from '../../utils/validation/address';
// import {
//   validateIsGreaterThanZero,
//   validateIsNumber,
// } from '../../utils/validation/number';
// import { AddressProvider } from '../../address-provider';
//
// /**
//  * @param address Client’s Terra address (address of the message sender).
//  * @param amount of burn.
//  */
//
// interface Option {
//   address: string;
//   amount: string;
// }
//
// export const fabricatebEthBurn =
//   ({ address, amount }: Option) =>
//   (addressProvider: AddressProvider): MsgExecuteContract[] => {
//     validateInput([
//       validateAddress(address),
//       validateIsNumber(amount),
//       validateIsGreaterThanZero(amount),
//     ]);
//
//     const bEthTokenAddress = addressProvider.bEthToken();
//     return [
//       new MsgExecuteContract(address, bEthTokenAddress, {
//         burn: {
//           amount: new Int(new Dec(amount).mul(1000000)).toString(),
//         },
//       }),
//     ];
//   };
