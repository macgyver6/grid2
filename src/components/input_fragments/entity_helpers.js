import React from 'react';
// export const getEventTargets = (numColumns, start, type) => {
//     const dragEnterHandler = event => {
//         event.preventDefault();
//     };
//     const dragOverHandler = event => {
//         event.preventDefault();
//     };
//     const dragLeaveHandler = event => {
//         event.preventDefault();
//     };
//     const dropTarget = [];

//     for (var i = 0; i < numColumns; i++) {
//         dropTarget.push(
//             <div
//                 id={`${i + 1 + start || 0}`}
//                 key={i}
//                 className={type}
//                 style={{
//                     gridColumnStart: i + 1,
//                     gridColumnEnd: i + 2,
//                     zIndex: 2,
//                     gridRowStart: 1,
//                 }}
//                 onDragEnter={dragEnterHandler}
//                 onDragOver={dragOverHandler}
//                 onDragLeave={dragLeaveHandler}
//             />
//         );
//     }

//     return dropTarget;
// };
