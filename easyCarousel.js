//图片走马灯
//先实现往左滚动的效果
let direction = "";
let imgWidth = document.getElementById('caroucel').offsetWidth;
let imgIndex = 0;
console.log("imgWidth="+imgWidth);
let autoPlayInterval;
let animate_interval;

function initCaroucel(){
    //获取图片需要位移的px
    let ul = document.getElementById('ul');
    appendNode(ul);
    autoPlay(ul);

}

function autoPlay(ul){
    clearInterval(autoPlayInterval);
    direction = "";
    autoPlayInterval = setInterval(()=>{
        animate(ul);
        imgIndex += 1;
    },5000);
}

function removeNode(ul){
    ul.removeChild(ul.children[0]);
}

function appendNode(ul){
    let cloneNode = ul.children[0].cloneNode(true);
    ul.appendChild(cloneNode);
}

function animate(ele){
    if(imgIndex==5){
        ele.style.left = 0 + "px";
        imgIndex = 0;
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
    // if(imgIndex > 0){
    //     direction = "right";
    //     clearInterval(animate_interval);
    //     clearInterval(autoPlayInterval);
    //     let ul = document.getElementById('ul');
    //     animate(ul);
    //     imgIndex = imgIndex - 1;
    //     autoPlay(ul, imgWidth);
    // }
}
function nextImage() {
    // if(imgIndex < 5){
    //     direction = "left";
    //     clearInterval(animate_interval);
    //     clearInterval(autoPlayInterval);
    //     let ul = document.getElementById('ul');
    //     animate(ul);
    //     imgIndex = imgIndex + 1;
    //     autoPlay(ul, imgWidth);
    // }
}

initCaroucel();
