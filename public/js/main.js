!function t(e,n,i){function a(o,s){if(!n[o]){if(!e[o]){var d="function"==typeof require&&require;if(!s&&d)return d(o,!0);if(r)return r(o,!0);var c=new Error("Cannot find module '"+o+"'");throw c.code="MODULE_NOT_FOUND",c}var u=n[o]={exports:{}};e[o][0].call(u.exports,function(t){var n=e[o][1][t];return a(n||t)},u,u.exports,t,e,n,i)}return n[o].exports}for(var r="function"==typeof require&&require,o=0;o<i.length;o++)a(i[o]);return a}({1:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i={apiKey:"AIzaSyBWk9EWPkkvqiruG8aYnHV0dBPg1z3EtN4",authDomain:"charter-ecb07.firebaseapp.com",databaseURL:"https://charter-ecb07.firebaseio.com",projectId:"charter-ecb07",storageBucket:"",messagingSenderId:"134239305153"};n.config=i},{}],2:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.Database=function(t,e){var n=t.initializeApp(e,"Charter Database"),i=n.database(),a=n.auth();e.localhost=!0,e.noScreenshots=!0;var r=Prometheus(e,n),o={init:function(t,e){var n=!1;a.onAuthStateChanged(function(i){i?(r.logon(i.uid,{name:i.displayName,email:i.email,image:i.photoURL,uid:i.uid}),n||(n=!0,t(i))):n||(n=!0,e())})},login:function(e){var n=new t.auth.GoogleAuthProvider;a.signInWithPopup(n).then(function(t){t.credential.accessToken;var n=t.user;r.logon(n.uid,{name:n.displayName,email:n.email,image:n.photoURL,uid:n.uid}),e(n)}).catch(function(t){console.error(t)})},getPrometheus:function(){return r},getCurrentUser:function(){return a.currentUser||{}},saveFeedback:function(t,e,n){return i.ref("feedback").push({tid:t,uid:e,feedback:n,timestamp:Date.now()})},getUser:function(t){return new Promise(function(e,n){i.ref("prometheus/users/"+t+"/profile").once("value",function(t){var n=t.val();e(n)}).catch(n)})},getTeam:function(t){return new Promise(function(e,n){i.ref("teams/"+t).once("value",function(t){var n=t.val();e(n)}).catch(n)})},onTeamChange:function(t,e,n){if(!t)throw Error("No team id given.");var a={};i.ref("teams/"+t).on("value",function(t){var n=[],i=t.val()||{},r=i.members||{};for(var s in r)if(!(s in a)){var d=o.getUser(s);d.uid=s,n.push(d)}n.length>0?Promise.all(n).then(function(t){t.forEach(function(t,e){var i=n[e].uid;a[i]=t}),e(i,a)}):e(i,a)})},updateTeamName:function(t,e,n){if(!t)throw Error("No team id given.");return i.ref("edits/"+t).push({field:"name",uid:e,value:n,timestamp:Date.now()}),i.ref("teams/"+t+"/name").set(n)},updateQuestion:function(t,e,n){if(!t)throw Error("No team id given.");return i.ref("edits/"+t).push({field:"question",uid:e,value:n,timestamp:Date.now()}),i.ref("teams/"+t+"/question").set(n)},updateExpectations:function(t,e,n){if(!t)throw Error("No team id given.");return i.ref("edits/"+t).push({field:"expectations",uid:e,value:n,timestamp:Date.now()}),i.ref("teams/"+t+"/expectations").set(n)},submitUpdate:function(t,e,n){if(!t)throw Error("No team id given.");if(!e)throw Error("No user id given.");return r.save({type:"SUBMIT_UPDATE",tid:t,update:n}),i.ref("teams/"+t+"/updates/"+e).push({update:n,timestamp:Date.now()})},addLink:function(t,e,n){if(!t)throw Error("No team id given.");if(!e)throw Error("No user id given.");return r.save({type:"ADD_LINK",tid:t,name:n.name,url:n.url}),i.ref("teams/"+t+"/links").push({name:n.name,url:n.url,uid:e,added:Date.now()})},updateLink:function(t,e,n,a){if(!t)throw Error("No team id given.");if(!e)throw Error("No user id given.");if(!n)throw Error("No link id given.");r.save({type:"UPDATE_LINK",tid:t,name:a.name,url:a.url,key:n});var o=i.ref("teams/"+t+"/links/"+n+"/name").set(a.name),s=i.ref("teams/"+t+"/links/"+n+"/url").set(a.url);return Promise.all([o,s])},removeLink:function(t,e,n){if(!t)throw Error("No team id given.");if(!e)throw Error("No user id given.");if(!n)throw Error("No link id given.");return r.save({type:"REMOVE_LINK",tid:t,key:n}),i.ref("teams/"+t+"/links/"+n).remove()},joinTeam:function(t,e,n){if(!t)throw Error("No team id given.");if(!e)throw Error("No user id given");return new Promise(function(i,a){o.getTeam(t).then(function(r){n!==r.joinCode&&r.joinCode?i({success:!1}):o.addMember(t,e).then(function(t){i({success:!0})}).catch(a)}).catch(a)})},addMember:function(t,e){return r.save({type:"ADD_MEMBER",tid:t,uid:e}),i.ref("teams/"+t+"/members/"+e).set({status:"member",role:"Team Member",joined:Date.now(),member:!0})},getAllTeams:function(t){return new Promise(function(e,n){i.ref("teams").orderByChild("members/"+t+"/member").startAt(!0).endAt(!0).once("value",function(t){var n=t.val()||{};e(n)}).catch(n)})},createNewTeam:function(t,e,n){return new Promise(function(a,s){i.ref("teams").push({name:n||"New Team Charter",joinCode:e}).then(function(e){var i=e.path.ct,d=i[i.length-1];r.save({type:"CREATE_TEAM",tid:d,name:n}),o.addMember(d,t).then(function(t){a({tid:d})}).catch(s)}).catch(s)})}};return o}},{}],3:[function(t,e,n){"use strict";function i(t){v(function(e){console.log("What makes working at Omnipointment better than, say, Google?"),l("fill-user-name",t.displayName),m("fill-user-image",t.photoURL);for(var n=0;n<T.length;n++)!function(t){T[t].addEventListener("click",function(e){f(T,T[t])})}(n);f(T,document.querySelectorAll('.charter-tab[data-tab="container-charter"]')[0]);b.getPrometheus();L.addEventListener("click",function(t){vex.dialog.prompt({message:"What feedback do you have to share with us?",callback:function(t){if(t){var n=b.getCurrentUser().uid;b.saveFeedback(e,n,t).then(function(t){vex.dialog.alert("Thank you for your feedback, it really helps us a lot!")}).catch(u)}}})});var i=!1;b.onTeamChange(e,function(t,n){i||(c(e,t,n),i=!0)},u),a(t,e),o(t,e)})}function a(t,e){x.addEventListener("click",function(t){b.getTeam(e).then(function(t){var n=window.location.origin,i=window.location.pathname,a=t.joinCode||!1,r=""+n+i+"?team="+e+(a?"&code="+a:"");vex.dialog.prompt({message:"Send this link to your teammates:",value:r,callback:function(){}})})}),N.addEventListener("input",function(t){var e=t.target.innerText.split("\n").reduce(function(t,e){return e?t+e:t},"");t.target.innerText=e,cursorManager.setEndOfContenteditable(t.target)}),N.addEventListener("keypress",function(t){if(13==(t.keyCode||t.which)){var n=t.target.innerText,i=b.getCurrentUser().uid;b.updateTeamName(e,i,n)}}),U.addEventListener("click",function(t){U.classList.add("is-loading");var n=b.getCurrentUser().uid,i=C.innerText;b.updateQuestion(e,n,i).then(function(t){U.classList.remove("is-loading")}).catch(u)}),B.addEventListener("click",function(t){B.classList.add("is-loading");var n=b.getCurrentUser().uid,i=I.innerText.split("\n"),a=i.pop();!a.length<1&&i.push(a),b.updateExpectations(e,n,i).then(function(t){B.classList.remove("is-loading")}).catch(u)}),M.addEventListener("click",function(t){M.classList.add("is-loading");var n=b.getCurrentUser().uid,i=D.value;b.submitUpdate(e,n,i).then(function(t){M.classList.remove("is-loading"),D.value=""}).catch(u)}),P.addEventListener("click",function(t){r(t,e,"Paste the URL:")}),A.addEventListener("click",function(t){window.open("https://www.omnipointment.com/meeting/create");r(t,e,"Paste the link to your Omnipointment:")}),b.onTeamChange(e,function(t,n){Object.keys(t).length>0&&d(e,t,n)},u)}function r(t,e,n){var i=b.getCurrentUser().uid;vex.dialog.prompt({message:n,callback:function(t){t&&vex.dialog.prompt({message:"What is the name of this link?",callback:function(n){t&&n&&(P.classList.add("is-loading"),b.addLink(e,i,{name:n,url:t}).then(function(t){P.classList.remove("is-loading")}).catch(u))}})}})}function o(t,e){b.onTeamChange(e,function(t,n){s(e,t,n)},u)}function s(t,e,n){var i=e.updates||{},a=[];for(var r in i){var o=i[r];for(var s in o){var d=o[s];d.uid=r,d.key=s,a.push(d)}}for(var c in e.members){var u=e.members[c],l=n[c];a.push({update:l.name+" joined the team.",timestamp:u.joined,uid:c,key:c+"-joined"})}if(a.sort(function(t,e){return e.timestamp-t.timestamp}),_.innerHTML="",a.length>0)a.forEach(function(t){var i=n[t.uid],a=E.getProgressUpdate({name:i.name,role:e.members[t.uid].role,image:i.image,update:t.update,timestamp:t.timestamp});_.appendChild(a)});else{var m=document.createElement("div");m.innerHTML='<div class="content">\n\t\t\t<h4>No updates to show :(</h4>\n\t\t</div>',_.appendChild(m)}}function d(t,e,n){var i=e.members||{};e.name&&(l("fill-team-name",e.name),cursorManager.setEndOfContenteditable(N)),e.question&&l("fill-team-question",e.question);var a=e.expectations||[];a.length>0&&(I.innerHTML=a.reduce(function(t,e){return t+"<li>"+e+"</li>"},""));var r=e.updates||{};j.innerHTML="";for(var o in i)!function(t){var a=n[t],o=r[t]||{},s=Object.keys(o).map(function(t){return o[t]}).sort(function(t,e){return e.timestamp-t.timestamp})[0],d="No updates yet.",c=i[t].joined;s&&(d=s.update,c=s.timestamp);var u=E.getRoleAndUpdateTile({name:a.name,role:e.members[t].role,image:a.image,update:d,timestamp:c});j.appendChild(u)}(o);O.innerHTML="";var s=e.links||{};for(var d in s){var c=s[d],m=E.getLinkItem({name:c.name,url:c.url,key:d});O.appendChild(m)}for(var f=O.getElementsByClassName("edit-link"),v=0;v<f.length;v++)!function(e){f[e].addEventListener("click",function(n){var i=f[e].dataset.for,a=b.getCurrentUser().uid;if(i)var r=s[i],o=vex.dialog.alert({unsafeMessage:'\n\t\t\t\t\t\t<div class="field">\n\t\t\t\t\t\t\t<label class="label">Name</label>\n\t\t\t\t\t\t\t<div class="control">\n\t\t\t\t\t\t\t\t<input id="edit-link-name" type="text" class="input is-primary" value="'+r.name+'">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="field">\n\t\t\t\t\t\t\t<label class="label">URL</label>\n\t\t\t\t\t\t\t<div class="control">\n\t\t\t\t\t\t\t\t<input id="edit-link-url" type="text" class="input is-primary" value="'+r.url+'">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t',buttons:[$.extend({},vex.dialog.buttons.YES,{text:"Save"}),$.extend({},vex.dialog.buttons.NO,{text:"Delete",click:function(e){b.removeLink(t,a,i).catch(u),o.close()}}),$.extend({},vex.dialog.buttons.NO,{text:"Cancel"})],callback:function(e){if(e){var n=document.getElementById("edit-link-name"),r=document.getElementById("edit-link-url");n.value&&r.value&&b.updateLink(t,a,i,{name:n.value,url:r.value}).catch(u)}}})})}(v)}function c(t,e,n){var i=b.getCurrentUser().uid;i in n?Object.keys(e).length>0&&d(t,e,n):w.code?vex.dialog.confirm({message:"Do you want to join "+(e.name||"this team")+"?",buttons:[$.extend({},vex.dialog.buttons.YES,{text:"Yes"}),$.extend({},vex.dialog.buttons.NO,{text:"No"})],callback:function(a){a?b.joinTeam(t,i,w.code).then(function(i){i.success?(vex.dialog.alert({message:"Congratulations, you just joined "+(e.name||"your new team")+"!"}),Object.keys(e).length>0&&d(t,e,n)):window.location=window.location.origin+"/me.html"}):window.location=window.location.origin+"/me.html"}}):w.rdr?Object.keys(e).length>0&&d(t,e,n):window.location=window.location.origin+"/me.html"}function u(t){vex.dialog.alert(t+"")}function l(t,e){for(var n=document.getElementsByClassName(t),i=0;i<n.length;i++)n[i].innerText=e}function m(t,e){for(var n=document.getElementsByClassName(t),i=0;i<n.length;i++)n[i].src=e}function f(t,e){var n=e.dataset.tab,i=document.getElementById(n);if(i){for(var a=0;a<t.length;a++)t[a].classList.remove("is-active");for(var r=document.getElementsByClassName("tabbed-container"),o=0;o<r.length;o++)r[o].style.display="none";i.style.display="block",e.classList.add("is-active")}}function v(t){y?t(y):vex.dialog.prompt({message:"Enter your team code:",callback:function(e){e?t(e):q>=1?window.location="./":(q++,v(t))}})}var g=t("./config"),p=t("./database"),h=t("./views"),b=(0,p.Database)(firebase,g.config),w=function(t){t=t.split("+").join(" ");for(var e,n={},i=/[?&]?([^=]+)=([^&]*)/g;e=i.exec(t);)n[decodeURIComponent(e[1])]=decodeURIComponent(e[2]);return n}(document.location.search),y=w.team,E=(0,h.Views)(),k=document.getElementById("login"),L=document.getElementById("feedback"),x=document.getElementById("invite"),T=document.getElementsByClassName("charter-tab"),N=document.getElementById("team-name"),C=document.getElementById("team-question"),U=document.getElementById("save-question"),I=document.getElementById("team-expectations"),B=document.getElementById("save-expectations"),D=document.getElementById("my-update"),M=document.getElementById("save-update"),j=document.getElementById("team-updates"),P=document.getElementById("add-link"),O=document.getElementById("team-links"),A=document.getElementById("add-meeting"),_=document.getElementById("progress-updates");k.addEventListener("click",function(t){b.login(i)}),b.init(i,function(){window.location=window.location.origin+"/login.html"});var q=0},{"./config":1,"./database":2,"./views":4}],4:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.Views=function(){return{getRoleAndUpdateTile:function(t){var e=new Date(t.timestamp),n=moment(e).format("M/D h:mm A"),i=moment(Date.now()).diff(moment(t.timestamp)),a=moment.duration(i).asDays(),r="is-success";a>=5?r="is-danger":a>=3&&(r="is-warning");var o='\n\t\t\t\t<div class="tile is-parent is-vertical is-5">\n\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t<div class="media">\n\t\t\t\t\t\t\t<figure class="media-left">\n\t\t\t\t\t\t\t\t<p class="image is-48x48">\n\t\t\t\t\t\t\t\t\t<img src="'+t.image+'">\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t\t<div class="media-content content">\n\t\t\t\t\t\t\t\t<h3 class="title is-5">'+t.name+'</h3>\n\t\t\t\t\t\t\t\t<p class="subtitle is-6">'+t.role+'</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="tile is-parent is-vertical is-7">\n\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t<span class="tag '+r+'">'+n+"</span> "+t.update+"\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>",s=document.createElement("div");return s.classList.add("tile"),s.innerHTML=o,s},getProgressUpdate:function(t){var e=new Date(t.timestamp),n=moment(e).format("M/D h:mm A"),i=moment(Date.now()).diff(moment(t.timestamp)),a=moment.duration(i).asDays(),r="is-success";a>=5?r="is-danger":a>=3&&(r="is-warning");var o='\n\t\t\t\t<div class="tile is-parent is-vertical is-5">\n\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t<span class="tags has-addons">\n\t\t\t\t\t\t\t<span class="tag '+r+' is-medium">'+n+'</span>\n\t\t\t\t\t\t\t<span class="tag is-medium">\n\t\t\t\t\t\t\t\t<span class="image image-tag-rounded is-32x32">\n\t\t\t\t\t\t\t\t\t<img src="'+t.image+'">\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span class="is-medium">\n\t\t\t\t\t\t\t\t\t'+t.name+'\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="tile is-parent is-vertical is-7">\n\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t'+t.update+"\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>",s=document.createElement("div");return s.classList.add("tile"),s.innerHTML=o,s},getLinkItem:function(t){var e="file";t.url.indexOf("docs.google")>-1?e="google":t.url.indexOf("omnipointment.com/meeting")>-1&&(e="calendar");var n='\n\t\t\t\t<a target="_blank" href="'+t.url+'">\n\t\t\t\t\t<span class="icon">\n\t\t\t\t\t\t<i class="fa fa-'+e+'"></i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>'+t.name+'</span>\n\t\t\t\t</a>\n\t\t\t\t<a class="is-danger">\n\t\t\t\t\t<span class="icon edit-link" data-for="'+t.key+'">\n\t\t\t\t\t\t<i class="fa fa-edit"></i>\n\t\t\t\t\t</span>\n\t\t\t\t</a>\n\t\t\t',i=document.createElement("div");return i.classList.add("team-link"),i.innerHTML=n,i},getTeamTile:function(t){var e=window.location.origin+"/charter.html?team="+t.tid,n='\n\t\t\t\t<div class="tile is-parent">\n\t\t\t\t\t<div class="tile box is-child">\n\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t<h3 class="title">'+t.name+'</h3>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<a href="'+e+'" class="button is-primary is-outlined">View Team Charter</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>',i=document.createElement("div");return i.classList.add("column"),i.classList.add("is-4"),i.innerHTML=n,i}}}},{}]},{},[3]);
//# sourceMappingURL=maps/main.js.map
