!function(){var r={str:"",calculateFinishedFlag:!1};window.jmlclt=r,document.onselectstart=function(){return!1},r.$monitor=$(".jml-ctl-monitor"),r.calculate=function(){return function(t){var n;try{n=new Function("return ("+t+");")()}catch(t){n=0}return n}(r.str)},r.updateMonitor=function(t){var n=$.isEmptyObject(t)?r.str:t;r.$monitor.text(n)},r.buttonClickHandler=function(t){var n=t.data("btnkey");switch(n){case"c":r.str="";break;case"=":r.str=r.calculate()+"",r.calculateFinishedFlag=!0;break;case"d":r.str=r.str.slice(0,r.str.length-1);break;default:if(12<=r.str.length)return;r.str="0"===r.str?n:r.str+n}r.updateMonitor()},$(".jml-clt-btn").on("click",function(t){var n=$(t.target);n.is(".jml-clt-btn")&&r.buttonClickHandler(n)})}();