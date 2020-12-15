window.onload = () => {
    /* The "MAIN" */

    let newPlayer = new PlayerShip();
    let newEnemy = new EnemyShip();
    let newCursor = new Cursor();
    let newAsteroid1 = new AsteroidTile();
    let newAsteroid2 = new AsteroidTile();
    let newAsteroid3 = new AsteroidTile();
    let newAsteroid4 = new AsteroidTile();

    console.log(newPlayer);

    newEnemy.placeEnemyShipStart(90, -120); 
    newAsteroid1.setMapTile(-30, -30); 
    newAsteroid2.setMapTile(-90, 180); 
    newAsteroid3.setMapTile(150, 120);
    newAsteroid4.setMapTile(-150, -150);

    let hazards = [newAsteroid1, newAsteroid2, newAsteroid3, newAsteroid4];

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
                newEnemy.checkIntersect(newCursor);

                hazards.forEach(hazard => {
                    if(newCursor.intersectingWithTile === null) {
                        hazard.checkTileIntersect(newCursor);
                    }
                });

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
                newEnemy.checkIntersect(newCursor);

                hazards.forEach(hazard => {
                    if(newCursor.intersectingWithTile === null) {
                        hazard.checkTileIntersect(newCursor);
                    }
                });

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
                newEnemy.checkIntersect(newCursor);

                hazards.forEach(hazard => {
                    if(newCursor.intersectingWithTile === null) {
                        hazard.checkTileIntersect(newCursor);
                    }
                });

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
                newEnemy.checkIntersect(newCursor);

                hazards.forEach(hazard => {
                    if(newCursor.intersectingWithTile === null) {
                        hazard.checkTileIntersect(newCursor);
                    }
                });

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