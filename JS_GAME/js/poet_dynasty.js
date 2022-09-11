// 关卡四：朝代辨别

// 定义变量 记录初始分数
var count1 = 0;
var count2 = 0;
var people1 = document.getElementById("people1");
var people2 = document.getElementById("people2");

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
// 人物移动
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

var index1=1;
var index2=2;
function fn1(value1){
    people1.src ="./img/fourth/people1/"+value1+index1+".png";
}
function fn2(value2){
    people2.src ="./img/fourth/people2/"+value2+index2+".png";
}
//定时器控制人物移动
timer = setInterval(function () {
    // 玩家一(左侧诗人):按动ASDW移动
    if (isLeft) { 
        fn1("l");
        people1.style.left = people1.offsetLeft-7+"px";
    }
    if (isTop) { 
        people1.style.top = people1.offsetTop-7+"px";
        fn1("f");
    }
    if (isRight) { 
        people1.style.left = people1.offsetLeft+7+"px";
        fn1("r");
    }
    if(isBottom) { 
        people1.style.top = people1.offsetTop+7+"px";
        fn1("f");
    }
    // 玩家二(右侧诗人):按动↑↓←→箭头移动
    if (isLeft2) { 
        people2.style.left = people2.offsetLeft-7+"px";
        fn2("l") ;
    }
    if (isTop2) { 
        people2.style.top = people2.offsetTop-7+"px";
        fn2("f");
    }
    if (isRight2) { 
        people2.style.left = people2.offsetLeft+7+"px";
        fn2("r");
    }
    if(isBottom2) { 
        people2.style.top = people2.offsetTop+7+"px";
        fn2("f");
    }
     limit();
}, 1)
// 键盘控制防止屏幕溢出
function limit(){
    //防止左溢出 
    (people1.offsetLeft<=0)&&(people1.style.left=0);
    (people2.offsetLeft<=0)&&(people2.style.left=0);
    //防止右溢出
    (people1.offsetLeft+people1.offsetWidth>=document.documentElement.clientWidth)&&(people1.style.left=document.documentElement.clientWidth-people1.offsetWidth+"px");
    (people2.offsetLeft+people2.offsetWidth>=document.documentElement.clientWidth)&&(people2.style.left=document.documentElement.clientWidth-people2.offsetWidth+"px");
    //防止上溢出
    (people1.offsetTop<=0)&&(people1.style.top=0);
    (people2.offsetTop<=0)&&(people2.style.top=0);
    //防止下溢出
    (people1.offsetTop+people1.offsetHeight>=document.documentElement.clientHeight)&&(people1.style.top=document.documentElement.clientHeight-people1.offsetHeight+"px");
    (people2.offsetTop+people2.offsetHeight>=document.documentElement.clientHeight)&&(people2.style.top=document.documentElement.clientHeight-people2.offsetHeight+"px");
    }

//封装产生唐朝诗人的方法
function createTang(){
    var Tang_Dynasty = document.createElement("img");
    
    Tang_Dynasty.className = "tang";
    let tang = ["./img/fourth/Tang_Dynasty/1.png","./img/fourth/Tang_Dynasty/2.png",
    "./img/fourth/Tang_Dynasty/3.png", "./img/fourth/Tang_Dynasty/4.png",
    "./img/fourth/Tang_Dynasty/5.png","./img/fourth/Tang_Dynasty/6.png",
    "./img/fourth/Tang_Dynasty/7.png","./img/fourth/Tang_Dynasty/8.png",
    "./img/fourth/Tang_Dynasty/9.png","./img/fourth/Tang_Dynasty/10.png"];
    let idx = Math.floor(Math.random() * tang.length)
    Tang_Dynasty.src = tang[idx];
    
    document.body.appendChild(Tang_Dynasty);
    
    //注意  下落物left值需要随机:left值最小是0,最大是屏幕-下落物(诗人)那张图的大小
    Tang_Dynasty.style.left = Math.floor(Math.random() * (document.body.clientWidth -  Tang_Dynasty.offsetWidth)) + "px";
    
    //下落物掉落  计时器动画
    setInterval(function(){
        Tang_Dynasty.style.top = Tang_Dynasty.offsetTop + 2 + "px";
        //判断 ：若下落物落地，则说明玩家一和玩家二都没有接到，删除该下落物
        if(Tang_Dynasty.offsetTop > document.body.clientHeight - Tang_Dynasty.offsetHeight){
            document.body.removeChild(Tang_Dynasty);
        }
        //一边下降 一遍判断碰撞检测
        if(crash(people1, Tang_Dynasty)){
            count1++;//分数自增
            score1.innerHTML = count1;
            document.body.removeChild(Tang_Dynasty);//玩家一接到唐朝诗人：加分的同时删掉唐朝诗人即可
        }
        if(crash(people2, Tang_Dynasty)){
            count2--;//分数自减
            wrong2--;
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
            document.body.removeChild(Tang_Dynasty);//玩家二接到唐朝诗人：减分的同时删掉唐朝诗人即可
        }
    },10);	
}

//封装产生宋朝诗人的方法
function createSong(){
    var Song_Dynasty = document.createElement("img");
    Song_Dynasty.className = "song";
    let song = ["./img/fourth/Song_Dynasty/1.png","./img/fourth/Song_Dynasty/2.png",
    "./img/fourth/Song_Dynasty/3.png","./img/fourth/Song_Dynasty/4.png",
    "./img/fourth/Song_Dynasty/5.png","./img/fourth/Song_Dynasty/6.png",
    "./img/fourth/Song_Dynasty/7.png","./img/fourth/Song_Dynasty/8.png",
    "./img/fourth/Song_Dynasty/9.png","./img/fourth/Song_Dynasty/10.png",
    "./img/fourth/Song_Dynasty/11.png"];
    let idx = Math.floor(Math.random() *song.length)
    Song_Dynasty.src = song[idx];
    document.body.appendChild(Song_Dynasty);
    Song_Dynasty.style.left = Math.floor(Math.random() * (document.body.clientWidth - Song_Dynasty.offsetWidth)) + "px";
     setInterval(function(){
         Song_Dynasty.style.top = Song_Dynasty.offsetTop + 2 + "px";
         //判断 ：若下落物落地，则说明玩家一和玩家二都没有接到，删除该下落物
         if(Song_Dynasty.offsetTop > document.body.clientHeight - Song_Dynasty.offsetHeight){
             document.body.removeChild(Song_Dynasty);
         }
         //一边下降 一遍判断碰撞检测         
         if(crash(people1, Song_Dynasty)){
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
        document.body.removeChild(Song_Dynasty);//玩家一接到宋朝诗人：减分的同时删掉即可
        }
       
        if(crash(people2, Song_Dynasty)){
            count2++;//分数自增
            score2.innerHTML = count2;
            document.body.removeChild(Song_Dynasty);//玩家二接到宋朝诗人：减分的同时删掉即可
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
         //判断  拼音落地 就说明玩家一和玩家二都没有接到♥  就删除
        if(chances.offsetTop > document.body.clientHeight - chances.offsetHeight){
            document.body.removeChild(chances);
        }
         //一边下降 一遍判断碰撞检测
        if(crash(people1, chances)){
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
        if(crash(people2, chances)){
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
setInterval(createTang, 2000);
setInterval(createSong, 2000);
setInterval(createChance,8000);
wrong();
progressTimer();
}
//重新开始
function restart() {
history.go('0');
gameReStart.style.display = 'none';
setInterval(createTang, 800);
 setInterval(createSong, 800);
 setInterval(createChance,8000);
progress_time=180;
wrong();
progressTimer();
count1=0;
count2=0;
}

