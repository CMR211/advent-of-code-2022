import { raw } from "./raw"

class Part1 {
    get input() {
        return this.parse(raw)
    }
    parse(raw: string) {
        return raw.replace(/A|X/g, "rock").replace(/B|Y/g, "paper").replace(/C|Z/g, "scissors").split("\n")
    }
    pointsMap = {
        "rock rock": 1 + 3,
        "paper rock": 1 + 0,
        "scissors rock": 1 + 6,
        "rock paper": 2 + 6,
        "paper paper": 2 + 3,
        "scissors paper": 2 + 0,
        "rock scissors": 3 + 0,
        "paper scissors": 3 + 6,
        "scissors scissors": 3 + 3,
    }
    get battlePoints() {
        return this.input.map((row) => this.pointsMap[row as keyof typeof this.pointsMap])
    }
    get totalPoints() {
        return this.battlePoints.reduce((acc, curr) => acc + curr, 0)
    }
}
const part1 = new Part1()
console.log(part1.totalPoints)
// 13009

class Part2 {
    get input() {
        return this.parse(raw)
    }
    parse(raw: string) {
        return raw
            .replace(/A/g, "rock")
            .replace(/B/g, "paper")
            .replace(/C/g, "scissors")
            .replace(/X/g, "lose")
            .replace(/Y/g, "draw")
            .replace(/Z/g, "win")
            .split("\n")
    }
    pointsMap = {
        "rock lose": 3+0,
        "paper lose": 1+0,
        "scissors lose": 2+0,
        "rock draw": 1+3,
        "paper draw": 2+3, 
        "scissors draw": 3+3,
        "rock win": 2+6,
        "paper win": 3+6,
        "scissors win": 1+6,
    }
    get battlePoints() {
        return this.input.map(row => this.pointsMap[row as keyof typeof this.pointsMap])
    }
    get totalPoints() {
        return this.battlePoints.reduce((acc,curr) => acc+curr,0)
    }
}
const part2 = new Part2
console.log(part2.totalPoints)
// 10398
