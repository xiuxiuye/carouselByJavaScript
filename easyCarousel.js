//图片走马灯
//先实现往左滚动的效果
const DIRECTION = "left";

let direction = DIRECTION; //默认从右往左切换图片
let imgWidth = document.getElementById('caroucel').offsetWidth;
let imgIndex = 0;
console.log("imgWidth="+imgWidth);
let autoPlayInterval;
let animate_interval;
let isDisabled = false; //防止用户过快的连续点击

//初始化函数
function initCaroucel(){
    //获取图片需要位移的px
    let ul = document.getElementById('ul');
    appendNode(ul);
    autoPlay(ul);

}
//自动播放函数
function autoPlay(ul){
    clearInterval(autoPlayInterval);
    autoPlayInterval = setInterval(()=>{
        animate(ul);
        if(direction == "right"){
            imgIndex -= 1;
        }else{
            imgIndex += 1;
        }
        setBg();
        console.log(imgIndex);
    },3000);
}
//移除节点
function removeNode(ul){
    ul.removeChild(ul.children[0]);
}
//添加节点
function appendNode(ul){
    let cloneNode = ul.children[0].cloneNode(true);
    ul.appendChild(cloneNode);
}

//设置索引原点背景颜色
function setBg() {
    let children = document.getElementById("indexBox").children
    for(let i=0; i<children.length; i++){
        children[i].style.backgroundColor = "#c5c8ce";
    }
    if(imgIndex==5){
        children[0].style.backgroundColor = "#2db7f5";
    }else{
        children[imgIndex].style.backgroundColor = "#2db7f5";
    }
    
}

function animate(ele){
    if(imgIndex==5 && direction=="left"){
        ele.style.left = 0 + "px";
        imgIndex = 0;
    }
    if(imgIndex==0 && direction=="right"){
        imgIndex = 5;
        ele.style.left = (-imgIndex * imgWidth) + "px";
    }
    clearInterval(animate_interval);
    let speed = direction==="right"?10:-10;
    let sumStep = 0;
    animate_interval = setInterval(()=>{
        if(Math.abs(sumStep) < imgWidth){
            ele.style.left = ele.offsetLeft + speed + "px";
            sumStep += speed;
        }else{
            sumStep = 0;
            clearInterval(animate_interval);
        }
    },1);
}

function preImage() {
    if(!isDisabled){
        isDisabled = true;
        direction = "right";
        let ul = document.getElementById('ul');
        animate(ul);
        imgIndex -= 1;
        setBg();
        direction = DIRECTION; //重置为从右向左的切换
        autoPlay(ul);
        let timeOut = setTimeout(()=>{
            isDisabled = false;
            clearTimeout(timeOut);
        },500);
    }
}
function nextImage() {
    if(!isDisabled){
        isDisabled = true;
        direction = "left";
        let ul = document.getElementById('ul');
        animate(ul);
        imgIndex += 1;
        setBg();
        direction = DIRECTION; //重置为从右向左的切换
        autoPlay(ul);
        let timeOut = setTimeout(()=>{
            isDisabled = false;
            clearTimeout(timeOut);
        },500);
    }
}


//为标签绑定监听事件
document.getElementById('caroucel').addEventListener('mouseover', function(){
    let len = document.getElementById('caroucel').children.length;
    document.getElementById('caroucel').children[0].style.display = "block";
    document.getElementById('caroucel').children[len-1].style.display = "block";
    clearInterval(autoPlayInterval);
});
document.getElementById('caroucel').addEventListener('mouseout', function(){
    let len = document.getElementById('caroucel').children.length;
    document.getElementById('caroucel').children[0].style.display = "none";
    document.getElementById('caroucel').children[len-1].style.display = "none";
    let ul = document.getElementById('ul');
    autoPlay(ul);
});
document.getElementById('caroucel').children[0].addEventListener('click', function(){
    preImage();
});
document.getElementById('caroucel').children[document.getElementById('caroucel').children.length-1].addEventListener('click', function(){
    nextImage();
});

initCaroucel();
