function getEuclideanDistance(x, y) {
    return Math.sqrt(Math.pow((x), 2) + Math.pow((y), 2));
}

function sleep(ms) {
    var date = new Date();
    var curDate = null;
    do { curDate = new Date(); }
    while(curDate-date < ms);}