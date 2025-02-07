import * as bytes from './bytes.js'
import { CID } from './cid.js'
import * as digest from './hashes/digest.js'
import * as hasher from './hashes/hasher.js'
import * as varint from './varint.js'

// This way TS will also expose all the types from module
export * from './interface.js'

export { CID, hasher, digest, varint, bytes }
