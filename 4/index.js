const input = '231832-767346';
const [min, max] = input.split('-').map(Number)

const doubles = [...Array(10).keys()].map(x => ''+x+x)
const triples = [...Array(10).keys()].map(x => ''+x+x+x)
const hasDouble = numstring => doubles.some(d => numstring.includes(d))
const inRange = numstring => numstring/1 >= min && numstring/1 <= max
const hasUniqueDouble = numstring => doubles.find(
  (d, i) => numstring.includes(d) && !numstring.includes(triples[i])
)

const test = num => hasDouble(num) && inRange(num)
const test2 = num => hasUniqueDouble(num) && inRange(num)

function bruteNum(part = '', testfunc) {
  if (part.length === 6) {
    return testfunc(part) ? 1 : 0
  }

  const last = part.length === 0 ? 0 : part.slice(-1)/1

  let num = 0
  for (let i = last; i < 10; i++) {
    num += bruteNum(part + i, testfunc)
  }
  return num
}

console.log('Answer 1:', bruteNum('', test))
console.log('Answer 2:', bruteNum('', test2))

