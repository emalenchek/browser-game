window.onload = () => {
    let xCord = 0;
    let yCord = 0;

    let ships = {
        playerShip: {
            health: 50,
            move: 5,
            attack: 10,
            attackRange: 2,
            xCord: 0,
            yCord: 0,
            initialXCord: 0,
            initialYCord: 0,
            intersecting: false,
            selected: false,
            orientation: "north",
            lastMoveDirection: "",
            degreeOfOrientation: 0,
            transform: "",
            destroyed: false,
            deathSpins: 4
        },
        enemyShip: {
            health: 10,
            move: 2,
            attackRange: 2,
            attack: 10,
            xCord: 90,
            yCord: -120,
            initialXCord: 90,
            initialYCord: -120,
            orientation: "south",
            lastMoveDirection: "",
            degreeOfOrientation: 180,
            transform: "",
            destroyed: false,
            deathSpins: 4
        }
    }

    /* Player Ship Functions - Probably need to place them within the above JSON for legibility */

    function checkIntersect() {
        if(xCord === ships.playerShip.xCord && yCord === ships.playerShip.yCord) {
            console.log('Intersecting');
            ships.playerShip.intersecting = true;
        } else {
            ships.playerShip.intersecting = false;
        }
    }

    function setOrientation(cardinalDirection) {
        switch(cardinalDirection) {
            case "north":
                ships.playerShip.orientation = "north";
                ships.playerShip.degreeOfOrientation = 0;
                break;
            case "east":
                ships.playerShip.orientation = "east";
                ships.playerShip.degreeOfOrientation = 90;
                break;
            case "south":
                ships.playerShip.orientation = "south";
                ships.playerShip.degreeOfOrientation = 180;
                break;
            case "west":
                ships.playerShip.orientation = "west";
                ships.playerShip.degreeOfOrientation = 270;
                break;
            default:
                break;
        };
    }

    function placeShip() {
        ships.playerShip.transform = "translate(" + ships.playerShip.xCord + "px, " + ships.playerShip.yCord + "px) rotate(" + ships.playerShip.degreeOfOrientation + "deg)";
        document.querySelector('.player-ship').style.transform = ships.playerShip.transform;
        console.log(`Player Ship Cords: ${ships.playerShip.xCord}, ${ships.playerShip.yCord} `);
    }

    function playerAttackEnemy() {
        ships.enemyShip.health -= ships.playerShip.attack;
        console.log("Enemy Ship Remaining Health: " + ships.enemyShip.health);
    }

    function moveShip() {
        if((ships.playerShip.move * 30) >= Math.sqrt(Math.pow((ships.playerShip.initialXCord - xCord), 2) + Math.pow((ships.playerShip.initialYCord - yCord), 2))) {
            // if enemy ship occupies square 
            if(ships.enemyShip.xCord === xCord && ships.enemyShip.yCord === yCord) {
                console.log("This coordinate is occupied by an enemy.");
                // if enemy ship is within range attack enemy
                if((ships.playerShip.attackRange * 30) >= Math.sqrt(Math.pow((ships.playerShip.initialXCord - xCord), 2) + Math.pow((ships.playerShip.initialYCord - yCord), 2))) {
                    playerAttackEnemy();
                }
            } else {
                ships.playerShip.initialXCord = xCord;
                ships.playerShip.xCord = xCord;
                ships.playerShip.initialYCord = yCord;
                ships.playerShip.yCord = yCord;
            }
            placeShip();
        } else {
            console.log("Can't move that far");
        }
    }

    /* Enemy Ship Functions - Probably need to place them within the above JSON for legibility */

    function placeEnemyShipStart() {
        ships.enemyShip.transform = "translate(" + ships.enemyShip.initialXCord + "px, " + ships.enemyShip.initialYCord + "px) rotate(" + ships.enemyShip.degreeOfOrientation + "deg)";
        document.querySelector('.enemy-ship').style.transform = ships.enemyShip.transform;
        console.log(`Enemy Ship Cords: ${ships.enemyShip.xCord}, ${ships.enemyShip.yCord} `);
    }

    function handleEnemyStatus() {
        if(ships.enemyShip.health <= 0) {
            ships.enemyShip.destroyed = true;
        }

        if(ships.enemyShip.destroyed) {
            destroyEnemyShip(ships.enemyShip.deathSpins);
        }
    }

    function destroyEnemyShip(spins) {
            console.log(spins);
            setTimeout(() => {
                if (spins > 0) { 
                    switch(ships.enemyShip.degreeOfOrientation) {
                        case 0:
                            ships.enemyShip.degreeOfOrientation = 90;
                            break;
                        case 90:
                            ships.enemyShip.degreeOfOrientation = 180;
                            break;
                        case 180:
                            ships.enemyShip.degreeOfOrientation = 270;
                            break;
                        case 270:
                            ships.enemyShip.degreeOfOrientation = 0;
                            break; 
                    }
                
                    ships.enemyShip.transform = "translate(" + ships.enemyShip.initialXCord + "px, " + ships.enemyShip.initialYCord + "px) rotate(" + ships.enemyShip.degreeOfOrientation + "deg)";
                    document.querySelector('.enemy-ship').style.transform = ships.enemyShip.transform;
                    
                    console.log(ships.enemyShip.transform);               
                    spins--;
                    destroyEnemyShip(spins); 
                } else {
                    document.querySelector('.enemy-ship').remove();
                    ships.enemyShip.deathSpins = 4;
                }
            }, 300);
    }

    /* The "MAIN" */

    placeEnemyShipStart(); 

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
                if (yCord > -240)
                    yCord -= 30;
                document.querySelector('.cursor').style.transform = "translate(" + xCord + "px, " + yCord + "px)";
                console.log(xCord + ' ' + yCord);
                ships.playerShip.lastMoveDirection = "north";
                checkIntersect();

                break;
            case "A":
            case "a":
            case "Left":
            case "ArrowLeft":
                if (xCord > -240)
                    xCord -= 30;
                document.querySelector('.cursor').style.transform = "translate(" + xCord + "px, " + yCord + "px)";
                console.log(xCord + ' ' + yCord);
                ships.playerShip.lastMoveDirection = "west";
                checkIntersect();


                break;
            case "S":
            case "s":
            case "Down":
            case "ArrowDown":
                if (yCord < 240)
                    yCord += 30;
                document.querySelector('.cursor').style.transform = "translate(" + xCord + "px, " + yCord + "px)";
                console.log(xCord + ' ' + yCord);
                ships.playerShip.lastMoveDirection = "south";
                checkIntersect();


                break;
            case "D":
            case "d":
            case "Right":
            case "ArrowRight":
                if (xCord < 240)
                    xCord += 30;
                document.querySelector('.cursor').style.transform = "translate(" + xCord + "px, " + yCord + "px)";
                console.log(xCord + ' ' + yCord);
                ships.playerShip.lastMoveDirection = "east";
                checkIntersect();


                break;
            case "Z":
            case "z":

                if(ships.playerShip.intersecting === true) {
                    if(ships.playerShip.selected === false) {
                        ships.playerShip.selected = true;
                        console.log("Intersecting: " + ships.playerShip.intersecting);
                        console.log("Selected: " + ships.playerShip.selected);
                    } else {
                        ships.playerShip.selected = false;
                        console.log("Intersecting: " + ships.playerShip.intersecting);
                        console.log("Selected: " + ships.playerShip.selected);
                    }
                } else {
                    if(ships.playerShip.selected === true) {
                        setOrientation(ships.playerShip.lastMoveDirection);
                        moveShip();
                        ships.playerShip.selected = false;
                        ships.playerShip.intersecting = true;
                        console.log("Intersecting: " + ships.playerShip.intersecting);
                        console.log("Selected: " + ships.playerShip.selected);
                    } else {
                        // Open game menu
                    }
                }

                if(ships.enemyShip.destroyed === false) {
                    handleEnemyStatus();
                }
                
                break;
            case "X":
            case "x":
                if(ships.playerShip.selected === true) {
                    ships.playerShip.selected = false;
                    console.log('unselected');
                } 
                break;
            default:
                break;
        }

        event.preventDefault();
    }, true);
}