window.onload = () => {
    let xCord = 0;
    let yCord = 0;

    let ships = {
        playerShip: {
            health: 50,
            move: 5,
            attack: 10,
            xCord: 0,
            yCord: 0,
            initialXCord: 0,
            initialYCord: 0,
            intersecting: false,
            selected: false,
            orientation: "north",
            lastMoveDirection: "",
            degreeOfOrientation: 0,
            transform: ""
        },
        enemyShip: {
            health: 10,
            move: 2,
            attack: 10,
            xCord: 90,
            yCord: -120,
            initialXCord: 90,
            initialYCord: -120,
            orientation: "south",
            lastMoveDirection: "",
            degreeOfOrientation: 180,
            transform: ""
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

    function moveShip() {
        ships.playerShip.xCord = xCord;
        ships.playerShip.yCord = yCord;
        placeShip();
    }

    /* Enemy Ship Functions - Probably need to place them within the above JSON for legibility */

    function placeEnemyShipStart() {
        ships.enemyShip.transform = "translate(" + ships.enemyShip.initialXCord + "px, " + ships.enemyShip.initialYCord + "px) rotate(" + ships.enemyShip.degreeOfOrientation + "deg)";
        document.querySelector('.enemy-ship').style.transform = ships.enemyShip.transform;
        console.log(`Enemy Ship Cords: ${ships.enemyShip.xCord}, ${ships.enemyShip.yCord} `);
    }



    /* The "MAIN" */

    placeEnemyShipStart(); 

    window.addEventListener("keypress", (event) => {
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