class MapTile {
    constructor() {
        this.xCord = 0;
        this.yCord = 0;
        this.background = '';
        this.size = 30;
        this.stats = [];
        this.transform = "";
    }

    getTileLocation() {
        let loc = [this.xCord, this.yCord]
        return loc;
    }

    getTileStats() {
        return this.stats;
    }

    setMapTile(x, y) {
        let parent = document.querySelector('.game-board');

        this.xCord = x;
        this.yCord = y;
        this.transform = `translate(${this.xCord}px, ${this.yCord}px)`;

        let newTile = document.createElement("div");

        newTile.style.width = `${this.size}px`;
        newTile.style.height = `${this.size}px`;
        newTile.style.transform = this.transform;

        newTile.className = "asteroid";
        
        parent.append(newTile);
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

