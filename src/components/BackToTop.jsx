import React,{useEffect,useState} from 'react';
import s from './BackToTop.module.css';
export default function BackToTop(){
 const [visible,setVisible]=useState(false);
 useEffect(()=>{const update=()=>setVisible(window.scrollY>400);update();window.addEventListener('scroll',update,{passive:true});return ()=>window.removeEventListener('scroll',update)},[]);
 function goToTop(){document.querySelector('header a')?.focus({preventScroll:true});window.scrollTo({top:0,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
 if(!visible)return null;
 return <button type="button" className={s.button} onClick={goToTop} aria-label="Volver al inicio" title="Volver al inicio"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5m-6 6 6-6 6 6"/></svg></button>;
}
