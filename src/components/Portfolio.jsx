import React from 'react';
import {useState,useEffect,useRef} from 'react';
import posts from '../content/posts.json';
import s from './Portfolio.module.css';
import {services,matchesService} from '../services';
function ProjectDialog({post,onClose}){const ref=useRef(null);useEffect(()=>{const el=ref.current;el.showModal();return ()=>el.close()},[]);return <dialog ref={ref} className={s.dialog} aria-labelledby="project-title" onCancel={onClose}><button className={s.close} onClick={onClose}>Cerrar ×</button><p className="eyebrow">{post.category}</p><h2 id="project-title">{post.title}</h2><p>{post.location}</p><p className={s.description}>{post.description}</p>{['Antes','Durante','Después','Fotos'].map(stage=>{const images=post.images.filter(im=>(im.stage||'Fotos')===stage);return images.length>0&&<section key={stage} className={s.stage}><h3>{stage}</h3><div className={s.gallery}>{images.map((im,i)=><figure key={i}><img src={im.src} alt={im.alt} loading="lazy"/><figcaption>{im.alt}</figcaption></figure>)}</div></section>})}</dialog>}
export default function Portfolio({category,onCategoryChange}){
 const [selected,setSelected]=useState(null);
 const sorted=[...posts].sort((a,b)=>b.date.localeCompare(a.date));
 const visible=sorted.filter(p=>category==='Todos'||matchesService(p.category,category));
 return <section className={s.section} id="trabajos"><div className="wrap"><p className="eyebrow">NUESTRO PORTFOLIO</p><h2>Trabajos que <em>hablan por nosotros.</em></h2><p>Qué hicimos, cómo lo resolvimos y el resultado de cada intervención.</p>
 <div className={s.filters} aria-label="Filtrar trabajos">{['Todos',...new Set([...services.map(s=>s.name),...posts.map(p=>p.category)])].map(c=><button key={c} aria-pressed={c===category} onClick={()=>onCategoryChange(c)}>{c}</button>)}</div>
 <div className={s.grid}>{visible.map(p=><article className={s.card} key={p.id}>{p.images[0]&&<img src={p.images[0].src} alt={p.images[0].alt} loading="lazy"/>}<div><p className="eyebrow">{p.category}</p><h3>{p.title}</h3><p>{p.location} · {new Intl.DateTimeFormat('es-UY',{month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(p.date))}</p><p>{p.summary}</p><button className="btn" onClick={()=>setSelected(p)}>Ver trabajo ↗</button></div></article>)}</div>
 {!visible.length&&<p className={s.empty}>{category==='Todos'?'Estamos preparando las fotos y los detalles de nuestros trabajos.':'Todavía no hay trabajos publicados en esta especialidad.'} <a href="#contacto">Contanos qué necesitás ↗</a></p>}
 {selected&&<ProjectDialog post={selected} onClose={()=>setSelected(null)}/>}
 </div></section>
}

