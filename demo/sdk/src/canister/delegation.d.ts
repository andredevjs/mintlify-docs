import type { DerEncodedPublicKey, Signature } from "@dfinity/agent"
import type { PublicKey } from "./service.interface"
import { DelegationChain } from "@dfinity/identity"
import type { SignedDelegation as ServiceSignedDelegation } from "./service.interface"
/**
 * Converts a Uint8Array or number array to a Signature object.
 */
export declare function asSignature(signature: Uint8Array | number[]): Signature
/**
 * Converts a Uint8Array or number array to a DerEncodedPublicKey object.
 */
export declare function asDerEncodedPublicKey(
	publicKey: Uint8Array | number[],
): DerEncodedPublicKey
export declare function createDelegationChain(
	signedDelegation: ServiceSignedDelegation,
	publicKey: PublicKey,
): DelegationChain
