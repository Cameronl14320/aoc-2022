import * as fs from 'fs';

enum Rpc {
    Rock,
    Paper,
    Scissors
}

type Match = {
    first: Rpc,
    second: Rpc
}

type CalculateMatch = {
    first: Rpc,
    second: String
}

const letterMapToRpc: Map<string, Rpc> = new Map([
    ['A', Rpc.Rock],
    ['X', Rpc.Rock],
    ['B', Rpc.Paper],
    ['Y', Rpc.Paper],
    ['C', Rpc.Scissors],
    ['Z', Rpc.Scissors]
]);

const RpcToPoints: Map<Rpc, number> = new Map([
    [Rpc.Rock, 1],
    [Rpc.Paper, 2],
    [Rpc.Scissors, 3]
]);

const LOSS = 0;
const DRAW = 3;
const WIN = 6;

function calculatePoints(match: Match) {
    var points = 0;
    points += RpcToPoints.get(match.second);

    if (match.first === match.second) {
        points += DRAW;
    } else if ((match.first === Rpc.Paper && match.second === Rpc.Scissors)
    || (match.first === Rpc.Rock && match.second === Rpc.Paper)
    || (match.first === Rpc.Scissors && match.second === Rpc.Rock)) {
        points += WIN
    }

    return points;
}

function calculateResult(match: CalculateMatch): Match {
    var result: Rpc;
    if (match.second === 'X') { // Lose
        switch (match.first) {
            case Rpc.Paper: result = Rpc.Rock; break;
            case Rpc.Scissors: result = Rpc.Paper; break;
            case Rpc.Rock: result = Rpc.Scissors; break;
        }
    } else if (match.second === 'Y') { // Draw
        result = match.first;
    } else { // Win
        switch (match.first) {
            case Rpc.Paper: result = Rpc.Scissors; break;
            case Rpc.Scissors: result = Rpc.Rock; break;
            case Rpc.Rock: result = Rpc.Paper; break;
        }
    }

    return {
        first: match.first,
        second: result
    }
}

const data = fs.readFileSync("./day-2/data.txt", "ascii");
const splitData = data.split('\n');
const mappedData: Match[] = [];
splitData.forEach(pair => {
    var match = pair.split(' ');
    var typedMatch: Match = {
        first: letterMapToRpc.get(match[0]),
        second: letterMapToRpc.get(match[1])
    }

    mappedData.push(typedMatch);
})

var runningTotal = 0;
mappedData.forEach(match => {
    runningTotal += calculatePoints(match);
})

console.log(runningTotal);

const calculatedData: Match[] = [];
splitData.forEach(pair => {
    var match = pair.split(' ');
    var typedMatch: CalculateMatch = {
        first: letterMapToRpc.get(match[0]),
        second: match[1]
    }

    calculatedData.push(calculateResult(typedMatch));
});

var calculatedRunningTotal = 0;
calculatedData.forEach(match => {
    calculatedRunningTotal += calculatePoints(match);
});

console.log(calculatedRunningTotal);