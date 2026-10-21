import React,{useState,useEffect,useRef} from 'react';
import posts from '../content/posts.json';
import s from './Portfolio.module.css';
import {services,matchesService} from '../services';
const typeLabels={repair:'Reparación',remodel:'Remodelación'};
function BeforeAfter({images,compact=false}){
 const before=images.find(im=>im.stage==='Antes'),after=images.find(im=>im.stage==='Después');
 if(!before||!after)return compact&&images[0]?<img className={s.fallback} src={(after||images[0]).src} alt={(after||images[0]).alt} loading="lazy"/>:null;
 return <div className={compact?s.comparisonCompact:s.comparison}>{[['Antes',before],['Después',after]].map(([stage,im])=><figure key={stage}><img src={im.src} alt={im.alt} loading="lazy"/><figcaption>{stage}</figcaption></figure>)}</div>
}
function ProjectDialog({post,onClose}){
 const ref=useRef(null);useEffect(()=>{const el=ref.current;el.showModal();return ()=>el.close()},[]);
 const caption=post.caption??post.summary??'';
 return <dialog ref={ref} className={s.dialog} aria-labelledby="project-title" onCancel={onClose}><button className={s.close} onClick={onClose}>Cerrar ×</button><p className="eyebrow">{[typeLabels[post.type],post.category].filter(Boolean).join(' · ')}</p><h2 id="project-title">{post.title}</h2>{post.location&&<p>{post.location}</p>}<BeforeAfter images={post.images}/>{caption&&<p className={s.description}>{caption}</p>}{['Antes','Después','Durante','Fotos'].map(stage=>{
 const group=post.images.filter(im=>(im.stage||'Fotos')===stage);
 const hasComparison=post.images.some(im=>im.stage==='Antes')&&post.images.some(im=>im.stage==='Después');
 const extra=hasComparison&&['Antes','Después'].includes(stage)?group.slice(1):group;
 return extra.length>0&&<section key={stage} className={s.stage}><h3>{stage}</h3><div className={s.gallery}>{extra.map((im,i)=><figure key={i}><img src={im.src} alt={im.alt} loading="lazy"/></figure>)}</div></section>
 })}</dialog>
}
export default function Portfolio({category,onCategoryChange}){
 const [selected,setSelected]=useState(null),[type,setType]=useState('all');
 const visible=[...posts].sort((a,b)=>b.date.localeCompare(a.date)).filter(p=>(category==='Todos'||matchesService(p.category,category))&&(type==='all'||p.type===type));
 return <section className={s.section} id="trabajos"><div className="wrap"><p className="eyebrow">NUESTRO PORTFOLIO</p><h2>Trabajos que <em>hablan por nosotros.</em></h2><p>Reparaciones y remodelaciones: el antes y el después de cada intervención.</p>
 <div className={s.filters} role="group" aria-label="Tipo de trabajo">{[['all','Todos los trabajos'],['repair','Reparaciones'],['remodel','Remodelaciones']].map(([value,label])=><button key={value} aria-pressed={type===value} onClick={()=>setType(value)}>{label}</button>)}</div>
 <div className={s.filters} role="group" aria-label="Especialidad">{['Todos',...new Set([...services.map(s=>s.name),...posts.map(p=>p.category)])].map(c=><button key={c} aria-pressed={c===category} onClick={()=>{onCategoryChange(c);setType('all')}}>{c==='Todos'?'Todas las especialidades':c}</button>)}</div>
 <div className={s.grid}>{visible.map(p=><article className={s.card} key={p.id}><BeforeAfter images={p.images} compact/><div><p className="eyebrow">{[typeLabels[p.type],p.category].filter(Boolean).join(' · ')}</p><h3>{p.title}</h3>{p.location&&<p>{p.location}</p>}<button className="btn" onClick={()=>setSelected(p)}>Ver antes y después ↗</button></div></article>)}</div>
 {!visible.length&&<p className={s.empty}>{!posts.length?'Pronto compartiremos el antes y después de nuestros trabajos.':'Todavía no hay trabajos publicados con estos filtros.'} <a href="#contacto">Consultar por un trabajo ↗</a></p>}
 {selected&&<ProjectDialog post={selected} onClose={()=>setSelected(null)}/>}
 </div></section>
}

