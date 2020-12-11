window.onload = () => {
    let xCord = 0;
    let yCord = 0;

    // let map = {
    //     rows: 9,
    //     cols: 9,
    //     tileSize: 30,
    //     content: [[
    //         3, 3, 3, 3, 3, 3, 3, 3, 3,
    //         3, 1, 1, 1, 1, 1, 1, 1, 1,
    //         3, 1, 1, 1, 1, 1, 1, 1, 1,
    //         3, 1, 1, 1, 1, 1, 1, 1, 1, 
    //         3, 1, 1, 1, 1, 1, 1, 1, 1,
    //         3, 1, 1, 1, 1, 1, 2, 1, 1,
    //         3, 1, 2, 2, 1, 1, 1, 1, 1,
    //         3, 1, 2, 2, 1, 1, 1, 1, 1,
    //         3, 1, 1, 1, 2, 1, 1, 1, 1
    //     ]],
    // };

    /* Player Ship Functions - Probably need to place them within the above JSON for legibility */

    // /* Enemy Ship Functions - Probably need to place them within the above JSON for legibility */

    // function placeEnemyShipStart() {
    //     newEnemy.transform = "translate(" + newEnemy.initialXCord + "px, " + newEnemy.initialYCord + "px) rotate(" + newEnemy.degreeOfOrientation + "deg)";
    //     document.querySelector('.enemy-ship').style.transform = newEnemy.transform;
    //     console.log(`Enemy Ship Cords: ${newEnemy.xCord}, ${newEnemy.yCord} `);
    // }

    // function handleEnemyStatus() {
    //     if(newEnemy.health <= 0) {
    //         newEnemy.destroyed = true;
    //     }

    //     if(newEnemy.destroyed) {
    //         destroyEnemyShip(newEnemy.deathSpins);
    //     }
    // }

    // function destroyEnemyShip(spins) {
    //         console.log(spins);
    //         setTimeout(() => {
    //             if (spins > 0) { 
    //                 switch(newEnemy.degreeOfOrientation) {
    //                     case 0:
    //                         newEnemy.degreeOfOrientation = 90;
    //                         break;
    //                     case 90:
    //                         newEnemy.degreeOfOrientation = 180;
    //                         break;
    //                     case 180:
    //                         newEnemy.degreeOfOrientation = 270;
    //                         break;
    //                     case 270:
    //                         newEnemy.degreeOfOrientation = 0;
    //                         break; 
    //                 }
                
    //                 newEnemy.transform = "translate(" + newEnemy.initialXCord + "px, " + newEnemy.initialYCord + "px) rotate(" + newEnemy.degreeOfOrientation + "deg)";
    //                 document.querySelector('.enemy-ship').style.transform = newEnemy.transform;
                    
    //                 console.log(newEnemy.transform);               
    //                 spins--;
    //                 destroyEnemyShip(spins); 
    //             } else {
    //                 document.querySelector('.enemy-ship').remove();
    //                 newEnemy.deathSpins = 4;
    //             }
    //         }, 250);
    // }

    /* The "MAIN" */

    let newPlayer = new PlayerShip();
    let newEnemy = new EnemyShip();
    let newCursor = new Cursor();

    console.log(newPlayer);

    newEnemy.placeEnemyShipStart(90, -120); 

    window.addEventListener("keydown", (event) => {
        if(event.defaultPrevented) {
            return;
        }

        console.log(event.key);
        switch(event.key) {
            case "W":
            case "w":
            case "Up":
            case "ArrowUp":
                if (newCursor.yCord > -240)
                    newCursor.yCord -= 30;
                document.querySelector('.cursor').style.transform = "translate(" + newCursor.xCord + "px, " + newCursor.yCord + "px)";
                console.log(newCursor.xCord + ' ' + newCursor.yCord);
                newPlayer.lastMoveDirection = "north";
                newPlayer.checkIntersect(newCursor);

                break;
            case "A":
            case "a":
            case "Left":
            case "ArrowLeft":
                if (newCursor.xCord > -240)
                    newCursor.xCord -= 30;
                document.querySelector('.cursor').style.transform = "translate(" + newCursor.xCord + "px, " + newCursor.yCord + "px)";
                console.log(newCursor.xCord + ' ' + newCursor.yCord);
                newPlayer.lastMoveDirection = "west";
                newPlayer.checkIntersect(newCursor);


                break;
            case "S":
            case "s":
            case "Down":
            case "ArrowDown":
                if (newCursor.yCord < 240)
                    newCursor.yCord += 30;
                document.querySelector('.cursor').style.transform = "translate(" + newCursor.xCord + "px, " + newCursor.yCord + "px)";
                console.log(newCursor.xCord + ' ' + newCursor.yCord);
                newPlayer.lastMoveDirection = "south";
                newPlayer.checkIntersect(newCursor);


                break;
            case "D":
            case "d":
            case "Right":
            case "ArrowRight":
                if (newCursor.xCord < 240)
                    newCursor.xCord += 30;
                document.querySelector('.cursor').style.transform = "translate(" + newCursor.xCord + "px, " + newCursor.yCord + "px)";
                console.log(newCursor.xCord + ' ' + newCursor.yCord);
                newPlayer.lastMoveDirection = "east";
                newPlayer.checkIntersect(newCursor);


                break;
            case "Z":
            case "z":

                if(newPlayer.intersecting === true) {
                    if(newPlayer.selected === false) {
                        newPlayer.selected = true;
                        console.log("Intersecting: " + newPlayer.intersecting);
                        console.log("Selected: " + newPlayer.selected);
                    } else {
                        newPlayer.selected = false;
                        console.log("Intersecting: " + newPlayer.intersecting);
                        console.log("Selected: " + newPlayer.selected);
                    }
                } else {
                    if(newPlayer.selected === true) {
                        newPlayer.setOrientation(newPlayer.lastMoveDirection);
                        newPlayer.moveShip(newCursor);
                        newPlayer.selected = false;
                        newPlayer.intersecting = true;
                        console.log("Intersecting: " + newPlayer.intersecting);
                        console.log("Selected: " + newPlayer.selected);
                    } else {
                        // Open game menu
                    }
                }

                if(newEnemy.destroyed === false) {
                    newEnemy.handleStatus;
                }
                
                break;
            case "X":
            case "x":
                if(newPlayer.selected === true) {
                    newPlayer.selected = false;
                    console.log('unselected');
                } 
                break;
            default:
                break;
        }

        event.preventDefault();
    }, true);
}