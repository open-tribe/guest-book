import { context, u128, PersistentVector, PersistentMap } from "near-sdk-as";

/**
 * Exporting a new class PostedMessage so it can be used outside of this file.
 */
@nearBindgen // decorate with nearBindgen so it can be serialized with Borsh
export class PostedMessage {
  premium: boolean;
  sender: string;
  // public here consolidate both declaration and assignment into one place
  // no need to write extra `this.text = text` here
  constructor(public text: string) {
    this.premium = context.attachedDeposit >= u128.from('10000000000000000000000');
    this.sender = context.sender;
  }
}
/**
 * collections.vector is a persistent collection. Any changes to it will
 * be automatically saved in the storage.
 * The parameter to the constructor needs to be unique across a single contract.
 * It will be used as a prefix to all keys required to store data in the storage.
 */
export const messages = new PersistentVector<PostedMessage>("m");


// add the donation model and persistent objects

export const donations = new PersistentMap<string, u128>("d:");
