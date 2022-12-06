import * as fs from 'fs';

const MARKER_LOCATION = 14;

const data = fs.readFileSync('./day-6/data.txt', "ascii");
const characters: string[] = data.split('');
const running: string[] = [];

var markers: number[] = [];
characters.forEach(char => {
    running.push(char);

    if (running.length >= MARKER_LOCATION) {
        var topFourteen = running.slice(running.length - MARKER_LOCATION);
        var lastFour: Set<string> = new Set<string>(topFourteen);
        if (lastFour.size === MARKER_LOCATION) {
            markers.push(running.length);
        }
    }
});

console.log(markers[0]);