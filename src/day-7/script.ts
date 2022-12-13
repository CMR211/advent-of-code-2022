import { raw } from "./raw"

const nodes: (File | Folder)[] = []

class Node {
    path = ""
    parentPath = ""
    name = ""
    constructor(_path: string) {
        this.path = _path
        this.parentPath = _path.split("/").slice(0, -1).join("/")
        this.name = _path.split("/").slice(-1)[0]
    }
    get parent() {
        if (nodes.length < 1) return null
        else return nodes.filter((node) => node.path === this.parentPath)
    }
}

class File extends Node {
    size = 0
    constructor(_path: string, _size: string) {
        super(_path)
        this.size = parseInt(_size)
    }
}

class Folder extends Node {
    constructor(_path: string) {
        super(_path)
    }
    get children() {
        return nodes.filter((node) => node.parentPath === this.path)
    }
    get childrenSize() {
        let totalSize = 0
        this.children.forEach((child) => {
            if (child instanceof File) totalSize += child.size
            if (child instanceof Folder) totalSize += child.childrenSize
        })
        return totalSize
    }
}

class Solution {
    currentDirectory = "home"
    spaceRequired = 30_000_000
    spaceMax = 70_000_000
    get input() {
        return raw.split("$").map((command) => command.split("\n").slice(0, -1))
    }
    parseCommand(commandGroup: string[]) {
        const command = commandGroup[0]
        if (command === undefined) return
        if (command.match("cd")) this.changeDirectory(command)
        else if (command.match("ls")) this.listFiles(commandGroup)
    }
    changeDirectory(command: string) {
        if (command === " cd /") return
        const location = command.slice(4)
        if (location === "..") {
            this.currentDirectory = this.currentDirectory.split("/").slice(0, -1).join("/")
            return
        }
        this.currentDirectory += "/" + location
    }
    listFiles(commandGroup: string[]) {
        const files = commandGroup.slice(1)
        files.forEach((ls) => {
            const [size, name] = ls.split(" ")
            if (size === "dir") nodes.push(new Folder(this.currentDirectory + "/" + name))
            else nodes.push(new File(this.currentDirectory + "/" + name, size))
        })
    }
    parseInput() {
        nodes.push(new Folder("home"))
        this.input.forEach((commandGroup) => this.parseCommand(commandGroup))
    }
    get listFolders(): [string, number][] {
        return (
            nodes
                .filter((node) => isFolder(node))
                // @ts-expect-error
                .sort((a, b) => a.childrenSize - b.childrenSize)
                // @ts-expect-error
                .map((node) => [node.path, node.childrenSize])
        )
    }
    get totalSize() {
        const len = this.listFolders.length
        return this.listFolders[len - 1][1]
    }
    get remainingSize() {
        return this.spaceMax - this.totalSize
    }
    get sizeNeededToUpdate() {
        return this.spaceRequired - this.remainingSize
    }
    get part1solution() {
        const sizes = nodes
            .filter((node) => isFolder(node))
            // @ts-expect-error
            .filter((node) => isSmall(node))
            // @ts-expect-error
            .map((node) => [node.path, node.childrenSize])
        return sizes.reduce((acc, curr) => acc + curr[1], 0)
    }
    get part2solution() {
        return this.listFolders.find((folder) => folder[1] > this.sizeNeededToUpdate)
    }
}

const solution = new Solution()
solution.parseInput()

function isFolder(node: Node) {
    return node instanceof Folder
}
function isSmall(node: Folder) {
    return node.childrenSize <= 100_000
}

// console.log(solution.part1solution)
// 1449447

console.log(
    "- total size:",
    solution.totalSize,
    "\n- remaining size:",
    solution.remainingSize,
    "\n- size needed for update:",
    solution.sizeNeededToUpdate,
    "\n- folder and its size:",
    solution.part2solution
)
// - total size: 48044502
// - remaining size: 21955498
// - size needed for update: 8044502
// - folder and its size: [ 'home/jbt/bbm/tvqh/vjdjl', 8679207 ]
