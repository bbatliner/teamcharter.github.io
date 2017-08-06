!function t(e,n,i){function a(r,o){if(!n[r]){if(!e[r]){var l="function"==typeof require&&require;if(!o&&l)return l(r,!0);if(s)return s(r,!0);var c=new Error("Cannot find module '"+r+"'");throw c.code="MODULE_NOT_FOUND",c}var d=n[r]={exports:{}};e[r][0].call(d.exports,function(t){var n=e[r][1][t];return a(n||t)},d,d.exports,t,e,n,i)}return n[r].exports}for(var s="function"==typeof require&&require,r=0;r<i.length;r++)a(i[r]);return a}({1:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i={apiKey:"AIzaSyBWk9EWPkkvqiruG8aYnHV0dBPg1z3EtN4",authDomain:"charter-ecb07.firebaseapp.com",databaseURL:"https://charter-ecb07.firebaseio.com",projectId:"charter-ecb07",storageBucket:"",messagingSenderId:"134239305153"};n.config=i},{}],2:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.Database=function(t,e){var n=t.initializeApp(e,"Charter Database"),i=n.database(),a=n.auth();e.localhost=!0,e.noScreenshots=!0;var s=Prometheus(e,n),r={init:function(t,e){var n=!1;a.onAuthStateChanged(function(i){i?(s.logon(i.uid,{name:i.displayName,email:i.email,image:i.photoURL,uid:i.uid}),n||(n=!0,t(i))):n||(n=!0,e())})},login:function(e){var n=new t.auth.GoogleAuthProvider;a.signInWithPopup(n).then(function(t){t.credential.accessToken;var n=t.user;s.logon(n.uid,{name:n.displayName,email:n.email,image:n.photoURL,uid:n.uid}),e(n)}).catch(function(t){console.error(t)})},getPrometheus:function(){return s},getCurrentUser:function(){return a.currentUser||{}},saveFeedback:function(t,e,n){return i.ref("feedback").push({tid:t,uid:e,feedback:n,timestamp:Date.now()})},getUser:function(t){return new Promise(function(e,n){i.ref("prometheus/users/"+t+"/profile").once("value",function(t){var n=t.val();e(n)}).catch(n)})},getTeam:function(t){return new Promise(function(e,n){i.ref("teams/"+t).once("value",function(t){var n=t.val();e(n)}).catch(n)})},onTeamChange:function(t,e,n){if(!t)throw Error("No team id given.");var a={};i.ref("teams/"+t).on("value",function(t){var n=[],i=t.val()||{},s=i.members||{};for(var o in s)if(!(o in a)){var l=r.getUser(o);l.uid=o,n.push(l)}n.length>0?Promise.all(n).then(function(t){t.forEach(function(t,e){var i=n[e].uid;a[i]=t}),e(i,a)}):e(i,a)})},updateTeamName:function(t,e,n){if(!t)throw Error("No team id given.");return i.ref("edits/"+t).push({field:"name",uid:e,value:n,timestamp:Date.now()}),i.ref("teams/"+t+"/name").set(n)},updateQuestion:function(t,e,n){if(!t)throw Error("No team id given.");return i.ref("edits/"+t).push({field:"question",uid:e,value:n,timestamp:Date.now()}),i.ref("teams/"+t+"/question").set(n)},updateExpectations:function(t,e,n){if(!t)throw Error("No team id given.");return i.ref("edits/"+t).push({field:"expectations",uid:e,value:n,timestamp:Date.now()}),i.ref("teams/"+t+"/expectations").set(n)},submitUpdate:function(t,e,n){if(!t)throw Error("No team id given.");if(!e)throw Error("No user id given.");return s.save({type:"SUBMIT_UPDATE",tid:t,update:n}),i.ref("teams/"+t+"/updates/"+e).push({update:n,timestamp:Date.now()})},addLink:function(t,e,n){if(!t)throw Error("No team id given.");if(!e)throw Error("No user id given.");return s.save({type:"ADD_LINK",tid:t,name:n.name,url:n.url}),i.ref("teams/"+t+"/links").push({name:n.name,url:n.url,uid:e,added:Date.now()})},updateLink:function(t,e,n,a){if(!t)throw Error("No team id given.");if(!e)throw Error("No user id given.");if(!n)throw Error("No link id given.");s.save({type:"UPDATE_LINK",tid:t,name:a.name,url:a.url,key:n});var r=i.ref("teams/"+t+"/links/"+n+"/name").set(a.name),o=i.ref("teams/"+t+"/links/"+n+"/url").set(a.url);return Promise.all([r,o])},removeLink:function(t,e,n){if(!t)throw Error("No team id given.");if(!e)throw Error("No user id given.");if(!n)throw Error("No link id given.");return s.save({type:"REMOVE_LINK",tid:t,key:n}),i.ref("teams/"+t+"/links/"+n).remove()},updateRole:function(t,e,n){if(!t)throw Error("No team id given.");if(!e)throw Error("No user id given.");s.save({type:"UPDATE_ROLE",tid:t,role:n.role,responsibility:n.responsibility});var a=i.ref("teams/"+t+"/members/"+e+"/role").set(n.role),r=i.ref("teams/"+t+"/members/"+e+"/responsibility").set(n.responsibility);return Promise.all([a,r])},joinTeam:function(t,e,n){if(!t)throw Error("No team id given.");if(!e)throw Error("No user id given");return new Promise(function(i,a){r.getTeam(t).then(function(s){n!==s.joinCode&&s.joinCode?i({success:!1}):r.addMember(t,e).then(function(t){i({success:!0})}).catch(a)}).catch(a)})},addMember:function(t,e){return s.save({type:"ADD_MEMBER",tid:t,uid:e}),i.ref("teams/"+t+"/members/"+e).set({status:"member",role:"Team Member",joined:Date.now(),member:!0})},getAllTeams:function(t){return new Promise(function(e,n){i.ref("teams").orderByChild("members/"+t+"/member").startAt(!0).endAt(!0).once("value",function(t){var n=t.val()||{};e(n)}).catch(n)})},createNewTeam:function(t,e,n){return new Promise(function(a,o){i.ref("teams").push({name:n||"New Team Charter",joinCode:e}).then(function(e){var i=e.path.ct,l=i[i.length-1];s.save({type:"CREATE_TEAM",tid:l,name:n}),r.addMember(l,t).then(function(t){a({tid:l})}).catch(o)}).catch(o)})},getInstructorClasses:function(t){return new Promise(function(e,n){i.ref("classes").orderByChild("members/"+t+"/access").startAt(!0).endAt(!0).once("value",function(t){var n=t.val()||{};e(n)}).catch(n)})}};return r}},{}],3:[function(t,e,n){"use strict";function i(t){f(function(e){console.log("What makes working at Omnipointment better than, say, Google?"),u("fill-user-name",t.displayName),m("fill-user-image",t.photoURL);for(var n=0;n<T.length;n++)!function(t){T[t].addEventListener("click",function(e){v(T,T[t])})}(n);v(T,document.querySelectorAll('.charter-tab[data-tab="container-charter"]')[0]);b.getPrometheus();L.addEventListener("click",function(t){vex.dialog.prompt({message:"What feedback do you have to share with us?",callback:function(t){if(t){var n=b.getCurrentUser().uid;b.saveFeedback(e,n,t).then(function(t){vex.dialog.alert("Thank you for your feedback, it really helps us a lot!")}).catch(d)}}})});var i=!1;b.onTeamChange(e,function(t,n){i||(c(e,t,n),i=!0)},d),a(t,e),r(t,e)})}function a(t,e){x.addEventListener("click",function(t){b.getTeam(e).then(function(t){var n=window.location.origin,i=window.location.pathname,a=t.joinCode||!1,s=""+n+i+"?team="+e+(a?"&code="+a:"");vex.dialog.prompt({message:"Send this link to your teammates:",value:s,callback:function(){}})})}),C.addEventListener("input",function(t){var e=t.target.innerText.split("\n").reduce(function(t,e){return e?t+e:t},"");t.target.innerText=e,cursorManager.setEndOfContenteditable(t.target)}),C.addEventListener("keypress",function(t){if(13==(t.keyCode||t.which)){var n=t.target.innerText,i=b.getCurrentUser().uid;b.updateTeamName(e,i,n)}}),I.addEventListener("click",function(t){I.classList.add("is-loading");var n=b.getCurrentUser().uid,i=N.innerText;b.updateQuestion(e,n,i).then(function(t){I.classList.remove("is-loading")}).catch(d)}),U.addEventListener("click",function(t){U.classList.add("is-loading");var n=b.getCurrentUser().uid,i=B.innerText.split("\n"),a=i.pop();!a.length<1&&i.push(a),b.updateExpectations(e,n,i).then(function(t){U.classList.remove("is-loading")}).catch(d)}),D.addEventListener("click",function(t){D.classList.add("is-loading");var n=b.getCurrentUser().uid,i=M.value;b.submitUpdate(e,n,i).then(function(t){D.classList.remove("is-loading"),M.value=""}).catch(d)}),j.addEventListener("click",function(t){s(t,e,"Paste the URL:")}),A.addEventListener("click",function(t){s(t,e,"Paste the link to your Omnipointment:")}),b.onTeamChange(e,function(t,n){Object.keys(t).length>0&&l(e,t,n)},d)}function s(t,e,n){var i=b.getCurrentUser().uid;vex.dialog.prompt({message:n,callback:function(t){t&&vex.dialog.prompt({message:"What is the name of this link?",callback:function(n){t&&n&&(j.classList.add("is-loading"),b.addLink(e,i,{name:n,url:t}).then(function(t){j.classList.remove("is-loading")}).catch(d))}})}})}function r(t,e){b.onTeamChange(e,function(t,n){o(e,t,n)},d)}function o(t,e,n){var i=e.updates||{},a=[];for(var s in i){var r=i[s];for(var o in r){var l=r[o];l.uid=s,l.key=o,a.push(l)}}for(var c in e.members){var d=e.members[c],u=n[c];a.push({update:u.name+" joined the team.",timestamp:d.joined,uid:c,key:c+"-joined"})}if(a.sort(function(t,e){return e.timestamp-t.timestamp}),R.innerHTML="",a.length>0)a.forEach(function(t){var i=n[t.uid],a=k.getProgressUpdate({name:i.name,role:e.members[t.uid].role,image:i.image,update:t.update,timestamp:t.timestamp});R.appendChild(a)});else{var m=document.createElement("div");m.innerHTML='<div class="content">\n\t\t\t<h4>No updates to show :(</h4>\n\t\t</div>',R.appendChild(m)}}function l(t,e,n){var i=e.members||{};e.name&&(u("fill-team-name",e.name),cursorManager.setEndOfContenteditable(C)),e.question&&u("fill-team-question",e.question);var a=e.expectations||[];a.length>0&&(B.innerHTML=a.reduce(function(t,e){return t+"<li>"+e+"</li>"},"")),P.innerHTML="";for(var s in i){var r=n[s],o=i[s];if("member"===o.status){var l=k.getRoleTile({name:r.name,role:o.role,image:r.image,responsibility:o.responsibility||"What are you responsible for?",editable:s===b.getCurrentUser().uid});P.appendChild(l)}}var c=document.getElementById("my-role-save"),m=document.getElementById("my-title"),v=document.getElementById("my-responsibility");c.addEventListener("click",function(e){c.classList.add("is-loading");var n=m.innerText,i=v.innerText,a=b.getCurrentUser().uid;b.updateRole(t,a,{role:n,responsibility:i}).then(function(t){c.classList.remove("is-loading")}).catch(d)}),O.innerHTML="";var f=e.links||{};if(Object.keys(f).length>0){for(var g in f)!function(t){var e=f[t],n=k.getLinkItem({name:e.name,url:e.url,key:t});n.dataset.key=t,n.addEventListener("click",function(n){b.getPrometheus().save({type:"CLICK_TEAM_LINK",key:t,name:e.name,url:e.url})}),O.appendChild(n)}(g)}else{var p=document.createElement("div");p.innerHTML='<div class="content">\n\t\t\t\t<p class="is-6">No links yet.</p>\n\t\t\t</div>',O.appendChild(p)}for(var h=O.getElementsByClassName("edit-link"),y=0;y<h.length;y++)!function(e){h[e].addEventListener("click",function(n){var i=h[e].dataset.for,a=b.getCurrentUser().uid;if(i)var s=f[i],r=vex.dialog.alert({unsafeMessage:'\n\t\t\t\t\t\t<div class="field">\n\t\t\t\t\t\t\t<label class="label">Name</label>\n\t\t\t\t\t\t\t<div class="control">\n\t\t\t\t\t\t\t\t<input id="edit-link-name" type="text" class="input is-primary" value="'+s.name+'">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="field">\n\t\t\t\t\t\t\t<label class="label">URL</label>\n\t\t\t\t\t\t\t<div class="control">\n\t\t\t\t\t\t\t\t<input id="edit-link-url" type="text" class="input is-primary" value="'+s.url+'">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t',buttons:[$.extend({},vex.dialog.buttons.YES,{text:"Save"}),$.extend({},vex.dialog.buttons.NO,{text:"Delete",click:function(e){b.removeLink(t,a,i).catch(d),r.close()}}),$.extend({},vex.dialog.buttons.NO,{text:"Cancel"})],callback:function(e){if(e){var n=document.getElementById("edit-link-name"),s=document.getElementById("edit-link-url");n.value&&s.value&&b.updateLink(t,a,i,{name:n.value,url:s.value}).catch(d)}}})})}(y)}function c(t,e,n){var i=b.getCurrentUser().uid;i in n?Object.keys(e).length>0&&l(t,e,n):y.code?vex.dialog.confirm({message:"Do you want to join "+(e.name||"this team")+"?",buttons:[$.extend({},vex.dialog.buttons.YES,{text:"Yes"}),$.extend({},vex.dialog.buttons.NO,{text:"No"})],callback:function(a){a?b.joinTeam(t,i,y.code).then(function(i){i.success?(vex.dialog.alert({message:"Congratulations, you just joined "+(e.name||"your new team")+"!"}),Object.keys(e).length>0&&l(t,e,n)):window.location=window.location.origin+"/me.html"}):window.location=window.location.origin+"/me.html"}}):y.rdr?Object.keys(e).length>0&&l(t,e,n):window.location=window.location.origin+"/me.html"}function d(t){vex.dialog.alert(t+"")}function u(t,e){for(var n=document.getElementsByClassName(t),i=0;i<n.length;i++)n[i].innerText=e}function m(t,e){for(var n=document.getElementsByClassName(t),i=0;i<n.length;i++)n[i].src=e}function v(t,e){var n=e.dataset.tab,i=document.getElementById(n);if(i){for(var a=0;a<t.length;a++)t[a].classList.remove("is-active");for(var s=document.getElementsByClassName("tabbed-container"),r=0;r<s.length;r++)s[r].style.display="none";i.style.display="block",e.classList.add("is-active")}}function f(t){E?t(E):vex.dialog.prompt({message:"Enter your team code:",callback:function(e){e?t(e):_>=1?window.location="./":(_++,f(t))}})}var g=t("./config"),p=t("./database"),h=t("./views"),b=(0,p.Database)(firebase,g.config),y=function(t){t=t.split("+").join(" ");for(var e,n={},i=/[?&]?([^=]+)=([^&]*)/g;e=i.exec(t);)n[decodeURIComponent(e[1])]=decodeURIComponent(e[2]);return n}(document.location.search),E=y.team,k=(0,h.Views)(),w=document.getElementById("login"),L=document.getElementById("feedback"),x=document.getElementById("invite"),T=document.getElementsByClassName("charter-tab"),C=document.getElementById("team-name"),N=document.getElementById("team-question"),I=document.getElementById("save-question"),B=document.getElementById("team-expectations"),U=document.getElementById("save-expectations"),M=document.getElementById("my-update"),D=document.getElementById("save-update"),P=document.getElementById("team-updates"),j=document.getElementById("add-link"),O=document.getElementById("team-links"),A=document.getElementById("add-meeting"),R=document.getElementById("progress-updates");w.addEventListener("click",function(t){b.login(i)}),b.init(i,function(){window.location=window.location.origin+"/login.html"});var _=0},{"./config":1,"./database":2,"./views":4}],4:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.Views=function(){return{getRoleAndUpdateTile:function(t){var e=new Date(t.timestamp),n=moment(e).format("M/D h:mm A"),i=moment(Date.now()).diff(moment(t.timestamp)),a=moment.duration(i).asDays(),s="is-success";a>=5?s="is-danger":a>=3&&(s="is-warning");var r='\n\t\t\t\t<div class="tile is-parent is-vertical is-5">\n\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t<div class="media">\n\t\t\t\t\t\t\t<figure class="media-left">\n\t\t\t\t\t\t\t\t<p class="image is-48x48">\n\t\t\t\t\t\t\t\t\t<img src="'+t.image+'">\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t\t<div class="media-content content">\n\t\t\t\t\t\t\t\t<h3 class="title is-5">'+t.name+'</h3>\n\t\t\t\t\t\t\t\t<p class="subtitle is-6">'+t.role+'</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="tile is-parent is-vertical is-7">\n\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t<span class="tag '+s+'">'+n+"</span> "+t.update+"\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>",o=document.createElement("div");return o.classList.add("tile"),o.innerHTML=r,o},getRoleTile:function(t){var e='<div class="content">\n\t\t\t\t<h3 class="title is-5">'+t.role+'</h3>\n\t\t\t\t<p class="subtitle is-6">'+t.responsibility+"</p>\n\t\t\t</div>";t.editable&&(e='<div class="content">\n\t\t\t\t\t<h3 id="my-title" class="title is-5" contenteditable="true">'+t.role+'</h3>\n\t\t\t\t\t<p id="my-responsibility" class="subtitle is-6" contenteditable="true">'+t.responsibility+'</p>\n\t\t\t\t\t<button id="my-role-save" class="button is-primary is-outlined">\n\t\t\t\t\t\t<span class="icon">\n\t\t\t\t\t\t\t<i class="fa fa-edit"></i>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span>Save Role</span>\n\t\t\t\t\t</button>\n\t\t\t\t</div>');var n='\n\t\t\t\t<div class="tile is-parent is-vertical is-5">\n\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t<div class="media">\n\t\t\t\t\t\t\t<figure class="media-left">\n\t\t\t\t\t\t\t\t<p class="image is-48x48">\n\t\t\t\t\t\t\t\t\t<img src="'+t.image+'">\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t\t<h3 class="title is-5">'+t.name+'</h3>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="tile is-parent is-vertical is-7">\n\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t'+e+"\n\t\t\t\t\t</div>\n\t\t\t\t</div>",i=document.createElement("div");return i.classList.add("tile"),i.innerHTML=n,i},getProgressUpdate:function(t){var e=new Date(t.timestamp),n=moment(e).format("M/D h:mm A"),i=moment(Date.now()).diff(moment(t.timestamp)),a=moment.duration(i).asDays(),s="is-success";a>=5?s="is-danger":a>=3&&(s="is-warning");var r='\n\t\t\t\t<div class="tile is-parent is-vertical is-5">\n\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t<span class="tags has-addons">\n\t\t\t\t\t\t\t<span class="tag '+s+' is-medium">'+n+'</span>\n\t\t\t\t\t\t\t<span class="tag is-medium">\n\t\t\t\t\t\t\t\t<span class="image image-tag-rounded is-32x32">\n\t\t\t\t\t\t\t\t\t<img src="'+t.image+'">\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span class="is-medium">\n\t\t\t\t\t\t\t\t\t'+t.name+'\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="tile is-parent is-vertical is-7">\n\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t'+t.update+"\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>",o=document.createElement("div");return o.classList.add("tile"),o.innerHTML=r,o},getLinkItem:function(t){var e="file";t.url.indexOf("docs.google")>-1?e="google":t.url.indexOf("omnipointment.com/meeting")>-1&&(e="calendar");var n='\n\t\t\t\t<a target="_blank" href="'+t.url+'">\n\t\t\t\t\t<span class="icon">\n\t\t\t\t\t\t<i class="fa fa-'+e+'"></i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>'+t.name+'</span>\n\t\t\t\t</a>\n\t\t\t\t<a class="is-danger">\n\t\t\t\t\t<span class="icon edit-link" data-for="'+t.key+'">\n\t\t\t\t\t\t<i class="fa fa-edit"></i>\n\t\t\t\t\t</span>\n\t\t\t\t</a>\n\t\t\t',i=document.createElement("div");return i.classList.add("team-link"),i.innerHTML=n,i},getTeamTile:function(t){var e=window.location.origin+"/charter.html?team="+t.tid,n='\n\t\t\t\t<div class="tile is-parent">\n\t\t\t\t\t<div class="tile box is-child">\n\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t<h3 class="title">'+t.name+'</h3>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<a href="'+e+'" class="button is-primary is-outlined">View Team Charter</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>',i=document.createElement("div");return i.classList.add("column"),i.classList.add("is-4"),i.innerHTML=n,i},getClassTile:function(t){var e=window.location.origin+"/class.html?team="+t.cid,n=Object.keys(t.teams).length,i='\n\t\t\t\t<div class="tile is-parent">\n\t\t\t\t\t<div class="tile box is-child">\n\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t<h3 class="title">'+t.name+'</h3>\n\t\t\t\t\t\t\t<p class="subtitle">'+n+" team"+(1===n?"":"s")+'</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<a href="'+e+'" class="button is-primary is-outlined">View Class Progress</a>\n\t\t\t\t\t</div>\n\t\t\t\t</div>',a=document.createElement("div");return a.classList.add("column"),a.classList.add("is-4"),a.innerHTML=i,a}}}},{}]},{},[3]);
//# sourceMappingURL=maps/main.js.map
