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

type Step = {
    direction: Direction;
}

const steps: Step[] = [];
moves.forEach(move => {
    for (let i = 0; i < move.steps; i++) {
        steps.push({
            direction: move.direction
        });
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

    public constructor(length: number, parent: Knot, startLocation: Location) {
        this.location = startLocation;
        this.visited = [startLocation];
        this.head = parent;

        if (length > 0) {
            this.tail = new Knot(length - 1, this, startLocation);
        }
    }

    public execute(move: Step) {
        switch (move.direction) {
            case Direction.Up:
                this.location = {x: this.location.x, y: this.location.y + 1}
                break;
            case Direction.Right:
                this.location = {x: this.location.x + 1, y: this.location.y}
                break;
            case Direction.Down:
                this.location = {x: this.location.x, y: this.location.y - 1}
                break;
            case Direction.Left:
                this.location = {x: this.location.x - 1, y: this.location.y}
                break;
            default:
                break;
        }
        this.visited.push(this.location);

        if (!!this.tail) {
            this.tail.follow(move, this.location);
        }
    }

    private follow(move: Step, newLoc: Location) {
        var currentDistance = this.getDistance(this.location, newLoc);
        if (currentDistance >= 2) {
            var newMove = move;
            while(currentDistance >= 2) {
                if (currentDistance > 2) {
                    switch (move.direction) {
                        case Direction.Up:
                            console.log(`Diagonal Up: ${this.location.x}, ${this.location.y}`);
                            var offset = newLoc.x > this.location.x ? 1 : - 1
                            this.location = {x: this.location.x + offset, y: this.location.y + 1};
                            newMove = {direction: Direction.Up};
                            break;
                        case Direction.Right:
                            console.log(`Diagonal Right: ${this.location.x}, ${this.location.y}`);
                            var offset = newLoc.y > this.location.y ? 1 : - 1
                            this.location = {x: this.location.x + 1, y: this.location.y + offset};
                            newMove = {direction: Direction.Right};
                            break;
                        case Direction.Down:
                            console.log(`Diagonal Down: ${this.location.x}, ${this.location.y}`);
                            var offset = newLoc.x > this.location.x ? 1 : - 1
                            this.location = {x: this.location.x + offset, y: this.location.y - 1};
                            newMove = {direction: Direction.Down};
                            break;
                        case Direction.Left:
                            console.log(`Diagonal Left: ${this.location.x}, ${this.location.y}`);
                            var offset = newLoc.y > this.location.y ? 1 : - 1
                            this.location = {x: this.location.x - 1, y: this.location.y + offset};
                            newMove = {direction: Direction.Left};
                            break;
                        default:
                            break;
                    }
                } else {
                    console.log(`Diagonal: ${this.location.x}, ${this.location.y}`);
                    switch (move.direction) {
                        case Direction.Up:
                            this.location = {x: this.location.x, y: this.location.y + 1};
                            newMove = {direction: Direction.Up};
                            break;
                        case Direction.Right:
                            this.location = {x: this.location.x + 1, y: this.location.y};
                            newMove = {direction: Direction.Right};
                            break;
                        case Direction.Down:
                            this.location = {x: this.location.x, y: this.location.y - 1};
                            newMove = {direction: Direction.Down};
                            break;
                        case Direction.Left:
                            this.location = {x: this.location.x - 1, y: this.location.y};
                            newMove = {direction: Direction.Left};
                            break;
                        default:
                            break;
                    }
                }
                currentDistance = this.getDistance(this.location, newLoc);
            }
            
            this.visited.push(this.location);

            if (!!this.tail) {
                this.tail.follow(newMove, this.location);
            }
        }
    }

    private getDistance(locA: Location, locB: Location): number {
        return Math.sqrt(Math.pow (locA.x-locB.x, 2) + Math.pow (locA.y-locB.y, 2));
    }

    public getAllVisited(): Location[] {
        var allVisited: Location[] = [];
        if (!!this.head) {
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

const start = {x: 0, y: 0};
const head = new Knot(9, null, start);
steps.forEach(step => {
    head.execute(step);
});
const visited = head.getAllVisited();

console.log(visited.length);