import { raw } from "./raw"

class Solution {
    DIM = Math.sqrt(this.input.length)
    get input() {
        return raw.split("").filter((i) => i !== "\n")
    }
    isTreeVisible(index: number) {
        let treeVisibile = false
        const [x, y] = this.coordinates(index)
        const height = this.input[index]
        const trees = {
            top: this.input.filter((_, i) => {
                const [xi, yi] = this.coordinates(i)
                return yi < y && xi === x
            }),
            bottom: this.input.filter((_, i) => {
                const [xi, yi] = this.coordinates(i)
                return yi > y && xi === x
            }),
            left: this.input.filter((_, i) => {
                const [xi, yi] = this.coordinates(i)
                return xi < x && yi === y
            }),
            right: this.input.filter((_, i) => {
                const [xi, yi] = this.coordinates(i)
                return xi > x && yi === y
            }),
        }
        return (
            trees.top.every((v) => v < height) ||
            trees.bottom.every((v) => v < height) ||
            trees.left.every((v) => v < height) ||
            trees.right.every((v) => v < height)
        )
    }
    coordinates(index: number) {
        const x = index % this.DIM
        const y = Math.floor(index / this.DIM)
        return [x, y]
    }
    get part1solution() {
        return this.input
            .map((tree, index) => {
                if (this.isTreeVisible(index)) return 1
                else return 0
            })
            .reduce((acc: number, curr) => acc + curr, 0)
    }
    treesVisible(index: number) {
        const [x, y] = this.coordinates(index)
        const currentTree = parseInt(this.input[index])
        const deltas = [
            [-1, 0],
            [0, -1],
            [1, 0],
            [0, 1],
        ]
        let visibleTreesMulti = 1
        for (let delta of deltas) {
            let i = 1
            let visibleTrees = 0

            while (true) {
                const nextX = x + i * delta[0]
                const nextY = y + i * delta[1]
                if (nextX < 0 || nextX > this.DIM - 1 || nextY < 0 || nextY > this.DIM - 1) break
                const tree = parseInt(this.input[nextY * this.DIM + nextX])
                visibleTrees++
                if (tree >= currentTree) break
                i++
            }
            visibleTreesMulti *= visibleTrees
        }
        return visibleTreesMulti
    }
    get part2solution() {
        return this.input.map((tree, index) => this.treesVisible(index)).sort((a, b) => b - a)[0]
    }
}

const solution = new Solution()

console.log(solution.part1solution)
// 1816

console.log(solution.part2solution)
// 383520
