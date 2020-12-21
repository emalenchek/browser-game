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
            case "east":
                this.orientation = "east";
                this.degreeOfOrientation = 90;
                break;
            case "south":
                this.orientation = "south";
                this.degreeOfOrientation = 180;
                break;
            case "west":
                this.orientation = "west";
                this.degreeOfOrientation = 270;
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
            
                this.transform = "translate(" + this.initialXCord + "px, " + this.initialYCord + "px) rotate(" + this.degreeOfOrientation + "deg)";
                document.querySelector(`#enemy-unit-${this.indexValue}`).style.transform = this.transform;
                
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
                this.xCord = null;
                this.yCord = null;
                document.querySelector(`#enemy-unit-${this.indexValue}`).remove();
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

    shipAttack(target, game) {
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
        this.orientation = "south";
        this.degreeOfOrientation = 180;
    }

    // For now we will loop through all player ships and return the lowest health player ship in range
    checkPlayerInRange(playerTeam) {
        // if player is within attack + move range
        let totalRange = this.attackRange + this.move;
        let lowestHealthPlayer = null;

        
        for(let i = 0; i < playerTeam.length; i++) {
            if((totalRange * 30) > Math.sqrt((this.xCord - playerTeam[i].xCord)^2+(this.yCord - playerTeam[i].yCord)^2)) {
                console.log(`player within range of enemy`);
                playerInRange = true;
                if(lowestHealthPlayer === null) {
                    lowestHealthPlayer = playerTeam[i];
                } else if(lowestHealthPlayer.health > playerTeam[i].health) {
                    lowestHealthPlayer = playerTeam[i];
                }
            }
        }

        return lowestHealthPlayer;
    }
};