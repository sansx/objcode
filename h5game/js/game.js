(function(){
    let box = document.getElementsByClassName('container_start')[0]
    window.$$ = function(el,value){
        let style = window.getComputedStyle(el).getPropertyValue(value)
        return style
    }
    window.echo = function(el){
        console.log(el)
    }
    let canvas = document.getElementsByTagName("canvas")[0]
    let can = canvas.getContext("2d")
    canW = parseInt($$(box,'width'))
    canH = parseInt($$(box,'height'))
    //canvas.style.border = '1px solid'
    // 屏幕的设备像素比
    var devicePixelRatio = window.devicePixelRatio || 1;

    // 浏览器在渲染canvas之前存储画布信息的像素比
    var backingStoreRatio = can.webkitBackingStorePixelRatio ||
                        can.mozBackingStorePixelRatio ||
                        can.msBackingStorePixelRatio ||
                        can.oBackingStorePixelRatio ||
                        can.backingStorePixelRatio || 1;

    // canvas的实际渲染倍率
    var ratio = devicePixelRatio / backingStoreRatio;
    //console.log(ratio)
    canvas.width = canW
    canvas.height = canH
    canvas.style.width = canvas.width+'px';
    canvas.style.height = canvas.height+'px';
    canvas.width = canvas.width * ratio;
    canvas.height = canvas.height * ratio;
    //将画布放大
    can.scale(ratio, ratio);
    let bgbox = document.querySelector('.container_start')
    let timebox = document.querySelector('.clock')
    let startbtn = document.querySelector('.time')
    let readybtn = document.querySelector('.btn_start')
    let score = document.querySelector('.score')
    let rulebtn = document.querySelector('.btn_rule_top')
    let ruleclobtn = document.querySelector('.rule_close')
    let fnscore = document.querySelector('.final_score')
    let totrate = document.querySelector('.total_rate')
    let restart = document.querySelector('.btn_restart')
    let begbtn  = document.querySelector('.btn_start_game')
    let begboard = document.querySelector('.start_game_mod')
    let resboard = document.querySelector('.examination_tc')
    let chance = document.querySelector('.chance')

    // 程序  三次机会控制
    let chance_num = 3
    chance.innerHTML = chance_num
    //let playbtn = document.querySelector('.setout')     #1
    let isrestart = false
    let control = document.querySelector(".control")
    let leftbtn = document.querySelector(".left")
    let rightbtn = document.querySelector(".right")
    //let noupbtn = document.querySelector('.update_reject') #2
    let sounds
    let imgbox = new Array()
    let imgload = new Array()
    let img1 = new Promise(resolve =>{
        let img = new Image()
        img.onload = () => resolve(img)
        img.src = './images/start/ship_down.png'
    })
    let img2 = new Promise(resolve =>{
        let img = new Image()
        img.onload = () => resolve(img)
        img.src = './images/start/ship_upup.png'
    })
    let soundload = new Array();
    startbtn.parentNode.style.display = 'none';
    ['./sec/go.mp4', './sec/3.mp4', './sec/2.mp4','./sec/1.mp4','./sec/background.mp4'].forEach((res)=>{
        soundload.push(
            new Promise(resolve=>{
                let sound = new Howl({
                    src: res,
                    volume: 0.5,
                    loop: true,
                })
                sound.onload(resolve(sound))
            })
        )
    })
    //console.log(soundload)
    //sound.onload(sound.play())
    // setTimeout(() => {
    //     sound.stop()
    // }, 1000);
    imgload.push(img1,img2)
    let allsound = Promise.all(soundload).then(res=>{
        return res
    })
    
    let allimg = Promise.all(imgload).then(res=>{
        return res
    })
    
    Promise.all([allsound,allimg]).then(res=>{
        sounds = res[0]
        console.log(res[1])
        for (let index = 0; index < res[1].length; index++) {
            let rate = res[1][index].naturalHeight/res[1][index].naturalWidth
            imgbox.push({
                img : res[1][index],
                rate : rate.toFixed(2)
            })
            
        }
        //console.log(res)
        startbtn.innerHTML = "3"
        restart.addEventListener('click',function clickfn(){
            console.log('restart')
            startbtn.innerHTML = "3"
            startbtn.parentNode.style.display = 'block';
            // playbtn.parentNode.style.display = 'block' #1
            bgbox.style.backgroundPositionY = `0px`
            isrestart = true
            score.innerHTML = '0';
            boatmove.reset()
            tostart()
        })
        
        begbtn.addEventListener('click',(ev)=>{
            if (chance_num<1)return
            begboard.style.display = 'none'
            tostart()
            startbtn.parentNode.style.display = 'block';
            
        })
        //noupbtn.addEventListener('click',lay)  #2
        let soundtrigger = document.createElement('div')
        $(soundtrigger).on('click',(ev,num)=>{
            sounds[num].play()
        })
        //readybtn.addEventListener('click',tostart)
        function tostart(){
            console.log('start!!')
            
            let retime = 3
            let Countdown = setInterval(()=>{
                
                if (retime>=0) {
                    retime==3?'':sounds[retime+1].stop()
                    //sounds[retime].play()
                    $(soundtrigger).trigger('click',retime)
                    retime==0?startbtn.innerHTML = "GO":startbtn.innerHTML = retime
                    retime--
                }else{
                    sounds[0].stop()
                    clearInterval(Countdown)
                    $(soundtrigger).trigger('click',4)
                    startbtn.parentElement.style.display = 'none'
                    boatmove.start()
                    let clock = setInterval(()=>{
                        boatmove.setclock()?'':clearInterval(clock)
                    },1000)
                }
                
            },850)
            
            
        }
        // #1
        // playbtn.addEventListener('click',function (){
        //     playbtn.parentNode.style.display = 'none'
        //     if (isrestart) {
        //         startbtn.parentElement.style.display = 'block'
        //         startbtn.innerHTML = '3'
        //         tostart()
        //     }else{
        //         boatmove.pause()
        //         sounds[4].play()
        //         let clock = setInterval(()=>{
        //             boatmove.setclock()?'':clearInterval(clock)
        //         },1000)
        //     }
        //     // boatmove.pause()
        //     // let clock = setInterval(()=>{
        //     //     boatmove.setclock()?'':clearInterval(clock)
        //     // },1000)
        // })


        // #3
        // rulebtn.addEventListener('click',function(){
        //     sounds[4].pause()
        //     boatmove.pause()
        // })



        // #1
        // ruleclobtn.addEventListener('click',function(){
            
        //     playbtn.parentNode.style.display = 'block'
        //     isrestart = false
        // })
    })

    FastClick.attach(leftbtn);
    FastClick.attach(rightbtn);
    
    
    let isclick
    leftbtn.addEventListener("click",function(){
        typeof(isclick) == "undefined"?isclick=true:""
        if (isclick) {
            isclick = !isclick
            boatmove.move()
            score.innerHTML = boatmove.getnum(100)
        }
    })
    rightbtn.addEventListener("click",function(){
        typeof(isclick) == "undefined"?isclick=false:""
        if (!isclick) {
            boatmove.move()
            isclick = !isclick
            score.innerHTML = boatmove.getnum(100)
        }
    })
    
    // let lay = function(){
        
    // sounds[4].stop()
    function outtime(){
        
        sounds[4].stop()
        resboard.style.display = 'block'
        var exam = layer.open({  // 4个按钮的弹窗  完成进度 以及 分数 
            type: 1,
            shadeClose: false,
            title: false,
            closeBtn: 0,
            skin: 'yourclass',
            area: ['5.61rem', ''],
            content: $('.examination_tc'),
            success: function(){
                $("body").addClass('poh');
            },
            end: function(){
                $('.btn_get_cj').off('click')
                $("body").removeClass('poh');
            }
        });
    }
    
    
    //console.log($$(bgbox,'background'))
    //参数为完成进度的点击次数
    // function getrate(val){
    //     totrate.innerHTML = `完成进度${parseInt((boatmove.getnum()/val).toFixed(2)*100)}%`
    // }
    let boatmove = (function(){
        let resnum = 5
        let step = 1
        let num = 0
        let time = resnum
        let range = 10 //此为点击一次龙舟移动的距离
        let stop = true
        let bgpos = 0
        let save = 0
        return {
            start : function(){
                stop = false
                let draw = function(){
                    //console.log('???')
                    let imgW = canW/4
                    let imgH = imgbox[num%2].rate*imgW
                    if (canH-imgH*1.5-step>canH/4) {
                        step<num*range?step++:''
                        //step++
                        
                        can.clearRect(0,0,canW,canH)
                        can.drawImage(imgbox[num%2].img,0,0,
                        imgbox[num%2].img.naturalWidth, imgbox[num%2].img.naturalHeight,
                        canW/2-imgW/2,canH-imgH*1.5-step, imgW, imgH)
                    }else{
                        if(save==0)save = num
                        bgpos<(num-save)*range?bgpos++:''
                        //bgpos++
                        bgbox.style.backgroundPositionY = `${bgpos}px`
                        can.clearRect(0,0,canW,canH)
                        can.drawImage(imgbox[num%2].img,0,0,
                        imgbox[num%2].img.naturalWidth, imgbox[num%2].img.naturalHeight,
                        canW/2-imgW/2,canH-imgH*1.5-step, imgW, imgH)
                    }
                    
                    window.requestAnimationFrame(draw)
                }
                window.requestAnimationFrame(draw)
            },
            setclock : function(){
                if (600>time&&time>=0&&!stop) {
                    let min = 0
                    time%60>=10?min = time%60 : min = `0${time%60}`
                    timebox.innerHTML = `0${Math.floor(time/60)}:${min}`
                    time--
                    return true
                }else{
                    if (time<0) {
                        console.log('notime')
                        chance_num--
                        //getrate(100)
                        chance_num>0?outtime():begboard.style.display = 'flex'
                        chance.innerHTML = chance_num
                        fnscore.innerHTML = boatmove.getnum(100)
                        stop?'':stop = true
                        //lay()
                        return false
                    }
                }
            },
            pause : function(){
                stop = !stop
            },
            move : function(){
                if (!stop) {
                    num++
                }
            },
            getnum : function(val){
                if (val) {
                    return num*val
                }
                return num
            },
            reset : function(){
                step = 1
                num = 0
                time = resnum
                stop = true
                bgpos = 0
                save = 0
            }
            }
        }
    )()
})()
            
            
            
            
        