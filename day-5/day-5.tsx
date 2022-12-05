import * as fs from 'fs';

const data = fs.readFileSync('./day-5/data.txt', "ascii");
const moveStrings = data.split('\n');

const state: string[][] = [
    [],
    ['H', 'T', 'Z', 'D'],
    ['Q', 'R', 'W', 'T', 'G', 'C', 'S'],
    ['P', 'B', 'F', 'Q', 'N', 'R', 'C', 'H'],
    ['L', 'C', 'N', 'F', 'H', 'Z'],
    ['G', 'L', 'F', 'Q', 'S'],
    ['V', 'P', 'W', 'Z', 'B', 'R', 'C', 'S'],
    ['Z', 'F', 'J'],
    ['D', 'L', 'V', 'Z', 'R', 'H', 'Q'],
    ['B', 'H', 'G', 'N', 'F', 'Z', 'L', 'D']
];

type Move = {
    amount: number,
    from: number,
    to: number
}

var moves: Move[] = [];
moveStrings.forEach(move => {
    var cleaned = move.replace(/\D/g, '');
    if (cleaned.length > 3) {
        var remainder = cleaned.substring(2).split('');
        moves.push({
            amount: parseInt(cleaned.substring(0, 2)),
            from: parseInt(remainder[0]),
            to: parseInt(remainder[1])
        });
    } else {
        var split = cleaned.split('');
        moves.push({
            amount: parseInt(split[0]),
            from: parseInt(split[1]),
            to: parseInt(split[2])
        });
    }
});

console.log(moves.length);

// moves.forEach(move => { Part 1
//     console.log(`move ${move.amount} from ${move.from} to ${move.to}`);

//     for (let i = 0; i < move.amount; i++) {
//         var moving = state[move.from].pop();

//         if (!!moving) {
//             state[move.to].push(moving);
//         }
//     }
// });

moves.forEach(move => {
    console.log(`move ${move.amount} from ${move.from} to ${move.to}`);

    var moveMultiple: string[] = [];
    for (let i = 0; i < move.amount; i++) {
        var moving = state[move.from].pop();

        if (!!moving) {
            moveMultiple.push(moving);
        }
    }
    moveMultiple = moveMultiple.reverse();
    state[move.to] = state[move.to].concat(moveMultiple);
});

state.forEach(col => {
    console.log(col[col.length - 1]);
});
