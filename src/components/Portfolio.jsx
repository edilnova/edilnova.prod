import React,{useState,useEffect,useRef} from 'react';
import posts from '../content/posts.json';
import s from './Portfolio.module.css';
import {services,matchesService} from '../services';
const typeLabels={repair:'Reparación',remodel:'Remodelación'};
function Icon({name}){const paths={close:'m6 6 12 12M6 18 18 6',left:'m14 5-7 7 7 7',right:'m10 5 7 7-7 7',back:'M20 12H4m7-7-7 7 7 7',expand:'M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5'};return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]}/></svg>}
function IconButton({icon,label,className='',...props}){return <button type="button" className={s.iconButton+' '+className} aria-label={label} title={label} {...props}><Icon name={icon}/></button>}
function BeforeAfter({images,compact=false,onOpen}){
 const before=images.find(im=>im.stage==='Antes'),after=images.find(im=>im.stage==='Después');
 if(!before||!after){const im=after||images[0];return im?<div className={s.singlePhoto}>{onOpen?<button className={s.photoButton} onClick={()=>onOpen(im)} aria-label="Ampliar fotografía"><img src={im.src} alt={im.alt} loading="lazy"/></button>:<img src={im.src} alt={im.alt} loading="lazy"/>}</div>:null}
 return <div className={compact?s.comparisonCompact:s.comparison}>{[['Antes',before],['Después',after]].map(([stage,im])=><figure key={stage}>{onOpen?<button className={s.photoButton} onClick={()=>onOpen(im)} aria-label={'Ampliar foto: '+stage}><img src={im.src} alt={im.alt} loading="lazy"/><span className={s.expandHint}><Icon name="expand"/></span></button>:<img src={im.src} alt={im.alt} loading="lazy"/>}<figcaption>{stage}</figcaption></figure>)}</div>
}
function ProjectDialog({post,onClose}){
 const ref=useRef(null),touch=useRef(null),back=useRef(null),lastPhoto=useRef(null);
 const [active,setActive]=useState(null);
 useEffect(()=>{const el=ref.current,overflow=document.body.style.overflow;document.body.style.overflow='hidden';el.showModal();return ()=>{el.close();document.body.style.overflow=overflow}},[]);
 useEffect(()=>{if(active!==null){back.current?.focus({preventScroll:true})}else lastPhoto.current?.focus({preventScroll:true})},[active===null]);
 useEffect(()=>{if(active!==null)ref.current.querySelector('[aria-current="true"]')?.scrollIntoView({block:'nearest',inline:'center'})},[active]);
 const openPhoto=image=>{lastPhoto.current=document.activeElement;setActive(post.images.indexOf(image))};
 const move=delta=>setActive(index=>(index+delta+post.images.length)%post.images.length);
 function keys(event){if(active===null)return;if(event.key==='ArrowLeft'){event.preventDefault();move(-1)}if(event.key==='ArrowRight'){event.preventDefault();move(1)}if(event.key==='Home'){event.preventDefault();setActive(0)}if(event.key==='End'){event.preventDefault();setActive(post.images.length-1)}}
 function cancel(event){event.preventDefault();if(active!==null)setActive(null);else onClose()}
 const image=active===null?null:post.images[active],caption=post.caption??post.summary??'';
 return <dialog ref={ref} className={s.dialog} aria-labelledby="project-title" onKeyDown={keys} onCancel={cancel}>
 <header className={s.modalHeader}><div className={s.modalTitle}>{active!==null&&<button ref={back} className={s.iconButton} onClick={()=>setActive(null)} aria-label="Volver al trabajo" title="Volver al trabajo"><Icon name="back"/></button>}<div><p>{active===null?[typeLabels[post.type],post.category].filter(Boolean).join(' · '):image.stage||'Foto'}</p><h2 id="project-title">{post.title}</h2></div></div><div className={s.modalActions}>{image&&<span className={s.counter} aria-live="polite">{active+1} / {post.images.length}</span>}<IconButton icon="close" label="Cerrar trabajo" onClick={onClose}/></div></header>
 {image?<div className={s.viewer}>
 <div className={s.imageFrame} onPointerDown={event=>{touch.current={x:event.clientX,y:event.clientY}}} onPointerUp={event=>{if(touch.current){const dx=event.clientX-touch.current.x,dy=event.clientY-touch.current.y;if(Math.abs(dx)>50&&Math.abs(dy)<70)move(dx<0?1:-1);touch.current=null}}} onPointerCancel={()=>{touch.current=null}}>
 <img className={s.fullPhoto} src={image.src} alt={image.alt} draggable="false"/>
 {post.images.length>1&&<><IconButton icon="left" label="Foto anterior" className={s.previous} onClick={()=>move(-1)}/><IconButton icon="right" label="Foto siguiente" className={s.next} onClick={()=>move(1)}/></>}
 </div>
 <nav className={s.thumbnails} aria-label="Fotografías del trabajo">{post.images.map((im,index)=><button key={im.src+index} aria-label={(im.stage||'Foto')+' · '+(index+1)} aria-current={index===active?'true':undefined} onClick={()=>setActive(index)}><img src={im.src} alt="" loading="lazy"/></button>)}</nav>
 </div>:<div className={s.scrollContent}>{post.location&&<p className={s.location}>{post.location}</p>}<BeforeAfter images={post.images} onOpen={openPhoto}/>{caption&&<p className={s.description}>{caption}</p>}{['Antes','Después','Durante','Fotos'].map(stage=>{
 const group=post.images.filter(im=>(im.stage||'Fotos')===stage),paired=post.images.some(im=>im.stage==='Antes')&&post.images.some(im=>im.stage==='Después');
 const extra=paired&&['Antes','Después'].includes(stage)?group.slice(1):!paired?group.slice(group[0]===post.images[0]?1:0):group;
 return extra.length>0&&<section key={stage} className={s.stage}><h3>{stage}</h3><div className={s.gallery}>{extra.map((im,i)=><button key={i} className={s.photoButton} onClick={()=>openPhoto(im)} aria-label={'Ampliar foto: '+stage}><img src={im.src} alt={im.alt} loading="lazy"/><span className={s.expandHint}><Icon name="expand"/></span></button>)}</div></section>
 })}</div>}
 </dialog>
}
export default function Portfolio({category,onCategoryChange}){
 const [selected,setSelected]=useState(null),[type,setType]=useState('all');
 const visible=[...posts].sort((a,b)=>b.date.localeCompare(a.date)).filter(p=>(category==='Todos'||matchesService(p.category,category))&&(type==='all'||p.type===type));
 return <section className={s.section} id="trabajos"><div className="wrap"><p className="eyebrow">NUESTRO PORTFOLIO</p><h2>Trabajos que <em>hablan por nosotros.</em></h2><p>Reparaciones y remodelaciones: el antes y el después de cada intervención.</p>
 <div className={s.filters} role="group" aria-label="Tipo de trabajo">{[['all','Todos los trabajos'],['repair','Reparaciones'],['remodel','Remodelaciones']].map(([value,label])=><button key={value} aria-pressed={type===value} onClick={()=>setType(value)}>{label}</button>)}</div>
 <div className={s.specialties} role="group" aria-label="Especialidad">{['Todos',...new Set([...services.map(s=>s.name),...posts.map(p=>p.category)])].map(c=><button key={c} aria-pressed={c===category} onClick={()=>{onCategoryChange(c);setType('all')}}>{c==='Todos'?'Todas las especialidades':c}</button>)}</div>
 <div className={s.grid}>{visible.map(p=><article className={s.card} key={p.id}><button className={s.cardPreview} onClick={()=>setSelected(p)} aria-label={'Ver trabajo: '+p.title}><BeforeAfter images={p.images} compact/><span className={s.photoCount}><Icon name="expand"/>{p.images.length}</span></button><div className={s.cardBody}><p className="eyebrow">{[typeLabels[p.type],p.category].filter(Boolean).join(' · ')}</p><h3><button onClick={()=>setSelected(p)}>{p.title}</button></h3><div className={s.cardMeta}><span>{p.location||'Antes y después'}</span><IconButton icon="right" label={'Abrir '+p.title} onClick={()=>setSelected(p)}/></div></div></article>)}</div>
 {!visible.length&&<p className={s.empty}>{!posts.length?'Pronto compartiremos el antes y después de nuestros trabajos.':'Todavía no hay trabajos publicados con estos filtros.'} <a href="#contacto">Consultar por un trabajo ↗</a></p>}
 {selected&&<ProjectDialog post={selected} onClose={()=>setSelected(null)}/>}
 </div></section>
}

