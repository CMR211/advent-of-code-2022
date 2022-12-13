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
    get input() {
        return raw.split("$").map((command) => command.split("\n").slice(0, -1))
    }
    parseCommand(commandGroup: string[]) {
        console.log(commandGroup)
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
        this.input.forEach((commandGroup) => this.parseCommand(commandGroup))
    }
}

const solution = new Solution()
solution.parseInput()
console.log(
    nodes.filter((node) => {
        if (node instanceof Folder) {
            if (node.childrenSize >= 100000) return true
            else return false
        }
        else return false
    }).reduce((acc,node:Folder) => {
        acc = acc + node.childrenSize
        return acc
    },0)
)
