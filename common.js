import { randomBytes, createCipheriv, createDecipheriv } from 'crypto'
import readline from 'readline'
const algorithm = 'aes-256-ctr'

const cyrb128 = str => {
  let h1 = 1779033703, h2 = 3144134277,
      h3 = 1013904242, h4 = 2773480762;
  for (let i = 0, k; i < str.length; i++) {
      k = str.charCodeAt(i);
      h1 = h2 ^ Math.imul(h1 ^ k, 597399067);
      h2 = h3 ^ Math.imul(h2 ^ k, 2869860233);
      h3 = h4 ^ Math.imul(h3 ^ k, 951274213);
      h4 = h1 ^ Math.imul(h4 ^ k, 2716044179);
  }
  h1 = Math.imul(h3 ^ (h1 >>> 18), 597399067);
  h2 = Math.imul(h4 ^ (h2 >>> 22), 2869860233);
  h3 = Math.imul(h1 ^ (h3 >>> 17), 951274213);
  h4 = Math.imul(h2 ^ (h4 >>> 19), 2716044179);
  return [(h1^h2^h3^h4)>>>0, (h2^h1)>>>0, (h3^h1)>>>0, (h4^h1)>>>0];
}

const sfc32 = (a, b, c, d) => {
  return () => {
    a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
    var t = (a + b) | 0;
    a = b ^ b >>> 9;
    b = c + (c << 3) | 0;
    c = (c << 21 | c >>> 11);
    d = d + 1 | 0;
    t = t + d | 0;
    c = c + t | 0;
    return (t >>> 0);
  }
}

const randomWithSeed = seed => {
  const seed128 = cyrb128(seed)
  return sfc32(seed128[0], seed128[1], seed128[2], seed128[3])
}

const getKeyFromSeed = seed => {
  const rand = randomWithSeed(seed)
  const value = new Int32Array([rand(), rand(), rand(), rand()])
  return [...new Uint8Array(value.buffer)]
      .map(x => x.toString(16).padStart(2, '0'))
      .join('');
}

const encrypt = (text, secretKey) => {
  const iv = randomBytes(16)
  const cipher = createCipheriv(algorithm, getKeyFromSeed(secretKey), iv)
  const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
  return Buffer.concat([iv, encrypted]).toString('hex')
}

const decrypt = (hash, secretKey) => {
  const decipher = createDecipheriv(algorithm, getKeyFromSeed(secretKey), Buffer.from(hash.substr(0, 32), 'hex'))
  return Buffer.concat([decipher.update(Buffer.from(hash.substr(32), 'hex')), decipher.final()]).toString()
}

const user = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})


export {
  encrypt,
  decrypt,
  user,
}