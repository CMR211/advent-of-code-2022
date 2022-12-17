import { raw } from "./raw"

class Solution {
    input = raw.split("\n\n").map((n) => n.split("\n").map((n) => JSON.parse(n)))
    input2 = raw
        .split("\n")
        .filter((n) => n.length > 0)
        .map((n) => JSON.parse(n))

    compareArray(first: any, second: any): boolean | null {
        let i = -1
        let isFirstSmaller: boolean
        while (true) {
            i++
            const a = first[i]
            const b = second[i]
            // both items are equal, lets return null
            if (a === undefined && b === undefined) return null
            // checking if there is anything to compare
            if (a === undefined) {
                isFirstSmaller = true
                break
            }
            if (b === undefined) {
                isFirstSmaller = false
                break
            }
            // typecasting to arrays if comparision is between array and number
            if (typeof a === "object" && typeof b === "number") {
                const res = this.compareArray(a, [b])
                if (res === null) continue
                else return res
            }
            if (typeof a === "number" && typeof b === "object") {
                const res = this.compareArray([a], b)
                if (res === null) continue
                else return res
            }
            // if both are arrays - deeper compare
            if (typeof a === "object" && typeof b === "object") {
                const res = this.compareArray(a, b)
                if (res === null) continue
                else return res
            }
            // if both are numbers - finally compare items
            if (a < b) {
                isFirstSmaller = true
                break
            }
            if (a > b) {
                isFirstSmaller = false
                break
            }
        }
        return isFirstSmaller
    }
    get part1solution() {
        return this.input
            .map((i) => this.compareArray(i[0], i[1]))
            .map((item, index) => {
                return { item, index }
            })
            .reduce((acc, curr) => {
                if (curr.item === true) return acc + curr.index + 1
                else return acc + 0
            }, 0)
    }
    get part2solution() {
        this.input2.push([[2]],[[6]])
        const sorted = this.input2.sort((a, b)=>{
            const res = this.compareArray(a,b)
            if (res) return -1
            else return 1
        })
        const json = sorted.map(n=>JSON.stringify(n))
        const i1 = json.indexOf("[[2]]") + 1
        const i2 = json.indexOf("[[6]]") + 1
        return i1*i2
    }
}
const solution = new Solution()

console.log(solution.part1solution)
// 4809

console.log(solution.part2solution)
// 22600
