"use client"; // This is a client component 👈🏽
import Image from "next/image";
import ImgHeaderStart from '@/assets/images/end_header.png';
import ImgWin from '@/assets/images/win.png';
import { useSearchParams } from 'next/navigation';

export default function End() {
  const searchParams = useSearchParams();
  const team = searchParams.get('team');
  const score = searchParams.get('score');
  return (
    <>
     <div style={{height:'100vh'}}>
        <div style={{height: '60vh'}}>
          <Image src={ImgHeaderStart} style={{width: '100%',height:'100%'}}
                  alt="Picture of the author"/>
        </div>
        <div className="flex justify-center pt-5 pb-5" style={{height:'10%',backgroundColor:'#3BB5FF'}}>
          <input name="query" className="w-3/5 rounded-3xl text-sm text-center" placeholder={team ? team : ''}/>
        </div>
        <div style={{height:'10%'}}>
            <Image src={ImgWin} style={{width: '100%',height:'100%'}}
              alt="Picture of the author"/>
        </div>
        <div className="flex justify-center pt-5 pb-5" style={{height:'10%',backgroundColor:'#3BB5FF'}}>
          <input name="query" className="w-3/5 rounded-3xl text-sm	text-dark text-center" placeholder={score ? score : ''}/>
        </div>
     </div> 
    </>
     
  );
}
