window.onload = () => {
    let xCord = 0;
    let yCord = 0;

    let ships = {
        playerShip: {
            health: 50,
            move: 5,
            attack: 10,
            xCord: 30,
            yCord: 0,
            initialXCord: 30,
            initialYCord: 0,
            intersecting: false,
            selected: false
        },
        enemyShip: {
            health: 10,
            move: 2,
            attack: 10
        }
    }

    function checkIntersect() {
        if(xCord === ships.playerShip.xCord && yCord === ships.playerShip.yCord) {
            console.log('Intersecting');
            ships.playerShip.intersecting = true;
        } else {
            ships.playerShip.intersecting = false;
        }
    }

    function placeShip() {
        document.querySelector('.player-ship').style.transform = "translate(" + ships.playerShip.xCord + "px, " + ships.playerShip.yCord + "px)";
        console.log(`Ship Cords: ${ships.playerShip.xCord}, ${ships.playerShip.yCord} `);
    }

    function moveShip() {
        ships.playerShip.xCord = xCord - ships.playerShip.initialXCord;
        ships.playerShip.yCord = yCord - ships.playerShip.initialYCord;
        placeShip();
    }

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

                checkIntersect();


                break;
            case "Z":
            case "z":
                if(ships.playerShip.intersecting === true) {
                    if(ships.playerShip.selected === false) {
                        ships.playerShip.selected = true;
                    } else {
                        ships.playerShip.selected = false;
                    }
                } else {
                    if(ships.playerShip.selected === true) {
                        moveShip();
                        ships.playerShip.selected = false;
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