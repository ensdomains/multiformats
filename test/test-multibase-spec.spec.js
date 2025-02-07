/* eslint-env mocha */

import { assert } from 'aegir/chai'
import { bases } from '../src/basics.js'
import { fromString } from '../src/bytes.js'

const encoded = [
  {
    input: 'Decentralize everything!!',
    tests: [
      ['identity', '\x00Decentralize everything!!'],
      ['base2', '001000100011001010110001101100101011011100111010001110010011000010110110001101001011110100110010100100000011001010111011001100101011100100111100101110100011010000110100101101110011001110010000100100001'],
      ['base8', '72106254331267164344605543227514510062566312711713506415133463441102'],
      ['base10', '9429328951066508984658627669258025763026247056774804621697313'],
      ['base16', 'f446563656e7472616c697a652065766572797468696e672121'],
      ['base16upper', 'F446563656E7472616C697A652065766572797468696E672121'],
      ['base32', 'birswgzloorzgc3djpjssazlwmvzhs5dinfxgoijb'],
      ['base32upper', 'BIRSWGZLOORZGC3DJPJSSAZLWMVZHS5DINFXGOIJB'],
      ['base32hex', 'v8him6pbeehp62r39f9ii0pbmclp7it38d5n6e891'],
      ['base32hexupper', 'V8HIM6PBEEHP62R39F9II0PBMCLP7IT38D5N6E891'],
      ['base32pad', 'cirswgzloorzgc3djpjssazlwmvzhs5dinfxgoijb'],
      ['base32padupper', 'CIRSWGZLOORZGC3DJPJSSAZLWMVZHS5DINFXGOIJB'],
      ['base32hexpad', 't8him6pbeehp62r39f9ii0pbmclp7it38d5n6e891'],
      ['base32hexpadupper', 'T8HIM6PBEEHP62R39F9II0PBMCLP7IT38D5N6E891'],
      ['base32z', 'het1sg3mqqt3gn5djxj11y3msci3817depfzgqejb'],
      ['base36', 'k343ixo7d49hqj1ium15pgy1wzww5fxrid21td7l'],
      ['base36upper', 'K343IXO7D49HQJ1IUM15PGY1WZWW5FXRID21TD7L'],
      ['base58flickr', 'Ztwe7gVTeK8wswS1gf8hrgAua9fcw9reboD'],
      ['base58btc', 'zUXE7GvtEk8XTXs1GF8HSGbVA9FCX9SEBPe'],
      ['base64', 'mRGVjZW50cmFsaXplIGV2ZXJ5dGhpbmchIQ'],
      ['base64pad', 'MRGVjZW50cmFsaXplIGV2ZXJ5dGhpbmchIQ=='],
      ['base64url', 'uRGVjZW50cmFsaXplIGV2ZXJ5dGhpbmchIQ'],
      ['base64urlpad', 'URGVjZW50cmFsaXplIGV2ZXJ5dGhpbmchIQ=='],
      ['base256emoji', '🚀💛✋💃✋😻😈🥺🤤🍀🌟💐✋😅✋💦✋🥺🏃😈😴🌟😻😝👏👏']
    ]
  },
  {
    input: 'yes mani !',
    tests: [
      ['identity', '\x00yes mani !'],
      ['base2', '001111001011001010111001100100000011011010110000101101110011010010010000000100001'],
      ['base8', '7362625631006654133464440102'],
      ['base10', '9573277761329450583662625'],
      ['base16', 'f796573206d616e692021'],
      ['base16upper', 'F796573206D616E692021'],
      ['base32', 'bpfsxgidnmfxgsibb'],
      ['base32upper', 'BPFSXGIDNMFXGSIBB'],
      ['base32hex', 'vf5in683dc5n6i811'],
      ['base32hexupper', 'VF5IN683DC5N6I811'],
      ['base32pad', 'cpfsxgidnmfxgsibb'],
      ['base32padupper', 'CPFSXGIDNMFXGSIBB'],
      ['base32hexpad', 'tf5in683dc5n6i811'],
      ['base32hexpadupper', 'TF5IN683DC5N6I811'],
      ['base32z', 'hxf1zgedpcfzg1ebb'],
      ['base36', 'k2lcpzo5yikidynfl'],
      ['base36upper', 'K2LCPZO5YIKIDYNFL'],
      ['base58flickr', 'Z7Pznk19XTTzBtx'],
      ['base58btc', 'z7paNL19xttacUY'],
      ['base64', 'meWVzIG1hbmkgIQ'],
      ['base64pad', 'MeWVzIG1hbmkgIQ=='],
      ['base64url', 'ueWVzIG1hbmkgIQ'],
      ['base64urlpad', 'UeWVzIG1hbmkgIQ=='],
      ['base256emoji', '🚀🏃✋🌈😅🌷🤤😻🌟😅👏']
    ]
  },
  {
    input: 'hello world',
    tests: [
      ['identity', '\x00hello world'],
      ['base2', '00110100001100101011011000110110001101111001000000111011101101111011100100110110001100100'],
      ['base8', '7320625543306744035667562330620'],
      ['base10', '9126207244316550804821666916'],
      ['base16', 'f68656c6c6f20776f726c64'],
      ['base16upper', 'F68656C6C6F20776F726C64'],
      ['base32', 'bnbswy3dpeb3w64tmmq'],
      ['base32upper', 'BNBSWY3DPEB3W64TMMQ'],
      ['base32hex', 'vd1imor3f41rmusjccg'],
      ['base32hexupper', 'VD1IMOR3F41RMUSJCCG'],
      ['base32pad', 'cnbswy3dpeb3w64tmmq======'],
      ['base32padupper', 'CNBSWY3DPEB3W64TMMQ======'],
      ['base32hexpad', 'td1imor3f41rmusjccg======'],
      ['base32hexpadupper', 'TD1IMOR3F41RMUSJCCG======'],
      ['base32z', 'hpb1sa5dxrb5s6hucco'],
      ['base36', 'kfuvrsivvnfrbjwajo'],
      ['base36upper', 'KFUVRSIVVNFRBJWAJO'],
      ['base58flickr', 'ZrTu1dk6cWsRYjYu'],
      ['base58btc', 'zStV1DL6CwTryKyV'],
      ['base64', 'maGVsbG8gd29ybGQ'],
      ['base64pad', 'MaGVsbG8gd29ybGQ='],
      ['base64url', 'uaGVsbG8gd29ybGQ'],
      ['base64urlpad', 'UaGVsbG8gd29ybGQ='],
      ['base256emoji', '🚀😴✋🍀🍀😓😅✔😓🥺🍀😳']
    ]
  },
  {
    input: '\x00yes mani !',
    tests: [
      ['identity', '\x00\x00yes mani !'],
      ['base2', '00000000001111001011001010111001100100000011011010110000101101110011010010010000000100001'],
      ['base8', '7000745453462015530267151100204'],
      ['base10', '90573277761329450583662625'],
      ['base16', 'f00796573206d616e692021'],
      ['base16upper', 'F00796573206D616E692021'],
      ['base32', 'bab4wk4zanvqw42jaee'],
      ['base32upper', 'BAB4WK4ZANVQW42JAEE'],
      ['base32hex', 'v01smasp0dlgmsq9044'],
      ['base32hexupper', 'V01SMASP0DLGMSQ9044'],
      ['base32pad', 'cab4wk4zanvqw42jaee======'],
      ['base32padupper', 'CAB4WK4ZANVQW42JAEE======'],
      ['base32hexpad', 't01smasp0dlgmsq9044======'],
      ['base32hexpadupper', 'T01SMASP0DLGMSQ9044======'],
      ['base32z', 'hybhskh3ypiosh4jyrr'],
      ['base36', 'k02lcpzo5yikidynfl'],
      ['base36upper', 'K02LCPZO5YIKIDYNFL'],
      ['base58flickr', 'Z17Pznk19XTTzBtx'],
      ['base58btc', 'z17paNL19xttacUY'],
      ['base64', 'mAHllcyBtYW5pICE'],
      ['base64pad', 'MAHllcyBtYW5pICE='],
      ['base64url', 'uAHllcyBtYW5pICE'],
      ['base64urlpad', 'UAHllcyBtYW5pICE='],
      ['base256emoji', '🚀🚀🏃✋🌈😅🌷🤤😻🌟😅👏']
    ]
  },
  {
    input: '\x00\x00yes mani !',
    tests: [
      ['identity', '\x00\x00\x00yes mani !'],
      ['base2', '0000000000000000001111001011001010111001100100000011011010110000101101110011010010010000000100001'],
      ['base8', '700000171312714403326055632220041'],
      ['base10', '900573277761329450583662625'],
      ['base16', 'f0000796573206d616e692021'],
      ['base16upper', 'F0000796573206D616E692021'],
      ['base32', 'baaahszltebwwc3tjeaqq'],
      ['base32upper', 'BAAAHSZLTEBWWC3TJEAQQ'],
      ['base32hex', 'v0007ipbj41mm2rj940gg'],
      ['base32hexupper', 'V0007IPBJ41MM2RJ940GG'],
      ['base32pad', 'caaahszltebwwc3tjeaqq===='],
      ['base32padupper', 'CAAAHSZLTEBWWC3TJEAQQ===='],
      ['base32hexpad', 't0007ipbj41mm2rj940gg===='],
      ['base32hexpadupper', 'T0007IPBJ41MM2RJ940GG===='],
      ['base32z', 'hyyy813murbssn5ujryoo'],
      ['base36', 'k002lcpzo5yikidynfl'],
      ['base36upper', 'K002LCPZO5YIKIDYNFL'],
      ['base58flickr', 'Z117Pznk19XTTzBtx'],
      ['base58btc', 'z117paNL19xttacUY'],
      ['base64', 'mAAB5ZXMgbWFuaSAh'],
      ['base64pad', 'MAAB5ZXMgbWFuaSAh'],
      ['base64url', 'uAAB5ZXMgbWFuaSAh'],
      ['base64urlpad', 'UAAB5ZXMgbWFuaSAh'],
      ['base256emoji', '🚀🚀🚀🏃✋🌈😅🌷🤤😻🌟😅👏']
    ]
  }
]

describe('spec test', () => {
  let index = 0
  for (const { input, tests } of encoded) {
    describe(`multibase spec ${index++}`, () => {
      for (const [name, output] of tests) {
        const base = bases[/** @type {keyof bases} */(name)]

        describe(name, () => {
          it('should encode buffer', () => {
            const out = base.encode(fromString(input))
            assert.deepStrictEqual(out, output)
          })

          it('should decode string', () => {
            assert.deepStrictEqual(base.decode(output), fromString(input))
          })
        })
      }
    })
  }

  for (const base of Object.values(bases)) {
    it('should fail decode with invalid char', function () {
      if (base.name === 'identity') {
        return this.skip()
      }

      assert.throws(() => base.decode(base.prefix + '^!@$%!#$%@#y'), `Non-${base.name} character`)
    })
  }
})
