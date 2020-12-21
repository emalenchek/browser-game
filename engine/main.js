window.onload = () => {
    /* The "MAIN" */
    let game = new Game();

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

    game.start(playerTeam, enemyTeam);

    /* Set player ships to initial coords */

    for(let i = 0; i < game.playerTeam.length; i++) {
        let parent = document.querySelector('.game-board');
        game.playerTeam[i].indexValue = i;
        let playerEl = document.createElement('div');
        playerEl.id = `player-unit-${game.playerTeam[i].indexValue}`;
        playerEl.classList.add('player-ship');
        parent.append(playerEl);
        game.playerTeam[i].placeShipStart();
    }

    /* Set enemy ships to initial coords */

    for(let i = 0; i < game.enemyTeam.length; i++) {
        let parent = document.querySelector('.game-board');
        game.enemyTeam[i].indexValue = i;
        let enemyEl = document.createElement('div');
        enemyEl.id = `enemy-unit-${game.enemyTeam[i].indexValue}`;
        enemyEl.classList.add('enemy-ship');
        parent.append(enemyEl);
        game.enemyTeam[i].placeShipStart();
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

                for(let i = 0; i < game.playerTeam.length; i++) {
                    game.playerTeam[i].lastMoveDirection = "north";

                    if(newCursor.xCord === game.playerTeam[i].xCord && newCursor.yCord === game.playerTeam[i].yCord) {
                        newCursor.intersectingWith = game.playerTeam[i];
                        game.playerTeam[i].intersecting = true;
                        break;
                    } else {
                        newCursor.intersectingWith = null;
                        game.playerTeam[i].intersecting = false;
                    }
                }

                for(let i = 0; i < game.enemyTeam.length; i++) {
                    if(newCursor.xCord === game.enemyTeam[i].xCord && newCursor.yCord === game.enemyTeam[i].yCord) {
                        newCursor.intersectingWith = game.enemyTeam[i];
                        game.enemyTeam[i].intersecting = true;
                        break;
                    } else {
                        newCursor.intersectingWith = null;
                        game.enemyTeam[i].intersecting = false;
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

                for(let i = 0; i < game.playerTeam.length; i++) {
                    game.playerTeam[i].lastMoveDirection = "west";

                    if(newCursor.xCord === game.playerTeam[i].xCord && newCursor.yCord === game.playerTeam[i].yCord) {
                        newCursor.intersectingWith = game.playerTeam[i];
                        game.playerTeam[i].intersecting = true;
                        break;
                    } else {
                        newCursor.intersectingWith = null;
                        game.playerTeam[i].intersecting = false;
                    }
                }

                for(let i = 0; i < game.enemyTeam.length; i++) {
                    if(newCursor.xCord === game.enemyTeam[i].xCord && newCursor.yCord === game.enemyTeam[i].yCord) {
                        newCursor.intersectingWith = game.enemyTeam[i];
                        game.enemyTeam[i].intersecting = true;
                        break;
                    } else {
                        newCursor.intersectingWith = null;
                        game.enemyTeam[i].intersecting = false;
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

                for(let i = 0; i < game.playerTeam.length; i++) {
                    game.playerTeam[i].lastMoveDirection = "south";

                    if(newCursor.xCord === game.playerTeam[i].xCord && newCursor.yCord === game.playerTeam[i].yCord) {
                        newCursor.intersectingWith = game.playerTeam[i];
                        game.playerTeam[i].intersecting = true;
                        break;
                    } else {
                        newCursor.intersectingWith = null;
                        game.playerTeam[i].intersecting = false;
                    }
                }

                for(let i = 0; i < game.enemyTeam.length; i++) {
                    if(newCursor.xCord === game.enemyTeam[i].xCord && newCursor.yCord === game.enemyTeam[i].yCord) {
                        newCursor.intersectingWith = game.enemyTeam[i];
                        game.enemyTeam[i].intersecting = true;
                        break;
                    } else {
                        newCursor.intersectingWith = null;
                        game.enemyTeam[i].intersecting = false;
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

                for(let i = 0; i < game.playerTeam.length; i++) {
                    game.playerTeam[i].lastMoveDirection = "east";

                    if(newCursor.xCord === game.playerTeam[i].xCord && newCursor.yCord === game.playerTeam[i].yCord) {
                        newCursor.intersectingWith = game.playerTeam[i];
                        game.playerTeam[i].intersecting = true;
                        break;
                    } else {
                        newCursor.intersectingWith = null;
                        game.playerTeam[i].intersecting = false;
                    }
                }

                for(let i = 0; i < game.enemyTeam.length; i++) {
                    if(newCursor.xCord === game.enemyTeam[i].xCord && newCursor.yCord === game.enemyTeam[i].yCord) {
                        newCursor.intersectingWith = game.enemyTeam[i];
                        game.enemyTeam[i].intersecting = true;
                        break;
                    } else {
                        newCursor.intersectingWith = null;
                        game.enemyTeam[i].intersecting = false;
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

                for(let i = 0; i < game.playerTeam.length; i++) {
                    game.playerTeam[i].checkIntersect(newCursor);
                }

                for(let i = 0; i < game.playerTeam.length; i++) {
                    if(game.playerTeam[i].intersecting === true) {
                        if(game.playerTeam[i].selected === false) {
                            game.playerTeam[i].selected = true;
                            //game.playerTeam[i].showMovementRange();
                            console.log("Intersecting: " + game.playerTeam[i].intersecting);
                            console.log("Selected: " + game.playerTeam[i].selected);
                        } else {
                            game.playerTeam[i].selected = false;
                            console.log("Intersecting: " + game.playerTeam[i].intersecting);
                            console.log("Selected: " + game.playerTeam[i].selected);
                        }
                    } else {
                        if(game.playerTeam[i].selected === true) {
                            if(game.playerTeam[i].canMove === true || game.playerTeam[i].canAttack === true) {
                                game.playerTeam[i].setOrientation(game.playerTeam[i].lastMoveDirection);
                                //game.playerTeam[i].showMovementRange();
                                game.playerTeam[i].moveShip(newCursor, game);
                            }
                            game.playerTeam[i].selected = false;
                            game.playerTeam[i].intersecting = true;
                            console.log("Intersecting: " + game.playerTeam[i].intersecting);
                            console.log("Selected: " + game.playerTeam[i].selected);
                        } else {
                            // Open game menu
                        }
                    }
                }
                
                break;
            case "X":
            case "x":
                for(let i = 0; i < game.playerTeam.length; i++) {
                    if(game.playerTeam[i].selected === true) {
                        game.playerTeam[i].selected = false;
                        console.log('unselected');
                    }
                    //game.playerTeam[i].hideMovementRange();
                }
                break;
            default:
                break;
        }

        game.checkPlayerTurnEnd();
        game.checkEnemyTurnEnd();

        event.preventDefault();
    }, true);
}