class Ship {
    constructor() {
        this.maxHealth = 50;
        this.health = 50;
        this.move = 5;
        this.attack = 10;
        this.attackRange = 2;
        this.xCord = 0;
        this.yCord = 0;
        this.initialXCord = 0;
        this.initialYCord = 0;
        this.intersecting = false;
        this.selected = false;
        this.orientation = "north";
        this.degreeOfOrientation = 0;
        this.lastMoveDirection = "";
        this.transform = "";
        this.destroyed = false;
        this.deathSpins = 4;
        this.canMove = false;
        this.canAttack = false;
        this.occupyingTile = null;
        this.currentPath = [];
    }

    handleStatus(game) {
        if(this.health <= 0 && !this.destroyed) {
            this.destroyShip(game);
        }
    }

    setOrientation(cardinalDirection) {
        switch(cardinalDirection) {
            case "north":
                this.orientation = "north";
                this.degreeOfOrientation = 0;
                break;
            case "northeast":
                this.orientation = "northeast";
                this.degreeOfOrientation = 45;
                break;
            case "east":
                this.orientation = "east";
                this.degreeOfOrientation = 90;
                break;
            case "southeast":
                this.orientation = "east";
                this.degreeOfOrientation = 135;
                break;
            case "south":
                this.orientation = "south";
                this.degreeOfOrientation = 180;
                break;
            case "southwest":
                this.orientation = "south";
                this.degreeOfOrientation = 225;
                break;
            case "west":
                this.orientation = "west";
                this.degreeOfOrientation = 270;
                break;
            case "west":
                this.orientation = "northwest";
                this.degreeOfOrientation = 315;
                break;
            default:
                break;
        };
    }

    destroyShip(game) {
        setTimeout(() => {
            if (this.deathSpins > 0) { 
                switch(this.degreeOfOrientation) {
                    case 0:
                        this.degreeOfOrientation = 90;
                        break;
                    case 90:
                        this.degreeOfOrientation = 180;
                        break;
                    case 180:
                        this.degreeOfOrientation = 270;
                        break;
                    case 270:
                        this.degreeOfOrientation = 0;
                        break; 
                }
            
                this.transform = "translate(" + this.xCord + "px, " + this.yCord + "px) rotate(" + this.degreeOfOrientation + "deg)";

                if(this.team === 'player') {
                    document.querySelector(`#player-unit-${this.indexValue}`).style.transform = this.transform;
                } else if(this.team === 'enemy') {
                    document.querySelector(`#enemy-unit-${this.indexValue}`).style.transform = this.transform;
                }
                
                this.deathSpins--;
                this.destroyShip(game); 
            } else {
                // map tile no longer occupied
                let tile = game.getTileByLocation(this.xCord, this.yCord);
                tile.setOccupied = null;

                // handle ship destroyed
                this.destroyed = true;           
                game.destroyShipCheck(this);
                this.occupyingTile = null;
                this.xCord = null;
                this.yCord = null;

                if(this.team === 'player') {
                    document.querySelector(`#player-unit-${this.indexValue}`).remove();
                } else if(this.team === 'enemy') {
                    document.querySelector(`#enemy-unit-${this.indexValue}`).remove();
                }
            }
        }, 250);
    }

    checkIntersect(cursor) {
        if(cursor.xCord === this.xCord && cursor.yCord === this.yCord) {
            this.intersecting = true;
            cursor.intersectingWith = this;
            console.log('Intersecting with ' + cursor.intersectingWith.team);
        } else if(cursor.intersectingWith !== null) {
            console.log(`Intersecting with ${cursor.intersectingWith.team}`);
        } else {
            this.intersecting = false;
            cursor.intersectingWith = null;
        }
    }

    placeShip() {
        this.transform = "translate(" + this.xCord + "px, " + this.yCord + "px) rotate(" + this.degreeOfOrientation + "deg)";
        
        if(this.team === "player") {
            document.querySelector(`#player-unit-${this.indexValue}`).style.transform = this.transform;
            console.log(`Player Ship Cords: ${this.xCord}, ${this.yCord} `);
        } else if(this.team === "enemy") {
            document.querySelector(`#enemy-unit-${this.indexValue}`).style.transform = this.transform;
            console.log(`Enemy Ship Cords: ${this.xCord}, ${this.yCord} `);
        }
    }

    moveShip(cursor, game) {
        if((this.move * 30) >= Math.sqrt(Math.pow((this.initialXCord - cursor.xCord), 2) + Math.pow((this.initialYCord - cursor.yCord), 2))) {
            // if target ship occupies square 
            if(cursor.intersectingWith !== null) {
                if(cursor.intersectingWith.team === 'enemy') {
                    console.log(`This coordinate is occupied by an enemy, move within ${this.attackRange} spaces to attack.`);
                    // if target ship is within range attack target
                    if((this.attackRange * 30) >= Math.sqrt(Math.pow((this.initialXCord - cursor.xCord), 2) + Math.pow((this.initialYCord - cursor.yCord), 2))) {
                        if(this.canAttack === true) {
                            this.shipAttack(cursor.intersectingWith, game);
                            this.canAttack = false;
                        }
                    }
                } else if(cursor.intersectingWith.team === 'player') {
                    console.log(`This space is occupied by another player unit`);
                }
            } else if(cursor.intersectingWithTile !== null && cursor.intersectingWithTile.tileType === 'asteroid') {
                console.log(`This coordinate is occupied by a(n) ${cursor.intersectingWithTile.tileType}, you can not move here.`)
            } else {
                /* 
                    A* implementation: Going to need to check each adjacent square 
                    to determine which square will get the user closest to the 
                    goal square. Should probably build a calculateDistance helper
                    method (since I will be using many times). I then update the 
                    ship's position to the new square, and decrement the "moves left".
                    I repeat the process (accounting for untraversible terrain).

                    Heuristic: Prefer moves that have closest magnitude to the direct path/
                    correct direction of the goal node. If there is a tie, prioritze movement
                    in the Y direction. 
                    
                    (For example: if deltaX=90 from startNode->goalNode && deltaY=30 from
                    startNode->goalNode, the adjacent nodes that are deltaX=90,deltaY=0/deltaX=60,deltaY=30 
                    will be preferred over the adjacent nodes that are deltaX=90,deltaY=60/deltaX=120,deltaY=30.
                    I then feel that the best way to handle nodes adjacent of startNode with similar magnitudes
                    would be to prefer to prioritize movement in the y-direction first (decreasing deltaY before deltaX)).                    
                */
                if(this.canMove === true) {
                    let movesLeft = this.move;
                    let goalReached = false;
                    while(movesLeft !== 0 && goalReached === false) {
                        let goalX = cursor.xCord;
                        let goalY = cursor.yCord;
                        let currentX = this.xCord;
                        let currentY = this.yCord;

                        // get current distance from goal
                        let currentGoalDistance = getManhattanDistance(goalX-currentX, goalY-currentY);
                        console.log("Current Distance: " + currentGoalDistance);

                        // get adjacent tiles
                        let adjacentTiles = game.getAdjacentTiles(game.getTileByLocation(currentX, currentY));

                        // get adjacent tile with minimum distance from goal
                        let closestTile = null;
                        for(let i=0; i < adjacentTiles.length; i++) {
                            // check to see if adjacent tile is an asteroid
                            if(adjacentTiles[i].tileType !== 'asteroid' && adjacentTiles[i].tileType !== 'ship') {
                                if(closestTile === null) {
                                    closestTile = adjacentTiles[i];
                                }

                                if(getManhattanDistance(goalX-closestTile.xCord, goalY-closestTile.yCord) > getManhattanDistance(goalX-adjacentTiles[i].xCord, goalY-adjacentTiles[i].yCord)) {
                                    closestTile = adjacentTiles[i];
                                }
                            }
                        }
                        console.log(closestTile);

                        // old tile no longer occupied (may need to add a currentPath member variable that stores path tiles)
                        if(closestTile !== null) {
                            let oldTile = game.getTileByLocation(this.xCord, this.yCord);
                            this.currentPath.push(oldTile);
                            oldTile.setOccupied = null;
                            oldTile.tileType = 'default';
                            this.occupyingTile = null;
    
                            // update ship coordinates and place ship
                            this.initialXCord = closestTile.xCord;
                            this.xCord = closestTile.xCord;
                            this.initialYCord = closestTile.yCord;
                            this.yCord = closestTile.yCord;
                            this.placeShip();
    
                            //new tile is occupied
                            let newTile = game.getTileByLocation(this.xCord, this.yCord);
                            newTile.setOccupied = this;
                            this.occupyingTile = newTile;
                            this.occupyingTile.tileType = 'ship';
    
                            if(this.xCord === goalX && this.yCord === goalY) {
                                goalReached = true;
                            }
    
                            movesLeft--;
                        }
                        // sleep(200);
                    }

                    this.canMove = false;
                    console.log(`Player occupying tile: ${this.occupyingTile}`);
                } else {
                    console.log(`This unit already moved or can not move.`);
                }
            }
        } else {
            console.log("Can't move that far");
        }
    }

    shipTarget(game) {
        if((this.attackRange * 30) >= Math.sqrt(Math.pow((this.initialXCord - cursor.xCord), 2) + Math.pow((this.initialYCord - cursor.yCord), 2))) {
            this.shipAttack(cursor.intersectingWith, game);
        }
    }

    setAttackOrientation(target) {
        let x = target.xCord;
        let y = target.yCord;

        if(this.xCord < x && this.yCord > y) {
            this.orientation = "northwest"; // aim northwest
        } else if(this.xCord > x && this.yCord > y) {
            this.orientation = "northeast"; // aim northeast
        } else if(this.xCord < x && this.yCord < y) {
            this.orientation = "southeast"; // aim southeast
        } else if(this.xCord > x && this.yCord < y) {
            this.orientation = "southwest"; // aim southwest
        } else if(this.xCord < x) {
            this.orientation = "east"; // aim east 
        } else if(this.xCord > x) {
            this.orientation = "west"; // aim west
        } else if(this.yCord > y) {
            this.orientation = "north"; // aim north
        } else if(this.yCord < y) {
            this.orientation = "south"; // aim south
        }

        this.setOrientation(this.orientation); // update ship aim direction
        this.transform = "translate(" + this.xCord + "px, " + this.yCord + "px) rotate(" + this.degreeOfOrientation + "deg)";

        if(this.team === "player") {
            document.querySelector(`#player-unit-${this.indexValue}`).style.transform = this.transform;
        } else if(this.team === "enemy") {
            document.querySelector(`#enemy-unit-${this.indexValue}`).style.transform = this.transform;
        }
    }

    shipAttack(target, game) {
        this.setAttackOrientation(target);

        target.health -= this.attack;
        target.handleStatus(game);
        if(target.team === "enemy") {
            console.log("Enemy Ship Remaining Health: " + target.health);
        } else if(target.team === "player") {
            console.log("Player Ship Remaining Health: " + target.health);
        }
    }

    showMovementRange() {
        if(document.querySelector('.move-range').style.display === 'none') {
            document.querySelector('.move-range').style.display = 'block';
        }
        else {
            document.querySelector('.move-range').style.display = 'none';
        }
    }

    hideMovementRange() {
        if(document.querySelector('.move-range').style.display === 'block') {
            document.querySelector('.move-range').style.display = 'none';
        }
    }

    placeShipStart() {
        this.transform = "translate(" + this.initialXCord + "px, " + this.initialYCord + "px) rotate(" + this.degreeOfOrientation + "deg)";

        if(this.team === 'player') {
            document.querySelector(`#player-unit-${this.indexValue}`).style.transform = this.transform;
        } else if(this.team === 'enemy') {
            document.querySelector(`#enemy-unit-${this.indexValue}`).style.transform = this.transform;
        }
    }
};

class PlayerShip extends Ship {
    constructor(x, y) {
        super();
        this.initialXCord = x;
        this.xCord = x;
        this.initialYCord = y;
        this.yCord = y;
        this.team = "player";
        this.transform = "translate(" + this.initialXCord + "px, " + this.initialYCord + "px) rotate(" + this.degreeOfOrientation + "deg)"
    }
};

class EnemyShip extends Ship {
    constructor(x, y) {
        super();
        this.team = "enemy";
        this.xCord = x;
        this.yCord = y;
        this.initialXCord = x;
        this.initialYCord = y;
        this.health = 10;
        this.maxHealth = 10;
        this.attackRange = 1;
        this.orientation = "south";
        this.degreeOfOrientation = 180;
    }

    // For now we will loop through all player ships and return the lowest health player ship in range
    checkPlayerInRange(playerTeam) {
        // if player is within attack + move range
        let totalRange = this.attackRange + this.move;
        let lowestHealthPlayer = null;

        
        for(let i = 0; i < playerTeam.length; i++) {
            if((totalRange * 30) >= Math.sqrt(Math.pow(this.xCord - playerTeam[i].xCord, 2) + Math.pow(this.yCord - playerTeam[i].yCord, 2))) {
                console.log(`player within range of enemy`);
                if(lowestHealthPlayer === null) {
                    lowestHealthPlayer = playerTeam[i];
                } else if(lowestHealthPlayer.health > playerTeam[i].health) {
                    lowestHealthPlayer = playerTeam[i];
                }
            } else {console.log('No players in range of enemy');}
        }

        return lowestHealthPlayer;
    }

    getPossibleMoveTiles(game, target) {
        let targetTile = target.occupyingTile;
        let totalRange = this.attackRange + this.move;
        let adjacentTiles = game.getAdjacentTiles(targetTile);
        let validMoves = [];

        for(let i = 0; i < adjacentTiles.length; i++) {
            if(adjacentTiles[i].xCord <= 270 && adjacentTiles[i].yCord <= 270) {
                if(adjacentTiles[i].xCord >= -270 && adjacentTiles[i].yCord >= -270) {
                    if((totalRange * 30) > Math.sqrt(Math.pow(this.xCord - adjacentTiles[i].xCord, 2) + Math.pow(this.yCord - adjacentTiles[i].yCord, 2))) {
                        if(adjacentTiles[i].occupiedBy !== null) {
                            console.log(`This tile is not a possible move. (occupied)`);
                        } else if(adjacentTiles[i].tileType === "asteroid") {
                            console.log(`This tile is not a possible move. (asteroid)`);
                        } else if(adjacentTiles[i].tileType === "ship") {
                            console.log('There is a ship occupying this space. Not a possible move (ship).');
                        } else {
                            validMoves.push(adjacentTiles[i]);
                        }
                    } else {
                        console.log(`This tile is too far away.`);
                    }
                } else {
                    console.log(`This tile is not a possible move. (not on grid)`);
                }
            }
        }

        if(validMoves.length !== 0) {
            return validMoves;
        } else {
            console.log(`No valid moves`);
            return validMoves;
        }
    }

    makeEnemyMove(game) {
        while(this.canMove === true) {
                    // returns the lowest health target ship in range
            let target = this.checkPlayerInRange(game.playerTeam);
            let movesLeft = this.move;
            let goalReached = false;

            while(movesLeft !== 0 && goalReached === false) {
                let goalX = target.xCord;
                let goalY = target.yCord;
                let currentX = this.xCord;
                let currentY = this.yCord;

                // get current distance from goal
                let currentGoalDistance = getManhattanDistance(goalX-currentX, goalY-currentY);
                console.log(`Current Distance: ${currentGoalDistance}`);

                //gets adjacent tiles from current location of ship
                let adjacentTiles = game.getAdjacentTiles(game.getTileByLocation(currentX, currentY));

                // get traversable adjacent tile with minimum distance from goal
                let closestTile = null;
                for(let i = 0; i < adjacentTiles.length; i++) {
                    // check to see if adjacent tile is traversable
                    if(adjacentTiles[i].tileType !== 'asteroid' && adjacentTiles[i].tileType !== 'ship') {
                        if(closestTile === null) {
                            closestTile = adjacentTiles[i];
                        }

                        if(getManhattanDistance(goalX - closestTile.xCord, goalY - closestTile.yCord) > getManhattanDistance(goalX - adjacentTiles[i].xCord, goalY - adjacentTiles[i].yCord)) {
                            closestTile = adjacentTiles[i];
                        }
                    }
                }

                if(closestTile !== null) {
                    let oldTile = game.getTileByLocation(this.xCord, this.yCord);
                    this.currentPath.push(oldTile);
                    oldTile.setOccupied = null;
                    oldTile.tileType = 'default';
                    this.occupyingTile = null;

                    // update ship coordinates and place ship
                    this.initialXCord = closestTile.xCord;
                    this.xCord = closestTile.xCord;
                    this.initialYCord = closestTile.yCord;
                    this.yCord = closestTile.yCord;
                    sleep(200);
                    this.placeShip();

                    
                    if(this.canAttack && ((getManhattanDistance(goalX-this.xCord, goalY-this.yCord) / 30) <= this.attackRange)) {
                        this.shipAttack(target, game);
                        console.log(`Player Ship was attacked. ${target.health} remaining health.`);
                        this.canMove = false;
                    }

                    //new tile is occupied
                    let newTile = game.getTileByLocation(this.xCord, this.yCord);
                    newTile.setOccupied = this;
                    this.occupyingTile = newTile;
                    this.occupyingTile.tileType = 'ship';

                    if(this.xCord === (goalX + 30) && this.yCord === goalY ||
                        this.xCord === (goalX - 30) && this.yCord === goalY ||
                        this.xCord === goalX && this.yCord === (goalY + 30) ||
                        this.xCord === goalY && this.yCord === (goalY - 30)) {
                        goalReached = true;
                    }

                    movesLeft--; 
                }
            }

            this.canMove = false;
            console.log(`Enemy occupying tile: ${this.occupyingTile}`);
        }
    }
    
};