var StartBtn = document.querySelector(".StartBtn");//开始游戏
var OutBtn = document.querySelector(".OutBtn");//退出游戏

var initbox =document.querySelector(".initbox");//初始化盒子
var gamebox =document.querySelector(".gamebox");//游戏盒子
var ptlist = document.querySelector(".ptlist");//装小方块的ul
// console.log("ptlist------",ptlist);
var gameTime=document.querySelector(".TargetTime");
var TargetImg=document.querySelector(".TargetImg");//目标预览图
var passBox=document.querySelector(".passBox");
var passTime=document.querySelector(".passTime")
var stopBtn=document.querySelector(".stopBtn")//暂停游戏按钮
var renewBtn=document.querySelector(".renewBtn");//重新开始按钮
var nextBtn=document.querySelector(".nextBtn");//下一关按钮
var gardeBox=document.querySelector(".gardeBox");
var changeGradeBtn=document.querySelector(".changeGradeBtn")//更改难度按钮
var gradeList=document.querySelectorAll(".gradeList li");//游戏等级列表
var  imgUrl="./img/1.jpg";//图片路径
var changeImgBtn=document.querySelector(".changeImgBtn");//更改图片按钮
var imgBox=document.querySelector(".imgBox")//图片盒子
var imgList=document.querySelectorAll(".imgList li img");//图片列表
var passText=document.querySelector(".passText")//通关文本



//开始按钮鼠标点击事件
StartBtn.onclick=function(){

    initbox.style.display="none";
    gamebox.style.display="block";
   //函数调用
    init();

}

//退出按钮鼠标点击事件
OutBtn.onclick=function(){
    initbox.style.display="block";
    gamebox.style.display="none";
    passBox.style.display="none";
    }

//下一关按钮鼠标点击事件
nextBtn.onclick=function(){
  passBox.style.display="none";
  range++;
  init();
}
//暂停按钮监听
stopBtn.onclick=function(){
    stopNum++;
    if(stopNum % 2 ==0){
     //启动游戏
     goTime();
     this.textContent="暂停";
     isMove=true;
    }else{
        //暂停游戏，停止时间
        clearInterval(timer);
        this.textContent="启动";
        isMove=false;
    }
 
 }

//更改难度按钮监听
 changeGradeBtn.onclick=function(){
  gardeBox.style.display="block";
 }

 //重新开始按钮
 renewBtn.onclick=function(){
  passBox.style.display="none";
 }
 var range=3;//行列数
 //游戏等级列表的点击事件
for(var i=0; i < gradeList.length; i++){
    gradeList[i].index=i; 
   
     gradeList[i].onclick=function(){ 
     range=3 + this.index;
     gardeBox.style.display="none";
   }
   
   }
//变量声明


//更改图片按钮监听
changeImgBtn.onclick=function(){
    imgBox.style.display="block";
}
//图片点击事件
for(var i=0; i<imgList.length;i++){
  imgList[i].onclick=function(){
//    src：img元素特有的属性
// console.log(this.src);
imgUrl=this.src;
imgBox.style.display="none";
  }

}


var arrDef=[];//存放宫格的坐标
var arrbg=[];    //存放打乱的宫格坐标                                                            
var w=0;//li的宽高
var list=null;//所有li
var sTime=0;//记秒
var mTime=0;//记分
var isMove=true;//小方块是否可移动
var timer=null;//游戏时间定时器
var stopNum=0;//暂停按钮点击次数


//初始化函数，产生小方块
function init(){    

    //清除定时器，恢复时间
    clearInterval(timer);
    sTime=0;
    mTime=0;
    gameTime.textContent="00 : 00";
    stopBtn.textContent="暂停";
    isMove=true;
    stopNum=0;
    //在产生li小方块之前确保ul里面没有任何元素
    ptlist.innerHTML="";
    //li小方块的宽高
     w=parseInt(ptlist.offsetWidth/range);
    //  console.log("w------",w)
    for(var i=0;i<range*range;i++){
   //创建li元素
    var li=document.createElement("li");
    li.classList.add("lis");//添加类名
    li.style.width= w + "px";
    li.style.height= w+ "px";

    li.style.backgroundImage="url("+ imgUrl +")";
    li.style.backgroundSize = w * range + "px " + w * range +"px";
    //将li添加给ul
    ptlist.appendChild(li);
}

//设置目标图片的路径
TargetImg.style.backgroundImage="url("+ imgUrl +")";
//获取所有li
list=document.querySelectorAll(".lis");
// console.log("list-----",list)
//调用函数，生成坐标

initArr();

arrbg.sort(function(){return Math.random() - 0.5;})

drawLibg(arrbg);
// console.log("arrbg----",arrbg)

lisOnclick();

goTime();
}

// 生成坐标数组
function initArr(){
      for(var i=0;i<range*range;i++)
      {
          var x=parseInt(i/range);
          var y=i%range;
          arrDef[i]=x + "," + y;
          arrbg[i] = x + "," + y;
      }
 
    //   console.log("arrdbg----",arrbg)
      //删除最后一个元素
      arrbg.pop();
     
 }

//绘制li的背景
function drawLibg(arr){
   for(var i=0;i<arr.length;i++){
      var str = arr[i].split(",");
    //    console.log("str------",str);
       var x=str[0];
       var y=str[1];
       list[i].style.backgroundPosition = -y *w +"px " + -x*w +"px"; 
   }
 //绘制空白格
 if(arr.length !=list.length){
     //最后一个li元素
     list[list.length-1].style.backgroundPosition = "1000px 1000px"
     
}

}
//游戏进行
function  lisOnclick(){
    arrDef=[];
    arrbg= [];
   for(var i=0; i<list.length;i++){
    //自定义属性index(自定义的，不是元素自带的属性)
    list[i].index=i;
    // console.log("list[i]-----",list[i])
    list[i].onclick = function (){
        //非空白方块执行的任务
        if(!isWhite(this.index) && isMove){
        //    console.log("非空白点击")
        var indexArr=[this.index-range,this.index+range,this.index-1,this.index+1];
           
            for(var a=1;a<range;a++){
                // 判断是否为右边边界方块
                if(this.index==a*range-1){
                    // 如果是右边边界方块，则将他的右边方块下标修改为-1
                    indexArr[3]=-1;}
               }
            //    判断是否为左边边界方块
               if(this.index==a*range){
                    // 如果是左边边界方块，则将他的左边方块下标修改为-1   
                indexArr[2]=-1;
            }
        }else{   console.log("空白被点击，不影响游戏进行，请忽略控制台报错")}
           for(var i=0;i<indexArr.length;i++){
               if(indexArr[i]>=0&&indexArr[i] < list.length && isWhite(indexArr[i])){
                //    console.log("上下左右存在空白方块",indexArr[i])
                // 背景定位互换
                var currentbg=list[this.index].style.backgroundPosition;//当前点击的方块背景定位
                list[this.index].style.backgroundPosition="1000px 1000px";//当前点击的方块设置为空白方块
                list[indexArr[i]].style.backgroundPosition=currentbg;//空白方块的背景定位设置为当前方块的背景定位
                var currentindex=arrbg[this.index];//获取当前点击的坐标
                arrbg[this.index]=(range-1)+","+(range-1);//当前点击方块的左边设置为最后一个方块坐标
                arrbg[indexArr[i]]=currentindex;

                 //    console.log(arrbg);

                 //判断是否有恢复原图
                 if(isPass()){
                     console.log("恢复原图");
                     //清除定时器，停止时间的运行
                     clearInterval(timer);

                     //补全空白方块
                     drawLibg(arrDef);

                    //延迟显示通关盒子
                    setTimeout(function(){
                        //通关盒子显示
                        passBox.style.display = "block";
                        passTime.textContent = gameTime.textContent;


                      //通关文本
                        switch(range){
                            case 3:passText.innerHTML="通过等级：初级<br/>难度系数:1";
                            break;

                            case 4:passText.innerHTML="通过等级：中级<br/>难度系数:2";
                            break;

                            case 5:passText.innerHTML="通过等级：高级<br/>难度系数:3";
                            break;

                            case 6:passText.innerHTML="通过等级：究级<br/>难度系数:4";
                            break;

                            case 7:passText.innerHTML="通过等级：终级<br/>难度系数:5";
                            break;

                        }

                        
                    },300)
                 }
               }
           }    

     }

    }
   }

//判断是否为空白格子
function isWhite(id){
  // id：要判断的方块对应的下标
//    console.log("id-----------",id)

    if(list[id].style.backgroundPosition =="1000px 1000px"){
        //这是一个空白方块
        return true;
    }
    return false;
}
//判断是否恢复原图
function isPass(){
   for(var i=0;i<arrbg.length;i++)
   {
           if(arrbg[i]==arrDef[i])
                {continue;}
                return false;
     }
     return true;
   


}
//计时
function goTime(){

timer=setInterval(function(){
  sTime++;
  if(sTime==60){
      //60秒后分钟自加
      mTime++;
      sTime=0;
  }
  var  s=sTime < 10 ? "0"+ sTime :sTime;
  var  m=mTime < 10 ? "0"+ mTime :mTime;
  gameTime.textContent = m + " : "+s;
  

},1000)


}



