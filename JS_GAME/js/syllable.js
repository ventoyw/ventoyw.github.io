// 关卡一：声母韵母

// 定义变量 记录初始分数
var count1 = 0;
var count2 = 0;
var bird1 = document.getElementById("bird1");
var bird2 = document.getElementById("bird2");

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
//错误次数
var wrong1 = 3;
var wrong2 = 3;


// ----------------------------------------------
// 小鸟移动
//键盘事件 只控制状态值
window.onkeydown = function (e) {
    // 玩家一 ASDW控制方向
    if (e.keyCode === 65) {
        isLeft = true;
    } else if (e.keyCode === 87) {
        isTop = true;
    } else if (e.keyCode === 68) {
        isRight = true;
    } else if (e.keyCode === 83) {
        isBottom = true;


        // 玩家二 上下左右箭头控制方向
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


window.onkeyup = function (e) {
    // 玩家一 左侧小鸟 ASDW控制方向
    if (e.keyCode === 65) {
        isLeft = false;
        
    } else if (e.keyCode === 87) {
        isTop = false;
    } else if (e.keyCode === 68) {
        isRight = false;
    } else if (e.keyCode === 83) {
        isBottom = false;


        // 玩家二 右侧 上下左右箭头控制方向
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


var index = 0;
function fn(value){
index++;
if(index>2){
    index=0;
}
bird1.src ="./"+"img/"+"first/"+"green_birds/"+value+"-"+index+".png";
}
var index2 = 0;
function fn2(value){
index2++;
if(index2>2){
    index2=0;
}
bird2.src ="./"+"/img/"+"first/"+"red_birds/"+value+"-"+index2+".png";
}

//定时器控制div移动
timer = setInterval(function () {
    
    // 玩家一 左侧小鸟 按动ASDW移动
    var l = bird1.offsetLeft;
    var t = bird1.offsetTop;
    if (isLeft) { l -= 5; fn("left")}
    if (isTop) { t -= 5; }
    if (isRight) { l += 5; fn("right")}
    if(isBottom) { t += 5;}
    bird1.style.left = l + `px`;
    bird1.style.top = t + `px`;

    // 玩家二 右侧小鸟 按动上下箭头移动
    var l2 = bird2.offsetLeft;
    var t2 = bird2.offsetTop;
    if (isLeft2) { l2 -= 5; fn2("left")}
    if (isTop2) { t2 -= 5; }
    if (isRight2) { l2 += 5; fn2("right")}
    if(isBottom2) { t2 += 5;}
    bird2.style.left = l2 + `px`;
    bird2.style.top = t2 + `px`;
   
    limit();
}, 1)

// 键盘控制防止屏幕溢出
    function limit(){
    //防止左溢出 
    (bird1.offsetLeft<=0)&&(bird1.style.left=0);
    (bird2.offsetLeft<=0)&&(bird2.style.left=0);
    //防止右溢出
    (bird1.offsetLeft+bird1.offsetWidth>=document.documentElement.clientWidth)&&(bird1.style.left=document.documentElement.clientWidth-bird1.offsetWidth+"px");
    (bird2.offsetLeft+bird2.offsetWidth>=document.documentElement.clientWidth)&&(bird2.style.left=document.documentElement.clientWidth-bird2.offsetWidth+"px");
    //防止上溢出
    (bird1.offsetTop<=0)&&(bird1.style.top=0);
    (bird2.offsetTop<=0)&&(bird2.style.top=0);
    //防止下溢出
    (bird1.offsetTop+bird1.offsetHeight>=document.documentElement.clientHeight)&&(bird1.style.top=document.documentElement.clientHeight-bird1.offsetHeight+"px");
    (bird2.offsetTop+bird2.offsetHeight>=document.documentElement.clientHeight)&&(bird2.style.top=document.documentElement.clientHeight-bird2.offsetHeight+"px");
    }

//封装产生声母的方法
function createInitial(){
    var initial_consonant = document.createElement("img");
    
    initial_consonant.className = "initial";
    let initial = ["./img/first/initial/0.png","./img/first/initial/1.png",
    "./img/first/initial/2.png","./img/first/initial/3.png", 
    "./img/first/initial/4.png","./img/first/initial/5.png",
    "./img/first/initial/6.png","./img/first/initial/7.png",
    "./img/first/initial/8.png","./img/first/initial/9.png",
    "./img/first/initial/10.png","./img/first/initial/11.png",
    "./img/first/initial/12.png","./img/first/initial/13.png",
    "./img/first/initial/14.png","./img/first/initial/15.png",
    "./img/first/initial/16.png","./img/first/initial/17.png",
    "./img/first/initial/18.png","./img/first/initial/19.png",
    "./img/first/initial/20.png","./img/first/initial/21.png","./img/first/initial/22.png"
    ];
    let idx = Math.floor(Math.random() * initial.length)
    initial_consonant.src = initial[idx];
    
    document.body.appendChild(initial_consonant);
    
    //注意 汉字的top值都是-70  但是left值需要随机   left值最小是0;最大是屏幕声母韵母那张图的大小
    initial_consonant.style.left = Math.floor(Math.random() * (document.body.clientWidth -  initial_consonant.offsetWidth)) + "px";
    
    //汉字掉落  计时器动画
    setInterval(function(){
        initial_consonant.style.top = initial_consonant.offsetTop + 2 + "px";
        //判断  汉字落地 就说明玩家一和玩家二都没有吃到声母  就删除
        if(initial_consonant.offsetTop > document.body.clientHeight - initial_consonant.offsetHeight){
            document.body.removeChild(initial_consonant);
        }
        //一边下降 一遍判断碰撞检测
        if(crash(bird1, initial_consonant)){
            count1++;//分数自增
             score1.innerHTML = count1;
            document.body.removeChild(initial_consonant);//玩家一吃到声母 加分  直接删掉汉字即可!
        }
        if(crash(bird2, initial_consonant)){
            count2--;//分数自增
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
            document.body.removeChild(initial_consonant);//玩家二吃到声母 减分  直接删掉汉字即可!
        }
    },10);	
}

//封装产生韵母的方法
function createFinals(){
    var finals = document.createElement("img");
    finals.className = "finals";
    let o = ["./img/first/Finals/0.png", "./img/first/Finals/1.png",
    "./img/first/Finals/2.png","./img/first/Finals/3.png",
    "./img/first/Finals/4.png","./img/first/Finals/5.png",
    "./img/first/Finals/6.png","./img/first/Finals/7.png","./img/first/Finals/8.png",
    "./img/first/Finals/9.png","./img/first/Finals/10.png",
    "./img/first/Finals/11.png","./img/first/Finals/12.png",
    "./img/first/Finals/13.png","./img/first/Finals/14.png",
    "./img/first/Finals/15.png","./img/first/Finals/16.png",
    "./img/first/Finals/17.png","./img/first/Finals/18.png",
    "./img/first/Finals/19.png","./img/first/Finals/20.png",
    "./img/first/Finals/21.png","./img/first/Finals/22.png"];
    let idx = Math.floor(Math.random() *o.length)
    finals.src = o[idx];
    document.body.appendChild(finals);
    finals.style.left = Math.floor(Math.random() * (document.body.clientWidth - finals.offsetWidth)) + "px";
     setInterval(function(){
         finals.style.top = finals.offsetTop + 2 + "px";
         //判断  拼音落地 就说明玩家一和玩家二都没有吃到韵母  就删除
         if(finals.offsetTop > document.body.clientHeight - finals.offsetHeight){
             document.body.removeChild(finals);
         }
         //一边下降 一遍判断碰撞检测         
         if(crash(bird1, finals)){
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
            document.body.removeChild(finals);//玩家一吃到韵母 减分  直接删掉汉字即可!
         }
       
         if(crash(bird2, finals)){
            // $('#mp3audio').attr('src', 'bgsound.mp3');
             count2++;//分数自增
             score2.innerHTML = count2;
            document.body.removeChild(finals);//玩家二吃到韵母 加分  直接删掉汉字即可!!
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
         if(crash(bird1, chances)){
          wrong1++;
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

            document.body.removeChild(chances);//玩家一吃到韵母 减分  直接删掉汉字即可!
         }
         if(crash(bird2, chances)){
    wrong2++;
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
            document.body.removeChild(chances);//玩家二吃到韵母 加分  直接删掉汉字即可!!
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

var over_sound=new Audio("game_over.wav");
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
setInterval(createInitial, 2000);
setInterval(createFinals, 2000);
setInterval(createChance,8000);
wrong();
progressTimer();
}
//重新开始
function restart() {
history.go('0');
gameReStart.style.display = 'none';
setInterval(createInitial, 800);
 setInterval(createFinals, 800);
 setInterval(createChance,8000);
progress_time=180;
wrong();
progressTimer();
count1=0;
count2=0;
}

