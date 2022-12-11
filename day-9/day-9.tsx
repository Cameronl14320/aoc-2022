import * as fs from 'fs';

const data = fs.readFileSync('./day-9/data.txt', "ascii");

enum Direction {
    Up,
    Right,
    Down,
    Left
}

type Move = {
    direction: Direction;
    steps: number;
}

const stringDirections: Map<string, Direction> = new Map([
    ['U', Direction.Up],
    ['R', Direction.Right],
    ['D', Direction.Down],
    ['L', Direction.Left]
]);

const moves: Move[] = data.split('\n').map(line => {
    const split = line.split(' ');
    return {
        direction: stringDirections.get(split[0]),
        steps: parseInt(split[1])
    }
});

const steps: Move[] = [];
moves.forEach(move => {
    for(let i = 0; i < move.steps; i++) {
        steps.push({direction: move.direction, steps: 1});
    }
});

type Location = {
    x: number;
    y: number;
}

class Knot {
    private location: Location;
    private visited: Location[];
    private head: Knot;
    private tail: Knot;
    private length: number;

    public constructor(length: number, parent: Knot, startLocation: Location) {
        this.location = startLocation;
        this.visited = [startLocation];
        this.head = parent;
        this.length = length;

        if (length > 0) {
            this.tail = new Knot(length - 1, this, startLocation);
        }
    }

    public execute(move: Move) {
        switch (move.direction) {
            case Direction.Up:
                this.location = { x: this.location.x, y: this.location.y + move.steps }
                break;
            case Direction.Right:
                this.location = { x: this.location.x + move.steps, y: this.location.y }
                break;
            case Direction.Down:
                this.location = { x: this.location.x, y: this.location.y - move.steps }
                break;
            case Direction.Left:
                this.location = { x: this.location.x - move.steps, y: this.location.y }
                break;
            default:
                break;
        }
        this.visited.push(this.location);

        if (!!this.tail) {
            this.tail.follow(move, this.location, 1);
        }
    }

    private follow(move: Move, newLoc: Location, childNo: number) {
        var currentDistance = this.getDistance(this.location, newLoc);
        while (currentDistance >= 2) {
            if (newLoc.y > this.location.y && newLoc.x === this.location.x) {
                this.location = { x: this.location.x, y: this.location.y + 1 }
            } else if (newLoc.y < this.location.y && newLoc.x === this.location.x) {
                this.location = { x: this.location.x, y: this.location.y - 1 }
            } else if (newLoc.x > this.location.x && newLoc.y === this.location.y) {
                this.location = { x: this.location.x + 1, y: this.location.y }
            } else if (newLoc.x < this.location.x && newLoc.y === this.location.y) {
                this.location = { x: this.location.x - 1, y: this.location.y }
            } else if (newLoc.y > this.location.y) {
                var offset = newLoc.x > this.location.x ? 1 : - 1
                this.location = { x: this.location.x + offset, y: this.location.y + 1 };
            } else if (newLoc.y < this.location.y) {
                var offset = newLoc.x > this.location.x ? 1 : - 1
                this.location = { x: this.location.x + offset, y: this.location.y - 1 };
            } else if (newLoc.x > this.location.x) {
                var offset = newLoc.y > this.location.y ? 1 : - 1
                this.location = { x: this.location.x + 1, y: this.location.y + offset };
            } else if (newLoc.x < this.location.x) {
                var offset = newLoc.y > this.location.y ? 1 : - 1
                this.location = { x: this.location.x - 1, y: this.location.y + offset };
            }
            currentDistance = this.getDistance(this.location, newLoc);
            this.visited.push(this.location);
        }
        if (this.length === 0) {
            console.log(`${childNo} : Position : ${this.location.x}, ${this.location.y} `);
        }

        if (!!this.tail) {
            this.tail.follow(move, this.location, childNo + 1);
        }
    }

    private getDistance(locA: Location, locB: Location): number {
        return Math.sqrt(Math.pow(locA.x - locB.x, 2) + Math.pow(locA.y - locB.y, 2));
    }

    public getAllVisited(): Location[] {
        var allVisited: Location[] = [];
        if (!!this.head && this.length === 0) {
            this.visited.forEach(location => allVisited.push(location));
        }

        if (!!this.tail) {
            this.tail.getAllVisited().forEach(location => {
                if (!allVisited.some(loc => loc.x === location.x && loc.y === location.y)) {
                    allVisited.push(location);
                }
            });
        }

        return allVisited;
    }
}

const start = { x: 0, y: 0 };
const head = new Knot(9, null, start);
steps.forEach(move => {
    head.execute(move);
});
const visited = head.getAllVisited();
const sorted = visited.sort((a, b) => {
    if (a.x < b.x) return -1;
    if (a.x > b.x) return 1;
    if (a.x === b.x) {
        if (a.y < b.y) return -1;
        if (a.y > b.y) return 1;
    }
    return 0;
});

console.log(visited.length);