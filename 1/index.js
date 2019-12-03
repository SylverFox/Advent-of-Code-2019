const fs = require('fs');

const fuelRequired = mass => Math.max(Math.floor(mass / 3) - 2, 0)
const sum = (a,b) => a+b

const input = fs.readFileSync('input.txt').toString().split('\n')
const output1 = input.map(fuelRequired).reduce(sum)
console.log('answer 1:', output1)

let fuel = 0, done = false
for (let part of input) {
  while(part !== 0) {
    part = fuelRequired(part)
    fuel += part
  }
}

console.log('answer 2:', fuel)
