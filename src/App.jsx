import React,{useState} from 'react';
import {Header,Hero,Services,Contact,Footer} from './components/Institutional';
import Portfolio from './components/Portfolio';
import RepairConsultation from './components/RepairConsultation';
export default function App(){const [category,setCategory]=useState('Todos');return <><Header/><main><Hero/><Services onSelect={setCategory}/><RepairConsultation/><Portfolio category={category} onCategoryChange={setCategory}/><Contact/></main><Footer/></>}
