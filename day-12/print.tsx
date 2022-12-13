
// terrain.forEach(row => {
//     var str: string = row.reduce((current, col) => {
//         if (visited.has(col)) {
//             if (col.location[0] === start[0] && col.location[1] === start[1]) {
//                 return current + "S";
//             } else if (col.location[0] === end[0] && col.location[1] === end[1]) {
//                 return current + "E";
//             } else if (!!col.next) {
//                 if (col.next.location[0] < col.location[0]) {
//                     return current + "^";
//                 } else if (col.next.location[0] > col.location[0]) {
//                     return current + "v";
//                 } else if (col.next.location[1] < col.location[1]) {
//                     return current + "<";
//                 } else if (col.next.location[1] > col.location[1]) {
//                     return current + ">";
//                 } else {
//                     return current + "#";
//                 }
//             } else {
//                 return current + ".";
//             }
//         } else {
//             return current + ".";
//         }
//     }, "");
//     console.log(str);
// });