window.onload=function(){
  //banner
  var bgcolor=getClass("head-box5")[0];
  var imgs=getClass("head-img");
  var btn2=getClass("head-5-bottom1");
  var bg=["url(../img/tu11.jpg)","url(../img/tu21.jpg)","url(../img/tu31.jpg)","url(../img/tu41.jpg)"];
  var left1=getClass("jiantou3")[0];
     var right1=getClass("jiantou4")[0];
     var headjiantou=getClass("head-jiantou");
     var headbox=getClass("head-milld5-2")[0];
     headbox.onmouseover=function(){
      headjiantou[0].style.zIndex=10;
      headjiantou[1].style.zIndex=10;
     }
     headbox.onmouseout=function(){
      headjiantou[0].style.zIndex=0;
      headjiantou[1].style.zIndex=0;
     }
     left1.onmouseover=function(){
      this.style.backgroundPosition="left bottom";
     }
     right1.onmouseover=function(){
      this.style.backgroundPosition="right bottom";
     }
     left1.onmouseout=function(){
      this.style.backgroundPosition="left top";
     }
     right1.onmouseout=function(){
      this.style.backgroundPosition="right top";
     }
  for (var i = 0; i < btn2.length; i++) {
        btn2[i].index=i;
        btn2[i].onmouseover=function(){
          num=this.index;
          for (var i = 0; i < btn2.length; i++) {
            btn2[i].style.backgroundColor="rgb(33,22,22)";
            imgs[i].style.zIndex=1;
          }
          this.style.backgroundColor="rgb(229,0,79)";
          imgs[this.index].style.zIndex=2;
          bgcolor.style.backgroundImage=bg[this.index]
        }
  };
  var num=0;
  var lunbo=setInterval(move,2000);
  function move(){
    num++;
    if (num==btn2.length) {
      num=0;
    };
    for (var i = 0; i < btn2.length; i++) {
      btn2[i].style.backgroundColor="rgb(33,22,22)";
            imgs[i].style.zIndex=1;
    };
    btn2[num].style.backgroundColor="rgb(229,0,79)";
          imgs[num].style.zIndex=2;
          bgcolor.style.backgroundImage=bg[num]
  }
  bgcolor.onmouseover=function(){
    clearInterval(lunbo);
  }
  bgcolor.onmouseout=function(){
    lunbo=setInterval(move,2000);
  }
  //边框线条
  function border(obj,time){
        obj.style.position="relative";
        var div1=document.createElement("div");
        var div2=document.createElement("div");
        var div3=document.createElement("div");
        var div4=document.createElement("div");

        div1.style.cssText="position:absolute;background:#000;left:-1px;top:-1px;height:1px;"
        div2.style.cssText="position:absolute;background:#000;left:-1px;top:-1px;width:1px;"
        div3.style.cssText="position:absolute;background:#000;right:-1px;bottom:-1px;height:1px;"
        div4.style.cssText="position:absolute;background:#000;right:-1px;bottom:-1px;width:1px;"
        obj.appendChild(div1);
        obj.appendChild(div2);
        obj.appendChild(div3);
        obj.appendChild(div4);
        var width=parseInt(getStyle(obj,"width"));
        var height=parseInt(getStyle(obj,"height"));
        obj.onmouseover=function(){
          animate(div1,{width:width+2},time);
          animate(div2,{height:height+2},time);
          animate(div3,{width:width+2},time);
          animate(div4,{height:height+2},time);
        }
        obj.onmouseout=function(){
          animate(div1,{width:0},time);
          animate(div2,{height:0},time);
          animate(div3,{width:0},time);
          animate(div4,{height:0},time);
        }
      }
      var box=$(".recommended-left2-1-1");
      var box1=$(".counters-small11");
      var box2=$(".brand1-right-1");
      for (var i = 0; i < box.length; i++) {
        border(box[i],800);
        
        
      };
      for (var i = 0; i < box1.length; i++) {
        border(box1[i],800);    
      };
      for (var i = 0; i < box2.length; i++) {
        border(box2[i],800);
      };
      //右导航显示隐藏
      var rightbn=$(".right-box")[0];
      document.documentElement.scrollTop=1;
      if (document.documentElement.scrollTop==1) {
        var scrollobj=document.documentElement;
      }else{
        var scrollobj=document.body;
      }
      addEvent(window,"scroll",function(){
        var st=scrollobj.scrollTop;
        
        if (st>700) {
          rightbn.style.display="block";
          
        }else{
          rightbn.style.display="none";
        }
      })
      //对应楼层跳转
      var pingpai=$(".brand-box1");
      var rightbtns=$(".right-box0");
      var head=$(".head-box")[0];
      var returnt=$(".right-box1")[0]
      for (var i = 0; i < rightbtns.length; i++) {
        rightbtns[i].index=i;
        rightbtns[i].onclick=function(){
          var ot=pingpai[this.index].offsetTop;
          animate(scrollobj,{scrollTop:ot-100})
        }
      };
      //对应楼层颜色
        var ot=[]
       for (var i = 0; i < rightbtns.length; i++) {
         ot.push(rightbtns[i].offsetTop)
        }
        
       addEvent(window,"scroll",function(){
          var st=scrollobj.scrollTop;
          for (var j = 0; j < pingpai.length; j++) {
            rightbtns[j].style.backgroundColor=""
            if (st+250>pingpai[j].offsetTop) {
              for (var i = 0; i < rightbtns.length; i++) {
                rightbtns[i].style.backgroundColor="";
              };
              rightbtns[j].style.backgroundColor="#e5004f";
            };

          };
        })
      //返回顶部
      returnt.onclick=function(){
        var ob=head.offsetTop;
        animate(scrollobj,{scrollTop:ob})
      }
      //无缝轮播
      var jt1=$(".brand1-left-jiantou1");
      var jt2=$(".brand1-left-jiantou2");
      var inner=$(".brand1-left-bottom-box1");
      for (var i = 0; i < jt1.length; i++) {
           lunbo3(jt1[i],jt2[i],inner[i])
      };
      function lunbo3(jt1,jt2,inner){
    jt2.onclick=function(){
      animate(inner,{marginLeft:-160},1000,function(){
        var first=getFirst(this);
        this.appendChild(first);
        this.style.marginLeft=0;
      })
    }
    var flag2=true;
    jt1.onclick=function(){
      if (!flag2) {
        return
      }
      flag2=false
      var last=getLast(inner);
      var first=getFirst(inner);
      inner.insertBefore(last,first)
      inner.style.marginLeft="-160px"
      animate(inner,{marginLeft:0},1000,function(){
        flag2=true
      })
    }
   }
  var counters=$(".counters-bottom-right-bottom-box1");
  var btns=$(".counters-bottom-right-top1");
  var biaoti=$(".counters-right-biaoti")
  var top1=$(".counters-right-top1"); 
  for (var i = 0; i < btns.length; i++) {
    btns[i].index=i;
    btns[i].onmouseover=function(){
      for (var i = 0; i < btns.length; i++) {
        counters[i].style.display="none";
                btns[i].style.borderColor="rgb(51,51,51)";
                biaoti[i].style.color="#666"
                biaoti[i].style.fontWeight="400"
                top1[i].style.display="none";
                   
      };
      counters[this.index].style.display="block";
      this.style.borderColor="rgb(231,0,80)";
      biaoti[this.index].style.color="rgb(65,65,65)"
      biaoti[this.index].style.fontWeight="700"
      top1[this.index].style.display="block"
    }
  };
 //推荐
     var btns1=$(".recommended-border");
     var text=$(".recommended-font");
     var biaoti1=$(".recommended-jiantou");
     var recommend=$(".recommended-left2-1");
   for (var i = 0; i < btns1.length; i++) {
        btns1[i].index=i;
        btns1[i].onmouseover=function(){
          for (var i = 0; i < btns1.length; i++) {
            recommend[i].style.display="none";
            btns1[i].style.borderColor="#333";
            biaoti1[i].style.display="none";
            text[i].style.fontWeight="400";
            text[i].style.color="rgb(102,102,102)";
            
          };
          recommend[this.index].style.display="block";
          this.style.borderColor="rgb(229,0,79)"
          biaoti1[this.index].style.display="block"
          text[this.index].style.fontWeight="700";
          text[this.index].style.color="#000";
          
        }
      }
  var centers=getClass("brand1-center-box-small");
     var jiantou=getClass("brand1-center-box");
     var left=getClass("jiantou1");
     var right=getClass("jiantou2");
     var bottom=getClass("brand1-center-bottom");
       for (var i = 0; i < jiantou.length; i++) {
            lunbo2(jiantou[i],centers[i],left[i],right[i])
       };
       function lunbo2(jiantou,centers,left,right,bottom){
     var banner_dian=getClass("brand1-center-bottom1");
     var flag=true;
     jiantou.onmouseover=function(){
      animate(left,{left:0},200);
      animate(right,{right:0},200);
     }//鼠标移入箭头出现
     jiantou.onmouseout=function(){
      animate(left,{left:-30},200);
      animate(right,{right:-30},200);
     }//鼠标移出箭头消失
     //箭头点击
     left.onmouseover=function(){
      this.style.backgroundPosition="left bottom";
     }
     right.onmouseover=function(){
      if (flag) {
        flag=true
      this.style.backgroundPosition="right bottom";
     }
     }
     left.onmouseout=function(){
      this.style.backgroundPosition="left top";
     }
     right.onmouseout=function(){
      this.style.backgroundPosition="right top";
     }
    //按钮、箭头点击
       right.onclick=moveright;
       left.onclick=moveleft;
       banner_dian[0].onclick=moveleft;
       banner_dian[1].onclick=moveright;
        function moveright() {
        animate(centers,{marginLeft:-390})
        banner_dian[0].style.backgroundPosition="top"
        banner_dian[1].style.backgroundPosition="bottom"
        flag=false;
       }
        function moveleft() {
        animate(centers,{marginLeft:0})
        banner_dian[1].style.backgroundPosition="top"
        banner_dian[0].style.backgroundPosition="bottom"
        flag=true
     }
    
  }

  //head1
   var head1=$(".head-milld1-left2")[0];
   var head2=$(".head-milld1-tu21")[0];
   head1.onmouseover=function(){
    head2.style.display="block";
   }
   head1.onmouseout=function(){
    head2.style.display="none"
   }
   var head3=$(".head-milld1-left3")[0];
   var head4=$(".head-milld1-tu31")[0];
   head3.onmouseover=function(){
    head4.style.display="block";
   }
   head3.onmouseout=function(){
    head4.style.display="none"
   }
   var head5=$(".head-milld1-right3")[0];
   var head6=$(".head-milld1-right31")[0];
   head5.onmouseover=function(){
    head6.style.display="block";
   }
   head5.onmouseout=function(){
    head6.style.display="none"
   }
   var head7=$(".head-milld3-4")[0];
   var head8=$(".head-milld3-41")[0];
   head7.onmouseover=function(){
    head8.style.display="block";
   }
   head7.onmouseout=function(){
    head8 .style.display="none"
   }
//按需加载
var floors=$(".floor")
  // console.log(floors)
  var tops=[] 
  for (var i = 0; i < floors.length; i++) {
    tops.push(floors[i].offsetTop)
  }
  // console.dir(tops)
  doc=document.documentElement?document.documentElement:document.body;
  doc.scrollTop=1
  h=document.documentElement.clientHeight;
  console.log(h)
  addEvent(window,"scroll",function(){
    var up=doc.scrollTop;
    for (var i = 0; i < floors.length; i++) {
      if(up+h>tops[i]&&floors[i].getAttribute("flag")!="true"){
      var imgs=$("img",floors[i])
      for (var j = 0; j < imgs.length; j++) {
        imgs[j].src=imgs[j].getAttribute("asrc")
      };
      floors[i].setAttribute("flag",true)
      }
    };
  })

   var head5_btn=$(".daohangzuo");
  var head5_left=$(".head-left1-11");
   for (var i = 0; i < head5_btn.length; i++) {
    head5_btn[i].index=i;
    hover(head5_btn[i],function(){
        head5_left[this.index].style.display="block"
    },function(){
         head5_left[this.index].style.display="none"
    })
  }
}