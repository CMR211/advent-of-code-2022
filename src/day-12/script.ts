import { raw } from "./raw"

const BIG_INT = 1_000_000

interface MapNode {
    x: number
    y: number
    char: string
    value: number
    distance: number
    visited: boolean
}

class Solution {
    xDim = raw.split("\n")[0].length
    input = raw
        .replace(/\n/g, "")
        .split("")
        .map((h, i) => {
            return <MapNode>{
                x: i % this.xDim,
                y: Math.floor(i / this.xDim),
                char: h,
                value: this.mapZtoValue(h),
                distance: BIG_INT,
                visited: false,
            }
        })

    mapZtoValue(z: string) {
        if (z === "S") return 0
        if (z === "E") return 25
        return "abcdefghijklmnopqrstuvwxyz".indexOf(z)
    }
    calculateDistances() {
        let unvisited: MapNode[] = this.input.filter((n) => n.visited === false)
        while (unvisited.length > 0) {
            const closest = unvisited.sort((a, b) => a.distance - b.distance)[0]
            this.neighbors(closest, unvisited).forEach((n) => {
                if (n.value - closest.value > 1) return
                n.distance = closest.distance + 1
            })
            closest.visited = true
            unvisited = unvisited.filter((n) => n.visited === false)
        }
    }
    get part1solution() {
        this.input.find((n) => n.char === "S")!.distance = 0
        this.calculateDistances()
        return this.input.find((n) => n.char === "E")!.distance
    }
    get part2solution() {
        const ANodes = this.input.filter((n) => n.char === "a")
        console.log(ANodes.length)
        const distances: number[] = []
        ANodes.forEach((ANode) => {
            this.input.forEach((n) => {
                n.distance = BIG_INT
                n.visited = false
            })
            ANode.distance = 0
            this.calculateDistances()
            distances.push(this.input.find((n) => n.char === "E")!.distance)
        })
        return distances.sort((a, b) => a - b)[0]
    }

    neighbors(node: MapNode, unvisited: MapNode[]) {
        return unvisited.filter((n) => {
            if (n.x === node.x - 1 && n.y === node.y && n.visited === false) return true
            if (n.x === node.x + 1 && n.y === node.y && n.visited === false) return true
            if (n.x === node.x && n.y === node.y - 1 && n.visited === false) return true
            if (n.x === node.x && n.y === node.y + 1 && n.visited === false) return true
            return false
        })
    }
    findPath(node: MapNode) {}
}

const solution = new Solution()

console.log(solution.part1solution)
// 330

console.log(solution.part2solution)
// 321
