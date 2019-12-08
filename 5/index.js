const fs = require('fs')

const OP = {
  SUM: 1,
  MULT: 2,
  INPUT: 3,
  OUTPUT: 4,
  JUMP_IF_TRUE: 5,
  JUMP_IF_FALSE: 6,
  LESS: 7,
  EQ: 8,
  EXIT: 99
}

const MODE = {
  POSITION: '0',
  IMMEDIATE: '1'
}

function runProgram(programData, input = []) {
  let program = programData.slice(), output = [], ip = 0
  const getVal = mode => mode === MODE.IMMEDIATE ? program[ip++] : program[program[ip++]]
  const setVal = val => program[program[ip++]] = val

  while(ip < programData.length) {
    const next = getVal(MODE.IMMEDIATE)
    const opcode = next % 100
    const mode = ('' + (next - opcode) / 100).padStart(3, '0')

    if (opcode === OP.EXIT) {
      break
    } else if (opcode === OP.SUM) {
      const arg1 = getVal(mode[2])
      const arg2 = getVal(mode[1])
      setVal(arg1 + arg2)
    } else if (opcode === OP.MULT) {
      const arg1 = getVal(mode[2])
      const arg2 = getVal(mode[1])
      setVal(arg1 * arg2)
    } else if (opcode === OP.INPUT) {
      setVal(input.shift())
    } else if (opcode === OP.OUTPUT) {
      const arg1 = getVal(mode[2])
      output.push(arg1)
    } else if (opcode === OP.JUMP_IF_TRUE) {
      const arg1 = getVal(mode[2])
      const arg2 = getVal(mode[1])
      if (arg1 !== 0) {
        ip = arg2
      }
    } else if (opcode === OP.JUMP_IF_FALSE) {
      const arg1 = getVal(mode[2])
      const arg2 = getVal(mode[1])
      if (arg1 === 0) {
        ip = arg2
      }
    } else if (opcode === OP.LESS) {
      const arg1 = getVal(mode[2])
      const arg2 = getVal(mode[1])
      setVal(arg1 < arg2 ? 1 : 0)
    } else if (opcode === OP.EQ) {
      const arg1 = getVal(mode[2])
      const arg2 = getVal(mode[1])
      setVal(arg1 === arg2 ? 1 : 0)
    }
  }
  return { program, output }
}

const program = fs.readFileSync('5/input.txt').toString().split(',').map(c => Number(c))
let out = runProgram(program, [1])
console.log('Answer 1:', out.output.pop())
out = runProgram(program, [5])
console.log('Answer 2:', out.output.pop())
