//把所有用于解决ie6-8 兼容性问题的函数
//getElementByClassName   在ie6-8  不支持
// 1.先区分 再进行不同操作
 //2.先把所有的元素获取到
 //3.根据类名找到我们需要的元素
function getClass(selector,context){
  context=context||document;
	//undefined  null  0  ""  false NaN  都是假值
	if (document.getElementsByClassName){
     return context.getElementsByClassName(selector)
   }else{
   	var all=context.all;       //所有元素的集合
   	// var all=document.getElementsByTagName('*')     所有元素的集合 如[html body head div script.....]
   	var newarr=[];
   	for (var i = 0; i < all.length; i++) {
   	 if(checkstr(all[i].className,selector)){
   	 	newarr.push(all[i])
   	 }
   	}
   	return newarr;
   }
   function checkstr(lstr,str){
      var arr=lstr.split(" ")
      for (var i = 0; i < arr.length; i++) {
        if(arr[i]=str){
         return true;
        }
      }
      return false;
   }
}
//兼容的获取或者设置元素的文本内容
   // 1.先判断浏览器
   // 2.是获取还是要设置
   // 3.分别执行对应的操作
  function getText(obj,text){   //构建一个函数形参为获取的对象，设置的文本            
   if (document.getElementsByClassName) {   //判断浏览器能否在ie6-8中执行
           if (text==undefined) {           //判断文本是不是undefined
            return obj.textContent;          //获取文本内容
           }else{
            obj.textContent=text;            //设置文本内容
           }
   }else{     //浏览器能在ie6-8中执行
      if (text==undefined) {             
         return obj.innerText;               //获取文本内容
      }else{
         obj.innerText=text;                 //设置文本内容
      }
  }
}
//兼容性获取某一个对象的某一个样式的方式
   // window.getComputedStyle(one,null).width
   // one.currentStyle.width    (ie6-8)
function getStyle(obj,attr){
   if (window.getComputedStyle) {
       return window.getComputedStyle(obj,null)[attr];
   }else{
    return obj.currentStyle[attr];
   }
}

 //通过多种方式获取元素   jquery
  function $(selector,context){      //选择器，范围
      context=context||document       //接受形式多一
      if (typeof selector=="string") {
      if (selector.charAt(0)==".") {
        return getClass(selector.slice(1),context);
      }else if(selector.charAt(0)=="#"){
        return document.getElementById(selector.slice(1));
      }else{
        return context.getElementsByTagName(selector);
      }
       }else if(typeof selector=="function" ){
        // window.onload=selector;           //在一个文件里只能写一个加载事件
        addEvent(window,"load",selector)  //在一个文件里可以写多个加载事件
     }
  }

//获取所有元素子节点的函数
function getChild(obj){
  var childs=obj.childNodes;
  var newarr=[];
  for (var i = 0; i <childs.length; i++) {
    if(childs[i].nodeType==1){
      newarr.push(childs[i]);
    }
  }
  return newarr
}
//获取第一个元素子节点的函数
function getFirst(obj){
     return getChild(obj)[0];
}
//获取最后一个元素子节点的函数
function getLast(obj){
  var arr=getChild(obj);
  return arr[arr.length-1];
}
//获取下一个元素兄弟节点
function getNext(obj){
   var next=obj.nextSibling;
   if (next==null) {
    return null
   }
   while(next.nodeType!=1) {
    next=next.nextSibling;
    if (next=null) {
      return null;
    }
   }
   return next;
}
//获取上一个元素兄弟节点
function getPrevious(obj){
  var previous=obj.previousSibling;
   if (previous==null) {
    return null
   }
   while(previous.nodeType!=1) {
    previous=previous.nextSibling;
    if (previous=null) {
      return null;
    }
   }
   return previous;
}
// 将一个元素插入到另一个元素的后面
function insertAfter(oldobj,newobj){
  var next=getNext(oldobj);
  var parent=oldobj.parentNode;
  if (next) {
    parent.insertBefore(newobj,next)
  }else{
    parent.appendChild(newobj)
  }
}
//添加绑定事件的兼容性问题函数
function addEvent(obj,event,callback){   //obj:对象 event: callback:
   if (obj.addEventListener){
     obj.addEventListener(event,callback,false)
   }else{
    obj.attachEvent("on"+event,callback)
    }
}
//移除式绑定事件的兼容性问题函数
function removerEvent(obj,event,callback){
  if (obj.removerEventListener){
   obj.removerEventListener(event,callback,false)
  }else{
  obj.detachEvent("on"+event,callback)
 }
}
//给某个事件添加滚轮事件的函数
 function mousewheel(obj,upfun,downfun){
    if (obj.addEventListener) {  //判断是否是现代浏览器
      obj.addEventListener("mousewheel",scrollfun,false)          //谷歌/ie
      obj.addEventListener("DOMMouseScroll",scrollfun,false)      //火狐中
    }else{
      obj.attachEvent("onmousewheel",scrollfun,false)             //ie6-8     
    }
    function scrollfun(e){
       var ev=e||window.event;
       var dir=ev.detail||ev.wheelDelta;
       //兼容性阻止浏览器默认的滚轮方式
       if(ev.preventDefault){
        ev.preventDefault()
       }else{
        ev.returnValue=false;
       }
       if (dir==-3||dir==120) {
        upfun.call(obj,ev)
       }
       if(dir==3||dir==-120){
        downfun.call(obj,ev)
       }
    }
    }
     //判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }
 //判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移除事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
  function getEvent(e){
    return e||window.event;
  }