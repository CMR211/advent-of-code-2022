import { raw } from "./raw"

class Solution {
    xH = 0
    yH = 0
    xT = 0
    yT = 0
    visited: string[] = []
    get input() {
        return raw.split("\n")
    }
    get coordinatesH() {
        return { x: this.xH, y: this.yH }
    }
    get coordinatesT() {
        return { x: this.xT, y: this.yT }
    }
    moveHead(command: string) {
        const [direction, amount] = command.split(" ")
        for (let i = 0; i < parseInt(amount); i++) {
            if (direction === "U") this.yH++
            if (direction === "D") this.yH--
            if (direction === "R") this.xH++
            if (direction === "L") this.xH--
            if (!this.isTailNear()) this.moveTail()
        }
    }
    moveTail() {
        const xDiff = this.xH - this.xT
        const yDiff = this.yH - this.yT
        if (yDiff === 0) this.xT = this.xT + 1 * Math.sign(xDiff)
        else if (xDiff === 0) this.yT = this.yT + 1 * Math.sign(yDiff)
        else {
            this.xT = this.xT + 1 * Math.sign(xDiff)
            this.yT = this.yT + 1 * Math.sign(yDiff)
        }
        this.addVisit()
    }
    addVisit() {
        const location = `${this.xT},${this.yT}`
        if (this.visited.includes(location)) return
        this.visited.push(location)
    }
    isTailNear() {
        const distanceSq = (this.xH - this.xT) ** 2 + (this.yH - this.yT) ** 2
        return distanceSq <= 2
    }
    get part1solution() {
        for (let move of this.input) this.moveHead(move)
        return this.visited.length
    }
}

const solution = new Solution()

console.log(solution.part1solution)
// 6030
