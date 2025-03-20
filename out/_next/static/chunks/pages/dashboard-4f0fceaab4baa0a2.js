(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[26],{528:function(e,s,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/dashboard",function(){return r(2464)}])},4820:function(e,s,r){"use strict";r.d(s,{Z:function(){return c}});var i=r(5893);r(7294);var t=r(9008),a=r.n(t),d=r(1664),n=r.n(d);function c(e){let{children:s,title:r="SuperSimple.Directory",description:t="A platform for creating and managing directories",showHeader:d=!1,directoryId:c,directoryName:l}=e;return(0,i.jsxs)("div",{className:"min-h-screen bg-gray-50",children:[(0,i.jsxs)(a(),{children:[(0,i.jsx)("title",{children:r}),(0,i.jsx)("meta",{name:"description",content:t}),(0,i.jsx)("meta",{name:"viewport",content:"width=device-width, initial-scale=1.0"}),(0,i.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),d&&c&&(0,i.jsx)("nav",{className:"bg-gray-100 border-b border-gray-200",children:(0,i.jsx)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:(0,i.jsxs)("div",{className:"flex justify-between h-16",children:[(0,i.jsx)("div",{className:"flex",children:(0,i.jsx)("div",{className:"flex-shrink-0 flex items-center",children:(0,i.jsx)("h3",{className:"text-lg font-bold text-gray-800",children:l||"Directory"})})}),(0,i.jsx)("div",{className:"flex items-center",children:(0,i.jsxs)("div",{className:"hidden md:ml-6 md:flex md:space-x-8",children:[(0,i.jsx)(n(),{href:"/directories/".concat(c,"/listings"),className:"text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium",children:"Organizations"}),(0,i.jsx)(n(),{href:"/about",className:"text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium",children:"About"}),(0,i.jsx)(n(),{href:"/contact",className:"text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium",children:"Contact"})]})})]})})}),(0,i.jsx)("main",{children:s}),d&&(0,i.jsx)("footer",{className:"bg-gray-100 border-t border-gray-200 mt-12",children:(0,i.jsxs)("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:[(0,i.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("h3",{className:"text-sm font-medium text-gray-900 uppercase tracking-wider mb-4",children:"Directory"}),(0,i.jsx)("ul",{className:"space-y-2",children:c&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)("li",{children:(0,i.jsx)(n(),{href:"/directories/".concat(c),className:"text-gray-600 hover:text-indigo-600",children:"Home"})}),(0,i.jsx)("li",{children:(0,i.jsx)(n(),{href:"/directories/".concat(c,"/listings"),className:"text-gray-600 hover:text-indigo-600",children:"Browse Listings"})}),(0,i.jsx)("li",{children:(0,i.jsx)(n(),{href:"/directories/".concat(c,"/submit"),className:"text-gray-600 hover:text-indigo-600",children:"Add Listing"})})]})})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("h3",{className:"text-sm font-medium text-gray-900 uppercase tracking-wider mb-4",children:"About"}),(0,i.jsxs)("ul",{className:"space-y-2",children:[(0,i.jsx)("li",{children:(0,i.jsx)(n(),{href:"/about",className:"text-gray-600 hover:text-indigo-600",children:"About Us"})}),(0,i.jsx)("li",{children:(0,i.jsx)(n(),{href:"/contact",className:"text-gray-600 hover:text-indigo-600",children:"Contact"})}),(0,i.jsx)("li",{children:(0,i.jsx)(n(),{href:"/comparisons",className:"text-gray-600 hover:text-indigo-600",children:"Comparisons"})})]})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("h3",{className:"text-sm font-medium text-gray-900 uppercase tracking-wider mb-4",children:"Legal"}),(0,i.jsxs)("ul",{className:"space-y-2",children:[(0,i.jsx)("li",{children:(0,i.jsx)(n(),{href:"/terms",className:"text-gray-600 hover:text-indigo-600",children:"Terms of Use"})}),(0,i.jsx)("li",{children:(0,i.jsx)(n(),{href:"/privacy",className:"text-gray-600 hover:text-indigo-600",children:"Privacy Policy"})})]})]})]}),(0,i.jsx)("div",{className:"mt-8 pt-8 border-t border-gray-200 text-center",children:(0,i.jsxs)("p",{className:"text-sm text-gray-500",children:["\xa9 ",new Date().getFullYear()," SuperSimple.Directory. All rights reserved."]})})]})})]})}},7644:function(e,s,r){"use strict";r.d(s,{GJ:function(){return d},i4:function(){return t}});var i,t,a=r(9814);async function d(e){if(!e)return!1;try{var s;let r=null===(s=e.user_metadata)||void 0===s?void 0:s.role;if("admin"===r)return!0;try{let{data:s,error:r}=await a.O.from("user_roles").select("role").eq("user_id",e.id).single();if(r){if("42P01"===r.code||"42P17"===r.code){if(console.warn("Database error (".concat(r.code,"): ").concat(r.message)),"68a14571-a988-45a4-b023-0d701ae034f4"===e.id)return console.log("Using hardcoded admin check for initial user"),!0;return!1}return console.error("Error checking admin status:",r),!1}return(null==s?void 0:s.role)==="admin"}catch(e){return console.error("Database error checking admin status:",e),!1}}catch(e){return console.error("Unexpected error checking admin status:",e),!1}}(i=t||(t={})).ADMIN="admin",i.CONTRIBUTOR="contributor",i.VIEWER="viewer"},9814:function(e,s,r){"use strict";r.d(s,{O:function(){return i}});let i=(0,r(6490).eI)("https://mzbodrwzhasiydvpvbid.supabase.co","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16Ym9kcnd6aGFzaXlkdnB2YmlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MjA0NDAsImV4cCI6MjA1NjI5NjQ0MH0.4PtrUzyD5AUZzWqoWYpgMFlojhW2y9SH6-tPvahPxSo")},2464:function(e,s,r){"use strict";r.r(s),r.d(s,{default:function(){return x}});var i=r(5893),t=r(7294),a=r(1163),d=r(1664),n=r.n(d),c=r(4820),l=r(3700),o=r(7644),m=r(9814);function x(){let{user:e,signOut:s}=(0,l.a)(),r=(0,a.useRouter)(),[d,x]=(0,t.useState)(!0),[h,g]=(0,t.useState)(!1),[u,j]=(0,t.useState)([]),[f,p]=(0,t.useState)([]);(0,t.useEffect)(()=>{if(null===e){r.push("/auth/login");return}!async function(){try{let s=await (0,o.GJ)(e);if(g(s),s){let{data:e,error:s}=await m.O.from("directories").select("*").order("created_at",{ascending:!1});if(s)throw s;j(e||[])}let{data:r,error:i}=await m.O.from("directories").select("*").eq("created_by",(null==e?void 0:e.id)||"").order("created_at",{ascending:!1});i?(console.warn("Error fetching user directories:",i),p([])):p(r||[]),x(!1)}catch(e){console.error("Error checking admin status:",e),x(!1)}}()},[e,r]);let b=async()=>{await s(),r.push("/auth/login")};return d||!e?(0,i.jsx)(c.Z,{title:"Dashboard",children:(0,i.jsx)("div",{className:"flex min-h-screen items-center justify-center",children:(0,i.jsx)("div",{className:"animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"})})}):(0,i.jsx)(c.Z,{title:"Dashboard",children:(0,i.jsxs)("div",{className:"flex min-h-screen flex-col p-8",children:[(0,i.jsxs)("div",{className:"flex justify-between items-center mb-8",children:[(0,i.jsx)("h1",{className:"text-3xl font-bold",children:"Dashboard"}),(0,i.jsxs)("div",{className:"flex space-x-4",children:[(0,i.jsx)(n(),{href:"/directories/create",className:"rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700",children:"Create New Directory"}),(0,i.jsx)("button",{onClick:b,className:"rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700",children:"Sign Out"})]})]}),(0,i.jsxs)("div",{className:"rounded-lg bg-white p-6 shadow-md mb-8",children:[(0,i.jsx)("h2",{className:"text-xl font-semibold mb-4",children:"Account Information"}),(0,i.jsxs)("p",{className:"mb-2",children:["You are logged in as: ",(0,i.jsx)("span",{className:"font-medium",children:e.email})]}),(0,i.jsxs)("p",{className:"mb-2",children:["User ID: ",(0,i.jsx)("span",{className:"font-mono text-sm",children:e.id})]}),(0,i.jsxs)("p",{className:"mb-2",children:["Role: ",(0,i.jsx)("span",{className:"font-medium",children:h?"Administrator":"User"})]})]}),(0,i.jsxs)("div",{className:"rounded-lg bg-white p-6 shadow-md mb-8",children:[(0,i.jsx)("h2",{className:"text-xl font-semibold mb-4",children:"Your Directories"}),f.length>0?(0,i.jsx)("div",{className:"divide-y divide-gray-200",children:f.map(e=>(0,i.jsx)("div",{className:"py-4",children:(0,i.jsxs)("div",{className:"flex items-center justify-between",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("h3",{className:"text-lg font-medium",children:e.name}),(0,i.jsx)("p",{className:"text-sm text-gray-500",children:e.description})]}),(0,i.jsxs)("div",{className:"flex space-x-2",children:[(0,i.jsx)(n(),{href:"/directories/".concat(e.id),className:"rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50",children:"View"}),(0,i.jsx)(n(),{href:"/admin/directories/".concat(e.id,"/edit"),className:"rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50",children:"Edit"})]})]})},e.id))}):(0,i.jsxs)("div",{className:"text-center py-4",children:[(0,i.jsx)("p",{className:"text-gray-500 mb-4",children:"You haven't created any directories yet."}),(0,i.jsx)(n(),{href:"/directories/create",className:"rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700",children:"Create Your First Directory"})]})]}),h&&(0,i.jsxs)("div",{className:"rounded-lg bg-white p-6 shadow-md mb-8",children:[(0,i.jsx)("h2",{className:"text-xl font-semibold mb-4",children:"All Directories (Admin)"}),u.length>0?(0,i.jsx)("div",{className:"divide-y divide-gray-200",children:u.map(e=>(0,i.jsx)("div",{className:"py-4",children:(0,i.jsxs)("div",{className:"flex items-center justify-between",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("h3",{className:"text-lg font-medium",children:e.name}),(0,i.jsx)("p",{className:"text-sm text-gray-500",children:e.description})]}),(0,i.jsxs)("div",{className:"flex space-x-2",children:[(0,i.jsx)(n(),{href:"/directories/".concat(e.id),className:"rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50",children:"View"}),(0,i.jsx)(n(),{href:"/admin/directories/".concat(e.id,"/edit"),className:"rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50",children:"Edit"}),(0,i.jsx)(n(),{href:"/admin/directories/".concat(e.id,"/listings"),className:"rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50",children:"Manage Listings"})]})]})},e.id))}):(0,i.jsx)("div",{className:"text-center py-4",children:(0,i.jsx)("p",{className:"text-gray-500",children:"No directories have been created yet."})})]}),h&&(0,i.jsxs)("div",{className:"grid grid-cols-1 gap-4 sm:grid-cols-2",children:[(0,i.jsxs)("div",{className:"rounded-lg bg-white p-6 shadow-md",children:[(0,i.jsx)("h3",{className:"text-lg font-medium mb-2",children:"User Management"}),(0,i.jsx)("p",{className:"text-sm text-gray-500 mb-4",children:"Manage user accounts and permissions."}),(0,i.jsx)(n(),{href:"/admin/users",className:"rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50",children:"Manage Users"})]}),(0,i.jsxs)("div",{className:"rounded-lg bg-white p-6 shadow-md",children:[(0,i.jsx)("h3",{className:"text-lg font-medium mb-2",children:"Directory Management"}),(0,i.jsx)("p",{className:"text-sm text-gray-500 mb-4",children:"Create and manage directories."}),(0,i.jsx)(n(),{href:"/admin/directories",className:"rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50 mr-2",children:"Manage Directories"})]}),(0,i.jsxs)("div",{className:"rounded-lg bg-white p-6 shadow-md",children:[(0,i.jsx)("h3",{className:"text-lg font-medium mb-2",children:"Pending Listings"}),(0,i.jsx)("p",{className:"text-sm text-gray-500 mb-4",children:"Review and approve/reject pending listings."}),(0,i.jsx)(n(),{href:"/admin/pending-listings",className:"rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 hover:bg-gray-50",children:"Review Listings"})]})]})]})})}},9008:function(e,s,r){e.exports=r(3867)},1163:function(e,s,r){e.exports=r(3079)}},function(e){e.O(0,[664,888,774,179],function(){return e(e.s=528)}),_N_E=e.O()}]);