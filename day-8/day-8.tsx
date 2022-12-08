import * as fs from 'fs';

const data = fs.readFileSync('./day-8/data.txt', "ascii");
const rows = data.split('\n');

const trees: number[][] = [];
rows.forEach(row => {
    const cols: number[] = row.split('')
        .map(char => parseInt(char));
    trees.push(cols);
});

// Part 1
const visibility: boolean[][] = [];
trees.forEach((row, rowIndex) => {
    var rowVisibility: boolean[] = [];
    row.forEach((col, colIndex) => {
        if (rowIndex === 0 || rowIndex === trees.length - 1) { // Horizontal check
            rowVisibility.push(true);
        } else if (colIndex === 0 || colIndex === row.length - 1) { // Vertical check
            rowVisibility.push(true);
        } else {
            const leftOfCol = row.slice(0, colIndex);
            const rightOfCol = row.slice(colIndex + 1);
            const topOfCol: number[] = [];
            const botOfCol: number[] = [];

            for(let i = 0; i < rowIndex; i++) {
                topOfCol.push(trees[i][colIndex]);
            }
            for(let i = rowIndex + 1; i < trees.length; i++) {
                botOfCol.push(trees[i][colIndex]);
            }

            if (leftOfCol.every(tree => tree < col) || rightOfCol.every(tree => tree < col) || topOfCol.every(tree => tree < col) || botOfCol.every(tree => tree < col)) {
                rowVisibility.push(true);
            } else {
                rowVisibility.push(false);
            }
        }
    });
    visibility.push(rowVisibility);
});

var numOfVisibleTrees = 0;
visibility.forEach((row, rowIndex) => {
    row.forEach(col => {
        if (col) {
            numOfVisibleTrees += 1;
        }
    });
});

console.log(numOfVisibleTrees);

function GetView(comparison: number, view: number[]): number {
    var score = 0;
    for (let i = 0; i < view.length; i++) {
        if (view[i] < comparison) {
            score += 1;
        } else {
            score += 1;
            break;
        }
    }

    return score;
}

// Part 2
const viewScores: number[][] = [];
trees.forEach((row, rowIndex) => {
    var rowScore: number[] = [];
    row.forEach((col, colIndex) => {
        const leftOfCol = row.slice(0, colIndex);
        const rightOfCol = row.slice(colIndex + 1);
        const topOfCol: number[] = [];
        const botOfCol: number[] = [];

        for(let i = 0; i < rowIndex; i++) {
            topOfCol.push(trees[i][colIndex]);
        }
        for(let i = rowIndex + 1; i < trees.length; i++) {
            botOfCol.push(trees[i][colIndex]);
        }
        topOfCol.reverse();
        leftOfCol.reverse();

        var leftScore = GetView(col, leftOfCol);
        var rightScore = GetView(col, rightOfCol);
        var topScore = GetView(col, topOfCol);
        var botScore = GetView(col, botOfCol);

        rowScore.push(leftScore * topScore * rightScore * botScore);
    });
    viewScores.push(rowScore);
});

var max = 0;
viewScores.forEach(row => {
    row.forEach(col => {
        max = Math.max(max, col);
    });
});

console.log(max);