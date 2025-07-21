import { Actor, HttpAgent } from "@dfinity/agent";
import { DelegationIdentity } from "@dfinity/identity";
import { OdinActor } from "../types/odin";
import { DEFAULT_IC_HOST, ODIN_CANISTER_ID } from "../constants/canister";
import { idlFactory as OdinIdlFactory } from '../canister/odin_canister.idl';

export const getActor = (identity: DelegationIdentity): OdinActor => {
    // Step 1: Create an authenticated actor with the identity
     const agent = new HttpAgent({ identity, host: DEFAULT_IC_HOST });
     const odinActor = Actor.createActor(OdinIdlFactory, {
       agent,
       canisterId: ODIN_CANISTER_ID,
     }) as OdinActor;

     return odinActor;
}