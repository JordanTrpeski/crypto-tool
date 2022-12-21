import { exit } from 'process'
import { encrypt, user } from './common.js'

user.question('Data to encrypt: ', data => {
  user.question('Password to use: ', key => {
    console.log('Encrypted text:')
    console.log(encrypt(data, key))
    exit()
  })
})

