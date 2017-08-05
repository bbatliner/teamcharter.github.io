!function t(e,n,i){function a(r,s){if(!n[r]){if(!e[r]){var c="function"==typeof require&&require;if(!s&&c)return c(r,!0);if(o)return o(r,!0);var d=new Error("Cannot find module '"+r+"'");throw d.code="MODULE_NOT_FOUND",d}var u=n[r]={exports:{}};e[r][0].call(u.exports,function(t){var n=e[r][1][t];return a(n||t)},u,u.exports,t,e,n,i)}return n[r].exports}for(var o="function"==typeof require&&require,r=0;r<i.length;r++)a(i[r]);return a}({1:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i={apiKey:"AIzaSyBWk9EWPkkvqiruG8aYnHV0dBPg1z3EtN4",authDomain:"charter-ecb07.firebaseapp.com",databaseURL:"https://charter-ecb07.firebaseio.com",projectId:"charter-ecb07",storageBucket:"",messagingSenderId:"134239305153"};n.config=i},{}],2:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.Database=function(t,e){var n=t.initializeApp(e,"Charter Database"),i=n.database(),a=n.auth();e.localhost=!0,e.noScreenshots=!0;var o=Prometheus(e,n),r={init:function(t,e){var n=!1;a.onAuthStateChanged(function(i){i?(o.logon(i.uid,{name:i.displayName,email:i.email,image:i.photoURL,uid:i.uid}),n||(n=!0,t(i))):n||(n=!0,e())})},login:function(e){var n=new t.auth.GoogleAuthProvider;a.signInWithPopup(n).then(function(t){t.credential.accessToken;var n=t.user;o.logon(n.uid,{name:n.displayName,email:n.email,image:n.photoURL,uid:n.uid}),e(n)}).catch(function(t){console.error(t)})},getPrometheus:function(){return o},getCurrentUser:function(){return a.currentUser||{}},saveFeedback:function(t,e,n){return i.ref("feedback").push({tid:t,uid:e,feedback:n,timestamp:Date.now()})},getUser:function(t){return new Promise(function(e,n){i.ref("prometheus/users/"+t+"/profile").once("value",function(t){var n=t.val();e(n)}).catch(n)})},getTeam:function(t){return new Promise(function(e,n){i.ref("teams/"+t).once("value",function(t){var n=t.val();e(n)}).catch(n)})},onTeamChange:function(t,e,n){if(!t)throw Error("No team id given.");var a={};i.ref("teams/"+t).on("value",function(t){var n=[],i=t.val()||{},o=i.members||{};for(var s in o)if(!(s in a)){var c=r.getUser(s);c.uid=s,n.push(c)}n.length>0?Promise.all(n).then(function(t){t.forEach(function(t,e){var i=n[e].uid;a[i]=t}),e(i,a)}):e(i,a)})},updateTeamName:function(t,e,n){if(!t)throw Error("No team id given.");return i.ref("edits/"+t).push({field:"name",uid:e,value:n,timestamp:Date.now()}),i.ref("teams/"+t+"/name").set(n)},updateQuestion:function(t,e,n){if(!t)throw Error("No team id given.");return i.ref("edits/"+t).push({field:"question",uid:e,value:n,timestamp:Date.now()}),i.ref("teams/"+t+"/question").set(n)},updateExpectations:function(t,e,n){if(!t)throw Error("No team id given.");return i.ref("edits/"+t).push({field:"expectations",uid:e,value:n,timestamp:Date.now()}),i.ref("teams/"+t+"/expectations").set(n)},submitUpdate:function(t,e,n){if(!t)throw Error("No team id given.");if(!e)throw Error("No user id given.");return o.save({type:"SUBMIT_UPDATE",tid:t,update:n}),i.ref("teams/"+t+"/updates/"+e).push({update:n,timestamp:Date.now()})},joinTeam:function(t,e,n){if(!t)throw Error("No team id given.");if(!e)throw Error("No user id given");return new Promise(function(i,a){r.getTeam(t).then(function(o){n!==o.joinCode&&o.joinCode?i({success:!1}):r.addMember(t,e).then(function(t){i({success:!0})}).catch(a)}).catch(a)})},addMember:function(t,e){return o.save({type:"ADD_MEMBER",tid:t,uid:e}),i.ref("teams/"+t+"/members/"+e).set({status:"member",role:"Team Member",joined:Date.now(),member:!0})},getAllTeams:function(t){return new Promise(function(e,n){i.ref("teams").orderByChild("members/"+t+"/member").startAt(!0).endAt(!0).once("value",function(t){var n=t.val()||{};e(n)}).catch(n)})},createNewTeam:function(t,e,n){return new Promise(function(a,s){i.ref("teams").push({name:n||"New Team Charter",joinCode:e}).then(function(e){var i=e.path.ct,c=i[i.length-1];o.save({type:"CREATE_TEAM",tid:c,name:n}),r.addMember(c,t).then(function(t){a({tid:c})}).catch(s)}).catch(s)})}};return r}},{}],3:[function(t,e,n){"use strict";function i(t){f(function(e){console.log("What makes working at Omnipointment better than, say, Google?"),u("fill-user-name",t.displayName),m("fill-user-image",t.photoURL);for(var n=0;n<C.length;n++)!function(t){C[t].addEventListener("click",function(e){l(C,C[t])})}(n);l(C,document.querySelectorAll('.charter-tab[data-tab="container-charter"]')[0]);h.getPrometheus();T.addEventListener("click",function(t){vex.dialog.prompt({message:"What feedback do you have to share with us?",callback:function(t){if(t){var n=h.getCurrentUser().uid;h.saveFeedback(e,n,t).then(function(t){vex.dialog.alert("Thank you for your feedback, it really helps us a lot!")}).catch(d)}}})});var i=!1;h.onTeamChange(e,function(t,e){i||(c(h,t,e),i=!0)},d),a(t,e),o(t,e)})}function a(t,e){k.addEventListener("click",function(t){h.getTeam(e).then(function(t){var n=window.location.origin,i=window.location.pathname,a=t.joinCode||!1,o=""+n+i+"?team="+e+(a?"&code="+a:"");vex.dialog.prompt({message:"Send this link to your teammates:",value:o,callback:function(){}})})}),x.addEventListener("input",function(t){var e=t.target.innerText.split("\n").reduce(function(t,e){return e?t+e:t},"");t.target.innerText=e,cursorManager.setEndOfContenteditable(t.target)}),x.addEventListener("keypress",function(t){if(13==(t.keyCode||t.which)){var n=t.target.innerText,i=h.getCurrentUser().uid;h.updateTeamName(e,i,n)}}),N.addEventListener("click",function(t){N.classList.add("is-loading");var n=h.getCurrentUser().uid,i=L.innerText;h.updateQuestion(e,n,i).then(function(t){N.classList.remove("is-loading")}).catch(d)}),j.addEventListener("click",function(t){j.classList.add("is-loading");var n=h.getCurrentUser().uid,i=U.innerText.split("\n"),a=i.pop();!a.length<1&&i.push(a),h.updateExpectations(e,n,i).then(function(t){j.classList.remove("is-loading")}).catch(d)}),B.addEventListener("click",function(t){B.classList.add("is-loading");var n=h.getCurrentUser().uid,i=D.value;h.submitUpdate(e,n,i).then(function(t){B.classList.remove("is-loading"),D.value=""}).catch(d)}),h.onTeamChange(e,function(t,e){Object.keys(t).length>0&&s(t,e)},d)}function o(t,e){h.onTeamChange(e,function(t,n){r(e,t,n)},d)}function r(t,e,n){var i=e.updates||{},a=[];for(var o in i){var r=i[o];for(var s in r){var c=r[s];c.uid=o,c.key=s,a.push(c)}}for(var d in e.members){var u=e.members[d],m=n[d];a.push({update:m.name+" joined the team.",timestamp:u.joined,uid:d,key:d+"-joined"})}if(a.sort(function(t,e){return e.timestamp-t.timestamp}),I.innerHTML="",a.length>0)a.forEach(function(t){var i=n[t.uid],a=y.getProgressUpdate({name:i.name,role:e.members[t.uid].role,image:i.image,update:t.update,timestamp:t.timestamp});I.appendChild(a)});else{var l=document.createElement("div");l.innerHTML='<div class="content">\n\t\t\t<h4>No updates to show :(</h4>\n\t\t</div>',I.appendChild(l)}}function s(t,e){var n=t.members||{};t.name&&(u("fill-team-name",t.name),cursorManager.setEndOfContenteditable(x)),t.question&&u("fill-team-question",t.question);var i=t.expectations||[];i.length>0&&(U.innerHTML=i.reduce(function(t,e){return t+"<li>"+e+"</li>"},""));var a=t.updates||{};M.innerHTML="";for(var o in n)!function(i){var o=e[i],r=a[i]||{},s=Object.keys(r).map(function(t){return r[t]}).sort(function(t,e){return e.timestamp-t.timestamp})[0],c="No updates yet.",d=n[i].joined;s&&(c=s.update,d=s.timestamp);var u=y.getRoleAndUpdateTile({name:o.name,role:t.members[i].role,image:o.image,update:c,timestamp:d});M.appendChild(u)}(o)}function c(t,e,n){var i=t.getCurrentUser().uid;i in n?Object.keys(e).length>0&&s(e,n):b.code?vex.dialog.confirm({message:"Do you want to join "+(e.name||"this team")+"?",buttons:[$.extend({},vex.dialog.buttons.YES,{text:"Yes"}),$.extend({},vex.dialog.buttons.NO,{text:"No"})],callback:function(a){a?t.joinTeam(tid,i,b.code).then(function(t){t.success?(vex.dialog.alert({message:"Congratulations, you just joined "+(e.name||"your new team")+"!"}),Object.keys(e).length>0&&s(e,n)):window.location=window.location.origin+"/me.html"}):window.location=window.location.origin+"/me.html"}}):b.rdr?Object.keys(e).length>0&&s(e,n):window.location=window.location.origin+"/me.html"}function d(t){vex.dialog.alert(t+"")}function u(t,e){for(var n=document.getElementsByClassName(t),i=0;i<n.length;i++)n[i].innerText=e}function m(t,e){for(var n=document.getElementsByClassName(t),i=0;i<n.length;i++)n[i].src=e}function l(t,e){var n=e.dataset.tab,i=document.getElementById(n);if(i){for(var a=0;a<t.length;a++)t[a].classList.remove("is-active");for(var o=document.getElementsByClassName("tabbed-container"),r=0;r<o.length;r++)o[r].style.display="none";i.style.display="block",e.classList.add("is-active")}}function f(t){w?t(w):vex.dialog.prompt({message:"Enter your team code:",callback:function(e){e?t(e):P>=1?window.location="./":(P++,f(t))}})}var v=t("./config"),g=t("./database"),p=t("./views"),h=(0,g.Database)(firebase,v.config),b=function(t){t=t.split("+").join(" ");for(var e,n={},i=/[?&]?([^=]+)=([^&]*)/g;e=i.exec(t);)n[decodeURIComponent(e[1])]=decodeURIComponent(e[2]);return n}(document.location.search),w=b.team,y=(0,p.Views)(),E=document.getElementById("login"),T=document.getElementById("feedback"),k=document.getElementById("invite"),C=document.getElementsByClassName("charter-tab"),x=document.getElementById("team-name"),L=document.getElementById("team-question"),N=document.getElementById("save-question"),U=document.getElementById("team-expectations"),j=document.getElementById("save-expectations"),D=document.getElementById("my-update"),B=document.getElementById("save-update"),M=document.getElementById("team-updates"),I=document.getElementById("progress-updates");E.addEventListener("click",function(t){h.login(i)}),h.init(i,function(){window.location=window.location.origin+"/login.html"});var P=0},{"./config":1,"./database":2,"./views":4}],4:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.Views=function(){return{getRoleAndUpdateTile:function(t){var e=new Date(t.timestamp),n=moment(e).format("M/D h:mm A"),i=moment(Date.now()).diff(moment(t.timestamp)),a=moment.duration(i).asDays(),o="is-success";a>=5?o="is-danger":a>=3&&(o="is-warning");var r='\n\t\t\t\t<div class="tile is-parent is-vertical is-5">\n\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t<div class="media">\n\t\t\t\t\t\t\t<figure class="media-left">\n\t\t\t\t\t\t\t\t<p class="image is-48x48">\n\t\t\t\t\t\t\t\t\t<img src="'+t.image+'">\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t\t<div class="media-content content">\n\t\t\t\t\t\t\t\t<h3 class="title is-5">'+t.name+'</h3>\n\t\t\t\t\t\t\t\t<p class="subtitle is-6">'+t.role+'</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="tile is-parent is-vertical is-7">\n\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t<span class="tag '+o+'">'+n+"</span> "+t.update+"\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>",s=document.createElement("div");return s.classList.add("tile"),s.innerHTML=r,s},getProgressUpdate:function(t){var e=new Date(t.timestamp),n=moment(e).format("M/D h:mm A"),i=moment(Date.now()).diff(moment(t.timestamp)),a=moment.duration(i).asDays(),o="is-success";a>=5?o="is-danger":a>=3&&(o="is-warning");var r='\n\t\t\t\t<div class="tile is-parent is-vertical is-4">\n\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t<span class="tags has-addons">\n\t\t\t\t\t\t\t<span class="tag '+o+' is-medium">'+n+'</span>\n\t\t\t\t\t\t\t<span class="tag is-medium">\n\t\t\t\t\t\t\t\t<span class="image image-tag-rounded is-32x32">\n\t\t\t\t\t\t\t\t\t<img src="'+t.image+'">\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span class="is-medium">\n\t\t\t\t\t\t\t\t\t'+t.name+'\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="tile is-parent is-vertical is-8">\n\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t'+t.update+"\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>",s=document.createElement("div");return s.classList.add("tile"),s.innerHTML=r,s},getTeamTile:function(t){var e=window.location.origin+"/charter.html?team="+t.tid,n='\n\t\t\t\t<div class="tile is-parent">\n\t\t\t\t\t<div class="tile box is-child">\n\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t<h3 class="title">'+t.name+'</h3>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<a href="'+e+'" class="button is-primary is-outlined">View Team Charter</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>',i=document.createElement("div");return i.classList.add("column"),i.classList.add("is-4"),i.innerHTML=n,i}}}},{}]},{},[3]);
//# sourceMappingURL=maps/main.js.map
