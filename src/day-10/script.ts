import { raw } from "./raw"

class CPU {
    cycle = 1
    X = 1
    line = 0
    totalSignalStrength = 0
    crt = ""
    get input() {
        return raw.split("\n")
    }
    next() {
        const command = this.input[this.line]
        if (command === "noop") {
            // cycle begin
            this.logSignalStrength()
            this.drawPixel()
            //cycle ends
            this.cycle++
            this.line++
        } else {
            //cycle begins
            this.logSignalStrength()
            this.drawPixel()
            // cycle ends
            this.cycle++
            // cycle begins
            this.logSignalStrength()
            this.drawPixel()
            // cycle ends
            this.cycle++
            this.X += parseInt(command.slice(5)) // after prev cycle and before next cycle
            this.line++
        }
        if (this.cycle < 240) this.next()
    }
    log() {
        console.log("cycle:", this.cycle, "| X:", this.X)
    }
    logSignalStrength() {
        if (this.cycle === 20 || this.cycle % 40 === 20) {
            const signalStrength = this.X * this.cycle
            console.log("cycle:", this.cycle, "| signal strength:",signalStrength )
            this.totalSignalStrength +=signalStrength
        }
    }
    get part1solution() {
        return this.totalSignalStrength
    }
    drawPixel() {
        const spritePosition = this.X 
        const CRTPosition = (this.cycle % 40 )- 1
        if (Math.abs(CRTPosition - spritePosition) < 2) this.crt += "#"
        else this.crt += " "
        // console.log("-------------------","\nsprite position:",spritePosition,"\nCRTPosition:",CRTPosition,"\n",this.crt)
    }
    get part2solution() {
        return this.crt.replace(/(.{40})/g,"$1\n")
    }
}

const cpu = new CPU()
cpu.next()

console.log(cpu.part1solution)
// 15260
console.log(cpu.part2solution)


