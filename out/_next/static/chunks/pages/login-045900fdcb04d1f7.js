(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[459],{3236:function(e,s,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/login",function(){return r(4070)}])},4820:function(e,s,r){"use strict";r.d(s,{Z:function(){return c}});var t=r(5893);r(7294);var i=r(9008),n=r.n(i),a=r(1664),l=r.n(a);function c(e){let{children:s,title:r="SuperSimple.Directory",description:i="A platform for creating and managing directories",showHeader:a=!1,directoryId:c,directoryName:d}=e;return(0,t.jsxs)("div",{className:"min-h-screen bg-gray-50",children:[(0,t.jsxs)(n(),{children:[(0,t.jsx)("title",{children:r}),(0,t.jsx)("meta",{name:"description",content:i}),(0,t.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),(0,t.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),a&&c&&(0,t.jsx)("nav",{className:"bg-gray-100 border-b border-gray-200",children:(0,t.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,t.jsxs)("div",{className:"flex justify-between h-16",children:[(0,t.jsx)("div",{className:"flex",children:(0,t.jsx)("div",{className:"flex-shrink-0 flex items-center",children:(0,t.jsx)("h3",{className:"text-lg font-bold text-gray-800",children:d||"Directory"})})}),(0,t.jsx)("div",{className:"flex items-center",children:(0,t.jsxs)("div",{className:"hidden md:ml-6 md:flex md:space-x-8",children:[(0,t.jsx)(l(),{href:"/directories/".concat(c,"/listings"),className:"text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium",children:"Organizations"}),(0,t.jsx)(l(),{href:"/about",className:"text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium",children:"About"}),(0,t.jsx)(l(),{href:"/contact",className:"text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium",children:"Contact"})]})})]})})}),(0,t.jsx)("main",{children:s}),a&&(0,t.jsx)("footer",{className:"bg-gray-100 border-t border-gray-200 mt-12",children:(0,t.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:[(0,t.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-sm font-medium text-gray-900 uppercase tracking-wider mb-4",children:"Directory"}),(0,t.jsx)("ul",{className:"space-y-2",children:c&&(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("li",{children:(0,t.jsx)(l(),{href:"/directories/".concat(c),className:"text-gray-600 hover:text-indigo-600",children:"Home"})}),(0,t.jsx)("li",{children:(0,t.jsx)(l(),{href:"/directories/".concat(c,"/listings"),className:"text-gray-600 hover:text-indigo-600",children:"Browse Listings"})}),(0,t.jsx)("li",{children:(0,t.jsx)(l(),{href:"/directories/".concat(c,"/submit"),className:"text-gray-600 hover:text-indigo-600",children:"Add Listing"})})]})})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-sm font-medium text-gray-900 uppercase tracking-wider mb-4",children:"About"}),(0,t.jsxs)("ul",{className:"space-y-2",children:[(0,t.jsx)("li",{children:(0,t.jsx)(l(),{href:"/about",className:"text-gray-600 hover:text-indigo-600",children:"About Us"})}),(0,t.jsx)("li",{children:(0,t.jsx)(l(),{href:"/contact",className:"text-gray-600 hover:text-indigo-600",children:"Contact"})}),(0,t.jsx)("li",{children:(0,t.jsx)(l(),{href:"/comparisons",className:"text-gray-600 hover:text-indigo-600",children:"Comparisons"})})]})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("h3",{className:"text-sm font-medium text-gray-900 uppercase tracking-wider mb-4",children:"Legal"}),(0,t.jsxs)("ul",{className:"space-y-2",children:[(0,t.jsx)("li",{children:(0,t.jsx)(l(),{href:"/terms",className:"text-gray-600 hover:text-indigo-600",children:"Terms of Use"})}),(0,t.jsx)("li",{children:(0,t.jsx)(l(),{href:"/privacy",className:"text-gray-600 hover:text-indigo-600",children:"Privacy Policy"})})]})]})]}),(0,t.jsx)("div",{className:"mt-8 pt-8 border-t border-gray-200 text-center",children:(0,t.jsxs)("p",{className:"text-sm text-gray-500",children:["\xa9 ",new Date().getFullYear()," SuperSimple.Directory. All rights reserved."]})})]})})]})}},4070:function(e,s,r){"use strict";r.r(s),r.d(s,{default:function(){return o}});var t=r(5893),i=r(7294),n=r(1163),a=r(3700),l=r(1664),c=r.n(l),d=r(4820);function o(){let[e,s]=(0,i.useState)(""),[r,l]=(0,i.useState)(""),[o,x]=(0,i.useState)(null),[m,h]=(0,i.useState)(!1),u=(0,n.useRouter)(),{signIn:g}=(0,a.a)(),p=async s=>{s.preventDefault();try{x(null),h(!0),await g(e,r),u.push("/dashboard")}catch(e){x(e.message||"Failed to sign in")}finally{h(!1)}};return(0,t.jsx)(d.Z,{title:"Sign In - Directory Service",description:"Sign in to your account",children:(0,t.jsx)("div",{className:"flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8",children:(0,t.jsxs)("div",{className:"max-w-md w-full space-y-8",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("h2",{className:"mt-6 text-center text-3xl font-extrabold text-gray-900",children:"Sign in to your account"}),(0,t.jsxs)("p",{className:"mt-2 text-center text-sm text-gray-600",children:["Or"," ",(0,t.jsx)(c(),{href:"/",className:"font-medium text-indigo-600 hover:text-indigo-500",children:"return to the homepage"})]})]}),(0,t.jsxs)("form",{className:"mt-8 space-y-6",onSubmit:p,children:[(0,t.jsxs)("div",{className:"rounded-md shadow-sm -space-y-px",children:[(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"email-address",className:"sr-only",children:"Email address"}),(0,t.jsx)("input",{id:"email-address",name:"email",type:"email",autoComplete:"email",required:!0,className:"appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm",placeholder:"Email address",value:e,onChange:e=>s(e.target.value)})]}),(0,t.jsxs)("div",{children:[(0,t.jsx)("label",{htmlFor:"password",className:"sr-only",children:"Password"}),(0,t.jsx)("input",{id:"password",name:"password",type:"password",autoComplete:"current-password",required:!0,className:"appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm",placeholder:"Password",value:r,onChange:e=>l(e.target.value)})]})]}),o&&(0,t.jsx)("div",{className:"rounded-md bg-red-50 p-4",children:(0,t.jsx)("div",{className:"flex",children:(0,t.jsx)("div",{className:"ml-3",children:(0,t.jsx)("h3",{className:"text-sm font-medium text-red-800",children:o})})})}),(0,t.jsx)("div",{children:(0,t.jsx)("button",{type:"submit",disabled:m,className:"group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ".concat(m?"opacity-70 cursor-not-allowed":""),children:m?"Signing in...":"Sign in"})})]})]})})})}},9008:function(e,s,r){e.exports=r(3867)},1163:function(e,s,r){e.exports=r(3079)}},function(e){e.O(0,[664,888,774,179],function(){return e(e.s=3236)}),_N_E=e.O()}]);