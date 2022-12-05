import { input } from "./input"

function parseInput(inp: string): number[][] {
    const intermediate = inp.replace(/(\d+)/g, "$1,").replace(/\n\n/g, "x").replace(/\n/g, "").replace(/,x/g, "], [")
    return JSON.parse("[[" + intermediate.slice(0, -1) + "]]")
}

function countCalories(elves: number[][]) {
    return elves.map((elf) => elf.reduce((acc, curr) => acc + curr, 0))
}

function findBiggest(elves: number[]) {
    const sorted: number[] = JSON.parse(JSON.stringify(elves)).sort((a: number, b: number) => b - a)
    const biggestValue = sorted[0]
    return elves.indexOf(biggestValue)
}

const part1answer = findBiggest(countCalories(parseInput(input)))
console.log(part1answer)

// 67633 in position 6

function find3Biggest(elves: number[]) {
    const sorted: number[] = JSON.parse(JSON.stringify(elves)).sort((a: number, b: number) => b - a)
    const biggest = sorted.slice(0, 3)
    return biggest.reduce((a, b) => a + b, 0)
}

const part2answer = find3Biggest(countCalories(parseInput(input)))
console.log(part2answer)
