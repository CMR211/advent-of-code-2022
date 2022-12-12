import { raw } from "./raw"

class Solution {
    get findBuffer() {
        for (let index = 4; index < raw.length - 1; index++) {
            const buffer = raw.slice(index-4,index)
            for (let i = 0; i< 4;i++) {
                const temp = buffer.slice()
                temp[i] = "."
            }
        }
    }
}

const solution = new Solution
console.log(solution.findBuffer)