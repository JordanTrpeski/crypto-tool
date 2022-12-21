import { exit } from 'process'
import { decrypt, user } from './common.js'

user.question('Data to decrypt: ', data => {
  user.question('Password to use: ', key => {
    console.log('Plain text:')
    console.log(decrypt(data, key))
    exit()
  })
})

