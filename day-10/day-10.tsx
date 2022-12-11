import * as fs from 'fs';

const data = fs.readFileSync('./day-10/data.txt', "ascii");
const lines = data.split('\n');

type Event = {
    modifier: number;
    executionTime: number;
}

var events: Event[] = [];
var cycle = 0;
lines.forEach(line => {
    const command = line.split(' ');
    if (command[0] === 'noop') {
        cycle += 1;
        events.push({
            modifier: 0,
            executionTime: 1 + cycle
        });
    } else if (command[0] === 'addx') {
        const modifier = parseInt(command[1]);
        events.push({
            modifier: parseInt(command[1]),
            executionTime: 2 + cycle
        });
        cycle += 2;
    }
});
cycle += 1;

var signals: number[] = [20, 60, 100, 140, 180, 220]; // Part 1
var totalSignalStrength = 0;
for(let i = 0; i <= cycle; i++) {
    var X = events.filter(event => event.executionTime < i).reduce((current, event) => current + event.modifier, 0) + 1;
    if (signals.includes(i)) {
        var signalStrength = i * X;
        totalSignalStrength += signalStrength;
        console.log(`${i}: ${X}`);
    }
}
console.log(totalSignalStrength);

var crt: number[] = [40, 80, 120, 160, 200, 240]; // Part 2
for(let i = 0; i <= cycle; i++) {
    if (crt.includes(i)) {
        var displayGrid: string[] = [];
        for (let j = 0; j < 40; j++) {
            var X = events.filter(event => event.executionTime < (i - 39 + j)).reduce((current, event) => current + event.modifier, 0) + 1;
            if (j >= X - 1 && j <= X + 1) {
                displayGrid[j] = '#';
            } else {
                displayGrid[j] = '.';
            }
        }
        console.log(`${displayGrid.reduce((current, str) => current + str, "")}`);
    }
}