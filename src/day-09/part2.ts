import { raw } from "./raw"

class Solution {
    ropeLength = 10
    rope = new Array(this.ropeLength).fill("").map((x) => {
        return { x: 0, y: 0 }
    })
    visited: string[] = ["0,0"]
    get input() {
        return raw.split("\n")
    }

    moveHead(command: string) {
        const [direction, amount] = command.split(" ")
        for (let i = 0; i < parseInt(amount); i++) {
            if (direction === "U") this.rope[0].y++
            if (direction === "D") this.rope[0].y--
            if (direction === "R") this.rope[0].x++
            if (direction === "L") this.rope[0].x--
            for (let level = 1; level <= this.ropeLength-1; level++) {
                this.moveTail(level)
            }
        }
    }
    moveTail(level: number) {
        if (this.isTailNear(level)) return
        const xHead = this.rope[level - 1].x
        const yHead = this.rope[level - 1].y
        const xTail = this.rope[level].x
        const yTail = this.rope[level].y
        const xDiff = xHead - xTail
        const yDiff = yHead - yTail
        if (yDiff === 0) this.rope[level].x += 1 * Math.sign(xDiff)
        else if (xDiff === 0) this.rope[level].y += 1 * Math.sign(yDiff)
        else {
            this.rope[level].x += 1 * Math.sign(xDiff)
            this.rope[level].y += 1 * Math.sign(yDiff)
        }
        if (level === this.ropeLength-1) this.addVisit(this.rope[9].x, this.rope[9].y)
    }
    addVisit(x: number, y: number) {
        const location = `${x},${y}`
        if (this.visited.includes(location)) return
        this.visited.push(location)
    }
    isTailNear(level: number) {
        const distanceSq = (this.rope[level - 1].x - this.rope[level].x) ** 2 + (this.rope[level - 1].y - this.rope[level].y) ** 2
        return distanceSq <= 2
    }
    get part2solution() {
        for (let move of this.input) {
            this.moveHead(move)
        }
        return this.visited.length
    }
}

const solution = new Solution()
console.log(solution.part2solution)
