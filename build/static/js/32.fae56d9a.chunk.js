"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[32],{32:function(e,n,t){t.r(n);var r=t(4165),a=t(5861),c=t(9439),i=t(2791),s=t(7689),l=t(1087),u=t(1243),o=t(184);n.default=function(){var e=(0,i.useState)(!1),n=(0,c.Z)(e,2),t=n[0],h=n[1],d=(0,i.useState)(!1),f=(0,c.Z)(d,2),p=f[0],v=f[1],k=new URLSearchParams((0,s.TH)().search),x=function(){var e=(0,a.Z)((0,r.Z)().mark((function e(){var n;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return v(!0),e.prev=1,e.next=4,u.Z.post("/api/v1/auth/verify-email",{verificationToken:k.get("token"),email:k.get("email")},{withCredentials:!0});case 4:n=e.sent,n.data,v(!1),h(!1),e.next=15;break;case 10:e.prev=10,e.t0=e.catch(1),console.log(e.t0),h(!0),v(!1);case 15:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(){return e.apply(this,arguments)}}();return(0,i.useEffect)((function(){x()}),[]),p?(0,o.jsx)("div",{children:(0,o.jsx)("h2",{children:"Loading..."})}):t?(0,o.jsx)("div",{children:(0,o.jsx)("h4",{children:"There was an error, please double check your verification link "})}):(0,o.jsxs)("div",{className:"page",children:[(0,o.jsx)("h2",{children:"Account Confirmed"}),(0,o.jsx)(l.rU,{to:"/auth",className:"btn",children:"Please login"})]})}}}]);
//# sourceMappingURL=32.fae56d9a.chunk.js.map