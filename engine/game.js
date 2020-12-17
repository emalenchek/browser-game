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
        this.playerTurn = true;
    }

    setPlayerTeam(playerTeam) {
        this.playerTeam = playerTeam;
    }

    setEnemyTeam(enemyTeam) {
        this.enemyTeam = enemyTeam;
    }

    swapActiveTurn() {
        if(this.playerTurn === true) {
            this.playerTurn = false;
            this.enemyTurn = true;
        } else {
            this.enemyTurn = false;
            this.playerTurn = true;
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