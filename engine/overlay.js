class Overlay {
    constructor() {
        this.target = null;
        this.data = [];
        this.position = '';
        this.cssClass = '';
        this.parent = document.querySelector('.game-board');
    }

    updateTarget(ship) {
        this.target = ship;
        this.data = [
            ship.health,
            ship.move,
            ship.attack,
            ship.attackRange
        ];
        this.updatePosition();
    }

    clearTarget() {
        this.target = null;
        this.data = [];
        this.position = '';
    }

    updatePosition() {
        if(this.target !== null) {
            if(this.target.xCord >= 0) {
                if(this.target.yCord >= 0) {
                    // cursor in bottom right
                    this.position = 'bottom-right';
                    this.cssClass = this.position;
                } else {
                    // cursor in top right
                    this.position = 'bottom-left';
                    this.cssClass = this.position;
                }
            } else if(this.target.xCord < 0) {
                if(this.target.yCord >= 0) {
                    // cursor in bottom left
                    this.position = 'top-right';
                    this.cssClass = this.position;
                } else {
                    // cursor in top left
                    this.position = 'top-left';
                    this.cssClass = this.position;
                }
            } else {
                this.position = 'bottom-right';
                this.cssClass = this.position;
            }
        } else {
            console.log('There is no overlay target.');
        }
    }
}