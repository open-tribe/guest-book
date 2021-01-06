import { PostedMessage, messages, donations } from './model';
import { u128, context } from "near-sdk-as";

// --- contract code goes below

// The maximum number of latest messages the contract returns.
const MESSAGE_LIMIT = 10;

/**
 * Adds a new message under the name of the sender's account id.\
 * NOTE: This is a change method. Which means it will modify the state.\
 * But right now we don't distinguish them with annotations yet.
 */
export function addMessage(text: string): void {
  // Creating a new message and populating fields with our data
  const message = new PostedMessage(text);
  // Adding the message to end of the the persistent collection
  messages.push(message);
  // Only increment donation when the amount is greater than zero
  const amount = context.attachedDeposit;
  if (u128.gt(amount, u128.Zero)) {
    const account_id = context.sender;
    const current_donation = getDonation(account_id);
    const new_donation = u128.add(current_donation, amount);
    // may have overflow issue here
    if (u128.gt(new_donation, current_donation)) {
      donations.set(account_id, u128.add(current_donation, amount));
    }
  }
}

/**
 * Returns an array of last N messages.\
 * NOTE: This is a view method. Which means it should NOT modify the state.
 */
export function getMessages(): PostedMessage[] {
  const numMessages = min(MESSAGE_LIMIT, messages.length);
  const startIndex = messages.length - numMessages;
  const result = new Array<PostedMessage>(numMessages);
  for(let i = 0; i < numMessages; i++) {
    result[i] = messages[i + startIndex];
  }
  return result;
}

// get donation
export function getDonation(account_id: string): u128 {
  return donations.get(account_id, u128.Zero)!
}
