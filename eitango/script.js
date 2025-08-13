// lib
dq=(el)=>document.querySelector(el);
dbt=(el)=>document.getElementsByTagName(el);
// lib-end
dq("#startb").addEventListener("click",async()=>{
    inp=dq("#data").value.split("\n");
    [tm/*,vl*/]=inp[0].split(" ").map(Number);
    if((/^https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+$/).test(inp[1])) dt=(await(await fetch(inp[1])).text()).split("\n");
    else dt=inp.slice(1,inp.length);
    dt=dt.map(n=>n.split("/"));
    dq("#main").innerHTML="";
    dq("#main").insertAdjacentHTML("beforeend",`<h1 id="title"></h1>`);
    dq("#main").insertAdjacentHTML("beforeend",`<h2 id="mean"></h2>`);
    dbt("body")[0].style.cursor="none";
    /*if(vl!=0){
      dbt("body")[0].style.background="#ca4848";
      dbt("body")[0].insertAdjacentHTML("afterbegin",`<div class="snow-container"><div class="snow small"><span>❄</span></div><div class="snow medium"><span>❄</span></div><div class="snow large"><span>❄</span></div></div>`);
    }
    else */dbt("body")[0].style.background="#00552e";
    dq("#title").innerText="START!",pg=0;
    window.speechSynthesis.getVoices();
    /*audioContext=new AudioContext(),nd=audioContext.createGain(),nd.gain.value=vl/100;
    audio=audioContext.createBufferSource(),audio.loop=true;
    audio.buffer=await audioContext.decodeAudioData(await(await fetch("https://cdn.glitch.global/a7526ca3-f363-4c3d-adf4-922e708ccdef/kiyosiko.mp3")).arrayBuffer());
    audio.connect(nd).connect(audioContext.destination);
    await new Promise(n=>setTimeout(n,3000));
    audio.start();*/
    await new Promise(n=>setTimeout(n,2000));
    voice=window.speechSynthesis.getVoices()[5];
    int=setInterval(async()=>{
        if(pg>=dt.length){
            clearInterval(int);
            dq("#title").innerText="終わり",dq("#mean").innerText="";
            await new Promise(n=>setTimeout(n,3000));
        }
        else{
            ["title","mean"].map((v,n)=>{
              dq(`#${v}`).innerText=dt[pg][n];
              // dq(`#${v}`).style=`font-size:${100/dt[pg][n].length}vw`;
            });
            utter=new SpeechSynthesisUtterance(dt[pg][0]);
            utter.voice=voice;
            window.speechSynthesis.speak(utter);
            pg++;
        }
    },tm*1000);
});