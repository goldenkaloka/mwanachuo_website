const { createHash } = require('crypto');
const username = 'M247234';
const password = 'Genuine20';
const input = username + '~:~' + password;
const hash = createHash('md5').update(input).digest('hex');
console.log('Derived Key:', hash);
console.log('Matches User Secret Key?', hash === '2da4b10b2a93a4fb99144f821bc38aa4');
