window.onload = () => {
    /* The "MAIN" */

    let newPlayer = new PlayerShip(-60, 60);
    let newPlayer1 = new PlayerShip(-90, 90);

    let newEnemy = new EnemyShip(90, -120);

    let newCursor = new Cursor();
    
    let newAsteroid1 = new AsteroidTile();
    let newAsteroid2 = new AsteroidTile();
    let newAsteroid3 = new AsteroidTile();
    let newAsteroid4 = new AsteroidTile();

    // newEnemy.placeEnemyShipStart(); 
    newAsteroid1.setMapTile(-30, -30); 
    newAsteroid2.setMapTile(-90, 180); 
    newAsteroid3.setMapTile(150, 120);
    newAsteroid4.setMapTile(-150, -150);

    let playerTeam = [newPlayer, newPlayer1];
    let enemyTeam = [newEnemy];
    let hazards = [newAsteroid1, newAsteroid2, newAsteroid3, newAsteroid4];

    /* Set player ships to initial coords */

    for(let i = 0; i < playerTeam.length; i++) {
        let parent = document.querySelector('.game-board');
        playerTeam[i].indexValue = i;
        let playerEl = document.createElement('div');
        playerEl.id = `player-unit-${playerTeam[i].indexValue}`;
        playerEl.classList.add('player-ship');
        parent.append(playerEl);
        playerTeam[i].placeShipStart();
    }

    /* Set player ships to initial coords */

    for(let i = 0; i < enemyTeam.length; i++) {
        let parent = document.querySelector('.game-board');
        enemyTeam[i].indexValue = i;
        let enemyEl = document.createElement('div');
        enemyEl.id = `enemy-unit-${enemyTeam[i].indexValue}`;
        enemyEl.classList.add('enemy-ship');
        parent.append(enemyEl);
        enemyTeam[i].placeShipStart();
    }

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

                for(let i = 0; i < playerTeam.length; i++) {
                    playerTeam[i].lastMoveDirection = "north";

                    if(newCursor.xCord === playerTeam[i].xCord && newCursor.yCord === playerTeam[i].yCord) {
                        newCursor.intersectingWith = playerTeam[i];
                        playerTeam[i].intersecting = true;
                        break;
                    } else {
                        newCursor.intersectingWith = null;
                        playerTeam[i].intersecting = false;
                    }
                }

                for(let i = 0; i < enemyTeam.length; i++) {
                    if(newCursor.xCord === enemyTeam[i].xCord && newCursor.yCord === enemyTeam[i].yCord) {
                        newCursor.intersectingWith = enemyTeam[i];
                        enemyTeam[i].intersecting = true;
                        break;
                    } else {
                        newCursor.intersectingWith = null;
                        enemyTeam[i].intersecting = false;
                    }
                }

                for(let i = 0; i < hazards.length; i++) {
                    if(newCursor.xCord === hazards[i].xCord && newCursor.yCord === hazards[i].yCord) {
                        newCursor.intersectingWithTile = hazards[i];
                        hazards[i].intersecting = true;
                        break;
                    } else {
                        newCursor.intersectingWithTile = null;
                        hazards[i].intersecting = false;
                    }
                }

                break;
            case "A":
            case "a":
            case "Left":
            case "ArrowLeft":
                if (newCursor.xCord > -240)
                    newCursor.xCord -= 30;
                document.querySelector('.cursor').style.transform = "translate(" + newCursor.xCord + "px, " + newCursor.yCord + "px)";

                for(let i = 0; i < playerTeam.length; i++) {
                    playerTeam[i].lastMoveDirection = "west";

                    if(newCursor.xCord === playerTeam[i].xCord && newCursor.yCord === playerTeam[i].yCord) {
                        newCursor.intersectingWith = playerTeam[i];
                        playerTeam[i].intersecting = true;
                        break;
                    } else {
                        newCursor.intersectingWith = null;
                        playerTeam[i].intersecting = false;
                    }
                }

                for(let i = 0; i < enemyTeam.length; i++) {
                    if(newCursor.xCord === enemyTeam[i].xCord && newCursor.yCord === enemyTeam[i].yCord) {
                        newCursor.intersectingWith = enemyTeam[i];
                        enemyTeam[i].intersecting = true;
                        break;
                    } else {
                        newCursor.intersectingWith = null;
                        enemyTeam[i].intersecting = false;
                    }
                }

                for(let i = 0; i < hazards.length; i++) {
                    if(newCursor.xCord === hazards[i].xCord && newCursor.yCord === hazards[i].yCord) {
                        newCursor.intersectingWithTile = hazards[i];
                        hazards[i].intersecting = true;
                        break;
                    } else {
                        newCursor.intersectingWithTile = null;
                        hazards[i].intersecting = false;
                    }
                }

                break;
            case "S":
            case "s":
            case "Down":
            case "ArrowDown":
                if (newCursor.yCord < 240)
                    newCursor.yCord += 30;
                document.querySelector('.cursor').style.transform = "translate(" + newCursor.xCord + "px, " + newCursor.yCord + "px)";

                for(let i = 0; i < playerTeam.length; i++) {
                    playerTeam[i].lastMoveDirection = "south";

                    if(newCursor.xCord === playerTeam[i].xCord && newCursor.yCord === playerTeam[i].yCord) {
                        newCursor.intersectingWith = playerTeam[i];
                        playerTeam[i].intersecting = true;
                        break;
                    } else {
                        newCursor.intersectingWith = null;
                        playerTeam[i].intersecting = false;
                    }
                }

                for(let i = 0; i < enemyTeam.length; i++) {
                    if(newCursor.xCord === enemyTeam[i].xCord && newCursor.yCord === enemyTeam[i].yCord) {
                        newCursor.intersectingWith = enemyTeam[i];
                        enemyTeam[i].intersecting = true;
                        break;
                    } else {
                        newCursor.intersectingWith = null;
                        enemyTeam[i].intersecting = false;
                    }
                }

                for(let i = 0; i < hazards.length; i++) {
                    if(newCursor.xCord === hazards[i].xCord && newCursor.yCord === hazards[i].yCord) {
                        newCursor.intersectingWithTile = hazards[i];
                        hazards[i].intersecting = true;
                        break;
                    } else {
                        newCursor.intersectingWithTile = null;
                        hazards[i].intersecting = false;
                    }
                }

                break;
            case "D":
            case "d":
            case "Right":
            case "ArrowRight":
                if (newCursor.xCord < 240)
                    newCursor.xCord += 30;
                document.querySelector('.cursor').style.transform = "translate(" + newCursor.xCord + "px, " + newCursor.yCord + "px)";

                for(let i = 0; i < playerTeam.length; i++) {
                    playerTeam[i].lastMoveDirection = "east";

                    if(newCursor.xCord === playerTeam[i].xCord && newCursor.yCord === playerTeam[i].yCord) {
                        newCursor.intersectingWith = playerTeam[i];
                        playerTeam[i].intersecting = true;
                        break;
                    } else {
                        newCursor.intersectingWith = null;
                        playerTeam[i].intersecting = false;
                    }
                }

                for(let i = 0; i < enemyTeam.length; i++) {
                    if(newCursor.xCord === enemyTeam[i].xCord && newCursor.yCord === enemyTeam[i].yCord) {
                        newCursor.intersectingWith = enemyTeam[i];
                        enemyTeam[i].intersecting = true;
                        break;
                    } else {
                        newCursor.intersectingWith = null;
                        enemyTeam[i].intersecting = false;
                    }
                }

                for(let i = 0; i < hazards.length; i++) {
                    if(newCursor.xCord === hazards[i].xCord && newCursor.yCord === hazards[i].yCord) {
                        newCursor.intersectingWithTile = hazards[i];
                        hazards[i].intersecting = true;
                        break;
                    } else {
                        newCursor.intersectingWithTile = null;
                        hazards[i].intersecting = false;
                    }
                }

                break;
            case "Z":
            case "z":

                for(let i = 0; i < playerTeam.length; i++) {
                    if(playerTeam[i].intersecting === true) {
                        if(playerTeam[i].selected === false) {
                            playerTeam[i].selected = true;
                            //playerTeam[i].showMovementRange();
                            console.log("Intersecting: " + playerTeam[i].intersecting);
                            console.log("Selected: " + playerTeam[i].selected);
                        } else {
                            playerTeam[i].selected = false;
                            console.log("Intersecting: " + playerTeam[i].intersecting);
                            console.log("Selected: " + playerTeam[i].selected);
                        }
                    } else {
                        if(playerTeam[i].selected === true) {
                            playerTeam[i].setOrientation(playerTeam[i].lastMoveDirection);
                            //playerTeam[i].showMovementRange();
                            playerTeam[i].moveShip(newCursor);
                            playerTeam[i].selected = false;
                            playerTeam[i].intersecting = true;
                            console.log("Intersecting: " + playerTeam[i].intersecting);
                            console.log("Selected: " + playerTeam[i].selected);
                        } else {
                            // Open game menu
                        }
                    }
                }

                // if(newPlayer.intersecting === true) {
                //     if(newPlayer.selected === false) {
                //         newPlayer.selected = true;
                //         newPlayer.showMovementRange();
                //         console.log("Intersecting: " + newPlayer.intersecting);
                //         console.log("Selected: " + newPlayer.selected);
                //     } else {
                //         newPlayer.selected = false;
                //         console.log("Intersecting: " + newPlayer.intersecting);
                //         console.log("Selected: " + newPlayer.selected);
                //     }
                // } else {
                //     if(newPlayer.selected === true) {
                //         newPlayer.setOrientation(newPlayer.lastMoveDirection);
                //         newPlayer.showMovementRange();
                //         newPlayer.moveShip(newCursor);
                //         newPlayer.selected = false;
                //         newPlayer.intersecting = true;
                //         console.log("Intersecting: " + newPlayer.intersecting);
                //         console.log("Selected: " + newPlayer.selected);
                //     } else {
                //         // Open game menu
                //     }
                // }
                
                break;
            case "X":
            case "x":
                for(let i = 0; i < playerTeam.length; i++) {
                    if(playerTeam[i].selected === true) {
                        playerTeam[i].selected = false;
                        console.log('unselected');
                    }
                    //playerTeam[i].hideMovementRange();
                }
                break;
            default:
                break;
        }

        event.preventDefault();
    }, true);
}