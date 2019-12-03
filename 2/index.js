const fs = require('fs')
const assert = require('assert')

const OP = {
  SUM: 1,
  MULT: 2,
  EXIT: 99
}

function runProgram(input) {
  const program = input.slice()
  for(let i = 0; i < program.length; i += 4) {
    if (program[i] === OP.EXIT) {
      break
    } else if(program[i] === OP.SUM) {
      program[program[i+3]] = program[program[i+1]] + program[program[i+2]]
    } else if(program[i] === OP.MULT) {
      program[program[i+3]] = program[program[i+1]] * program[program[i+2]]
    }
  }
  return program
}


function test() {
  const equals = (a,b) => a.every((x,i) => x === b[i])
  assert(equals(runProgram([1,0,0,0,99]), [2,0,0,0,99]))
  assert(equals(runProgram([2,3,0,3,99]), [2,3,0,6,99]))
  assert(equals(runProgram([2,4,4,5,99,0]), [2,4,4,5,99,9801]))
  assert(equals(runProgram([1,1,1,4,99,5,6,0,99]), [30,1,1,4,2,5,6,0,99]))
}

test()

const program = fs.readFileSync('input.txt').toString().split(',').map(c => Number(c))
program[1] = 12
program[2] = 2
const output = runProgram(program)
console.log('answer 1: ', output[0])

for(let i = 0; i < 100; i++) {
  for(let j = 0; j < 100; j++) {
    program[1] = i
    program[2] = j
    if (runProgram(program)[0] === 19690720) {
      console.log('answer 2:', 100 * i + j)
      break
    }
  }
}