// UI 
const getcontainer = document.querySelector('.container');
const getplaybtn = document.getElementById('playbtn');
const getreloadbtn = document.getElementById('reloadbtn');
const getprogress = document.getElementById('progress');
const getprogressbar = document.getElementById('progressbar');
const getslidevideos = document.querySelectorAll('.slidevideos');
const getvideoscreen = document.getElementById('videoscreen');
const getshowtimes = document.getElementById('showtimes');

const getopenfullscreen = document.getElementById('openfullscreen');
const getclosefullscreen = document.getElementById('closefullscreen');

const getviews = document.querySelectorAll('#views');




const samplevideos = ["samplevideo1","samplevideo2"];
let idx = 0;

// loadvideo(samplevideos[idx]);

function loadvideo(showvideo){
    getvideoscreen.src = `./libs/${showvideo}.mp4`;

}


function playvideo(){
    getplaybtn.querySelector('i.fas').classList.remove('fa-play');
    getplaybtn.querySelector('i.fas').classList.add('fa-pause');

    getvideoscreen.play();
}

function pausevideo(){
    getplaybtn.querySelector('i.fas').classList.add('fa-play');
    getplaybtn.querySelector('i.fas').classList.remove('fa-pause');
    
    getvideoscreen.pause();
}


function playandpausefun(){
    if(getvideoscreen.paused){
        playvideo();
    }else{
        pausevideo();
    }
}


function progressfun(e){
    // console.log(e.target.currentTime);

    // const currenttime = e.target.currentTime;
    // const currentduration = e.target.duration;


    const [currentTime,duration] = [e.target.currentTime,e.srcElement.duration];

    if(getvideoscreen.currentTime === 0){
        getprogressbar.style.width = "0%";
    }else{

        const getprogressspercent = (currentTime/duration) * 100;
        getprogressbar.style.width = `${getprogressspercent}%`;
    }



    // gettime forward
    let getmins = Math.floor(getvideoscreen.currentTime/60);
    let getsecs = Math.floor(getvideoscreen.currentTime%60);
    // console.log(getsecs);


    const getminuvalues = getmins.toString().padStart(2,"0");
    const getsecondvalues = getsecs.toString().padStart(2,"0");

    // console.log(getminuvalues,getsecondvalues);


    // gettime backward 
    let backmins = Math.floor((getvideoscreen.duration-getvideoscreen.currentTime)/60);
    let backsecs = Math.floor((getvideoscreen.duration-getvideoscreen.currentTime)%60);


    const getbackminvalues = backmins.toString().padStart(2,"0");
    const getbacksecvalues = backsecs.toString().padStart(2,"0");

    // console.log(getbackminvalues,getbacksecvalues);

    getshowtimes.innerHTML = `${getminuvalues} : ${getsecondvalues} / ${getbackminvalues} : ${getbacksecvalues}`;



}


function setprogress(e){
    // console.log(e.target);

    const getclientwidth = e.target.clientWidth;
    // console.log(getclientwidth); //528
    const getclientx = e.offsetX;
    // console.log(getclientx);
    const duration = getvideoscreen.duration;

    getvideoscreen.currentTime = (getclientx/getclientwidth) * duration;

}


function reloadall(){
    // console.log('hay');

    getvideoscreen.currentTime = "0";
    pausevideo();
}



function openfullscreenfun(){
    if(getcontainer.requestFullscreen){
        getcontainer.requestFullscreen(); //standard
    }else if(getcontainer.mozRequestFullscreen()){
        getcontainer.mozRequestFullscreen(); //firefox
    }else if(getcontainer.webkitRequestFullscreen()){
        getcontainer.webkitRequestFullscreen(); //chrome,safari,oppora
    }else if(getcontainer.msRequestFullscreen()){
        getcontainer.msRequestFullscreen(); // id, edge
    }

    getopenfullscreen.style.display = "none";
    getclosefullscreen.style.display = "inline-block";
}


function closefullscreenfun(){

    if(document.exitFullscreen){
        document.exitFullscreen(); //standard
    }else if(document.mozCancelFullscreen()){
        document.mozCancelFullscreen(); //firefox
    }else if(document.webkitExitFullscreen()){
        document.webkitExitFullscreen(); //chrome,safari,oppora
    }else if(document.msExitFullscreen()){
        document.msExitFullscreen(); // id, edge
    }

    getopenfullscreen.style.display = "inline-block";
    getclosefullscreen.style.display = "none";
}



// to show another videos 
getslidevideos.forEach(function(getslidevideo){

    // console.log(getslidevideo);

    getslidevideo.addEventListener('click',function(e){

        // console.log(e.target);
        // console.log(e.target.src);

    // *** don't do it
        // let shovideos = e.target.src;
        // getvideoscreen.src = shovideos;


    // *** do it
        if(getvideoscreen.played){
            getvideoscreen.src = e.target.src;
            playvideo();
        }else{
            pausevideo();
        }
        


    });

});




getplaybtn.addEventListener('click',playandpausefun);
getvideoscreen.addEventListener('timeupdate',progressfun);
getvideoscreen.addEventListener('click',playandpausefun);
// getvideoscreen.addEventListener('ended',nextvideo);

getprogress.addEventListener('click',setprogress);
getreloadbtn.addEventListener('click',reloadall);
getopenfullscreen.addEventListener('click',openfullscreenfun);
getclosefullscreen.addEventListener('click',closefullscreenfun);




//View Sections

getviews.forEach((getview)=>{
    // console.log(getview);

    getview.innerText = "0";

    const updateviewers = ()=>{
        // console.log("hay");

        const viewerdatatarget = Number( getview.getAttribute('data-target'));
        // console.log(typeof(viewerdatatarget));

        const ctr = Number(getview.innerText);
        // console.log(ctr);

        const increament = viewerdatatarget / 100;
        // console.log(increament);

        if(ctr < viewerdatatarget){
            let shownumbers = Math.ceil(ctr + increament);
            getview.innerHTML = shownumbers;
            setTimeout(updateviewers,20);
        }
    };

    updateviewers();

});






