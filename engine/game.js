class Game {
    constructor() {
        this.active = false;
        this.playerTeam = [];
        this.enemyTeam = [];
        this.playerTeamSize = 0;
        this.enemyTeamSize = 0;
        this.playerTurn = false;
        this.enemyTurn = false;
        this.mapRows = 17;
        this.mapCols = 17;
        this.map = [];
        this.mapTileSize = 30;
        this.overlay = new Overlay();
    }

    handleOverlay(cursor) {
        this.overlay.updateTarget(cursor.intersectingWith);
        this.overlay.updatePosition();
        this.overlay.populateElementData();
        this.overlay.setElement();
    }

    getTileByLocation(x, y) {
        for(let i = 0; i < this.map.length; i++) {
            if (this.map[i].xCord === x && this.map[i].yCord === y) {
                return this.map[i];
            }
        }
    }

    getAdjacentTiles(tile) {
        let adjacentTileLocations = [];
        let adjacentTiles = [];

        adjacentTileLocations.push(tile.getAdjacentTileCords());

        for(let i = 0; i < adjacentTileLocations[0].length; i++) {
            adjacentTiles.push(this.getTileByLocation(adjacentTileLocations[0][i][0], adjacentTileLocations[0][i][1])); 
        }

        return adjacentTiles;
    }

    populateMap() {
        for(let i = 0; i < this.mapRows; i++) {
            for(let j = 0; j < this.mapCols; j++) {
                let x = (-270 + (i * this.mapTileSize));
                let y = (-270 + (j * this.mapTileSize));
                let temp = new MapTile(x, y);
                this.map.push(temp);
                temp.setMapTile;
            }
        }
        console.log(this.map);
    }

    start(playerTeam, enemyTeam) {
        this.active = true;
        this.setPlayerTeam(playerTeam);
        this.setEnemyTeam(enemyTeam);
        this.playerTeamSize = this.playerTeam.length;
        this.enemyTeamSize = this.enemyTeam.length;
        
        for(let i = 0; i < this.playerTeam.length; i++) {
            this.playerTeam[i].canMove = true;
            this.playerTeam[i].canAttack = true;
        }

        this.playerTurn = true;

    }

    setPlayerTeam(playerTeam) {
        this.playerTeam = playerTeam;
    }

    setEnemyTeam(enemyTeam) {
        this.enemyTeam = enemyTeam;
    }

    setOccupiedTiles(playerTeam, enemyTeam) {
        for(let i = 0; i < playerTeam.length; i++) {
            let x = playerTeam[i].xCord;
            let y = playerTeam[i].yCord;
            let temp = this.getTileByLocation(x, y);
            playerTeam[i].occupyingTile = temp;
            temp.setOccupied(playerTeam[i]);
            temp.tileType = 'ship';
        }

        for(let i = 0; i < enemyTeam.length; i++) {
            let x = enemyTeam[i].xCord;
            let y = enemyTeam[i].yCord;
            let temp = this.getTileByLocation(x, y);
            enemyTeam[i].occupyingTile = temp;
            temp.setOccupied(enemyTeam[i]);
            temp.tileType = 'ship';
        }
    }

    checkPlayerTurnEnd() {
        let turnEnd = false;
        let pTeam = this.playerTeam;
        for(let i = 0; i < pTeam.length; i++) {
            if(pTeam[i].canMove === false) {
                turnEnd = true;
            } else if(pTeam[i].canMove === true) {
                turnEnd = false;
                break;
            }
        }

        if(turnEnd === true) {
            console.log(`Player Turn End... `)
            this.swapActiveTurn();
        }
    }

    handleEnemyTurn() {
            for(let i = 0; i < this.enemyTeam.length; i++) {
                setTimeout(() => {
                    this.enemyTeam[i].canMove = true;
                    this.enemyTeam[i].canAttack = true;
                    if(this.enemyTeam[i].checkPlayerInRange(this.playerTeam) !== null) {
                        if(this.enemyTeam[i].canMove) {
                        this.enemyTeam[i].makeEnemyMove(this);
                        this.enemyTeam[i].canMove = false;
                        this.enemyTeam[i].canAttack = false;
                        }
                    } 
                }, 500);
            }

    }

    checkEnemyTurnEnd() {
        if(this.enemyTurn === true) {
            this.handleEnemyTurn();
            console.log(`Enemy Turn End.... `);
            this.swapActiveTurn();
        } 
    }

    swapActiveTurn() {
        if(this.playerTurn === true) {
            this.playerTurn = false;
            this.enemyTurn = true;
        } else if(this.enemyTurn === true) {
            this.enemyTurn = false;
            this.playerTurn = true;

            for(let i = 0; i < this.playerTeam.length; i++) {
                this.playerTeam[i].canMove = true;
                this.playerTeam[i].canAttack = true;
            }
        }
    }

    destroyShipCheck(ship) {
        if(ship.destroyed === true) {
            if(ship.team === 'player') {
                this.playerTeam.splice(ship.indexValue, 1);
                console.log(`Player Team: ${this.playerTeam}`);
                console.log(`Enemy Team: ${this.enemyTeam}`);
            } else {
                this.enemyTeam.splice(ship.indexValue, 1);
                console.log(`Player Team: ${this.playerTeam}`);
                console.log(`Enemy Team: ${this.enemyTeam}`);
            }
        }
        this.checkPlayerUnitsLeft();
        this.checkEnemyUnitsLeft();
    }

    checkPlayerUnitsLeft() {
        if(this.playerTeam.length === 0) {
            this.gameOver();
        }
    }

    checkEnemyUnitsLeft() {
        if(this.enemyTeam.length === 0) {
            this.gameWon();
        }
    }

    gameOver() {
        console.log('You have lost. Refresh the page to try again.');
    }

    gameWon() {
        console.log('Congratulations! You win! Refresh the page to play again.')
    }
}