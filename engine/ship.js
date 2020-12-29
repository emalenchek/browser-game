class Ship {
    constructor() {
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
                
                console.log(this.transform);               
                this.deathSpins--;
                this.destroyShip(game); 
            } else {
                // map tile no longer occupied
                let tile = game.getTileByLocation(this.xCord, this.yCord);
                tile.setOccupied(null);

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
                console.log(cursor.intersectingWith);
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
                if(this.canMove === true) {
                    // old tile no longer occupied
                    let oldTile = game.getTileByLocation(this.xCord, this.yCord);
                    oldTile.setOccupied(null);
                    this.occupyingTile = null;

                    // updates ship coordinates and places ship
                    this.initialXCord = cursor.xCord;
                    this.xCord = cursor.xCord;
                    this.initialYCord = cursor.yCord;
                    this.yCord = cursor.yCord;
                    this.placeShip();
                    this.canMove = false;

                    // new tile is occupied
                    let newTile = game.getTileByLocation(this.xCord, this.yCord);
                    newTile.setOccupied(this);
                    this.occupyingTile = newTile;

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
            if(adjacentTiles[i].xCord <= 240 && adjacentTiles[i].yCord <= 240) {
                if(adjacentTiles[i].xCord >= -240 && adjacentTiles[i].yCord >= -240) {
                    if((totalRange * 30) > Math.sqrt(Math.pow(this.xCord - adjacentTiles[i].xCord, 2) + Math.pow(this.yCord - adjacentTiles[i].yCord, 2))) {
                        if(adjacentTiles[i].occupiedBy !== null) {
                            console.log(`This tile is not a possible move. (occupied)`);
                        } else if(adjacentTiles[i].tileType === "asteroid") {
                            console.log(`This tile is not a possible move. (asteroid)`);
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
        let target = this.checkPlayerInRange(game.playerTeam);
        let possibleMoves = this.getPossibleMoveTiles(game, target);
        let closestMove = null;
        let distanceClosestMove = 0;

        if(possibleMoves.length !== 0) {
            for(let i = 0; i < possibleMoves.length; i++) {
                //get closest valid move
                if(closestMove === null) {
                    closestMove = possibleMoves[i];
                    distanceClosestMove = Math.sqrt(Math.pow(possibleMoves[i].xCord - this.xCord, 2) + Math.pow(possibleMoves[i].xCord - this.xCord, 2));
                }
                else if(Math.sqrt(Math.pow(possibleMoves[i].xCord - this.xCord, 2) + Math.pow(possibleMoves[i].xCord - this.xCord, 2)) < distanceClosestMove) {
                    closestMove = possibleMoves[i];
                    distanceClosestMove = Math.sqrt(Math.pow(possibleMoves[i].xCord - this.xCord, 2) + Math.pow(possibleMoves[i].xCord - this.xCord, 2));
                }
            }

            let oldTile = game.getTileByLocation(this.occupyingTile.xCord, this.occupyingTile.yCord);
            oldTile.occupiedBy = null;
            oldTile.occupied = false;

            this.occupyingTile = closestMove;

            this.xCord = closestMove.xCord;
            this.yCord = closestMove.yCord;
            this.initialXCord = closestMove.xCord;
            this.initalYCord = closestMove.yCord;

            this.occupyingTile.occupiedBy = this;
            this.occupyingTile.occupied = true;

            this.placeShip();

            if(this.canAttack) {
                this.shipAttack(target, game);
                console.log(`Player Ship was attacked. ${target.health} remaining health.`)
            }
        } else {
            console.log(`no possible moves`);
        }
    }
    
};