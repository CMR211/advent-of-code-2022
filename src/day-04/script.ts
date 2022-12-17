import { raw } from "./raw"

class Solution {
    get input() {
        return raw.split("\n").map((row) => row.split(/-|,/g).map((i) => parseInt(i)))
    }
    isRowFullyContained(row:number[]){
        const firstRangeIsFullyContained = row[0] >= row[2] && row[1] <= row[3]
        const secondRangeIsFullyContained = row[2] >= row[0] && row[3] <= row[1]
        return (firstRangeIsFullyContained || secondRangeIsFullyContained)
    }
    get fullyContainedRows() {
        return this.input.map(row => this.isRowFullyContained(row)).reduce((acc,curr) => {
            if (curr) acc++
            return acc
        },0)
    }
    isRowPartiallyContained(row:number[]) {
        const endsOverlap = row[0] <= row[2] && row[1] >= row[2]
        const startsOverlap = row[2] <= row[0] && row[3] >= row[0]
        return (endsOverlap || startsOverlap)
    }
    get partiallyContainedRows() {
        return this.input.map(row => this.isRowPartiallyContained(row)).reduce((acc,curr) => {
            if (curr) acc++
            return acc
        },0)
    }
}

const solution = new Solution()
console.log(solution.fullyContainedRows)
// 464

console.log(solution.partiallyContainedRows)
// 770


