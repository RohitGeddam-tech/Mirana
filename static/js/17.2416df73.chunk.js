(this.webpackJsonpmirana=this.webpackJsonpmirana||[]).push([[17],{428:function(e,t,a){"use strict";a.r(t);var s=a(35),c=a(0),n=a(439),l=a(43),i=a(3);t.default=function(e){var t=e.draw,a=e.setDraw,r=e.setLogin,j=Object(c.useState)(""),d=Object(s.a)(j,2),o=d[0],u=d[1],A=Object(c.useState)(!1),b=Object(s.a)(A,2),m=b[0],p=b[1],O=Object(c.useState)(""),h=Object(s.a)(O,2),x=h[0],v=h[1],N=Object(c.useState)(!1),g=Object(s.a)(N,2),w=g[0],C=g[1],S=Object(c.useState)(!1),I=Object(s.a)(S,2),f=I[0],E=I[1];return Object(i.jsx)(i.Fragment,{children:Object(i.jsx)(n.a,{className:"modalPop",open:t,onClose:function(){a(!1)},children:Object(i.jsxs)("div",{className:"box",children:[Object(i.jsxs)("div",{className:"head",children:[Object(i.jsx)("h1",{children:"Login"}),Object(i.jsx)("img",{src:l.a,alt:"close",onClick:function(){return a(!1)}})]}),Object(i.jsxs)("form",{className:"body",onSubmit:function(e){e.preventDefault(),w&&m||(sessionStorage.setItem("emailSign",o),r(!0))},children:[Object(i.jsxs)("div",{className:"otp",children:[Object(i.jsxs)("div",{className:"textInput",children:[Object(i.jsxs)("div",{className:"text-input",children:[Object(i.jsx)("input",{className:"input",value:o,name:"email",onChange:function(e){u(e.target.value),p(!e.target.validity.valid)},pattern:"[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",type:"email",required:!0}),Object(i.jsxs)("label",{htmlFor:"email",className:"input-placeholder",children:["Email",Object(i.jsx)("span",{children:"*"})]})]}),m?Object(i.jsx)("p",{className:"error-text",children:"Please provide a valid email Id"}):null]}),Object(i.jsx)("button",{className:"".concat(f?"btn resend":"btn"),type:"button",onClick:function(){m||""===o?E(!1):(console.log("email empty",""!==o),console.log("email invalid",!m),E(!0)),console.log(m,f)},children:f?"Re-send OTP":"Send OTP"})]}),f?Object(i.jsxs)("div",{className:"otp",children:[Object(i.jsxs)("div",{className:"textInput",children:[Object(i.jsxs)("div",{className:"text-input",children:[Object(i.jsx)("input",{value:x,type:"number",className:"input",name:"code",onChange:function(e){v(e.target.value),C(!e.target.validity.valid)},pattern:"[0-9]{6}",required:!0}),Object(i.jsxs)("label",{htmlFor:"code",className:"input-placeholder",children:["Enter OTP",Object(i.jsx)("span",{children:"*"})]})]}),w?Object(i.jsx)("p",{className:"error-text",children:"The code provided is not valid."}):null]}),Object(i.jsx)("button",{type:"submit",className:"btn",children:"Login"})]}):null]})]})})})}},43:function(e,t,a){"use strict";t.a="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAYAAAAfSC3RAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADrSURBVHgBjZIxDoIwFIbfa8WZI3AFbyA38AgsEkdGiSEymGhw0NHBBG6CN4EjmJg4YNraohDA0viSDv37vvbv36IfJQXIql7MzQ5hCYZabpIUCcyrx3NGgEtFgDO1aO6t944RQvCAi3pOCGOuBEsT3EJClIRxNzvHd1QLK9nMKc0BwZGj7NoeQpevjs2uOtiidKuDeuAQFoDSjrB10A/YwhNaNHMOzL3uwtuwjwwFJu31GpCmusDIWHrqJFPaRAepOyl7pqdCHdQNYuyp0I+OJwkEY+lp4c+XEwsTpErpXdu1GASxrQb8WU3vG83LwRVyuVdYAAAAAElFTkSuQmCC"}}]);
//# sourceMappingURL=17.2416df73.chunk.js.map