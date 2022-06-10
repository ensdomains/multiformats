import { base58btc } from './bases/base58.js'

/**
 * @template [T=unknown] - Logical type of the data encoded in the block
 * @template [C=number] - multicodec code corresponding to codec used to encode the block
 * @template [A=number] - multicodec code corresponding to the hashing algorithm used in CID creation.
 * @template [V=0|1] - CID version
 * @typedef {import('./cid/interface').Link<T, C, A, V>} Link
 */

/**
 * @template [T=unknown] - Logical type of the data encoded in the block
 * @template [C=number] - multicodec code corresponding to codec used to encode the block
 * @template [A=number] - multicodec code corresponding to the hashing algorithm used in CID creation.
 * @template [V=0|1] - CID version
 * @typedef {import('./block/interface').BlockView<T, C, A, V>} BlockView
 */

/**
 * @template T
 * @param {Object} options
 * @param {Link} options.cid
 * @param {<T, C, A, V>(cid: Link<T, C, A, V>) => Promise<BlockView<T, C, A, V>|null>} options.load
 * @param {Set<string>} [options.seen]
 */
const walk = async ({ cid, load, seen }) => {
  seen = seen || new Set()
  const b58Cid = cid.toString(base58btc)
  if (seen.has(b58Cid)) {
    return
  }

  const block = await load(cid)
  seen.add(b58Cid)

  if (block === null) { // the loader signals with `null` that we should skip this block
    return
  }

  for (const [, cid] of block.links()) {
    await walk({ cid, load, seen })
  }
}

export { walk }
