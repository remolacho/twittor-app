const MIN_LENGTH = 0;
const MAX_LENGTH = 280;

export function validSendTweet(message){
    return message.length > MIN_LENGTH && message.length <= MAX_LENGTH
}