// 关卡三：天干地支

// 定义变量 记录初始分数
var count1 = 0;
var count2 = 0;
var hamster = document.getElementById("hamster");
var squirrel = document.getElementById("squirrel");

//玩家一状态值
var isLeft = false;
var isTop = false;
var isRight = false;
var isBottom = false;

// 玩家二的状态值
var isLeft2 = false;
var isTop2 = false;
var isRight2 = false;
var isBottom2 = false;
//定时器
var timer = null;
var wrong1 = 3;
var wrong2 = 3;


// ----------------------------------------------
// 动物移动
//键盘事件 只控制状态值(按下操控键)
window.onkeydown = function (e){
    // 玩家一  ASDW
    if (e.keyCode === 65) {
        isLeft = true;
    } else if (e.keyCode === 87) {
        isTop = true;
    } else if (e.keyCode === 68) {
        isRight = true;
    } else if (e.keyCode === 83) {
        isBottom = true;
    // 玩家二 ↑↓→←
    }else if (e.keyCode === 37) {
        isLeft2 = true;
    } else if (e.keyCode === 38) {
        isTop2 = true;
    } else if (e.keyCode === 39) {
        isRight2 = true;
    } else if (e.keyCode === 40) {
        isBottom2 = true;
    }
}
//键盘事件 只控制状态值(松开操控键)
window.onkeyup = function (e) {
    if (e.keyCode === 65) {
        isLeft = false;
    } else if (e.keyCode === 87) {
        isTop = false;
    } else if (e.keyCode === 68) {
        isRight = false;
    } else if (e.keyCode === 83) {
        isBottom = false;

    }else if (e.keyCode === 37) {
        isLeft2 = false;
    } else if (e.keyCode === 38) {
        isTop2 = false;
    } else if (e.keyCode === 39) {
        isRight2 = false;
    } else if (e.keyCode === 40) {
        isBottom2 = false;
    }
}

// 动物奔跑动作方法
var index1=-1;
var index2=-1;
function fn1(value1){
    index1++;
    if(index1>1){
        index1=0;
    }
    hamster.src ="./img/third/hamster/"+value1+index1+".png";
}
function fn2(value2){
    index2++;
    if(index2>1){
        index2=0;
    }
    squirrel.src ="./img/third/squirrel/"+value2+index2+".png";
}
//定时器控制动物移动
timer = setInterval(function () {
    // 玩家一(左侧仓鼠):按动ASDW移动
    if (isLeft) { 
        fn1("l");
        hamster.style.left = hamster.offsetLeft-7+"px";
    }
    if (isTop) { 
        hamster.style.top = hamster.offsetTop-7+"px";
        fn1("u");
    }
    if (isRight) { 
        hamster.style.left = hamster.offsetLeft+7+"px";
        fn1("r");
    }
    if(isBottom) { 
        hamster.style.top = hamster.offsetTop+7+"px";
        fn1("d");
    }
    // 玩家二(右侧松鼠):按动↑↓←→箭头移动
    if (isLeft2) { 
        squirrel.style.left = squirrel.offsetLeft-7+"px";
        fn2("l") ;
    }
    if (isTop2) { 
        squirrel.style.top = squirrel.offsetTop-7+"px";
        fn2("u");
    }
    if (isRight2) { 
        squirrel.style.left = squirrel.offsetLeft+7+"px";
        fn2("r");
    }
    if(isBottom2) { 
        squirrel.style.top = squirrel.offsetTop+7+"px";
        fn2("d");
    }
     limit();
}, 1)
// 键盘控制防止屏幕溢出
function limit(){
    //防止左溢出 
    (hamster.offsetLeft<=0)&&(hamster.style.left=0);
    (squirrel.offsetLeft<=0)&&(squirrel.style.left=0);
    //防止右溢出
    (hamster.offsetLeft+hamster.offsetWidth>=document.documentElement.clientWidth)&&(hamster.style.left=document.documentElement.clientWidth-hamster.offsetWidth+"px");
    (squirrel.offsetLeft+squirrel.offsetWidth>=document.documentElement.clientWidth)&&(squirrel.style.left=document.documentElement.clientWidth-squirrel.offsetWidth+"px");
    //防止上溢出
    (hamster.offsetTop<=0)&&(hamster.style.top=0);
    (squirrel.offsetTop<=0)&&(squirrel.style.top=0);
    //防止下溢出
    (hamster.offsetTop+hamster.offsetHeight>=document.documentElement.clientHeight)&&(hamster.style.top=document.documentElement.clientHeight-hamster.offsetHeight+"px");
    (squirrel.offsetTop+squirrel.offsetHeight>=document.documentElement.clientHeight)&&(squirrel.style.top=document.documentElement.clientHeight-squirrel.offsetHeight+"px");
    }

//封装产生天干的方法
function createHeaven(){
    var heavenly_stems = document.createElement("img");
    
    heavenly_stems.className = "heaven";
    let heaven = ["./img/third/Heavenly_stems/1.png","./img/third/Heavenly_stems/2.png",
    "./img/third/Heavenly_stems/3.png", "./img/third/Heavenly_stems/4.png",
    "./img/third/Heavenly_stems/5.png","./img/third/Heavenly_stems/6.png",
    "./img/third/Heavenly_stems/7.png","./img/third/Heavenly_stems/8.png",
    "./img/third/Heavenly_stems/9.png","./img/third/Heavenly_stems/10.png"];
    let idx = Math.floor(Math.random() * heaven.length)
    heavenly_stems.src = heaven[idx];
    
    document.body.appendChild(heavenly_stems);
    
    //注意  下落物left值需要随机:left值最小是0,最大是屏幕-下落物(天干地支)那张图的大小
    heavenly_stems.style.left = Math.floor(Math.random() * (document.body.clientWidth -  heavenly_stems.offsetWidth)) + "px";
    
    //下落物掉落  计时器动画
    setInterval(function(){
        heavenly_stems.style.top = heavenly_stems.offsetTop + 2 + "px";
        //判断 ：若下落物落地，则说明玩家一和玩家二都没有吃到，删除该下落物
        if(heavenly_stems.offsetTop > document.body.clientHeight - heavenly_stems.offsetHeight){
            document.body.removeChild(heavenly_stems);
        }
        //一边下降 一遍判断碰撞检测
        if(crash(hamster, heavenly_stems)){
            count1++;//分数自增
             score1.innerHTML = count1;
            document.body.removeChild(heavenly_stems);//玩家一吃到天干：加分的同时删掉天干即可
        }
        if(crash(squirrel, heavenly_stems)){
            count2--;//分数自减
            wrong2--;
            if(wrong2==3)
            {Lives2.innerHTML ='<img src="./img/first/live/x1.png">'}
            else if(wrong2==2)
            { Lives2.innerHTML ='<img src="./img/first/live/x2.png">'}
            else if(wrong2==1)
            {Lives2.innerHTML ='<img src="./img/first/live/x3.png">'}
            else if(wrong2==0)
            {Lives2.innerHTML ='<img src="./img/first/live/x4.png">'}
            if(count2<0){
                count2=0;
            }
             score2.innerHTML = count2;
            document.body.removeChild(heavenly_stems);//玩家二吃到天干：减分的同时删掉天干即可
        }
    },10);	
}

//封装产生地支的方法
function createEarth(){
    var earthly_branches = document.createElement("img");
    earthly_branches.className = "earthly";
    let earth = ["./img/third/Earthly_branches/1.png","./img/third/Earthly_branches/2.png",
    "./img/third/Earthly_branches/3.png","./img/third/Earthly_branches/4.png",
    "./img/third/Earthly_branches/5.png","./img/third/Earthly_branches/6.png",
    "./img/third/Earthly_branches/7.png","./img/third/Earthly_branches/8.png",
    "./img/third/Earthly_branches/9.png","./img/third/Earthly_branches/10.png",
    "./img/third/Earthly_branches/11.png","./img/third/Earthly_branches/12.png",];
    let idx = Math.floor(Math.random() *earth.length)
    earthly_branches.src = earth[idx];
    document.body.appendChild(earthly_branches);
    earthly_branches.style.left = Math.floor(Math.random() * (document.body.clientWidth - earthly_branches.offsetWidth)) + "px";
     setInterval(function(){
         earthly_branches.style.top = earthly_branches.offsetTop + 2 + "px";
         //判断 ：若下落物落地，则说明玩家一和玩家二都没有吃到，删除该下落物
         if(earthly_branches.offsetTop > document.body.clientHeight - earthly_branches.offsetHeight){
             document.body.removeChild(earthly_branches);
         }
         //一边下降 一遍判断碰撞检测         
         if(crash(hamster, earthly_branches)){
            count1--;//分数自减
            wrong1--;
        if(wrong1==3)
            {Lives1.innerHTML ='<img src="./img/first/live/x1.png">'}
        else if(wrong1==2)
            { Lives1.innerHTML ='<img src="./img/first/live/x2.png">'}
        else if(wrong1==1)
            {Lives1.innerHTML ='<img src="./img/first/live/x3.png">'}
        else if(wrong1==0)
            {Lives1.innerHTML ='<img src="./img/first/live/x4.png">'}
        if(count1<0){
            count1=0;
        }
        score1.innerHTML = count1;
        document.body.removeChild(earthly_branches);//玩家一吃到地支：减分的同时删掉即可
        }
       
        if(crash(squirrel, earthly_branches)){
            count2++;//分数自增
            score2.innerHTML = count2;
            document.body.removeChild(earthly_branches);//玩家二吃到地支：减分的同时删掉即可
        }
     },10);	
}	
//封装产生小红心的方法
function createChance(){
    var chances = document.createElement("img");
    chances.className = "chances";
    let ccc  = ["./img/first/live/lives.png"];
    let idx = Math.floor(Math.random() *ccc.length)
    chances.src = ccc[idx];
    document.body.appendChild(chances);
    chances.style.left = Math.floor(Math.random() * (document.body.clientWidth - chances.offsetWidth)) + "px";
     setInterval(function(){
        chances.style.top = chances.offsetTop + 2 + "px";
         //判断  拼音落地 就说明玩家一和玩家二都没有吃到♥  就删除
        if(chances.offsetTop > document.body.clientHeight - chances.offsetHeight){
            document.body.removeChild(chances);
        }
         //一边下降 一遍判断碰撞检测
        if(crash(hamster, chances)){
            wrong1++;
            if(wrong1==3)
                {Lives1.innerHTML ='<img src="./img/first/live/x1.png">'}
            else if(wrong1==2)
                {Lives1.innerHTML ='<img src="./img/first/live/x2.png">'}
            else if(wrong1==1)
                {Lives1.innerHTML ='<img src="./img/first/live/x3.png">'}
            else if(wrong1==0)
                {Lives1.innerHTML ='<img src="./img/first/live/x4.png">'}
            if(count1<0){
                count1=0;
        }
        score1.innerHTML = count1;
        document.body.removeChild(chances);
        }
        if(crash(squirrel, chances)){
            wrong2++;
            if(wrong2==3)
                {Lives2.innerHTML ='<img src="./img/first/live/x1.png">'}
            else if(wrong2==2)
                {Lives2.innerHTML ='<img src="./img/first/live/x2.png">'}
            else if(wrong2==1)
                {Lives2.innerHTML ='<img src="./img/first/live/x3.png">'}
            else if(wrong2==0)
                {Lives2.innerHTML ='<img src="./img/first/live/x4.png">'}
            if(count2<0){
                count2=0;
            }
            score2.innerHTML = count2;
            document.body.removeChild(chances);
        }
     },10);	
}	

//封装碰撞检测的方法
function crash(obj1, obj2){
    var xLeft = obj1.offsetLeft - obj2.offsetWidth;
    var xRight = obj1.offsetLeft + obj1.offsetWidth;
    var yTop = obj1.offsetTop - obj2.offsetHeight;
    
    if(obj2.offsetLeft >= xLeft && obj2.offsetLeft <= xRight && obj2.offsetTop >= yTop){
        return true;
    }else{
        return false;
    }	
}	


var progress = document.querySelector(".progress")
//清除所有定时器
function clearTimer() {
var timer = setInterval(function() {}, 1);
for(var i = 0; i < timer; i++) {
    clearInterval(i);
}
}

//时间条
var progress_time = progress.offsetWidth;
var scoring1=document.querySelector(".scoring1")
var scoring2=document.querySelector(".scoring2")
function progressTimer() {
setInterval(function() {
    progress_time=progress_time-0.3;
    progress.style.width = progress_time + 'px';
    console.log(progress.style.width);
    if(progress_time <= 0) {
        sound();
        clearTimer();
        gameReStart.style.display = 'block';
        gameReStart.style.display = 'block';
        scoring1.innerHTML='玩家一分数:'+count1+'分';
        scoring2.innerHTML='玩家二分数:'+count2+'分';

    }
}, 1)
}
var winner1=0;
function wrong(){
setInterval(function(){
    if(wrong1==0){
        winner1+=2;
        sound();
        clearTimer();
        gameReStart.style.display = 'block';
        scoring1.innerHTML='玩家'+winner1+'获胜';
    }
    if(wrong2==0){
        winner1++;
        sound();
        clearTimer();
        gameReStart.style.display = 'block';
        scoring1.innerHTML='玩家'+winner1+'获胜';
    }
    if(wrong1==0&&wrong2==0){
        if(count1>count2){
            sound();
        clearTimer();
        gameReStart.style.display = 'block';
        scoring1.innerHTML='玩家1获胜';
        }
        if(count1<count2){
            sound();
            clearTimer();
            gameReStart.style.display = 'block';
            scoring1.innerHTML='玩家2获胜';
        }
        if(count1==count2){
            sound();
            clearTimer();
            gameReStart.style.display = 'block';
            scoring1.innerHTML='平局';
        }
    }
},1)
}

var over_sound=new Audio("game_over.mp3");
function sound(){
over_sound.play();
}
//界面
var start_btn = document.querySelector("#start");
var gameStart = document.querySelector("#start");
var Restart_btn = document.querySelector(".restart_btn");
var gameReStart = document.querySelector(".restart");
start_btn.onclick = start;
Restart_btn.onclick = restart;
//开始游戏
function start() {
gameStart.style.display = 'none'
setInterval(createHeaven, 2000);
setInterval(createEarth, 2000);
setInterval(createChance,8000);
wrong();
progressTimer();
}
//重新开始
function restart() {
history.go('0');
gameReStart.style.display = 'none';
setInterval(createHeaven, 800);
 setInterval(createEarth, 800);
 setInterval(createChance,8000);
progress_time=180;
wrong();
progressTimer();
count1=0;
count2=0;
}

