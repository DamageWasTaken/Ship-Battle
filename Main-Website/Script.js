var originalArray = [
    {name:"Lucas", score:122},
    {name:"Ole", score:9293},
    {name:"Alexander", score:20},
    {name:"Ulrich", score:122},
    {name:"Søren", score:9293},
    {name:"Peter", score:43},
    {name:"Frederik", score:3456},
    {name:"Jens", score:9273},
    {name:"Julie", score:3648},
    {name:"Markus", score:83},
    {name:"Noah", score:3294},
    {name:"Jesper", score:374},
    {name:"Frands", score:122},
    {name:"Tina", score:8347},
    {name:"Toke", score:943},
    {name:"Theiss", score:43},
    {name:"Clara", score:9458},
    {name:"Sara", score:3475},
    {name:"Sebastian", score:2348},
    {name:"Keneth", score:4956},
    {name:"Mogens", score:3298},
    {name:"Ib", score:2347},
    {name:"Kristoffer", score:2984},
    {name:"Justin", score:3457}
];

function compareScore(a, b) {
    return b.score - a.score;
}

var sortedArray = originalArray.slice().sort(compareScore);

console.log(originalArray);
console.log(sortedArray);


window.onload = () => {
    appendData(sortedArray)
    function appendData(sortedArray) {
        var leaderboard = document.getElementById("table");
        for (var i = 0; i < originalArray.length; i++) {
            if (i < 16) {
                leaderboard.insertAdjacentHTML("beforeend",'<tr id="row' + i +'"> <td>' + sortedArray[i].name + '</td><td>' + sortedArray[i].score + '</td>',);
            }
        }
    }
};
