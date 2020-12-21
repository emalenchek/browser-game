class Game {
    constructor() {
        this.active = false;
        this.playerTeam = [];
        this.enemyTeam = [];
        this.playerTeamSize = 0;
        this.enemyTeamSize = 0;
        this.playerTurn = false;
        this.enemyTurn = false; 
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
            if(this.enemyTeam[i].checkPlayerInRange(this.playerTeam) !== null) {
                console.log(`Player in range.`);
                if(this.enemyTeam[i].canMove) {
                    // Handle enemy movement
                    if(this.enemyTeam[i].canAttack) {
                        // Handle enemy attack
                    }
                }
            } 
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