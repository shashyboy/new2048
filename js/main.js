// 记录得分与16个方格的信息
var score = 0;//计分
var boxes = new Array();//数组存贮16个空格
document.getElementById("start").addEventListener("click", start);//开始新游戏
document.getElementById("reset").addEventListener("click", reset);//重置游戏
document.getElementById("left").addEventListener("click", toleftbtn);
document.getElementById("right").addEventListener("click", torightbtn);
document.getElementById("up").addEventListener("click", toupbtn);
document.getElementById("down").addEventListener("click", todownbtn);
document.getElementById("close").addEventListener("click", close);

// 初始化界面，分数为0，十六个空格信息为空
function newinfo(arr) {
    score = 0;
    document.getElementById("score").innerHTML = score;
    for (var i = 0; i < 4; i++) {
        arr[i] = new Array();
        for (var j = 0; j < 4; j++) {
            arr[i][j] = 0;
            var t = document.getElementById('c_' + i + '_' + j);
            t.innerHTML = " ";
            t.parentNode.style.background = "#d1cebd";
        }
    }
}

// 初始化一个新游戏
function start() {
    newinfo(boxes);// 初始化十六个空格的信息
    generateOneNumber(boxes);// 随机生成两个数字
    renderBoard(boxes);
    generateOneNumber(boxes);
    renderBoard(boxes);
    // document.getElementById("game_over").classList.add("hide");
    // document.getElementById("game_win").classList.add("hide");
    // document.getElementById("game_lose").classList.add("hide");
}

// 新游戏开始时，在空的方格位置随机产生一个2或者4的数字
function generateOneNumber(arr) {
    var randnum = Math.random() < 0.5 ? 2 : 4;
    var randX = Math.floor(Math.random() * 4);
    var randY = Math.floor(Math.random() * 4);
    arr[randX][randY] == 0 ? arr[randX][randY] = randnum : generateOneNumber(arr);
}

// 游戏过程随机生成一个数字
function game_generateNumber(arr) {
    if (nospace(arr)) {
        generateOneNumber(arr);
    }
}

// 点击向左按钮更新数据与页面
function toleftbtn() {
    gamewin(boxes);
    gamelose(boxes);
    toleft(boxes);
    generateOneNumber(boxes);
    renderBoard(boxes);
    document.getElementById("score").innerHTML = score;
}

// 点击向右按钮更新数据与页面
function torightbtn() {
    gamewin(boxes);
    gamelose(boxes);
    toright(boxes);
    generateOneNumber(boxes);
    renderBoard(boxes);
    document.getElementById("score").innerHTML = score;
}

// 点击向上按钮更新数据与页面
function toupbtn() {
    gamewin(boxes);
    gamelose(boxes);
    toup(boxes);
    boxes = newArray;
    generateOneNumber(boxes);
    renderBoard(boxes);
    document.getElementById("score").innerHTML = score;
}

// 点击向下按钮更新数据与页面
function todownbtn() {
    gamewin(boxes);
    gamelose(boxes);
    todown(boxes);
    boxes = newArray;
    generateOneNumber(boxes);
    renderBoard(boxes);
    document.getElementById("score").innerHTML = score;
}

// 当方格有数字时，空格样式发生改变
function renderBoard(arr) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            var num = arr[i][j];
            if (num != 0) {
                var t = document.getElementById('c_' + i + '_' + j);
                t.innerHTML = num;
                t.classList.add("num");
                t.parentNode.style.background = bgcolor(num);
            }
            else {
                var t = document.getElementById('c_' + i + '_' + j);
                t.innerHTML = " ";
                t.parentElement.style.background = "#d1cebd";
            }
        }
    }
}

// 游戏失败必要条件之一：每个小空格都有大于2的数值
function nospace(arr) {
    var flag = 1;
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (arr[i][j] == 0) {
                flag = 0;
            }
        }
    }
    return flag;
}

// 游戏失败的必要条件之二：任何两个相邻的数字都不相等,存在bug
function noequal(arr) {
    var flag = 1;
    // 二维数组中任何两个相邻的数不相等
    for (var i = 0; i < 3; i++) {
        // 判断行中相邻的两数有没有相等的
        for (var j = 0; j < 3; j++) {
            if ((boxes[i][j] == arr[i][j + 1]) || boxes[i][j] == boxes[i + 1][j]) {
                flag = 0;
            }
        }
    }
    return flag;
}

// 判断是否游戏失败
function gamelose(arr) {
    if ((nospace(arr) == 1) && (noequal(arr) == 1)) {
        lose();
    }
}

// 判断是否游戏胜利
function gamewin(arr) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (arr[i][j] == 2048) {
                win();
            }
        }
    }
}

// 赢时显示祝贺页面
function win() {
    document.getElementById("game_over").classList.remove("hide");
    document.getElementById("game_win").classList.remove("hide");
}

// 输时显示遗憾页面
function lose() {
    document.getElementById("game_over").classList.remove("hide");
    document.getElementById("game_lose").classList.remove("hide");
}

// 关闭游戏结束界面，初始化界面
function close() {
    document.getElementById("game_over").classList.add("hide");
    newinfo(boxes);
}

function reset() {
    newinfo(boxes);
}