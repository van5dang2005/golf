"use client"; // This is a client component 👈🏽
import { useState } from "react";
import Image from "next/image";
import ImgHeaderStart from '@/assets/images/header_golf.png';
import { useRouter,useSearchParams } from 'next/navigation';
import { Suspense } from "react";
import Loading from "../loading";
export default function Golf() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const team = searchParams.get('team');
  const quantityUser = Number(searchParams.get('count'));
  const user1 = searchParams.get('name1');
  const user2 = searchParams.get('name2');
  const user3 = searchParams.get('name3');
  const user4 = searchParams.get('name4');

  const [golf, setGolf] = useState(Array.from({ length: 60 }, (_, i) => ({
    index : i
  })));
  const [ball, setBall] = useState([0,5,10,15,20,25,30,35,40,45,50,55]);
  const [groupBall1, setGroupBall1] = useState([1,6,11,16,21,26,31,36,41,46,51,56]);
  const [groupBall2, setGroupBall2] = useState([2,7,12,17,22,27,32,37,42,47,52,57]);
  const [groupBall3, setGroupBall3] = useState([3,8,13,18,23,28,33,38,43,48,53,58]);
  const [groupBall4, setGroupBall4] = useState([4,9,14,19,24,29,34,39,44,49,54,59]);

  const [groupUser1, setGroupUser1] = useState([1,6,11,16,21,26,31,36,41,46,51,56]);
  const [groupUser2, setGroupUser2] = useState([1,2,6,7,11,12,16,17,21,22,26,27,31,32,36,37,41,42,46,47,51,52,56,57]);
  const [groupUser3, setGroupUser3] = useState([1,2,3,6,7,8,11,12,13,16,17,18,21,22,23,26,27,28,31,32,33,36,37,38,41,42,43,46,47,48,51,52,53,56,57,58]);
  const [groupUser4, setGroupUser4] = useState([1,2,3,4,6,7,8,9,11,12,13,14,16,17,18,19,21,22,23,24,26,27,28,29,31,32,33,34,36,37,38,39,41,42,43,44,46,47,48,49,51,52,53,54,56,57,58,59]);
  const groupUser = quantityUser == 1 ? groupUser1 : quantityUser == 2 ? groupUser2 : quantityUser == 3 ? groupUser3 : groupUser4;
  
  const [sumBall1,setSumBall1] = useState(0);
  const [sumBall2,setSumBall2] = useState(0);
  const [sumBall3,setSumBall3] = useState(0);
  const [sumBall4,setSumBall4] = useState(0);

  const handleSumary = async () => {
    if(quantityUser >= 1){
      let sum1:number = 0;
      groupBall1.map((item,i) => {
        sum1 += Number((document.getElementById('hole' + item)  as HTMLInputElement).value);
      });
      await setSumBall1(sum1);
    }
    if(quantityUser >=2){
      let sum2:number = 0;
      groupBall2.map((item,i) => {
        sum2 += Number((document.getElementById('hole' + item)  as HTMLInputElement).value);
      });
      await setSumBall2(sum2);
    }
    if(quantityUser >= 3){
      let sum3:number = 0;
      groupBall3.map((item,i) => {
        sum3 += Number((document.getElementById('hole' + item)  as HTMLInputElement).value);
      });
      await setSumBall3(sum3);
    }
    if(quantityUser >= 4){
      let sum4:number = 0;
      groupBall4.map((item,i) => {
        sum4 += Number((document.getElementById('hole' + item)  as HTMLInputElement).value);
      });
      await setSumBall4(sum4);
    }  
  };
  const handleClickBall = async (e:any,i: number) =>{
    e.target.value = e.target.value.slice(0,3);
    await handleSumary();
  }
  const handleSubmit = async () =>{
    setLoading(true);
     for(let i = 0; i < quantityUser; i++){
      const id = new Date().getTime(); 
      const username = i == 0 ? user1 : i== 1 ? user2 : i == 2 ? user3 : user4;
      const groupBall = i == 0 ? groupBall1 : i== 1 ? groupBall2 : i == 2 ? groupBall3 : groupBall4;
      const arrayBall = [0,0,0,0,0,0,0,0,0,0,0,0];
      await arrayBall.map((item , i) => {
        const idString = 'hole' + groupBall[i];
        console.log(i);
        arrayBall[i] = Number((document.getElementById(idString)  as HTMLInputElement).value);
      });
      const sumball = i == 0 ? sumBall1 : i== 1 ? sumBall2 : i == 2 ? sumBall3 : sumBall4;
      const total = sumBall1 + sumBall2 + sumBall3 + sumBall4;
      const request = {
        id,
        team,
        quantityUser,
        username,
        arrayBall,
        sumball,
        total
      };
      const response = await fetch('/api/google', {
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });
      const content = await response.json();
      console.log(content);
    }
    setLoading(false);
    const params = new URLSearchParams();
    const totalScore = sumBall1 + sumBall2 + sumBall3 + sumBall4;
    params.set('team', team ? team : '');
    params.set('score', totalScore.toString());
    router.push('/end' + '?' + params.toString());
  }
  return (
    <>    
     <Suspense>
      {isLoading ? <Loading></Loading> : ''}
     <div style={{height:'100vh'}}>
        <div style={{height:'20vh'}}>
            <Image src={ImgHeaderStart} style={{width: '100%',height:'100%'}}
                  alt="Picture of the author"/>
        </div>
        <div style={{height:'5vh'}}>
          <div className="grid grid-cols-5">
            <div className="flex justify-center ...">
            </div>
            <div className="flex justify-center ...">
             <h2 style={{color:'#FFC60F', visibility: quantityUser >=1 ? 'visible': 'hidden'}} className="text-* font-bold">{user1} </h2>
            </div>
            <div className="flex justify-center ...">
            <h2 style={{color:'#FFC60F', visibility: quantityUser >=2 ? 'visible': 'hidden' }} className="text-* font-bold">{user2} </h2>
            </div>
            <div className="flex justify-center ...">
            <h2 style={{color:'#FFC60F', visibility: quantityUser >=3 ? 'visible': 'hidden' }} className="text-* font-bold">{user3} </h2>
            </div>
            <div className="flex justify-center ...">
            <h2 style={{color:'#FFC60F', visibility: quantityUser >=4 ? 'visible': 'hidden' }} className="text-* font-bold">{user4} </h2>
            </div>
          </div>
        </div>
        <div style={{height: '60vh'}}>
          <div className="grid grid-cols-5">
            {golf.map((item,i) => (             
                <div key={i} className={ball.includes(i) ? "flex justify-center ..." : "..."}>
                {ball.includes(i) ? <Image className="pb-2" src={require('@/assets/images/' + (ball.indexOf(i) + 1) + '.png')} style={{width: '60%',height:'5vh'}} alt=""/> : groupUser.includes(i) ? <input id={'hole'+ i} type="number" style={{width: '97%',height:'4vh'}} onChange={(e) => handleClickBall(e,i)} className="rounded-full text-center"/> : ''}
                </div>
              )
            )}
          </div>
        </div>
        <div className="flex justify-center ...">
          <hr className="bg-black border-0" style={{height:'0.3vh', width:'95%'}}></hr>    
        </div>
        <div className="content-center" style={{height:'5vh'}}>
          <div className="grid grid-cols-5">
            <div className="flex justify-start ...">
              <p style={{color:'#FFC60F' }} className="text-xl font-extrabold pl-3">SUM: </p>
            </div>
            <div className="flex justify-center ...">
             <h2 style={{color:'#FFC60F', visibility: quantityUser >=1 ? 'visible': 'hidden'}} className="text-xl font-extrabold">{sumBall1}</h2>
            </div>
            <div className="flex justify-center ...">
            <h2 style={{color:'#FFC60F', visibility: quantityUser >=2 ? 'visible': 'hidden' }} className="text-xl font-extrabold"> {sumBall2} </h2>
            </div>
            <div className="flex justify-center ...">
            <h2 style={{color:'#FFC60F', visibility: quantityUser >=3 ? 'visible': 'hidden' }} className="text-xl font-extrabold">{sumBall3} </h2>
            </div>
            <div className="flex justify-center ...">
            <h2 style={{color:'#FFC60F', visibility: quantityUser >=4 ? 'visible': 'hidden' }} className="text-xl font-extrabold">{sumBall4} </h2>
            </div>
          </div>
        </div>
        <div style={{height:'5vh'}}>
          <div className="grid grid-cols-5">
              <div className="col-span-3 flex justify-start ...">
                <p style={{color:'#FFC60F' }} className="text-xl font-extrabold pl-3">GJENNOMSNITT: </p>
              </div>
              <div className="flex justify-start ...">
              <h2 style={{color:'#FFC60F', visibility: quantityUser >=1 ? 'visible': 'hidden'}} className="text-xl font-extrabold">{sumBall1 + sumBall2 + sumBall3 + sumBall4}</h2>
              </div>
            
          </div>
        </div>
        <div className="flex justify-center pt-2 pb-2" style={{height:'5%',backgroundColor:'#3BB5FF'}}>
          <button className="w-3/5 rounded-3xl text-xl	flex justify-center" style={{backgroundColor:'#FEC613'}} onClick={() => handleSubmit()}>Sum Score</button>
        </div>
     </div>
     </Suspense>
    </>
     
  );
}
