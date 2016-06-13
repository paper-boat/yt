$(function(){
    // 楼层
     var bo=$(".box")[0];//获取所需元素
        var floor=$(".floor");
        var lis=$(".lis");
        var cw=document.documentElement.clientWidth;//获得浏览器窗口的高度和宽度
        var ch=document.documentElement.clientHeight;
        var bh=bo.offsetHeight;//获得bo的实际高度
        var sign=true;
        var shuju=["潮流女装","精品男装","时尚鞋靴","潮流箱包","美容护肤","户外运动","内衣配饰","婴童家居","返回顶部"];
        bo.style.top=((ch-bh)/2-40)+"px";//给固定定位的top赋值
        for(var i=0;i<lis.length;i++){
        	lis[i].index=i;
        	lis[i].onclick=function(){//点击楼层时
                var floor=$(".floor");
                if(this.index === 8){
                    document.body.scrollTop=0;
                }
                else{
                    sign=false;
                    var top=floor[this.index].offsetTop;//获取该楼层到浏览器的高度
                    animate(document.body,{scrollTop:top},300,function(){
                        sign=true;
                    });//将这个高度给滚动条
                    animate(document.documentElement,{scrollTop:top},300,function(){
                        sign=true;
                    });//将这个高度给滚动条
                }
        		for(var i=0;i<lis.length;i++){
        			lis[i].innerHTML="";
        			lis[i].style.background="none";
        			lis[i].classList.add('lis'+(i-1)+'');
        		}
        		lis[this.index].style.color="#fff";
                lis[this.index].style.background="#E5004F";
                lis[this.index].innerHTML=shuju[this.index];

        	}
        }
        // for(var i=0;i<lis.length;i++){
        //     lis[i].index=i;
        //     lis[i].onmouseover=function(){
        //         lis[this.index].style.background="#E5004F";
        //         lis[this.index].style.color="#fff";
        //         lis[this.index].innerHTML=shuju[this.index];
        //     }
        //     lis[i].onmouseout=function(){
        //         var floor=$(".floor");
        //         var top=floor[this.index].offsetTop;
        //         if(top==document.body.scrollTop||(top-document.body.scrollTop<=250&&top-document.body.scrollTop>=0)){
        //             lis[this.index].style.background="#E5004F";
        //             lis[this.index].style.color="#fff";
        //         }else if(document.body.scrollTop-top<=280&&document.body.scrollTop-top>=0){
        //             lis[this.index].style.background="#E5004F";
        //             lis[this.index].style.color="#fff";
        //         }else{
        //             lis[this.index].innerHTML="";
        // 			lis[this.index].style.background="none";
        // 			lis[this.index].classList.add('lis'+(this.index-1)+'');
        //         } 
        //     }
        // }
        var flag=true;
        var flag1=true;
        window.onscroll=function(){//滚动事件
            if(!sign){
                return;
            }
            var floor=$(".floor");
            var shuju=["潮流女装","精品男装","时尚鞋靴","潮流箱包","美容护肤","户外运动","内衣配饰","婴童家居","返回顶部"];
        	var obj=document.documentElement.scrollTop? document.documentElement:document.body;
        	for(var i=0;i<floor.length;i++){
        		if(obj.scrollTop>=floor[i].offsetTop-ch+300){//滚动条值大于等于窗口值加楼层到body的值时 该楼层出现
                    for(var j=0;j<lis.length;j++){
                        lis[j].innerHTML="";
        			    lis[j].style.background="none";
        			    // lis[j].classList.add('lis'+(j+1)+'');
                        console.log(lis[j])
                    }
                    lis[i].innerHTML=shuju[i];
        		    lis[i].style.color="#fff";
        		    lis[i].style.background="#E5004F";
                    // var imgs=$("img",floor[i]);
                    // for(var j=0;j<imgs.length;j++){
                    //     var aa=imgs[j].getAttribute("aa");
                    //     imgs[j].src=aa;
                    // }
        		}
        	}
            var chuxian=$(".zhuan")[0];
        	if(obj.scrollTop>=chuxian.offsetTop-ch+100){//第一楼开始出现
        		if(flag){
        			flag=false;//关掉动画
        			animate(bo,{opacity:1},500,function(){//执行动画 楼层显现
        				flag1=true;//消失的开关开启
        			});
        		}  
            }else{
            	if(flag1){//没有到达一楼时
        			flag1=false;//消失的动画关闭
        			animate(bo,{opacity:0},500,function(){//执行动画 楼层消失
        				flag=true;//显现的开关开启
        			});
        		}  
            }
        }





	//banner轮播
	var box=$(".banner")[0];
	var imgs=$(".ban-imgs");
	var circles=$(".circle");
	var left=$(".left")[0];
	var right=$(".right")[0];
	var n=0;
	var flag=true;
	var t=setInterval(move,3000);
	function move(type){
		if(!flag){
			return;
		}
		flag=false;
		if(type=="l"){
			n--;
			if(n<0){
				n=imgs.length-1;
			}
		}else{
			n++;
			if(n>=imgs.length){
				n=0;
			}
		}
		for(var i=0;i<imgs.length;i++){
			animate(imgs[i],{opacity:0},200);
            circles[i].style.background="#3E3E3E";
		}
        circles[n].style.background="#E5004F";
        animate(imgs[n],{opacity:1},200,function(){
            flag=true;
        });
	}
	for(var i=0;i<imgs.length;i++){
		circles[i].index=i;
		circles[i].onmouseover=function(){
			if(this.index>n){
                	for(var i=0;i<circles.length;i++){
                		animate(imgs[i],{opacity:0},200);
	        		    circles[i].style.background="#3E3E3E";
	        	}
	        	circles[this.index].style.background="#E5004F";
                animate(imgs[this.index],{opacity:1},200);
	            n=this.index;
                }else if(this.index<n){
                	for(var i=0;i<circles.length;i++){
                		animate(imgs[i],{opacity:0},200);
	        		    circles[i].style.background="#3E3E3E";
	        	}
	        	circles[this.index].style.background="#E5004F";
                animate(imgs[this.index],{opacity:1},200);
	            n=this.index;
                }
		}
	}
	box.onmouseover=function(){
		clearInterval(t);
		left.style.display="block";
		right.style.display="block";
	}
	box.onmouseout=function(){
		t=setInterval(move,3000);
		left.style.display="none";
		right.style.display="none";
	}
	left.onclick=function(){
		move("l");
	}
	right.onclick=function(){
		move();
	}
    

    //首页
    var shouye=$(".shouye")[0];
    var change=$("#hi01");
    shouye.onmouseover=function(){
    	change.style.display="block";
    }
    shouye.onmouseout=function(){
    	change.style.display="none";
    }
    

    //banner左边
    var bbox=$(".ban-type1");
    var blhidden=$(".bt-hidden");
    for(var i=0;i<bbox.length;i++){
        bbox[i].index=i;
        bbox[i].onmouseover=function(){
            blhidden[this.index].style.display="block";
        }
        bbox[i].onmouseout=function(){
            blhidden[this.index].style.display="none";
        }
    }

    //购物车
    var sc=$(".shopping-car")[0];
    var sch=$(".sc-hidden")[0];
    sc.onmouseover=function(){
    	sch.style.display="block";
    }
    sc.onmouseout=function(){
    	sch.style.display="none";
    }


    //下拉
    var xl=$(".xl");
    var xlbox=$(".xl-box");
    for(var i=0;i<xl.length;i++){
    	xl[i].index=i;
    	xl[i].onmouseover=function(){
    		xlbox[this.index].style.display="block";
    	}
    	xl[i].onmouseout=function(){
    		xlbox[this.index].style.display="none";
    	}
    }
    

    //选项卡
    var xa=$(".rl-topa");
    var xx=$(".rl-bottom");
    for(var i=0;i<xa.length;i++){
        xa[i].index=i;
        xa[i].onmouseover=function(e){
            for(var i=0;i<xa.length;i++){
            xx[i].style.display="none";
        }
            if(e.target!=this.index){
            	for(var i=0;i<xa.length;i++){
            		xa[i].style.fontWeight="normal";
                    xa[i].style.borderColor="#333";
            	}	
            } 
            xx[this.index].style.display="block";
            xa[this.index].style.fontWeight="bold";
            xa[this.index].style.borderColor="#E5004F";
        }
    }

    var xa1=$(".playr-fonta");
    var xx1=$(".play-change");
    for(var i=0;i<xa1.length;i++){
        xa1[i].index=i;
        xa1[i].onmouseover=function(e){
            for(var i=0;i<xa1.length;i++){
            xx1[i].style.display="none";
        }
            if(e.target!=this.index){
            	for(var i=0;i<xa1.length;i++){
            		xa1[i].style.fontWeight="normal";
                    xa1[i].style.borderColor="#333";
                    xa1[i].style.color="666";
            	}	
            } 
            xx1[this.index].style.display="block";
            xa1[this.index].style.fontWeight="bold";
            xa1[this.index].style.color="333";
            xa1[this.index].style.borderColor="#E5004F";
        }
    }



	//楼层轮播
	var obj=$(".floor1-middle");
	 for(var i=0;i<obj.length;i++){
            lunbo(obj[i]);
        }
    function lunbo(obj){
    	var floor=obj;
		var tus=$(".floor1m-img",obj);
		var left1=$(".left1",obj)[0];
		var right1=$(".right1",obj)[0];
		var dians=$(".circle1",obj);
		var w1=obj.offsetWidth;
		var flag=true;
		var i=0;
		var next=0;
		var dong=function(){
	        if(!flag){
	        	return;
	        }
	        flag=false;
	        next=i+1;
	        if(next>=tus.length){
	                next=0;
	            }
	        for(var j=0;j<tus.length;j++){
	        	dians[j].style.background="#211616";
	        }
	        dians[next].style.background="#E5004F";
	        tus[next].style.left=-w1+"px";
	        animate(tus[i],{left:w1},500);
	        animate(tus[next],{left:0},500,function(){
	            flag=true;
	        });
	        i=next;
		}
		var dong1=function(){
	        if(!flag){
	        	return;
	        }
	        flag=false;
	        next=i-1;
	        if(next<0){
	                next=tus.length-1;
	            }
	        for(var j=0;j<tus.length;j++){
	        	dians[j].style.background="#211616";
	        }
	        dians[next].style.background="#E5004F";
	        tus[next].style.left=w1+"px";
	        animate(tus[i],{left:-w1},500);
	        animate(tus[next],{left:0},500,function(){
	            flag=true;
	        });
	        i=next;
		}
        for(var j=0;j<dians.length;j++){
        	dians[j].index=j;
        	dians[j].onclick=function(){
                if(this.index>i){
                	for(var j=0;j<tus.length;j++){
		        	dians[j].style.background="#211616";
		        }
		        dians[this.index].style.background="#E5004F";
		        tus[this.index].style.left=-w1+"px";
		        animate(tus[i],{left:w1},500);
		        animate(tus[this.index],{left:0},500);
		        i=this.index;
                }else if(this.index<i){
                	for(var j=0;j<tus.length;j++){
		        	dians[j].style.background="#211616";
		        }
		        dians[this.index].style.background="#E5004F";
		        tus[this.index].style.left=w1+"px";
		        animate(tus[i],{left:-w1},500);
		        animate(tus[this.index],{left:0},500);
		        i=this.index;
                }
        	}
        }
	    left1.onclick=function(){
	    	dong();
	    }
	    right1.onclick=function(){
	    	dong1();
	    }
	    floor.onmouseover=function(){
	        left1.style.display="block";
	        animate(left1,{left:0},200);
	        right1.style.display="block";
	        animate(right1,{right:0},200);
	    }
	    floor.onmouseout=function(){
	        left1.style.display="none";
	        animate(left1,{left:-30},200);
	        right1.style.display="none";
	        animate(right1,{right:-30},200);
	    }
    }


    //楼层小轮播
	var obj1=$(".f1l-bottom");
	 for(var i=0;i<obj1.length;i++){
            lunbo1(obj1[i]);
        }
    function lunbo1(obj){
    	var boss=obj;
		var tutus=$(".f1lb-lunbo",obj);
		var left3=$(".left3",obj)[0];
		var right3=$(".right3",obj)[0];
		var w2=obj.offsetWidth;
		var flag1=true;
		var a=0;
		var b=0;
		var dong3=function(){
	        if(!flag1){
	        	return;
	        }
	        flag1=false;
	        b=a+1;
	        if(b>=tutus.length){
	                b=0;
	            }
	        tutus[b].style.left=-w2+"px";
	        tutus[b].style.zIndex=2;
	        animate(tutus[a],{left:w2},500);
	        animate(tutus[b],{left:0},500,function(){
	            flag1=true;
	        });
	        a=b;
		}
		var dong4=function(){
	        if(!flag1){
	        	return;
	        }
	        flag1=false;
	        b=a-1;
	        if(b<0){
	                b=tutus.length-1;
	            }
	        tutus[b].style.left=w2+"px";2
	        tutus[b].style.zIndex=2;
	        animate(tutus[a],{left:-w2},500);
	        animate(tutus[b],{left:0},500,function(){
	            flag1=true;
	        });
	        a=b;
		}
	    left3.onclick=function(){
	    	dong3();
	    }
	    right3.onclick=function(){
	    	dong4();
	    }
    }
	
})