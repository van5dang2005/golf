"use client"; // This is a client component 👈🏽
import { useState } from "react";
import Link from 'next/link'
import Image from "next/image";
import ImgHeaderStart from '@/assets/images/header_start.png';
import ImgAntallStart from '@/assets/images/antall.png';
import { count } from "console";

export default function Home() {
  const [idVisisble, setIdVisible] = useState(0);
  const [team, setTeam] = useState('');
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [name3, setName3] = useState('');
  const [name4, setName4] = useState('');
  const handleChooseUser = (id:number) => {
    setIdVisible(id);
  };
  const handleChangeName= (id:number, name:string) => {
    if(id == 1){
      setName1(name);
    }
    else if(id == 2){
      setName2(name);
    }
    else if(id == 3){
      setName3(name);
    }
    else if(id == 4){
      setName4(name);
    }
    else{
      setTeam(name);
    }
  };
  const handleClickStart = () =>{
       
  }
  return (
    <>
     <div style={{height:'30%'}}>
        <Image src={ImgHeaderStart} style={{width: '100%',height:'100%'}}
              alt="Picture of the author"/>
      </div>
      <div className="flex justify-center pt-5 pb-5" style={{height:'10%',backgroundColor:'#3BB5FF'}}>
          <input name="query" className="w-3/5 rounded-3xl text-5xl	text-center" onChange={(e) => handleChangeName(0,e.target.value)}/>
      </div>
      <div style={{height:'10%'}}>
        <Image src={ImgAntallStart} style={{width: '100%',height:'100%'}}
              alt="Picture of the author"/>
      </div>
      <div className="flex justify-center pt-5 pb-5" style={{height:'10%',backgroundColor:'#3BB5FF'}}>
          <button className="rounded-full text-2xl" style={{backgroundColor:'#FEC613', width:'8%', height:'8%'}} onClick={() => handleChooseUser(1)}>1</button>
          <button className="rounded-full ml-2 text-2xl" style={{backgroundColor:'#FEC613', width:'8%', height:'8%'}} onClick={() => handleChooseUser(2)}>2</button>
          <button className="rounded-full ml-2 text-2xl" style={{backgroundColor:'#FEC613', width:'8%', height:'8%'}} onClick={() => handleChooseUser(3)}>3</button>
          <button className="rounded-full ml-2 text-2xl" style={{backgroundColor:'#FEC613', width:'8%', height:'8%'}} onClick={() => handleChooseUser(4)}>4</button>

      </div>
      <div className="flex justify-center pt-2 pb-2" style={{height:'7.5%',backgroundColor:'#3BB5FF', visibility: idVisisble >=1 ? 'visible': 'hidden'}}>
          <input name="query" className="w-3/5 rounded-3xl text-5xl	text-center" onChange={(e) => handleChangeName(1,e.target.value)}/>
      </div>
      <div className="flex justify-center pt-2 pb-2" style={{height:'7.5%',backgroundColor:'#3BB5FF', visibility: idVisisble >= 2 ? 'visible': 'hidden'}}>
          <input name="query" className="w-3/5 rounded-3xl text-5xl	text-center" onChange={(e) => handleChangeName(2,e.target.value)}/>
      </div>
      <div className="flex justify-center pt-2 pb-2" style={{height:'7.5%',backgroundColor:'#3BB5FF' , visibility: idVisisble >= 3 ? 'visible': 'hidden'}}>
          <input name="query" className="w-3/5 rounded-3xl text-5xl	text-center" onChange={(e) => handleChangeName(3,e.target.value)}/>
      </div>
      <div className="flex justify-center pt-2 pb-2" style={{height:'7.5%',backgroundColor:'#3BB5FF', visibility: idVisisble >= 4 ? 'visible': 'hidden'}}>
          <input name="query" className="w-3/5 rounded-3xl text-5xl	text-center" onChange={(e) => handleChangeName(4,e.target.value)}/>
      </div>

      <div className="flex justify-center pt-2 pb-2" style={{height:'10%',backgroundColor:'#3BB5FF'}}>
        <Link href={{ pathname: '/golf', query: { team: team, count: idVisisble, name1:name1, name2:name2, name3:name3, name4:name4 }}} className="w-3/5 rounded-3xl text-5xl	flex justify-center" style={{backgroundColor:'#FEC613'}} onClick={()=> handleClickStart()}>Start</Link>
      </div>
    </>
     
  );
}
