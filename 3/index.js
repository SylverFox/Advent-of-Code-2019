const fs = require('fs')
const assert = require('assert')

const UP = 'U', RIGHT = 'R', DOWN = 'D', LEFT = 'L'

const path_map = wire => ({direction: wire[0], distance: Number(wire.slice(1))})

const road = path => {
  let points = []
  let x = 0, y = 0, steps = 1
  for (let wire of path) {
    for (let i = 0; i < wire.distance; i++, steps++) {
      y += wire.direction === UP ? 1 : wire.direction === DOWN ? -1 : 0
      x += wire.direction === RIGHT ? 1 : wire.direction === LEFT ? -1 : 0
      if (!points[y]) points[y] = []
      points[y][x] = steps
    }
  }
  return points
}
const getCrossings = paths => {
  const [path1, path2] = paths
    .map(p => p.split(',').map(path_map))
    .map(road)
  let crossings = []
  for (let p1y in path1) {
    for (let p1x in path1[p1y]) {
      if (path2[p1y] && path2[p1y][p1x]) {
        crossings.push([
          Math.abs(p1y) + Math.abs(p1x),
          path1[p1y][p1x] + path2[p1y][p1x]
        ])
      }
    }
  }
  return crossings
}

const run = paths => getCrossings(paths).sort((c1, c2) => c1[0] - c2[0])[0][0]
const run2 = paths => getCrossings(paths).sort((c1, c2) => c1[1] - c2[1])[0][1]

const test_cases = [
  {
    input: ['R8,U5,L5,D3', 'U7,R6,D4,L4'],
    output1: 6,
    output2: 30
  },
  {
    input: ['R75,D30,R83,U83,L12,D49,R71,U7,L72', 'U62,R66,U55,R34,D71,R55,D58,R83'],
    output1: 159,
    output2: 610
  },
  {
    input: ['R98,U47,R26,D63,R33,U87,L62,D20,R33,U53,R51', 'U98,R91,D20,R16,D67,R40,U7,R15,U6,R7'],
    output1: 135,
    output2: 410
  }
]

test_cases.forEach(tc => {
  const out1 = run(tc.input)
  assert(out1 === tc.output1, `run: ${tc.input} !== ${tc.output1}, actual: ${out1}`)
  const out2 = run2(tc.input)
  assert(out2 === tc.output2, `run: ${tc.input} !== ${tc.output2}, actual: ${out2}`)
})

const input = fs.readFileSync('3/input.txt').toString().split('\n')

const minDist = run(input)
console.log('Answer 1:', minDist)
const minSteps = run2(input)
console.log('Answer 2:', minSteps)
