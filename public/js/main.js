!function t(e,n,i){function a(r,o){if(!n[r]){if(!e[r]){var l="function"==typeof require&&require;if(!o&&l)return l(r,!0);if(s)return s(r,!0);var d=new Error("Cannot find module '"+r+"'");throw d.code="MODULE_NOT_FOUND",d}var c=n[r]={exports:{}};e[r][0].call(c.exports,function(t){var n=e[r][1][t];return a(n||t)},c,c.exports,t,e,n,i)}return n[r].exports}for(var s="function"==typeof require&&require,r=0;r<i.length;r++)a(i[r]);return a}({1:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i={apiKey:"AIzaSyBWk9EWPkkvqiruG8aYnHV0dBPg1z3EtN4",authDomain:"charter-ecb07.firebaseapp.com",databaseURL:"https://charter-ecb07.firebaseio.com",projectId:"charter-ecb07",storageBucket:"",messagingSenderId:"134239305153"};n.config=i},{}],2:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.Database=function(t,e){var n=t.initializeApp(e,"Charter Database"),i=n.database(),a=n.auth();e.localhost=!0,e.noScreenshots=!0;var s=Prometheus(e,n),r={init:function(t,e){var n=!1;a.onAuthStateChanged(function(i){i?(s.logon(i.uid,{name:i.displayName,email:i.email,image:i.photoURL,uid:i.uid}),n||(n=!0,t(i))):n||(n=!0,e())})},login:function(e,n){var i=new t.auth.GoogleAuthProvider;"facebook"===n&&(i=new t.auth.FacebookAuthProvider),a.signInWithPopup(i).then(function(t){t.credential.accessToken;var n=t.user,i="Unknown Provider";try{i=n.providerData[0].providerId}catch(t){console.error(t)}s.logon(n.uid,{name:n.displayName,email:n.email,image:n.photoURL,uid:n.uid,provider:i}),e(n)}).catch(function(t){console.error(t)})},getPrometheus:function(){return s},getCurrentUser:function(){return a.currentUser||{}},saveFeedback:function(t,e,n){return i.ref("feedback").push({tid:t,uid:e,feedback:n,timestamp:Date.now()})},getUser:function(t){if(!t)throw Error("No user id given.");return new Promise(function(e,n){i.ref("prometheus/users/"+t+"/profile").once("value",function(t){var n=t.val();e(n)}).catch(n)})},getTeam:function(t){if(!t)throw Error("No team id given.");return new Promise(function(e,n){i.ref("teams/"+t).once("value",function(n){var i=n.val()||{};Object.keys(i).length>0?(i.tid=t,e(i)):e({})}).catch(n)})},getTeamEdits:function(t){if(!t)throw Error("No team id given.");return new Promise(function(e,n){i.ref("edits/"+t).once("value",function(t){var n=t.val()||{};e(n)}).catch(n)})},onTeamChange:function(t,e,n){if(!t)throw Error("No team id given.");var a={};i.ref("teams/"+t).on("value",function(t){var n=[],i=t.val()||{},s=i.members||{};for(var o in s)if(!(o in a))if("template"===s[o].status)a[o]={name:"Unknown",image:"./public/img/no-user.png",uid:o,email:"team@omnipointment.com"};else{var l=r.getUser(o);l.uid=o,n.push(l)}n.length>0?Promise.all(n).then(function(t){t.forEach(function(t,e){var i=n[e].uid;a[i]=t}),e(i,a)}):e(i,a)})},updateTeamName:function(t,e,n){if(!t)throw Error("No team id given.");return i.ref("edits/"+t).push({field:"name",uid:e,value:n,timestamp:Date.now()}),i.ref("teams/"+t+"/name").set(n)},updateQuestion:function(t,e,n){if(!t)throw Error("No team id given.");return i.ref("edits/"+t).push({field:"question",uid:e,value:n,timestamp:Date.now()}),i.ref("teams/"+t+"/question").set(n)},updateExpectations:function(t,e,n){if(!t)throw Error("No team id given.");return i.ref("edits/"+t).push({field:"expectations",uid:e,value:n,timestamp:Date.now()}),i.ref("teams/"+t+"/expectations").set(n)},submitUpdate:function(t,e,n){if(!t)throw Error("No team id given.");if(!e)throw Error("No user id given.");return s.save({type:"SUBMIT_UPDATE",tid:t,update:n}),i.ref("teams/"+t+"/updates/"+e).push({update:n,timestamp:Date.now()})},addLink:function(t,e,n){if(!t)throw Error("No team id given.");if(!e)throw Error("No user id given.");return s.save({type:"ADD_LINK",tid:t,name:n.name,url:n.url}),i.ref("edits/"+t).push({field:"link",uid:e,value:n,timestamp:Date.now()}),i.ref("teams/"+t+"/links").push({name:n.name,url:n.url,uid:e,added:Date.now()})},updateLink:function(t,e,n,a){if(!t)throw Error("No team id given.");if(!e)throw Error("No user id given.");if(!n)throw Error("No link id given.");s.save({type:"UPDATE_LINK",tid:t,name:a.name,url:a.url,key:n}),a.key=n,i.ref("edits/"+t).push({field:"link",uid:e,value:a,timestamp:Date.now()});var r=i.ref("teams/"+t+"/links/"+n+"/name").set(a.name),o=i.ref("teams/"+t+"/links/"+n+"/url").set(a.url);return Promise.all([r,o])},removeLink:function(t,e,n){if(!t)throw Error("No team id given.");if(!e)throw Error("No user id given.");if(!n)throw Error("No link id given.");return s.save({type:"REMOVE_LINK",tid:t,key:n}),i.ref("edits/"+t).push({field:"link",uid:e,value:{removed:!0,key:n},timestamp:Date.now()}),i.ref("teams/"+t+"/links/"+n).remove()},updateRole:function(t,e,n){if(!t)throw Error("No team id given.");if(!e)throw Error("No authoring user id given.");n.uid||(n.uid=e),s.save({type:"UPDATE_ROLE",tid:t,uid:n.uid,role:n.role,responsibility:n.responsibility}),i.ref("edits/"+t).push({field:"role",uid:e,value:n,timestamp:Date.now()});var a=i.ref("teams/"+t+"/members/"+n.uid+"/role").set(n.role),r=i.ref("teams/"+t+"/members/"+n.uid+"/responsibility").set(n.responsibility);return Promise.all([a,r])},addTemplateRole:function(t,e){return s.save({type:"ADD_TEMPLATE_ROLE",tid:t}),i.ref("teams/"+t+"/members").push({status:"template",role:"Team Member",joined:Date.now(),member:!0,icon:"user"})},updateRoleIcon:function(t,e,n){if(!t)throw Error("No team id given.");if(!e)throw Error("No authoring user id given.");return s.save({type:"UPDATE_ROLE_ICON",tid:t,uid:n.uid,icon:n.icon}),n.uid||(n.uid=e),i.ref("edits/"+t).push({field:"role",uid:e,value:n,timestamp:Date.now()}),i.ref("teams/"+t+"/members/"+n.uid+"/icon").set(n.icon)},joinTeam:function(t,e,n){if(!t)throw Error("No team id given.");if(!e)throw Error("No user id given");return new Promise(function(i,a){r.getTeam(t).then(function(s){n!==s.joinCode&&s.joinCode?i({success:!1}):r.addMember(t,e).then(function(t){i({success:!0})}).catch(a)}).catch(a)})},addMember:function(t,e){return s.save({type:"ADD_MEMBER",tid:t,uid:e}),i.ref("teams/"+t+"/members/"+e).set({status:"member",role:"Team Member",joined:Date.now(),member:!0})},removeMember:function(t,e,n){return s.save({type:"REMOVE_MEMBER",tid:t,uid:n}),i.ref("teams/"+t+"/members/"+n).remove()},getAllTeams:function(t){return new Promise(function(e,n){i.ref("teams").orderByChild("members/"+t+"/member").startAt(!0).endAt(!0).once("value",function(t){var n=t.val()||{};e(n)}).catch(n)})},createNewTeam:function(t,e,n){return new Promise(function(a,o){i.ref("teams").push({name:n||"New Team Charter",joinCode:e}).then(function(e){var i=e.path.ct,l=i[i.length-1];s.save({type:"CREATE_TEAM",tid:l,name:n}),r.addMember(l,t).then(function(t){a({tid:l})}).catch(o)}).catch(o)})},getInstructorClasses:function(t){return new Promise(function(e,n){i.ref("classes").orderByChild("members/"+t+"/access").startAt(!0).endAt(!0).once("value",function(t){var i=t.val()||{},a=Object.keys(i).map(function(t){var e=i[t];return e.cid=t,e});if(a.length>0){var s=[];a.forEach(function(t){var e=t.cid;for(var n in t.teams)!function(t){var n=new Promise(function(e,n){r.getTeam(t).then(e).catch(n)});n.cid=e,s.push(n)}(n)}),Promise.all(s).then(function(t){t.forEach(function(t,e){var n=s[e];i[n.cid]&&i[n.cid].teams[t.tid]&&(i[n.cid].teams[t.tid]=t)}),e(i)}).catch(n)}else e({})}).catch(n)})},addTeamToClass:function(t,e,n){return new Promise(function(e,a){i.ref("classes/"+n).once("value",function(r){var o=r.val();o?(s.save({type:"ADD_TEAM_TO_CLASS",tid:t,classCode:n}),i.ref("classes/"+n+"/teams/"+t).set({access:!0,joined:Date.now()}).then(function(t){e(o)}).catch(a)):a("Could not find a class with code: "+n+".")})})},addInstructorToClass:function(t,e){return new Promise(function(n,a){i.ref("classes/"+e).once("value",function(r){var o=r.val();if(o){var l=o.members||{};t in l?n({isAlreadyInstructor:!0,classData:o}):(s.save({type:"ADD_INSTRUCTOR_TO_CLASS",classCode:e}),i.ref("classes/"+e+"/members/"+t).set({access:!0,type:"instructor",joined:Date.now()}).then(function(t){n({isAlreadyInstructor:!1,classData:o})}).catch(a))}else a("Could not find a class with code: "+e+".")})})},getInstructorsByClass:function(t){}};return r}},{}],3:[function(t,e,n){"use strict";function i(t,e){T.addEventListener("click",function(t){b.getTeam(e).then(function(t){var n=window.location.origin,i=window.location.pathname,a=t.joinCode||!1,s=""+n+i+"?team="+e+(a?"&code="+a:"");vex.dialog.prompt({message:"Send this link to your teammates:",value:s,callback:function(){}})})}),C.addEventListener("click",function(t){vex.dialog.prompt({message:"Enter the code from your instructor (case sensitive):",callback:function(t){if(t){var n=b.getCurrentUser().uid;b.addTeamToClass(e,n,t).then(function(t){vex.dialog.alert({message:"Successfully added your team to "+t.name+"!"})}).catch(c)}}})}),x.addEventListener("click",function(t){var n=""+window.location.origin+window.location.pathname+"?team="+e+"&mentor=true";vex.dialog.prompt({message:"Send this link to a mentor:",value:n,callback:function(){}})}),I.addEventListener("click",function(t){if(!d()){var n=t.target.innerText;vex.dialog.prompt({message:"Edit your team name:",value:n,callback:function(t){if(t){var n=b.getCurrentUser().uid;b.updateTeamName(e,n,t)}}})}}),A.addEventListener("click",function(t){A.classList.add("is-loading");var n=b.getCurrentUser().uid,i=D.innerText;b.updateQuestion(e,n,i).then(function(t){A.classList.remove("is-loading")}).catch(c)}),U.addEventListener("click",function(t){U.classList.add("is-loading");var n=b.getCurrentUser().uid,i=M.innerText.split("\n"),a=i.pop();!a.length<1&&i.push(a),b.updateExpectations(e,n,i).then(function(t){U.classList.remove("is-loading")}).catch(c)}),B.addEventListener("click",function(t){B.classList.add("is-loading");var n=b.getCurrentUser().uid,i=P.value;b.submitUpdate(e,n,i).then(function(t){B.classList.remove("is-loading"),P.value=""}).catch(c)}),O.addEventListener("click",function(t){a(t,e,"Paste the URL:")}),_.addEventListener("click",function(t){a(t,e,"Paste the link to your Omnipointment:")}),b.onTeamChange(e,function(t,n){Object.keys(t).length>0&&o(e,t,n)},c)}function a(t,e,n){var i=b.getCurrentUser().uid;vex.dialog.prompt({message:n,callback:function(t){t&&vex.dialog.prompt({message:"What is the name of this link?",callback:function(n){t&&n&&(O.classList.add("is-loading"),b.addLink(e,i,{name:n,url:t}).then(function(t){O.classList.remove("is-loading")}).catch(c))}})}})}function s(t,e){b.onTeamChange(e,function(t,n){"template"===t.status||r(e,t,n)},c)}function r(t,e,n){var i=e.updates||{},a=[];for(var s in i){var r=i[s];for(var o in r){var l=r[o];l.uid=s,l.key=o,a.push(l)}}for(var d in e.members){var c=e.members[d],u=n[d];a.push({update:u.name+" joined the team.",timestamp:c.joined,uid:d,key:d+"-joined"})}if(a.sort(function(t,e){return e.timestamp-t.timestamp}),S.innerHTML="",a.length>0)a.forEach(function(t){var i=n[t.uid];if(t.update.length>0){var a=k.getProgressUpdate({name:i.name,role:e.members[t.uid].role,image:i.image,update:t.update,timestamp:t.timestamp});S.appendChild(a)}});else{var m=document.createElement("div");m.innerHTML='<div class="content">\n\t\t\t<h4>No updates to show :(</h4>\n\t\t</div>',S.appendChild(m)}}function o(t,e,n){var i=e.members||{};e.name&&u("fill-team-name",e.name),e.question&&u("fill-team-question",e.question);var a=e.expectations||[];a.length>0&&(M.innerHTML=a.reduce(function(t,e){return t+"<li>"+e+"</li>"},"")),"template"===e.status&&(document.getElementById("header-subtitle").innerHTML='Team Charter <span class="tag is-warning">Template</span>',document.querySelectorAll("[data-tab=container-progress]")[0].style.display="none");var s="template"===e.status;R.innerHTML="";for(var r in i){var o=n[r],l=i[r];if("member"!==l.status||s){if("template"===l.status){var m=k.getRoleTemplateTile({name:o.name,role:l.role,image:o.image,icon:l.icon,responsibility:l.responsibility||"What are you responsible for?",editable:!d(),uid:r,onSave:function(e){var n=b.getCurrentUser().uid,i=e.model.uid;b.updateRole(t,n,{role:e.role,responsibility:e.responsibility,uid:i})},onIconEdit:function(e){var n=b.getCurrentUser().uid,i=e.model.uid;vex.dialog.prompt({message:"Change icon for "+e.model.role+"?",value:e.model.icon,callback:function(e){b.updateRoleIcon(t,n,{uid:i,icon:e})}})}});R.appendChild(m)}}else{var v=k.getRoleTile({name:o.name,role:l.role,image:o.image,responsibility:l.responsibility||"What are you responsible for?",editable:r===b.getCurrentUser().uid&&!d()});R.appendChild(v)}}if(s){var f=document.createElement("div");f.classList.add("field"),f.classList.add("is-grouped"),f.classList.add("is-grouped-centered"),f.classList.add("is-hidden-to-mentor"),f.innerHTML='\n\t\t\t<div class="control">\n\t\t\t\t<button data-bind="button-add-role" class="button is-primary is-outlined">\n\t\t\t\t\t<span class="icon">\n\t\t\t\t\t\t<i class="fa fa-user"></i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>Add Role</span>\n\t\t\t\t</button>\n\t\t\t\t<button data-bind="button-remove-role" class="button is-danger is-outlined">\n\t\t\t\t\t<span class="icon">\n\t\t\t\t\t\t<i class="fa fa-remove"></i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>Remove Role</span>\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t',f.querySelectorAll("[data-bind=button-add-role]")[0].addEventListener("click",function(e){var n=b.getCurrentUser().uid;b.addTemplateRole(t,n)}),f.querySelectorAll("[data-bind=button-remove-role]")[0].addEventListener("click",function(e){var a='\n\t\t\t\t<div class="content">\n\t\t\t\t\t<h5 class="title">Enter the Number of the Role to Remove</h5>\n\t\t\t\t\t<ul>',s=1,r={};for(var o in i){n[o];var l=i[o];"template"===l.status&&(a+="<li>"+s+": "+l.role+"</li>",r[s]=o,s++)}a+="\n\t\t\t\t\t</ul>\n\t\t\t\t\t<br>\n\t\t\t\t</div>",vex.dialog.prompt({unsafeMessage:a,callback:function(e){if(e){var n=b.getCurrentUser().uid,i=parseInt(e,10),a=r[i];a&&b.removeMember(t,n,a)}}})}),R.appendChild(f)}var p=document.getElementById("my-role-save"),g=document.getElementById("my-title"),h=document.getElementById("my-responsibility");p&&g&&h&&p.addEventListener("click",function(e){p.classList.add("is-loading");var n=g.innerText,i=h.innerText,a=b.getCurrentUser().uid;b.updateRole(t,a,{role:n,responsibility:i}).then(function(t){p.classList.remove("is-loading")}).catch(c)}),j.innerHTML="";var y=e.links||{};if(Object.keys(y).length>0){for(var E in y)!function(t){var e=y[t],n=k.getLinkItem({name:e.name,url:e.url,key:t});n.dataset.key=t,n.addEventListener("click",function(n){b.getPrometheus().save({type:"CLICK_TEAM_LINK",key:t,name:e.name,url:e.url})}),j.appendChild(n)}(E)}else{var w=document.createElement("div");w.innerHTML='<div class="content">\n\t\t\t\t<p class="is-6">No links yet.</p>\n\t\t\t</div>',j.appendChild(w)}for(var L=j.getElementsByClassName("edit-link"),T=0;T<L.length;T++)!function(e){L[e].addEventListener("click",function(n){var i=L[e].dataset.for,a=b.getCurrentUser().uid;if(i)var s=y[i],r=vex.dialog.alert({unsafeMessage:'\n\t\t\t\t\t\t<div class="field">\n\t\t\t\t\t\t\t<label class="label">Name</label>\n\t\t\t\t\t\t\t<div class="control">\n\t\t\t\t\t\t\t\t<input id="edit-link-name" type="text" class="input is-primary" value="'+s.name+'">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="field">\n\t\t\t\t\t\t\t<label class="label">URL</label>\n\t\t\t\t\t\t\t<div class="control">\n\t\t\t\t\t\t\t\t<input id="edit-link-url" type="text" class="input is-primary" value="'+s.url+'">\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t',buttons:[$.extend({},vex.dialog.buttons.YES,{text:"Save"}),$.extend({},vex.dialog.buttons.NO,{text:"Delete",click:function(e){b.removeLink(t,a,i).catch(c),r.close()}}),$.extend({},vex.dialog.buttons.NO,{text:"Cancel"})],callback:function(e){if(e){var n=document.getElementById("edit-link-name"),s=document.getElementById("edit-link-url");n.value&&s.value&&b.updateLink(t,a,i,{name:n.value,url:s.value}).catch(c)}}})})}(T)}function l(t,e,n){if(d()){console.log("in mentor mode"),document.body.classList.add("mentoring");for(var i=document.querySelectorAll("[contenteditable=true]"),a=0;a<i.length;a++)i[a].setAttribute("contenteditable",!1)}var s=b.getCurrentUser().uid;s in n||d()?Object.keys(e).length>0&&o(t,e,n):y.code?vex.dialog.confirm({message:"Do you want to join "+(e.name||"this team")+"?",buttons:[$.extend({},vex.dialog.buttons.YES,{text:"Yes"}),$.extend({},vex.dialog.buttons.NO,{text:"No"})],callback:function(i){i?b.joinTeam(t,s,y.code).then(function(i){i.success?(vex.dialog.alert({message:"Congratulations, you just joined "+(e.name||"your new team")+"!"}),Object.keys(e).length>0&&o(t,e,n)):window.location=window.location.origin+"/me.html"}):window.location=window.location.origin+"/me.html"}}):window.location=window.location.origin+"/me.html"}function d(){return w}function c(t){vex.dialog.alert(t+"")}function u(t,e){for(var n=document.getElementsByClassName(t),i=0;i<n.length;i++)n[i].innerText=e}function m(t,e){for(var n=document.getElementsByClassName(t),i=0;i<n.length;i++)n[i].src=e}function v(t,e){var n=e.dataset.tab,i=document.getElementById(n);if(i){b.getPrometheus().save({type:"CHANGE_TAB",tid:E,tab:n});for(var a=0;a<t.length;a++)t[a].classList.remove("is-active");for(var s=document.getElementsByClassName("tabbed-container"),r=0;r<s.length;r++)s[r].style.display="none";i.style.display="block",e.classList.add("is-active")}}function f(t){E?t(E):vex.dialog.prompt({message:"Enter your team code:",callback:function(e){e?t(e):q>=1?window.location="./":(q++,f(t))}})}var p=t("./config"),g=t("./database"),h=t("./views"),b=(0,g.Database)(firebase,p.config),y=function(t){t=t.split("+").join(" ");for(var e,n={},i=/[?&]?([^=]+)=([^&]*)/g;e=i.exec(t);)n[decodeURIComponent(e[1])]=decodeURIComponent(e[2]);return n}(document.location.search),E=y.team,w=!!y.mentor,k=(0,h.Views)(),L=(document.getElementById("login"),document.getElementById("feedback")),T=document.getElementById("invite"),C=document.getElementById("class-code"),x=document.getElementById("mentor-link"),N=document.getElementsByClassName("charter-tab"),I=document.getElementById("team-name"),D=document.getElementById("team-question"),A=document.getElementById("save-question"),M=document.getElementById("team-expectations"),U=document.getElementById("save-expectations"),P=document.getElementById("my-update"),B=document.getElementById("save-update"),R=document.getElementById("team-updates"),O=document.getElementById("add-link"),j=document.getElementById("team-links"),_=document.getElementById("add-meeting"),S=document.getElementById("progress-updates");b.init(function(t){f(function(e){console.log("What makes working at Omnipointment better than, say, Google?"),u("fill-user-name",t.displayName),m("fill-user-image",t.photoURL);for(var n=0;n<N.length;n++)!function(t){N[t].addEventListener("click",function(e){v(N,N[t])})}(n);v(N,document.querySelectorAll('.charter-tab[data-tab="container-charter"]')[0]),b.getPrometheus(),L.addEventListener("click",function(t){vex.dialog.prompt({message:"What feedback do you have to share with us?",callback:function(t){if(t){var n=b.getCurrentUser().uid;b.saveFeedback(e,n,t).then(function(t){vex.dialog.alert("Thank you for your feedback, it really helps us a lot!")}).catch(c)}}})});var a=!1;b.onTeamChange(e,function(t,n){a||(l(e,t,n),a=!0)},c),b.getPrometheus().save({type:"CHARTER_PAGE",tid:e,mentor:d()}),i(0,e),s(0,e)})},function(){window.location=window.location.origin+"/login.html"+document.location.search});var q=0},{"./config":1,"./database":2,"./views":4}],4:[function(t,e,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0});n.Views=function(){return{getRoleAndUpdateTile:function(t){var e=new Date(t.timestamp),n=moment(e).format("M/D h:mm A"),i=moment(Date.now()).diff(moment(t.timestamp)),a=moment.duration(i).asDays(),s="is-success";a>=5?s="is-danger":a>=3&&(s="is-warning");var r='\n\t\t\t\t<div class="tile is-parent is-vertical is-5">\n\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t<div class="media">\n\t\t\t\t\t\t\t<figure class="media-left">\n\t\t\t\t\t\t\t\t<p class="image is-48x48">\n\t\t\t\t\t\t\t\t\t<img src="'+t.image+'">\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t\t<div class="media-content content">\n\t\t\t\t\t\t\t\t<h3 class="title is-5">'+t.name+'</h3>\n\t\t\t\t\t\t\t\t<p class="subtitle is-6">'+t.role+'</p>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="tile is-parent is-vertical is-7">\n\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t<span class="tag '+s+'">'+n+"</span> "+t.update+"\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>",o=document.createElement("div");return o.classList.add("tile"),o.innerHTML=r,o},getRoleTile:function(t){var e='<div class="content">\n\t\t\t\t<h3 class="title is-5">'+t.role+'</h3>\n\t\t\t\t<p class="subtitle is-6">'+t.responsibility+"</p>\n\t\t\t</div>";t.editable&&(e='<div class="content">\n\t\t\t\t\t<h3 id="my-title" class="title is-5" contenteditable="true">'+t.role+'</h3>\n\t\t\t\t\t<p id="my-responsibility" class="subtitle is-6" contenteditable="true">'+t.responsibility+'</p>\n\t\t\t\t\t<button id="my-role-save" class="button is-primary is-outlined is-hidden-to-mentor">\n\t\t\t\t\t\t<span class="icon">\n\t\t\t\t\t\t\t<i class="fa fa-edit"></i>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span>Save Role</span>\n\t\t\t\t\t</button>\n\t\t\t\t</div>');var n='\n\t\t\t\t<div class="tile is-parent is-vertical is-5">\n\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t<div class="media">\n\t\t\t\t\t\t\t<figure class="media-left">\n\t\t\t\t\t\t\t\t<p class="image is-48x48">\n\t\t\t\t\t\t\t\t\t<img src="'+t.image+'">\n\t\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t\t<h3 class="title is-5">'+t.name+'</h3>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="tile is-parent is-vertical is-7">\n\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t'+e+"\n\t\t\t\t\t</div>\n\t\t\t\t</div>",i=document.createElement("div");return i.classList.add("tile"),i.innerHTML=n,i},getRoleTemplateTile:function(t){var e='<div class="content">\n\t\t\t\t<h3 class="title is-5">'+t.role+'</h3>\n\t\t\t\t<p class="subtitle is-6">'+t.responsibility+"</p>\n\t\t\t</div>",n="";t.editable&&(e='<div class="content">\n\t\t\t\t\t<h3 data-bind="field-role" class="title is-5" contenteditable="true">'+t.role+'</h3>\n\t\t\t\t\t<p data-bind="field-responsibility" class="subtitle is-6" contenteditable="true">'+t.responsibility+"</p>\n\t\t\t\t</div>",n='\n\t\t\t\t<div class="tile is-parent is-vertical is-4">\n\t\t\t\t\t<button data-bind="button-save" class="button is-primary is-outlined is-hidden-to-mentor">\n\t\t\t\t\t\t<span class="icon">\n\t\t\t\t\t\t\t<i class="fa fa-edit"></i>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t\t<span>Save Role</span>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t\t');var i='\n\t\t\t\t<div class="tile is-parent is-vertical {model.editable ? \'is-8\' : \'is-12\'}">\n\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t<div class="media">\n\t\t\t\t\t\t\t<figure class="media-left">\n\t\t\t\t\t\t\t\t<div data-bind="field-icon" class="image is-48x48 icon-image">\n\t\t\t\t\t\t\t\t\t<i class="fa fa-'+(t.icon||"user")+'"></i>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t\t\t'+e+"\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t"+n+"\n\t\t\t",a=document.createElement("div");if(a.classList.add("tile"),a.innerHTML=i,t.editable&&t.onSave){var s=a.querySelectorAll("[data-bind=button-save]")[0],r=a.querySelectorAll("[data-bind=field-role]")[0],o=a.querySelectorAll("[data-bind=field-responsibility]")[0];s.addEventListener("click",function(e){t.onSave({e:e,model:t,role:r.innerText,responsibility:o.innerText})}),a.querySelectorAll("[data-bind=field-icon]")[0].addEventListener("click",function(e){t.onIconEdit({e:e,model:t})})}return a},getProgressUpdate:function(t){var e=new Date(t.timestamp),n=moment(e).format("M/D h:mm A"),i=moment(Date.now()).diff(moment(t.timestamp)),a=moment.duration(i).asDays(),s="is-success";a>=5?s="is-danger":a>=3&&(s="is-warning");var r='\n\t\t\t\t<div class="tile is-parent is-vertical is-5">\n\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t<span class="tags has-addons">\n\t\t\t\t\t\t\t<span class="tag '+s+' is-medium">'+n+'</span>\n\t\t\t\t\t\t\t<span class="tag is-medium">\n\t\t\t\t\t\t\t\t<span class="image image-tag-rounded is-32x32">\n\t\t\t\t\t\t\t\t\t<img src="'+t.image+'">\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t\t<span class="is-medium">\n\t\t\t\t\t\t\t\t\t'+t.name+'\n\t\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t\t</span>\n\t\t\t\t\t\t</span>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="tile is-parent is-vertical is-7">\n\t\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t'+t.update+"\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>",o=document.createElement("div");return o.classList.add("tile"),o.innerHTML=r,o},getLinkItem:function(t){var e="file";t.url.indexOf("docs.google")>-1?e="google":t.url.indexOf("omnipointment.com/meeting")>-1&&(e="calendar");var n='\n\t\t\t\t<a target="_blank" href="'+t.url+'">\n\t\t\t\t\t<span class="icon">\n\t\t\t\t\t\t<i class="fa fa-'+e+'"></i>\n\t\t\t\t\t</span>\n\t\t\t\t\t<span>'+t.name+'</span>\n\t\t\t\t</a>\n\t\t\t\t<a class="is-danger is-hidden-to-mentor">\n\t\t\t\t\t<span class="icon edit-link" data-for="'+t.key+'">\n\t\t\t\t\t\t<i class="fa fa-edit"></i>\n\t\t\t\t\t</span>\n\t\t\t\t</a>\n\t\t\t',i=document.createElement("div");return i.classList.add("team-link"),i.innerHTML=n,i},getTeamTile:function(t){var e=window.location.origin+"/charter.html?team="+t.tid,n='\n\t\t\t\t<div class="tile is-vertical">\n\t\t\t\t\t<div class="box">\n\t\t\t\t\t\t<div class="tile">\n\t\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t\t<h3 class="title">'+t.name+" "+(t.isTemplate?'<span class="tag is-warning">Template</span>':"")+'</h3>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="tile">\n\t\t\t\t\t\t\t<a href="'+e+'" class="button is-primary is-outlined">View Team Charter</a>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>',i=document.createElement("div");return i.classList.add("column"),i.classList.add("is-4"),i.innerHTML=n,i},getClassTile:function(t){var e=window.location.origin,n=e+"/class.html?class="+t.cid,i=Object.keys(t.teams).filter(function(e){return Object.keys(t.teams[e]).length>0}).map(function(e){var n=t.teams[e];return n.tid=e,n}),a=i.length,s=(i.map(function(t){return'\n\t\t\t\t\t<div class="column is-4">\n\t\t\t\t\t\t<a href='+e+"/charter.html?team="+t.tid+'&mentor=true class="button is-primary is-outlined is-fullwidth">'+t.name+"</a>\n\t\t\t\t\t</div>\n\t\t\t\t"}),'\n\t\t\t\t<div class="tile is-vertical">\n\t\t\t\t\t<div class="tile box is-child">\n\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t<h3 class="title">'+t.name+'</h3>\n\t\t\t\t\t\t\t<p class="subtitle">'+a+" team"+(1===a?"":"s")+" | Code: "+t.cid+'</p>\n\t\t\t\t\t\t\t<a href="'+n+'" class="button is-primary is-outlined">View Class Dashboard</a>\n\t\t\t');s+="\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>";var r=document.createElement("div");return r.classList.add("column"),r.classList.add("is-4"),r.innerHTML=s,r},getUserTile:function(t){var e='\n\t\t\t\t<div class="tile is-child">\n\t\t\t\t\t<div class="media">\n\t\t\t\t\t\t<figure class="media-left">\n\t\t\t\t\t\t\t<p class="image is-48x48 image-tag-rounded">\n\t\t\t\t\t\t\t\t<img src="'+t.image+'">\n\t\t\t\t\t\t\t</p>\n\t\t\t\t\t\t</figure>\n\t\t\t\t\t\t<div class="content">\n\t\t\t\t\t\t\t<h3 class="title is-5">'+t.name+'</h3>\n\t\t\t\t\t\t\t<p class="subtitle is-6">'+t.subtitle+"</p>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t",n=document.createElement("div");return n.classList.add("column"),n.classList.add("is-4"),n.innerHTML=e,n},getClassTeamTable:function(t){var e="\n\t\t\t\t<thead>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<th>Team Name</th>\n\t\t\t\t\t\t<th>Members</th>\n\t\t\t\t\t\t<th>Charter Edits</th>\n\t\t\t\t\t\t<th>Progress Updates</th>\n\t\t\t\t\t\t<th>Last Active</th>\n\t\t\t\t\t\t<th>View Team</th>\n\t\t\t\t\t</tr>\n\t\t\t\t</thead>\n\t\t\t\t<tbody>\n\t\t\t";t.teams.forEach(function(t){var n=0;for(var i in t.updates)for(var a in t.updates[i])n++;var s=origin+"/charter.html?team="+t.tid+"&mentor=true";e+="\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td>"+t.name+"</td>\n\t\t\t\t\t\t<td>"+Object.keys(t.members).length+"</td>\n\t\t\t\t\t\t<td>"+Object.keys(t.edits).length+"</td>\n\t\t\t\t\t\t<td>"+n+"</td>\n\t\t\t\t\t\t<td>"+moment(t.lastAccess).fromNow()+'</td>\n\t\t\t\t\t\t<td>\n\t\t\t\t\t\t\t<a href="'+s+'" class="button is-primary is-outlined">View Charter</a>\n\t\t\t\t\t\t</td>\n\t\t\t\t\t</tr>\n\t\t\t\t'}),e+="\n\t\t\t\t</tbody>\n\t\t\t";var n=document.createElement("table");return n.classList.add("table"),n.classList.add("is-narrow"),n.classList.add("is-fullwidth"),n.innerHTML=e,n}}}},{}]},{},[3]);
//# sourceMappingURL=maps/main.js.map
