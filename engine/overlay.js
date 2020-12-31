class Overlay {
    constructor() {
        this.target = null;
        this.position = '';
        this.cssClass = '';
        this.parent = document.querySelector('.game-board');
    }

    setElement() {
        let overlay = document.querySelector('.overlay');

        if(this.position === '') {
            overlay.className = "";
            overlay.classList.add('overlay');
            overlay.style.display = 'none';
        } else {
            overlay.className = "";
            overlay.classList.add('overlay');
            overlay.classList.add(this.cssClass);
            overlay.style.display = 'flex';
        }
    }

    populateElementData() {
        let overlayDataEl = document.querySelector('.overlay-data');
        if(this.target !== null) {
            overlayDataEl.innerHTML = `
                <span>${this.target.team}</span>
                <span>HP: ${this.target.health}/${this.target.maxHealth}</span>
                <span>Mv: ${this.target.move}</span>
                <span>AtkPow: ${this.target.attack}</span>
                <span>AtkRng: ${this.target.attackRange}</span>`;
        } else {
            overlayDataEl.innerHTML = '';
        }
    }

    updateTarget(ship) {
        if(ship !== null) {
            this.target = ship;
            this.updatePosition();
        } else {
            this.clearTarget();
        }
    }

    clearTarget() {
        this.target = null;
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