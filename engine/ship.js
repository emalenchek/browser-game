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
    }

    handleStatus() {
        if(this.health <= 0 && !this.destroyed) {
            this.destroyShip();
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

    destroyShip() {
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
                document.querySelector('.enemy-ship').style.transform = this.transform;
                
                console.log(this.transform);               
                this.deathSpins--;
                this.destroyShip(); 
            } else {
                this.destroyed = true;
                this.xCord = null;
                this.yCord = null;
                document.querySelector('.enemy-ship').remove();
            }
        }, 250);
    }

    checkIntersect(cursor) {
        if(cursor.xCord === this.xCord && cursor.yCord === this.yCord) {
            this.intersecting = true;
            cursor.intersectingWith = this;
            console.log('Intersecting with ' + cursor.intersectingWith.team);
        } else {
            this.intersecting = false;
        }
    }

    placeShip() {
        this.transform = "translate(" + this.xCord + "px, " + this.yCord + "px) rotate(" + this.degreeOfOrientation + "deg)";
        
        if(this.team === "player") {
            document.querySelector('.player-ship').style.transform = this.transform;
            console.log(`Player Ship Cords: ${this.xCord}, ${this.yCord} `);
        } else if(this.team === "enemy") {
            document.querySelector('.enemy-ship').style.transform = this.transform;
            console.log(`Enemy Ship Cords: ${this.xCord}, ${this.yCord} `);
        }
    }

    moveShip(cursor) {
        if((this.move * 30) >= Math.sqrt(Math.pow((this.initialXCord - cursor.xCord), 2) + Math.pow((this.initialYCord - cursor.yCord), 2))) {
            // if target ship occupies square 
            if(cursor.intersectingWith.xCord === cursor.xCord && cursor.intersectingWith.yCord === cursor.yCord) {
                console.log(`This coordinate is occupied by an enemy, move within ${this.attackRange} spaces to attack.`);
                // if target ship is within range attack target
                if((this.attackRange * 30) >= Math.sqrt(Math.pow((this.initialXCord - cursor.xCord), 2) + Math.pow((this.initialYCord - cursor.yCord), 2))) {
                    this.shipAttack(cursor.intersectingWith);
                }
            } else {
                this.initialXCord = cursor.xCord;
                this.xCord = cursor.xCord;
                this.initialYCord = cursor.yCord;
                this.yCord = cursor.yCord;
            }
            this.placeShip();
        } else {
            console.log("Can't move that far");
        }
    }

    shipAttack(target) {
        target.health -= this.attack;
        target.handleStatus();
        if(target.team === "enemy") {
            console.log("Enemy Ship Remaining Health: " + target.health);
        } else if(target.team === "player") {
            console.log("Player Ship Remaining Health: " + target.health);
        }
    }
};

class PlayerShip extends Ship {
    constructor() {
        super();
        this.team = "player";
    }
};

class EnemyShip extends Ship {
    constructor() {
        super();
        this.team = "enemy";
        this.xCord = 0;
        this.yCord = 0;
        this.initialXCord = 0;
        this.initialYCord = 0;
        this.health = 10;
        this.orientation = "south";
        this.degreeOfOrientation = 180;
    }

    placeEnemyShipStart(x, y) {
        this.initialXCord = x;
        this.initialYCord = y;
        this.xCord = x;
        this.yCord = y;
        this.transform = "translate(" + this.initialXCord + "px, " + this.initialYCord + "px) rotate(" + this.degreeOfOrientation + "deg)";
        document.querySelector('.enemy-ship').style.transform = this.transform;
        console.log(`Enemy Ship Cords: ${this.xCord}, ${this.yCord}`);
    }
};