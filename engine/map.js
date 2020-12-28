class MapTile {
    constructor(x, y) {
        this.xCord = x;
        this.yCord = y;
        this.background = '';
        this.size = 30;
        this.stats = [];
        this.parent = document.querySelector('.game-board');
        this.tileType = 'default';
        this.transform = "";
        this.intersecting = false;
        this.occupied = false;
        this.occupiedBy = null;
    }

    getTileLocation() {
        let loc = [this.xCord, this.yCord]
        return loc;
    }

    getAdjacentTileCords() {
        return [
                [this.xCord + 30, this.yCord], // right
                [this.xCord, this.yCord + 30], // bottom
                [this.xCord -30, this.yCord], // left
                [this.xCord, this.yCord - 30] // top
            ]
    }

    getTileStats() {
        // nothing yet
    }

    setMapTile() {
        this.transform = `translate(${this.xCord}px, ${this.yCord}px)`;

        let newTile = document.createElement("div");

        newTile.style.width = `${this.size}px`;
        newTile.style.height = `${this.size}px`;
        newTile.style.transform = this.transform;

        if(this.tileType === 'asteroid') {
            newTile.className = "asteroid";
        } else if(this.tileType === 'default') {
            newTile.className = "default-tile";
        }
        
        this.parent.append(newTile);
    }

    setOccupied(ship) {
        if(ship === null) {
            this.occupied = false;
            this.occupiedBy = null;
        } else {
            this.occupied = true;
            this.occupiedBy = ship;
        }
    }

    setTileAsteroid() {
        this.tileType = "asteroid";
        this.background = "url('media/spacepixels-0.2.0/asteroid_grey.png')";
    }
}

class AsteroidTile extends MapTile {
    constructor(x, y) {
        super();
        this.xCord = x;
        this.yCord = y;
        this.tileType = 'asteroid';
        this.background = "url('media/spacepixels-0.2.0/asteroid_grey.png')";
    }
}

