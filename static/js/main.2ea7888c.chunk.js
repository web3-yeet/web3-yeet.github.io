(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{164:function(e,t,a){e.exports=a.p+"static/media/logo.b17af6d6.png"},169:function(e,t,a){e.exports=a(399)},174:function(e,t,a){},244:function(e,t){},246:function(e,t){},271:function(e,t){},314:function(e,t){},390:function(e,t,a){},399:function(e,t,a){"use strict";a.r(t);var n=a(2),s=a.n(n),c=a(160),r=a.n(c),l=(a(174),a(23)),o=a.n(l),i=a(57),u=a(161),m=a(162),h=a(167),p=a(163),d=a(168),f=a(401),g=a(39),E=a.n(g),b=a(82),w=a(164),k=a.n(w),y=(a(390),function(e){function t(e){var a;Object(u.a)(this,t),(a=Object(h.a)(this,Object(p.a)(t).call(this,e))).sendCehh=function(){a.wallet.sendERC20(a.bag,20,a.token)},a.sendEth=function(){a.wallet.sendEther(a.bag,.024)},a.sign=Object(i.a)(o.a.mark(function e(){var t;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.wallet.signMessage("this message");case 2:t=e.sent,a.setState({signature:t});case 4:case"end":return e.stop()}},e,this)})),a.check=Object(i.a)(o.a.mark(function e(){var t;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,a.wallet.checkMessage("this message",a.state.signature);case 2:t=e.sent,a.setState({isYou:t});case 4:case"end":return e.stop()}},e,this)})),a.state={isYou:!1};try{window.ethereum.enable()}catch(n){console.log("no web3 wallet")}return a.wallet=new b.Wallet,a.token=new b.ERC20("0x4f38f4229924bfa28d58eeda496cc85e8016bccc"),a.bag="0xff91c94f45e1114b1c90be6d028381964030584c",a}return Object(d.a)(t,e),Object(m.a)(t,[{key:"componentDidMount",value:function(){var e=Object(i.a)(o.a.mark(function e(){var t,a;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.token.getSymbol();case 2:return t=e.sent,this.setState({name:t}),e.next=6,this.token.getDecimalFactor().catch(console.error);case 6:a=e.sent,console.log(a);case 8:case"end":return e.stop()}},e,this)}));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this,t=this.state.isYou?{emoji:"\ud83d\udec2 ",text:"Yep, it was you"}:{emoji:"\ud83d\udd0d",text:"Verify it was you"};return s.a.createElement("div",{className:"App"},s.a.createElement("header",{className:"App-header"},s.a.createElement("span",{className:"outer-logo"},s.a.createElement("img",{src:k.a,className:"App-logo",alt:"logo"})),s.a.createElement("span",{className:"title mt-3"},s.a.createElement("span",null,"Web3-YEET")),s.a.createElement("p",{className:"buttons"},s.a.createElement(f.a,{onClick:this.sendCehh,color:"primary",block:!0},s.a.createElement("span",{className:"float-left"},"\ud83d\udc15"),s.a.createElement("span",null,"Send some",s.a.createElement(E.a,{className:"d-inline",startDelay:2e3,cursor:{hideWhenDone:!0,hideWhenDoneDelay:0,blink:!0},avgTypingSpeed:10,onTypingDone:function(){return e.setState({done:!0})}},"...",s.a.createElement(E.a.Backspace,{count:3,delay:200})),this.state.name&&this.state.done?s.a.createElement(E.a,{className:"d-inline",startDelay:1200,cursor:{hideWhenDone:!0},avgTypingSpeed:10}," ".concat(this.state.name),s.a.createElement(E.a.Delay,{ms:1e3}),"?"):this.state.done?"...":null)),s.a.createElement(f.a,{onClick:this.sendEth,color:"success",block:!0},s.a.createElement("span",{className:"float-left"},"\ud83c\udf7b"),s.a.createElement("span",null,"Send some ether?")),s.a.createElement(f.a,{onClick:this.sign,color:"danger",block:!0},s.a.createElement("span",{className:"float-left mr-2"},"\u270d\ufe0f"),s.a.createElement("span",null,'Sign "this message"!')),s.a.createElement(f.a,{onClick:this.check,color:"warning",disabled:void 0===this.state.signature,block:!0},s.a.createElement("span",{className:"float-left mr-1"},t.emoji),s.a.createElement("span",null,t.text)))))}}]),t}(n.Component));a(395),a(397);r.a.render(s.a.createElement(y,null),document.getElementById("root"))}},[[169,2,1]]]);
//# sourceMappingURL=main.2ea7888c.chunk.js.map