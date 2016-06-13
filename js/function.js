function getClass(classname,obj){/*创建函数getclass*/
	var obj=obj||document;/*不输入obj 默认document*/
	if(obj.getElementsByClassName){/*如果存在*/
		return obj.getElementsByClassName(classname);
	}else{
		var arr=[];/*定义一个空数组*/
        var alls=obj.getElementsByTagName("*");/*所有元素*/
        for(var i=0;i<alls.lenght;i++){/*循环检查alls里所有元素*/
        	if(checkclass(alls[i].className,classname)){/*如果查找类名与输入类名一致*/
        		arr.push(alls[i]);/*将其放入arr数组中*/
        	}
        }
        return arr;/*返回Arr数组*/
	}
    
}
function checkclass(search,match){/*定义一个函数*/
	var brr=search.split(" ");/*将字符串分割成了一个brr数组*/
	for(var i=0;i<brr.length;i++){
        if(brr[i]==match){/*如果查找与输入的类名相同*/
        	return true;
        }
	}
	return false;
}






function getInner(obj,value){//创建获取对象文本内容函数
	if(obj.textContent){//如果存在文本内容
		if(value==undefined){//如果没有传入的值
			return obj.textContent;//返回文本的内容
		}else{
			return obj.textContent=value;//如果有传入的值返回传入的值
		}
	}else{//IE识别
		if(value==undefined){//如果没有传入的值
			return obj.innerText;//返回文本的内容
		}else{
			return obj.innerText=value;//如果有传入的值返回传入的值
		}
	}
}





function getStyle(obj,style){//用来获得实际的样式属性
	if(obj.currentStyle){//IE兼容性
		return obj.currentStyle[style];
	}else{
		return getComputedStyle(obj,null)[style];
	}
}





function $(search,obj){//创建$查找类名、id名或标签名
	var obj=obj||document;//如果没有传入的对象默认从文本中找
	if(typeof(search)=="string"){
		if(search.charAt(0)=="#"){//如果传入的是个id名
    	return document.getElementById(search.substr(1));//返回id里的内容
	    }
	    if(search.charAt(0)=="."){//如果传入的是个类名
	    	return getClass(search.substr(1),obj);//返回该类名里的内容
	    }else{//如果传入的是个标签名
	    	return obj.getElementsByTagName(search);//返回该标签里的内容
	    }
	}else if(typeof(search)=="function"){
		window.onload=function(){
			search();
		}
	}
}





function getChilds(obj,type){//创建获取节点的函数
    var type=type||"a";//初始值为"a"
    var all=obj.childNodes;//all为该对象的所有子节点
    var arr=[];//定义一个空数组
    for(var i=0;i<all.length;i++){
    	if(type=="a"){//如果输入值为"a"取元素节点
    		if(all[i].nodeType==1){//如果节点类型为元素节点
                arr.push(all[i]);//将它放入数组中
    		}
    	}else if(type=="b"){//输入值为"b"时取元素节点或者文字节点
    		if(all[i].nodeType==1||all[i].nodeType==3&&all[i].nodeValue.replace(/^\s*|\s*$/g,""));{
                arr.push(all[i]);//将元素节点或者文字节点放入数组中
    		}
    	}
    }
    return arr;//返回数组
}




function getFirst(obj){
    return getChilds(obj)[0]; 
}

function getLast(obj){
	var nub=getChilds(obj);
	return nub[nub.length-1];
}

function getNext(obj,type){
	var next=obj.nextSibling;//把下一个兄弟节点命名为next
    var type=type||"a";//初始值
	if(type=="a"){
		while(next.nodeType==3||next.nodeType==8){//当下一个为属性或文本节点时往下找
		    next=next.nextSibling;
		    if(next==null){
		    	return flase;
		    }
	    } 
    }else if(type=="b"){
    	while((next.nodeType==3&&!next.nodeValue.replace(/^\s*|\s*$/g,""))||next.nodeType==8){
		    next=next.nextSibling;
		    if(next==null){
		    	return flase;
		    }
	    } 
    }
    return next;
}



function getPrevious(obj,type){
	var next=obj.previousSibling;//把上一个兄弟节点命名为previous
    var type=type||"a";
	if(type=="a"){
		while(next.nodeType==3||next.nodeType==8){
		    next=next.previousSibling;
		    if(next==null){
		    	return flase;
		    }
	    } 
    }else if(type=="b"){
    	while((next.nodeType==3&&!next.nodeValue.replace(/^\s*|\s*$/g,""))||next.nodeType==8){
		    next=next.previousSibling;
		    if(next==null){
		    	return flase;
		    }
	    } 
    }
    return next;
}


function insertBefore(obj,before){
	var parent=before.parentNode;
	parent.insertBefore(obj,before);
}

function insertAfter(obj,after){
	var next=getNext(After,"b");
	var parent=after.parentNode;
	if(next){
		insertBefore(obj,next);//插入到next之前
	}else{
		parent.appendChild(obj,after);//没有兄弟节点插入到父元素后面
	}
}


function addEvent(obj,event,fun){
	if(obj.addEventListener){
        obj.addEventListener(event,fun,false);
	}else if(obj.attachEvent){
		obj.attachEvent("on"+event,fun);
	}
}


function removeEvent(obj,event,fun){
	if(obj.removeEventListener){
		obj.removeEventListener(event,fun,false);
	}else if(obj.detachEvent){
		obj.detachEvent("on"+event,fun);
	}
}


function mouseWheel(obj,funUp,funDown){
    if(obj.attachEvent){//兼容性问题
    	obj.attachEvent("onmousewheel",scroll);
    }else if(obj.addEventListener){
    	obj.addEventListener("DOMMouseScroll",scroll,false);
    	obj.addEventListener("mousewheel",scroll,false);
    }
    function scroll(e){
        var ev=e||window.event;
        var d=ev.wheelDelta||ev.detail;
        // if(obj.attachEvent){
        // 	ev.returnValue=false;
        // }else{
        // 	preventDefault();
        // }
        if(d==-120||d==3){
        	if(funDown){//如果存在执行向下滚动
        		funDown();
        	}
        }else if(d==120||d==-3){
        	if(funUp){
        		funUp();
        	}
        }
    }
}