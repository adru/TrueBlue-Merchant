(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{119:function(e,a,t){e.exports=t(312)},303:function(e,a,t){},312:function(e,a,t){"use strict";t.r(a);var n,i,r=t(0),o=t.n(r),l=t(16),s=t.n(l),c=(t(76),t(17)),d=t(18),u=t(21),h=t(19),m=t(20),p=t(2),g=t(74),b=t.n(g),f=t(9),v=t.n(f),y=t(31),E=t(28),w=t.n(E),k=t(73),S=t.n(k),O=t(25),j=t.n(O),C=t(40),D=t.n(C),N=t(26),_=t.n(N),R=t(24),x=t.n(R),I=t(6),P=t.n(I),A=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(u.a)(this,Object(h.a)(a).call(this,e))).state={username:"",password:""},t.handleChange=t.handleChange.bind(Object(p.a)(Object(p.a)(t))),t.handleSubmit=t.handleSubmit.bind(Object(p.a)(Object(p.a)(t))),t}return Object(m.a)(a,e),Object(d.a)(a,[{key:"handleChange",value:function(e){this.setState(Object(y.a)({},e.target.name,e.target.value))}},{key:"handleSubmit",value:function(e){console.log("handleSubmit"),e.preventDefault(),this.props.login_handler(this.state)}},{key:"render",value:function(){var e=this.props.classes;return o.a.createElement("div",null,o.a.createElement(S.a,null),o.a.createElement("main",{className:e.layout},o.a.createElement(x.a,{className:e.paper},o.a.createElement(v.a,{component:"h1",variant:"h5"},"Sign in"),o.a.createElement("form",{className:e.form,onSubmit:this.handleSubmit},o.a.createElement(j.a,{margin:"normal",required:!0,fullWidth:!0},o.a.createElement(_.a,{htmlFor:"username"},"Email Address or Username"),o.a.createElement(D.a,{id:"username",name:"username",autoComplete:"email",value:this.state.username,onChange:this.handleChange,autoFocus:!0})),o.a.createElement(j.a,{margin:"normal",required:!0,fullWidth:!0},o.a.createElement(_.a,{htmlFor:"password"},"Password"),o.a.createElement(D.a,{name:"password",type:"password",id:"password",autoComplete:"current-password",value:this.state.password,onChange:this.handleChange})),o.a.createElement(w.a,{type:"submit",fullWidth:!0,variant:"contained",color:"primary",className:e.submit},"Sign in")))))}}]),a}(o.a.Component),L=P()(function(e){return{layout:Object(y.a)({width:"auto",display:"block",marginLeft:3*e.spacing.unit,marginRight:3*e.spacing.unit},e.breakpoints.up(400+3*e.spacing.unit*2),{width:400,marginLeft:"auto",marginRight:"auto"}),paper:{marginTop:e.spacing.unit,display:"flex",flexDirection:"column",alignItems:"center",padding:"".concat(2*e.spacing.unit,"px ").concat(3*e.spacing.unit,"px ").concat(3*e.spacing.unit,"px")},form:{width:"100%",marginTop:e.spacing.unit},submit:{marginTop:3*e.spacing.unit}}})(A),Q=t(113),T=t.n(Q),M=t(50),V=t.n(M),K=t(51),B=t.n(K),F=t(27),U=t.n(F),z=t(22),W=t.n(z),q=t(33),G=t.n(q),H=t(34),J=t.n(H),$=t(32),X=t.n($),Y=t(116),Z=t.n(Y),ee=t(117),ae=t.n(ee),te=t(118),ne=t.n(te),ie=t(115),re=t.n(ie),oe=t(62),le=t.n(oe),se=t(63),ce=t.n(se),de=t(114),ue=t.n(de),he=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(u.a)(this,Object(h.a)(a).call(this,e))).state={addAmount:0,reward_id:"",vip_id:""},t.handleChange=t.handleChange.bind(Object(p.a)(Object(p.a)(t))),t.add=t.add.bind(Object(p.a)(Object(p.a)(t))),t.subtract=t.subtract.bind(Object(p.a)(Object(p.a)(t))),t.handleManualScan=t.handleManualScan.bind(Object(p.a)(Object(p.a)(t))),t.handleManualClaim=t.handleManualClaim.bind(Object(p.a)(Object(p.a)(t))),t.handleVIP=t.handleVIP.bind(Object(p.a)(Object(p.a)(t))),t.handleVIPadd=t.handleVIPadd.bind(Object(p.a)(Object(p.a)(t))),t.handleVIPdelete=t.handleVIPdelete.bind(Object(p.a)(Object(p.a)(t))),t}return Object(m.a)(a,e),Object(d.a)(a,[{key:"componentDidMount",value:function(){this.props.data&&this.props.data.vip&&this.props.data.vip[0]&&this.setState({vip_id:this.props.data.vip[0].id||null})}},{key:"componentDidUpdate",value:function(){}},{key:"handleChange",value:function(e,a){this.setState(Object(y.a)({},a,e.target.value))}},{key:"add",value:function(){this.setState({addAmount:this.state.addAmount+1},function(){console.log(this.state)})}},{key:"subtract",value:function(){this.setState({addAmount:this.state.addAmount-1},function(){console.log(this.state)})}},{key:"handleManualScan",value:function(){var e=this.props,a=e.data,t=e.token,n=this.state.addAmount,i={user_id:a.userDetails[0].id,amount:n,token:t};this.props.handleManualScan(i),this.setState({addAmount:0})}},{key:"handleManualClaim",value:function(){var e=this.props,a=e.data,t=e.token,n=this.state.reward_id,i={user_id:a.userDetails[0].id,reward_id:n,token:t};this.props.handleManualClaim(i),this.setState({reward_id:""})}},{key:"handleVIP",value:function(){"delete"===this.state.vip_id?this.handleVIPdelete():this.handleVIPadd()}},{key:"handleVIPadd",value:function(){var e=this.props.data,a=this.state.vip_id,t={user_id:e.userDetails[0].id,vip_id:a};this.props.handleVIPadd(t)}},{key:"handleVIPdelete",value:function(){var e=this.props.data;this.props.handleVIPdelete(e.userDetails[0].id)}},{key:"render",value:function(){var e=this,a=this.props,t=a.classes,n=a.data,i=a.clientData,r=this.state,l=r.addAmount,s=r.reward_id,c=r.vip_id,d=new Date(1e3*n.userDetails[0].created),u=new Intl.DateTimeFormat("en-US",{year:"numeric",month:"short",day:"numeric"}).format(d);return console.log(i,i.locations),o.a.createElement("div",null,o.a.createElement(V.a,{position:"static",color:"default"},o.a.createElement(B.a,null,o.a.createElement(v.a,{variant:"h5",className:t.flexBox+" "+t.flexItem},n.vip[0]&&o.a.createElement("div",{className:t.vip},n.vip[0].name),n.userDetails[0].name),o.a.createElement("div",{className:t.flexBox},o.a.createElement("div",{className:t.flexItem+" "+t.marginSides},o.a.createElement(v.a,{color:"textSecondary",variant:"caption"},"Joined"),o.a.createElement(v.a,{gutterBottom:!0,component:"p"},u)),o.a.createElement("div",{className:t.flexItem+" "+t.marginSides},o.a.createElement(v.a,{color:"textSecondary",variant:"caption"},"Total points earned"),o.a.createElement(v.a,{gutterBottom:!0,component:"p"},n.userDetails[0].points)),o.a.createElement("div",{className:t.flexItem+" "+t.marginSides},o.a.createElement(v.a,{color:"textSecondary",variant:"caption"},"Total rewards redeemed"),o.a.createElement(v.a,{component:"p"},n.userDetails[0].redeemed_count))))),o.a.createElement("div",{className:t.cardWrapper},o.a.createElement(le.a,{className:t.card},o.a.createElement("div",{className:t.details},o.a.createElement(ce.a,{className:t.content},o.a.createElement(v.a,{variant:"subtitle1"},"Current Points"),o.a.createElement(v.a,{component:"h5",variant:"h5"},n.userDetails[0].current_points),o.a.createElement("div",{className:t.controls},o.a.createElement(U.a,{onClick:this.subtract},o.a.createElement("i",{className:"fas fa-minus"})),o.a.createElement(ue.a,{id:"standard-number",value:l,onChange:function(a){return e.handleChange(a,"addAmount")},type:"number",className:t.textField,margin:"normal"}),o.a.createElement(U.a,{onClick:this.add},o.a.createElement("i",{className:"fas fa-plus"}))),o.a.createElement(w.a,{variant:"contained",disabled:!l,color:"primary",className:t.button,onClick:this.handleManualScan},"Add Points")))),n.clientRewards&&n.clientRewards.length&&o.a.createElement(le.a,{className:t.card},o.a.createElement("div",{className:t.details},o.a.createElement(ce.a,{className:t.content},o.a.createElement(v.a,{variant:"subtitle1"},"Claim Rewards"),o.a.createElement(j.a,{className:t.controls},o.a.createElement(_.a,{htmlFor:"reward_id"},"Reward"),o.a.createElement(G.a,{value:s,onChange:function(a){return e.handleChange(a,"reward_id")},inputProps:{name:"reward_id",id:"reward_id"},className:t.inputBase},o.a.createElement(W.a,{value:""},o.a.createElement("em",null,"None")),n.clientRewards.map(function(e){return o.a.createElement(W.a,{value:e.id,key:e.id},o.a.createElement("span",{dangerouslySetInnerHTML:{__html:e.reward_name+" ("+e.reward_points+" points)"}}))}))),o.a.createElement(w.a,{variant:"contained",disabled:!s,color:"primary",className:t.button,onClick:this.handleManualClaim},"Claim this Reward")))),i&&i.vips&&i.vips.length&&o.a.createElement(le.a,{className:t.card},o.a.createElement("div",{className:t.details},o.a.createElement(ce.a,{className:t.content},o.a.createElement(v.a,{variant:"subtitle1"},"VIP Status"),o.a.createElement(j.a,{className:t.controls},o.a.createElement(_.a,{htmlFor:"vip_id"},"VIP Levels"),o.a.createElement(G.a,{value:c,onChange:function(a){return e.handleChange(a,"vip_id")},inputProps:{name:"vip_id",id:"vip_id"},className:t.inputBase},o.a.createElement(W.a,{value:""},o.a.createElement("em",null,"None")),o.a.createElement(W.a,{value:"delete"},o.a.createElement("em",null,"Remove VIP Status")),i.vips.map(function(e){return o.a.createElement(W.a,{value:e.id,key:e.id},o.a.createElement("span",{dangerouslySetInnerHTML:{__html:e.name+" ("+e.discount+"% discount)"}}))}))),o.a.createElement(w.a,{variant:"contained",disabled:n.vip&&n.vip[0]&&n.vip[0].id==c,color:"primary",className:t.button,onClick:this.handleVIP},"Update VIP Status"))))))}}]),a}(r.Component),me=P()(function(e){return{vip:{borderWidth:2,borderColor:"#000000",borderRadius:3,borderStyle:"solid",padding:"2px 10px",fontSize:14,display:"block",fontWeight:"bold",marginRight:10,background:"#000000",color:"#FFFFFF"},flexBox:{display:"flex"},flexItem:{flexGrow:1,textAlign:"center"},marginSides:{marginRight:e.spacing.unit,marginLeft:e.spacing.unit},cardWrapper:{display:"flex",padding:3*e.spacing.unit,flexWrap:"wrap"},card:{margin:e.spacing.unit,flexGrow:1,textAlign:"center"},details:{display:"flex",flexDirection:"column"},content:{flex:"1 0 auto"},controls:{display:"flex",alignItems:"center",width:200,marginTop:e.spacing.unit,marginBottom:e.spacing.unit,marginLeft:"auto",marginRight:"auto"},inputBase:{width:"100%"},textField:{"& input":{textAlign:"center",fontSize:36}},button:{margin:e.spacing.unit}}})(he),pe=t(61),ge=t.n(pe),be=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(u.a)(this,Object(h.a)(a).call(this,e))).state={quantity:1,location_token:null,unique:!1},t}return Object(m.a)(a,e),Object(d.a)(a,[{key:"componentDidMount",value:function(){this.setState({location_token:this.props.location.location_token},function(){this.props.getQR(this.state)})}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){var e=this.props,a=e.classes,t=e.data,n=this.state.quantity,i="http://trueblue.guru/redirect.php?id="+t.clientData.id+"&e=";return t.displayQR?o.a.createElement("div",null,o.a.createElement(x.a,{title:i+t.displayQR.code,className:a.qrWrapper},o.a.createElement(v.a,{color:"textSecondary",variant:"h6"},n," Point(s)"),o.a.createElement(ge.a,{value:i+t.displayQR.code,size:400,logo:t.clientData.client_icon}))):o.a.createElement("div",null,"Loading QR Code...")}}]),a}(r.Component),fe=P()(function(e){return{qrWrapper:{padding:20,textAlign:"center",margin:20,"& canvas":{width:"50% !important",height:"auto !important",minWidth:240,maxWidth:400}}}})(be),ve=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(u.a)(this,Object(h.a)(a).call(this,e))).state={quantity:1,location_token:null,reward_id:"",reward_name:null},t.handleChange=t.handleChange.bind(Object(p.a)(Object(p.a)(t))),t}return Object(m.a)(a,e),Object(d.a)(a,[{key:"componentDidMount",value:function(){this.setState({location_token:this.props.location.location_token},function(){this.props.data.rewardData&&1===this.props.data.rewardData.length&&this.setState({reward_id:this.props.data.rewardData[0].id,reward_name:this.props.data.rewardData[0].reward_name},function(){this.props.getQR(this.state)})})}},{key:"componentDidUpdate",value:function(){}},{key:"handleChange",value:function(e,a){this.setState(Object(y.a)({},a,e.target.value),function(){this.props.getQR(this.state)})}},{key:"render",value:function(){var e=this,a=this.props,t=a.classes,n=a.data,i=this.state,r=i.reward_id,l=i.reward_name;return n.rewardData?o.a.createElement("div",null,o.a.createElement(x.a,{title:n.displayQR?n.displayQR.code:"",className:t.qrWrapper},n.rewardData&&n.rewardData.length>1?o.a.createElement(j.a,{className:t.controls},o.a.createElement(_.a,{htmlFor:"reward_id"},"Reward"),o.a.createElement(G.a,{value:r,onChange:function(a){return e.handleChange(a,"reward_id")},inputProps:{name:"reward_id",id:"reward_id"},className:t.inputBase},o.a.createElement(W.a,{value:""},o.a.createElement("em",null,"None")),n.rewardData.map(function(e){return o.a.createElement(W.a,{value:e.id,key:e.id},o.a.createElement("span",{dangerouslySetInnerHTML:{__html:e.reward_name+" ("+e.reward_points+" points)"}}))}))):o.a.createElement(v.a,{color:"textSecondary",variant:"h6"},l),n.displayQR&&o.a.createElement(ge.a,{value:n.displayQR.code,size:400,logo:n.clientData.client_icon}))):o.a.createElement("div",null,"Loading QR Code...")}}]),a}(r.Component),ye=P()(function(e){return{qrWrapper:{padding:20,textAlign:"center",margin:20,"& canvas":{width:"50% !important",height:"auto !important",minWidth:240,maxWidth:400}},controls:{display:"flex",alignItems:"center",width:"100%",maxWidth:400,marginTop:e.spacing.unit,marginBottom:e.spacing.unit,marginLeft:"auto",marginRight:"auto"},inputBase:{width:"100%"}}})(ve),Ee=function(e){function a(e){var t;return Object(c.a)(this,a),(t=Object(u.a)(this,Object(h.a)(a).call(this,e))).state={},t}return Object(m.a)(a,e),Object(d.a)(a,[{key:"componentDidMount",value:function(){}},{key:"componentDidUpdate",value:function(){}},{key:"render",value:function(){var e=this.props;e.classes,e.location;return o.a.createElement("div",null,"Orders Area")}}]),a}(r.Component),we=P()(function(e){return{}})(Ee),ke={locationsOpen:!1,selectedLocation:"",userApiKey:null,showArea:"",dialogOpen:!1},Se=function(e){function a(e){var t;return Object(c.a)(this,a),t=Object(u.a)(this,Object(h.a)(a).call(this,e)),n=Object(p.a)(Object(p.a)(t)),t.state=ke,t.handleChange=t.handleChange.bind(Object(p.a)(Object(p.a)(t))),t.handleClose=t.handleClose.bind(Object(p.a)(Object(p.a)(t))),t.handleOpen=t.handleOpen.bind(Object(p.a)(Object(p.a)(t))),t.clearLocation=t.clearLocation.bind(Object(p.a)(Object(p.a)(t))),t.handleLogout=t.handleLogout.bind(Object(p.a)(Object(p.a)(t))),t.handleScan=t.handleScan.bind(Object(p.a)(Object(p.a)(t))),t.showThisArea=t.showThisArea.bind(Object(p.a)(Object(p.a)(t))),t.gotoSettings=t.gotoSettings.bind(Object(p.a)(Object(p.a)(t))),t.scanQR=t.scanQR.bind(Object(p.a)(Object(p.a)(t))),t.handleCloseDialog=t.handleCloseDialog.bind(Object(p.a)(Object(p.a)(t))),t.handleConfirmDialog=t.handleConfirmDialog.bind(Object(p.a)(Object(p.a)(t))),t.continueScan=t.continueScan.bind(Object(p.a)(Object(p.a)(t))),t}return Object(m.a)(a,e),Object(d.a)(a,[{key:"componentWillMount",value:function(){localStorage.getItem("selectedLocation")?this.setState({selectedLocation:parseInt(localStorage.getItem("selectedLocation"))}):this.props.data.clientData.locations&&(1===this.props.data.clientData.locations.length?(localStorage.setItem("selectedLocation",this.props.data.clientData.locations[0].id),this.setState({selectedLocation:parseInt(this.props.data.clientData.locations[0].id)})):this.setState({locationsOpen:!0}))}},{key:"handleChange",value:function(e){this.setState(Object(y.a)({},e.target.name,e.target.value),function(){"selectedLocation"===e.target.name&&localStorage.setItem("selectedLocation",e.target.value)})}},{key:"handleClose",value:function(){this.setState({locationsOpen:!1})}},{key:"handleOpen",value:function(){this.setState({locationsOpen:!0})}},{key:"clearLocation",value:function(){this.setState({selectedLocation:""})}},{key:"handleLogout",value:function(){this.setState(ke,function(){this.props.handleLogout()})}},{key:"showThisArea",value:function(e){this.props.getQR("clear"),this.state.showArea!==e?this.setState({showArea:e}):this.setState({showArea:""})}},{key:"handleScan",value:function(e){e&&this.setState({showArea:"",userApiKey:e},function(){this.props.handleGetUser(this.state.userApiKey)})}},{key:"handleError",value:function(e){console.error(e)}},{key:"gotoSettings",value:function(){cordova.plugins.diagnostic.switchToSettings(function(){console.log("Successfully switched to Settings app")},function(e){this.props.handleSnackbar("Error: "+e,"error")})}},{key:"scanQR",value:function(){cordova.plugins.diagnostic.requestCameraAuthorization(function(e){!0===e||"GRANTED"===e||"authorized"===e||e===cordova.plugins.diagnostic.permissionStatus.GRANTED?n.continueScan():!1===e||"DENIED"===e||e===cordova.plugins.diagnostic.permissionStatus.DENIED?n.setState({dialogOpen:!0}):n.props.handleSnackbar("Error: To complete this action, please allow access to the camera and storage in your settings.","error")},function(e){n.props.handleSnackbar("Error: "+e,"error")})}},{key:"handleCloseDialog",value:function(){this.setState({dialogOpen:!1})}},{key:"handleConfirmDialog",value:function(){this.gotoSettings()}},{key:"continueScan",value:function(){cordova.plugins.barcodeScanner.scan(function(e){e.cancelled||n.handleScan(e.text)},function(e){n.props.handleSnackbar("Error: Scanning failed!","error")})}},{key:"render",value:function(){var e=this,a=this.props,t=a.classes,n=a.data,i=a.getQR,r=this.state,l=r.locationsOpen,s=r.dialogOpen,c=r.selectedLocation,d=r.showArea,u=""!==c?n.clientData.locations.filter(function(e){return e.id===c}):null,h=n.clientData&&"merchant"===n.clientData.client_mode,m=u&&u[0]&&u[0].cart_email,p=!h&&n.rewardData&&n.rewardData.length,g=!(!n.merchantPageData||!n.merchantPageData[0]),b=!(!n.merchantPageData||!n.merchantPageData[0]||!n.merchantPageData[0].icon.includes("left")&&!n.merchantPageData[0].icon.includes("right")),f=n.userData?"userArea":d;return f=b&&!f?"pointsQR":f,o.a.createElement("div",null,o.a.createElement(re.a,{maxWidth:"xs","aria-labelledby":"confirmation-dialog-title",open:s},o.a.createElement(Z.a,{id:"confirmation-dialog-title"},"Permissions Error"),o.a.createElement(ae.a,null,"To complete this action, please allow access to the camera and storage in your settings."),o.a.createElement(ne.a,null,o.a.createElement(w.a,{onClick:this.handleCloseDialog,color:"primary"},"Nevermind"),o.a.createElement(w.a,{onClick:this.handleConfirmDialog,color:"primary"},"Go to Settings"))),n.clientData.client_css&&o.a.createElement("style",null,n.clientData.client_css),(!c||0===u.length)&&n.clientData.locations&&n.clientData.locations.length>1&&o.a.createElement(V.a,{position:"static",color:"primary",className:"appBar"},o.a.createElement(B.a,null,o.a.createElement(j.a,{className:t.formControl},o.a.createElement(_.a,{htmlFor:"location-select"},"Select a location"),o.a.createElement(G.a,{open:l,onClose:this.handleClose,onOpen:this.handleOpen,value:c,onChange:this.handleChange,inputProps:{name:"selectedLocation",id:"location-select"}},o.a.createElement(W.a,{className:t.instructions,value:"",disabled:!0},"Select a location:"),n.clientData.locations.map(function(e){return o.a.createElement(W.a,{value:e.id,key:e.id},o.a.createElement("span",{dangerouslySetInnerHTML:{__html:e.location_name}}))}))),o.a.createElement(J.a,{title:"Logout"},o.a.createElement(U.a,{color:"inherit","aria-label":"Logout",onClick:this.handleLogout},o.a.createElement("i",{className:"fas fa-sign-out"}))))),c&&u[0]&&o.a.createElement(V.a,{position:"static",color:"primary",className:"appBar"},o.a.createElement(B.a,null,o.a.createElement(v.a,{variant:"h5",color:"inherit",className:t.leftBar},o.a.createElement("span",{dangerouslySetInnerHTML:{__html:u[0].location_name}})),h&&o.a.createElement(J.a,{title:"Scan a User QR Code"},o.a.createElement(U.a,{className:"qrScanner"===f||"userArea"===f?t.selectedButton:"",color:"inherit","aria-label":"Scan a User QR Code",onClick:this.scanQR},o.a.createElement("i",{className:"fas fa-user"}))),!h&&o.a.createElement(J.a,{title:"Show Point QR Code"},o.a.createElement(U.a,{className:"pointsQR"===f?t.selectedButton:"",color:"inherit","aria-label":"Show Point QR Code",onClick:function(a){return e.showThisArea("pointsQR")}},o.a.createElement("i",{className:"fas fa-coins"}))),p&&o.a.createElement(J.a,{title:"Show Reward QR Code"},o.a.createElement(U.a,{className:"rewardsQR"===f?t.selectedButton:"",color:"inherit","aria-label":"Show Reward QR Code",onClick:function(a){return e.showThisArea("rewardsQR")}},o.a.createElement("i",{className:"fas fa-stars"}))),m&&o.a.createElement(J.a,{title:"Orders"},o.a.createElement(U.a,{className:"ordersArea"===f?t.selectedButton:"",color:"inherit","aria-label":"Orders",onClick:function(a){return e.showThisArea("ordersArea")}},o.a.createElement("i",{className:"fas fa-receipt"}))),n.clientData.locations&&n.clientData.locations.length>1&&o.a.createElement(J.a,{title:"Select a new location"},o.a.createElement(U.a,{color:"inherit","aria-label":"Select a new location",onClick:this.clearLocation},o.a.createElement("i",{className:"fas fa-building"}))),o.a.createElement(J.a,{title:"Logout"},o.a.createElement(U.a,{color:"inherit","aria-label":"Logout",onClick:this.handleLogout},o.a.createElement("i",{className:"fas fa-sign-out"}))))),c&&u[0]&&(""===f||b)&&!g&&o.a.createElement("div",{className:t.fullscreen},o.a.createElement("div",{className:"verticallyCenter"},h&&o.a.createElement(X.a,{focusRipple:!0,focusVisibleClassName:t.focusVisible,onClick:this.scanQR,className:t.buttonBase},o.a.createElement("div",{className:t.largeIcon},o.a.createElement("i",{className:"fas fa-user fa-lg"})),o.a.createElement(v.a,{variant:"h6",color:"inherit"},"Show User QR Code")),!h&&o.a.createElement(X.a,{focusRipple:!0,focusVisibleClassName:t.focusVisible,onClick:function(a){return e.showThisArea("pointsQR")},className:t.buttonBase},o.a.createElement("div",{className:t.largeIcon},o.a.createElement("i",{className:"fas fa-coins fa-lg"})),o.a.createElement(v.a,{variant:"h6",color:"inherit"},"Point QR Code")),p&&o.a.createElement(X.a,{focusRipple:!0,focusVisibleClassName:t.focusVisible,onClick:function(a){return e.showThisArea("rewardsQR")},className:t.buttonBase},o.a.createElement("div",{className:t.largeIcon},o.a.createElement("i",{className:"fas fa-stars fa-lg"})),o.a.createElement(v.a,{variant:"h6",color:"inherit"},"Reward QR Code")),m&&o.a.createElement(X.a,{focusRipple:!0,focusVisibleClassName:t.focusVisible,onClick:function(a){return e.showThisArea("ordersArea")},className:t.buttonBase},o.a.createElement("div",{className:t.largeIcon},o.a.createElement("i",{className:"fas fa-receipt fa-lg"})),o.a.createElement(v.a,{variant:"h6",color:"inherit"},"Orders")))),(""===f||b)&&g&&o.a.createElement("div",{className:n.merchantPageData[0].icon},n.merchantPageData[0].css&&o.a.createElement("style",null,n.merchantPageData[0].css),o.a.createElement("div",{className:t.page+" page",dangerouslySetInnerHTML:{__html:n.merchantPageData[0].content}})),"qrScanner"===f&&u&&o.a.createElement(T.a,{delay:this.state.delay,onError:this.handleError,onScan:this.handleScan,className:t.qrScanner}),"pointsQR"===f&&u&&o.a.createElement(fe,{data:n,location:u[0],getQR:i}),"rewardsQR"===f&&u&&o.a.createElement(ye,{data:n,location:u[0],getQR:i}),"ordersArea"===f&&u&&o.a.createElement(we,{data:n,location:u[0]}),"userArea"===f&&u&&o.a.createElement(me,{data:n.userData,clientData:n.clientData,token:u[0].location_token,handleManualScan:this.props.handleManualScan,handleManualClaim:this.props.handleManualClaim,handleVIPadd:this.props.handleVIPadd,handleVIPdelete:this.props.handleVIPdelete}))}}]),a}(r.Component),Oe=P()(function(e){return{formControl:{margin:e.spacing.unit,flexGrow:1,color:"#FFF"},instructions:{background:"#333 !important",color:"#FFF",height:10,fontSize:14,opacity:1},leftBar:{flexGrow:1},qrScanner:{width:"100%","& section":{paddingTop:"calc(100vh - 60px) !important"}},fullscreen:{height:"calc(100vh - 60px) !important",textAlign:"center"},focusVisible:{},largeIcon:{padding:"20px 0","& .fa-lg":{fontSize:50}},buttonBase:{verticalAlign:"top",display:"inline-block",width:200,"& i":{padding:"10px auto"}},selectedButton:{background:"rgba(0,0,0,0.5)"},page:{minHeight:"calc(100vh - 64px)",boxSizing:"border-box"}}})(Se),je=(t(303),"http://live.trueblue.guru/application/v1.5/admin"),Ce={apiKey:null,adminData:null,clientData:null,userData:null,snackbarOpen:!1,snackbarMessage:"",snackbarClass:"",merchantPageData:null,displayQR:null},De=function(e){function a(e){var t;return Object(c.a)(this,a),t=Object(u.a)(this,Object(h.a)(a).call(this,e)),i=Object(p.a)(Object(p.a)(t)),t.state=Ce,t.showSnackbar=t.showSnackbar.bind(Object(p.a)(Object(p.a)(t))),t.hideSnackbar=t.hideSnackbar.bind(Object(p.a)(Object(p.a)(t))),t.handleLogout=t.handleLogout.bind(Object(p.a)(Object(p.a)(t))),t.adminLogin=t.adminLogin.bind(Object(p.a)(Object(p.a)(t))),t.apiLogin=t.apiLogin.bind(Object(p.a)(Object(p.a)(t))),t.getClient=t.getClient.bind(Object(p.a)(Object(p.a)(t))),t.getUser=t.getUser.bind(Object(p.a)(Object(p.a)(t))),t.getRewards=t.getRewards.bind(Object(p.a)(Object(p.a)(t))),t.getMerchantPage=t.getMerchantPage.bind(Object(p.a)(Object(p.a)(t))),t.getQR=t.getQR.bind(Object(p.a)(Object(p.a)(t))),t.handleManualScan=t.handleManualScan.bind(Object(p.a)(Object(p.a)(t))),t.handleManualClaim=t.handleManualClaim.bind(Object(p.a)(Object(p.a)(t))),t.handleVIPadd=t.handleVIPadd.bind(Object(p.a)(Object(p.a)(t))),t.handleVIPdelete=t.handleVIPdelete.bind(Object(p.a)(Object(p.a)(t))),t}return Object(m.a)(a,e),Object(d.a)(a,[{key:"showSnackbar",value:function(e,a){this.setState({snackbarOpen:!0,snackbarMessage:e,snackbarClass:a})}},{key:"hideSnackbar",value:function(){this.setState({snackbarOpen:!1,snackbarMessage:"",snackbarClass:""})}},{key:"handleLogout",value:function(){localStorage.removeItem("apiKey"),localStorage.removeItem("selectedLocation"),this.setState(Ce)}},{key:"componentDidMount",value:function(){localStorage.getItem("apiKey")&&i.setState({apiKey:localStorage.getItem("apiKey")},function(){i.apiLogin({api_key:i.state.apiKey})}),this.testConnection()}},{key:"componentDidUpdate",value:function(){}},{key:"testConnection",value:function(){console.log("testConnection"),fetch(je+"/client",{method:"get",headers:{Authorization:"static_test",Tbapikey:"static_test"}}).then(function(e){return e.json()}).then(function(e){console.log(e)})}},{key:"adminLogin",value:function(e){console.log("adminLogin",e,je),fetch(je+"/login",{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8"},body:this.xwwwfurlenc(e)}).then(function(e){return e.json()}).then(function(e){e.error?i.showSnackbar("Error: "+e.message,"error"):i.setState({adminData:e,apiKey:e.apiKey},function(){localStorage.setItem("apiKey",i.state.apiKey),i.getClient(i.state.adminData.client_id)})})}},{key:"apiLogin",value:function(e){fetch(je+"/api_login",{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8"},body:this.xwwwfurlenc(e)}).then(function(e){return e.json()}).then(function(e){e.error?i.setState({apiKey:null}):i.setState({adminData:e,apiKey:e.apiKey},function(){i.getClient(i.state.adminData.client_id)})})}},{key:"getClient",value:function(){fetch(je+"/client",{method:"get",headers:{Authorization:this.state.apiKey,Tbapikey:this.state.apiKey}}).then(function(e){return e.json()}).then(function(e){e.error||(i.setState({clientData:e.client[0]}),i.getRewards(),i.getMerchantPage())})}},{key:"getUser",value:function(e){fetch(je+"/users/"+e,{method:"get",headers:{Authorization:this.state.apiKey,Tbapikey:this.state.apiKey}}).then(function(e){return e.json()}).then(function(e){e.error||i.setState({userData:e})})}},{key:"getRewards",value:function(){fetch(je+"/rewards",{method:"get",headers:{Authorization:this.state.apiKey,Tbapikey:this.state.apiKey}}).then(function(e){return e.json()}).then(function(e){e.error||i.setState({rewardData:e.rewards})})}},{key:"getMerchantPage",value:function(){fetch(je+"/pages",{method:"get",headers:{Authorization:this.state.apiKey,Tbapikey:this.state.apiKey}}).then(function(e){return e.json()}).then(function(e){e.error||i.setState({merchantPageData:e.pages})})}},{key:"getQR",value:function(e){"clear"===e?i.setState({displayQR:null}):fetch(je+"/qr",{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8",Authorization:this.state.apiKey,Tbapikey:this.state.apiKey},body:this.xwwwfurlenc(e)}).then(function(e){return e.json()}).then(function(e){e.error?i.setState({displayQR:null}):i.setState({displayQR:e})})}},{key:"handleManualScan",value:function(e){fetch(je+"/scan_points",{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8",Authorization:this.state.apiKey,Tbapikey:this.state.apiKey},body:this.xwwwfurlenc(e)}).then(function(e){return e.json()}).then(function(e){e.error?i.showSnackbar("Error: "+e.message,"error"):(i.showSnackbar("Points have been updated.","success"),i.getUser(i.state.userData.userDetails[0].api_key))})}},{key:"handleManualClaim",value:function(e){fetch(je+"/claim_scan",{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8",Authorization:this.state.apiKey,Tbapikey:this.state.apiKey},body:this.xwwwfurlenc(e)}).then(function(e){return e.json()}).then(function(e){e.error?i.showSnackbar("Error: "+e.message,"error"):(i.showSnackbar("Reward has been claimed.","success"),i.getUser(i.state.userData.userDetails[0].api_key))})}},{key:"handleVIPadd",value:function(e){fetch(je+"/vip",{method:"post",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8",Authorization:this.state.apiKey,Tbapikey:this.state.apiKey},body:this.xwwwfurlenc(e)}).then(function(e){return e.json()}).then(function(e){e.error?i.showSnackbar("Error: "+e.message,"error"):(i.showSnackbar("VIP status has been updated.","success"),i.getUser(i.state.userData.userDetails[0].api_key))})}},{key:"handleVIPdelete",value:function(e){fetch(je+"/vip/"+e,{method:"delete",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=utf-8",Authorization:this.state.apiKey,Tbapikey:this.state.apiKey}}).then(function(e){return e.json()}).then(function(e){e.error?i.showSnackbar("Error: "+e.message,"error"):(i.showSnackbar("VIP status has been removed.","success"),i.getUser(i.state.userData.userDetails[0].api_key))})}},{key:"xwwwfurlenc",value:function(e){if("object"!==typeof e&&"undefined"!==typeof console)return console.log('"srcjson" is not a JSON object'),null;for(var a=encodeURIComponent,t="",n=Object.keys(e),i=0;i<n.length;i++)t+=a(n[i])+"="+a(e[n[i]]),i<n.length-1&&(t+="&");return t}},{key:"render",value:function(){var e=this.state,a=e.snackbarOpen,t=e.snackbarMessage,n=e.snackbarClass;return this.state.apiKey?this.state.apiKey?this.state.clientData?o.a.createElement("div",null,o.a.createElement(b.a,{anchorOrigin:{vertical:"top",horizontal:"center"},open:a,onClose:this.hideSnackbar,message:t,className:n}),o.a.createElement(Oe,{data:this.state,handleGetUser:this.getUser,handleManualScan:this.handleManualScan,handleManualClaim:this.handleManualClaim,handleVIPadd:this.handleVIPadd,handleVIPdelete:this.handleVIPdelete,handleLogout:this.handleLogout,handleSnackbar:this.showSnackbar,getQR:this.getQR})):o.a.createElement("div",null,"Loading..."):void 0:o.a.createElement("center",null,o.a.createElement(b.a,{anchorOrigin:{vertical:"top",horizontal:"center"},open:a,onClose:this.hideSnackbar,message:t,className:n}),o.a.createElement("img",{src:"icon.png",alt:"TrueBlue",className:"login-icon",style:{margin:"30px 0 10px"}}),o.a.createElement(v.a,{variant:"h4",className:"login-h4",color:"inherit"},"TrueBlue Merchant"),o.a.createElement(L,{login_handler:this.adminLogin}))}}]),a}(r.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var Ne=function(){s.a.render(o.a.createElement(De,null),document.getElementById("root"))};window.cordova?document.addEventListener("deviceready",Ne,!1):Ne(),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()}),console.log("hello!"),alert("hello~")},76:function(e,a,t){}},[[119,2,1]]]);
//# sourceMappingURL=main.c1f646b8.chunk.js.map