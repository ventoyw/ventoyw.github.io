// 关卡二：平仄区分

// 定义变量 记录初始分数
var count1 = 0;
var count2 = 0;
var fish1 = document.getElementById("fish1");
var fish2 = document.getElementById("fish2");

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
// 小鱼移动
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
    // 玩家一 左侧小鱼 ASDW控制方向
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
fish1.src ="./img/second/fish1/"+value+"-"+index+".png";
}
var index2 = 0;
function fn2(value){
fish2.src ="./img/second/fish2/"+value+"-"+index2+".png";
}

//定时器控制div移动
timer = setInterval(function () {
    
    // 玩家一 左侧小鱼 按动ASDW移动
    var l = fish1.offsetLeft;
    var t = fish1.offsetTop;
    if (isLeft) { l -= 5; fn("right")}
    if (isTop) { t -= 5; }
    if (isRight) { l += 5; fn("left")}
    if(isBottom) { t += 5;}
    fish1.style.left = l + `px`;
    fish1.style.top = t + `px`;

    // 玩家二 右侧小鱼 按动上下箭头移动
    var l2 = fish2.offsetLeft;
    var t2 = fish2.offsetTop;
    if (isLeft2) { l2 -= 5; fn2("right")}
    if (isTop2) { t2 -= 5; }
    if (isRight2) { l2 += 5; fn2("left")}
    if(isBottom2) { t2 += 5;}
    fish2.style.left = l2 + `px`;
    fish2.style.top = t2 + `px`;
   
    limit();
}, 1)

// 键盘控制防止屏幕溢出
    function limit(){
    //防止左溢出 
    (fish1.offsetLeft<=0)&&(fish1.style.left=0);
    (fish2.offsetLeft<=0)&&(fish2.style.left=0);
    //防止右溢出
    (fish1.offsetLeft+fish1.offsetWidth>=document.documentElement.clientWidth)&&(fish1.style.left=document.documentElement.clientWidth-fish1.offsetWidth+"px");
    (fish2.offsetLeft+fish2.offsetWidth>=document.documentElement.clientWidth)&&(fish2.style.left=document.documentElement.clientWidth-fish2.offsetWidth+"px");
    //防止上溢出
    (fish1.offsetTop<=0)&&(fish1.style.top=0);
    (fish2.offsetTop<=0)&&(fish2.style.top=0);
    //防止下溢出
    (fish1.offsetTop+fish1.offsetHeight>=document.documentElement.clientHeight)&&(fish1.style.top=document.documentElement.clientHeight-fish1.offsetHeight+"px");
    (fish2.offsetTop+fish2.offsetHeight>=document.documentElement.clientHeight)&&(fish2.style.top=document.documentElement.clientHeight-fish2.offsetHeight+"px");
    }

//封装产生平声的方法
function createFlat(){
    var flat_tone = document.createElement("img");
    
    flat_tone.className = "flat";
    let flat = ["./img/second/flat/0.png","./img/second/flat/1.png",
    "./img/second/flat/2.png","./img/second/flat/3.png", 
    "./img/second/flat/4.png","./img/second/flat/5.png",
    "./img/second/flat/6.png","./img/second/flat/7.png",
    "./img/second/flat/8.png","./img/second/flat/9.png",
    "./img/second/flat/10.png","./img/second/flat/11.png"
    ];
    let idx = Math.floor(Math.random() * flat.length)
    flat_tone.src = flat[idx];
    
    document.body.appendChild(flat_tone);
    
    //注意 汉字的top值都是-70  但是left值需要随机   left值最小是0;最大是屏幕平仄那张图的大小
    flat_tone.style.left = Math.floor(Math.random() * (document.body.clientWidth -  flat_tone.offsetWidth)) + "px";
    
    //汉字掉落  计时器动画
    setInterval(function(){
        flat_tone.style.top = flat_tone.offsetTop + 2 + "px";
        //判断  汉字落地 就说明玩家一和玩家二都没有吃到平声汉字  就删除
        if(flat_tone.offsetTop > document.body.clientHeight - flat_tone.offsetHeight){
            document.body.removeChild(flat_tone);
        }
        //一边下降 一遍判断碰撞检测
        if(crash(fish1, flat_tone)){
            count1++;//分数自增
             score1.innerHTML = count1;
            document.body.removeChild(flat_tone);//玩家一吃到平声汉字 加分  直接删掉汉字即可!
        }
        if(crash(fish2, flat_tone)){
            count2--;//分数自增
            wrong2--;
            if(wrong2==3)
        {Lives2.innerHTML ='<img src="./img/second/live/x1.png">'}
       else if(wrong2==2)
       { Lives2.innerHTML ='<img src="./img/second/live/x2.png">'}
      else if(wrong2==1)
        {Lives2.innerHTML ='<img src="./img/second/live/x3.png">'}
       else if(wrong2==0)
        {Lives2.innerHTML ='<img src="./img/second/live/x4.png">'}
            if(count2<0){
                count2=0;
            }
             score2.innerHTML = count2;
            document.body.removeChild(flat_tone);//玩家二吃到平声汉字 减分  直接删掉汉字即可!
        }

    },10);	
}

//封装产生仄声的方法
function createOblique(){
    var oblique = document.createElement("img");
    oblique.className = "oblique";
    let o = ["./img/second/oblique/0.png", "./img/second/oblique/1.png",
    "./img/second/oblique/2.png","./img/second/oblique/3.png",
    "./img/second/oblique/4.png","./img/second/oblique/5.png",
    "./img/second/oblique/6.png","./img/second/oblique/7.png",
    "./img/second/oblique/8.png","./img/second/oblique/9.png",
    "./img/second/oblique/10.png","./img/second/oblique/11.png"];
    let idx = Math.floor(Math.random() *o.length)
    oblique.src = o[idx];
    document.body.appendChild(oblique);
    oblique.style.left = Math.floor(Math.random() * (document.body.clientWidth - oblique.offsetWidth)) + "px";
     setInterval(function(){
         oblique.style.top = oblique.offsetTop + 2 + "px";
         //判断  汉字落地 就说明玩家一和玩家二都没有吃到仄声汉字  就删除
         if(oblique.offsetTop > document.body.clientHeight - oblique.offsetHeight){
             document.body.removeChild(oblique);
         }
         //一边下降 一遍判断碰撞检测
         if(crash(fish1, oblique)){
             count1--;//分数自减
             wrong1--;
            if(wrong1==3)
                {Lives1.innerHTML ='<img src="./img/second/live/x1.png">'}
            else if(wrong1==2)
            { Lives1.innerHTML ='<img src="./img/second/live/x2.png">'}
            else if(wrong1==1)
                {Lives1.innerHTML ='<img src="./img/second/live/x3.png">'}
            else if(wrong1==0)
            {Lives1.innerHTML ='<img src="./img/second/live/x4.png">'}
                    if(count1<0){
                        count1=0;
            }
             score1.innerHTML = count1;
            document.body.removeChild(oblique);//玩家一吃到仄声汉字 减分  直接删掉汉字即可!
         }
         if(crash(fish2, oblique)){
            // $('#mp3audio').attr('src', 'bgsound.mp3');
             count2++;//分数自增
             score2.innerHTML = count2;
            document.body.removeChild(oblique);//玩家一吃到仄声汉字 加分  直接删掉汉字即可!!
         }
     },10);	
}	

//封装产生小红心的方法
function createChance(){
    var chances = document.createElement("img");
    chances.className = "chances";
    let ccc  = ["./img/second/live/lives.png"];
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
         if(crash(fish1, chances)){
          wrong1++;
          if(wrong1==3)
        {Lives1.innerHTML ='<img src="./img/second/live/x1.png">'}
       else if(wrong1==2)
       { Lives1.innerHTML ='<img src="./img/second/live/x2.png">'}
      else if(wrong1==1)
        {Lives1.innerHTML ='<img src="./img/second/live/x3.png">'}
       else if(wrong1==0)
        {Lives1.innerHTML ='<img src="./img/second/live/x4.png">'}
             if(count1<0){
                 count1=0;
             }
             score1.innerHTML = count1;

            document.body.removeChild(chances);//玩家一吃到韵母 减分  直接删掉汉字即可!
         }
         if(crash(fish2, chances)){
    wrong2++;
    if(wrong2==3)
        {Lives2.innerHTML ='<img src="./img/second/live/x1.png">'}
       else if(wrong2==2)
       { Lives2.innerHTML ='<img src="./img/second/live/x2.png">'}
      else if(wrong2==1)
        {Lives2.innerHTML ='<img src="./img/second/live/x3.png">'}
       else if(wrong2==0)
        {Lives2.innerHTML ='<img src="./img/second/live/x4.png">'}
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
       scoring1.innerHTML='玩家一分数:'+count1+'分'
       scoring2.innerHTML='玩家二分数：'+count2+'分'
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
setInterval(createFlat, 2000);
setInterval(createOblique, 2000);
setInterval(createChance,8000);
wrong();
progressTimer();
}
//重新开始
function restart() {
history.go('0');
gameReStart.style.display = 'none';
setInterval(createFlat, 800);
 setInterval(createOblique, 800);
 setInterval(createChance,8000);
 wrong();
progress_time=180;
progressTimer();
count1=0;
count2=0;
}
