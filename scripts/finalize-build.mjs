import {readFile,writeFile} from 'node:fs/promises';
import {createServer} from 'vite';
import React from 'react';
import {renderToString} from 'react-dom/server';
const server=await createServer({server:{middlewareMode:true},appType:'custom'});
try{
 const {default:App}=await server.ssrLoadModule('/src/App.jsx');
 const content=renderToString(React.createElement(App));
 let html=await readFile('dist/index.html','utf8');
 html=html.replace('<div id="root"></div>','<div id="root">'+content+'</div>');
 if(process.env.VERCEL_ENV&&process.env.VERCEL_ENV!=='production'){
  html=html.replace('content="index,follow,max-image-preview:large"','content="noindex,nofollow"');
  await writeFile('dist/robots.txt','User-agent: *\nDisallow: /\n');
 }
 await writeFile('dist/index.html',html);
 console.log('HTML inicial generado; metadatos y contactos protegidos.');
}finally{await server.close()}
