let fs = require('fs');
let stream = new fs.WriteStream('02-write-file/text.txt', {encoding: 'utf-8'});

console.log('\nEnter your message, please:')

process.stdin.on('data', (data) => {
  const answer = data.toString().trim();
  if(answer === 'exit') {
    console.log('\nThe end')
    process.exit()
  }
  else {
    stream.write(answer + '\n')
    console.log('\ncan add message:')
  }
})
process.on('SIGINT', () => {
  console.log('\nThe end')
  process.exit()
})

