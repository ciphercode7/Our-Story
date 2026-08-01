// =====================================
// CREATE STARS
// =====================================

const stars = document.querySelector(".stars");

if(stars){

    for(let i = 0; i < 350; i++){

        const star = document.createElement("div");

        star.classList.add("star");

        const size = Math.random()*3+1;

        star.style.width = size + "px";
        star.style.height = size + "px";

        star.style.left = Math.random()*100 + "%";
        star.style.top = Math.random()*100 + "%";

        star.style.animationDuration =
        (Math.random()*4+2) + "s";

        stars.appendChild(star);

    }

}



// =====================================
// SCROLL FADE ANIMATIONS
// =====================================

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("visible");

        }

    });

},{
    threshold:0.2
});


document.querySelectorAll(
".prologue, .memory, .chapter-two, .chapter-three, .movie-pause, .music-zone, .story-memory, .chat-memory"
)
.forEach(section=>{

    observer.observe(section);

});



// =====================================
// CINEMATIC MEMORY MUSIC
// =====================================

const music = document.getElementById("bgMusic");

const overlay = document.getElementById("musicOverlay");

const musicScene = document.getElementById("musicScene");


const chapter3Messages =
document.querySelectorAll(".story-memory");


let started = false;



if(overlay && music){

    overlay.addEventListener("click",()=>{

        overlay.classList.add("hide");

        music.volume = 0;

        music.play()
        .catch(()=>{});

    });

}



window.addEventListener("scroll",()=>{


    if(!music || music.paused) return;

    if(!musicScene) return;



    const chapterRect =
    musicScene.getBoundingClientRect();



    if(!started &&
    chapterRect.top < window.innerHeight * .8){


        started=true;


        let fade=setInterval(()=>{


            if(music.volume < .15){

                music.volume += .01;

            }
            else{

                clearInterval(fade);

            }


        },120);


    }



    if(!started) return;



    let volume=.15;



    chapter3Messages.forEach((message,index)=>{


        const rect =
        message.getBoundingClientRect();



        if(rect.top < window.innerHeight &&
        rect.bottom > 0){


            const progress =
            (index+1)/chapter3Messages.length;


            volume=Math.max(volume,progress);

        }


    });



    if(chapter3Messages.length){


        const last =
        chapter3Messages[
        chapter3Messages.length-1
        ];


        if(last.getBoundingClientRect().bottom < 0){

            volume=0;

        }

    }



    music.volume +=
    (volume-music.volume)*.05;


});



// =====================================
// FIREFLIES
// =====================================

const fireflyContainer =
document.querySelector(".fireflies");


if(fireflyContainer){


    for(let i=0;i<18;i++){


        const firefly =
        document.createElement("div");


        firefly.className="firefly";


        firefly.style.left =
        Math.random()*100+"%";


        firefly.style.bottom =
        (-20-Math.random()*80)+"px";


        firefly.style.animationDuration =
        (8+Math.random()*8)+"s";


        firefly.style.animationDelay =
        Math.random()*10+"s";


        fireflyContainer.appendChild(firefly);


    }

}
// =====================================
// CINEMATIC PHONE ENDING
// =====================================


const finalScene =
document.querySelector(".final-scene");


const phone =
document.getElementById("iphone");


const hand =
document.querySelector(".hand");


const lockScreen =
document.getElementById("lockScreen");


const notificationCard =
document.getElementById("notificationCard");


const instagram =
document.getElementById("instagramScreen");


const typingMessage =
document.getElementById("typingMessage");


const typingIndicator =
document.getElementById("typingIndicator");


const sendButton =
document.getElementById("sendButton");


const notification =
document.getElementById("notificationsound");


const typingSound =
document.getElementById("typingSound");



// =====================================
// SOUND SETTINGS
// =====================================


if(notification){

    notification.volume = 0.8;

}



if(typingSound){

    // FIX: preload + louder keyboard sound

    typingSound.volume = 0.35;

    typingSound.load();

}




let endingPlayed = false;



const finalText =
"All I want you to know is that I love you so much. ❤️ Happy 1st Anniversary, my love.";



let letter = 0;




// =====================================
// FADE MUSIC
// =====================================

function fadeMusic(){


    if(!music) return;



    let fade=setInterval(()=>{


        if(music.volume > 0.01){


            music.volume -=0.005;


        }
        else{


            music.volume=0;

            music.pause();

            clearInterval(fade);


        }


    },120);


}




// =====================================
// TYPE MESSAGE (SYNCED SOUND)
// =====================================

function typeMessage(){


    if(!typingMessage) return;



    let typing=setInterval(()=>{


        typingMessage.innerHTML +=
        finalText.charAt(letter);



        // keyboard click every letter

        if(typingSound){


            typingSound.currentTime=0;


            typingSound.play()
            .catch(()=>{});


        }



        letter++;



        if(letter >= finalText.length){


            clearInterval(typing);



            if(typingSound){

                typingSound.pause();

            }



            setTimeout(()=>{


                if(sendButton){

                    sendButton.classList.add("sent");

                }


            },1200);


        }



    },65);


}





// =====================================
// ENDING SEQUENCE
// =====================================


const endingObserver =
new IntersectionObserver((entries)=>{


    if(entries[0].isIntersecting &&
    !endingPlayed){


        endingPlayed=true;



        // fade background music

        fadeMusic();




        // hand rises

        setTimeout(()=>{


            if(hand){

    hand.classList.add("show");

}


        },700);





        // phone falls

        setTimeout(()=>{


            if(phone){

                phone.classList.add("drop");

            }


        },1500);






        // notification appears

        setTimeout(()=>{


            if(notification){


                notification.currentTime=0;


                notification.play()
                .catch(()=>{});


            }



            if(notificationCard){


                notificationCard.classList.add("show");


            }


        },4300);







        // open Instagram

        setTimeout(()=>{


            if(lockScreen){

                lockScreen.style.display="none";

            }



            if(instagram){

                instagram.classList.add("open");

            }


        },6500);








        // typing indicator

        setTimeout(()=>{


            if(typingIndicator){

                typingIndicator.classList.add("show");

            }


        },7000);








        // start message typing

        setTimeout(()=>{


            if(typingIndicator){

                typingIndicator.classList.remove("show");

            }



            typeMessage();



        },8500);



    }


},
{
    threshold:.7
});




if(finalScene){

    endingObserver.observe(finalScene);

}
// ===============================
// REPLY SYSTEM FIX
// ===============================


const replyBox = document.getElementById("replyBox");
const replyInput = document.getElementById("replyInput");
const replySend = document.getElementById("replySend");


if(sendButton && replyBox){


sendButton.onclick = function(){

    sendButton.classList.add("sent");

    setTimeout(()=>{

        sendButton.style.display="none";

        replyBox.style.display="flex";

    },600);

};



}



if(replySend){


replySend.onclick=function(){


    let text = replyInput.value.trim();


    if(text==="") return;



    addHerMessage(text);



    replyInput.value="";

    replyBox.style.display="none";



    setTimeout(()=>{


        addMyMessage(
        "And I hope we share more memories together💕✨🤭"
        );


    },2000);



};



}



function addHerMessage(text){


let msg=document.createElement("div");


msg.className="her-message";


msg.innerHTML=
text+
"<br><span class='time'>12:01 AM</span>";



document
.getElementById("chatArea")
.appendChild(msg);



document
.getElementById("chatArea")
.scrollTop =
document.getElementById("chatArea").scrollHeight;


}
function addMyMessage(text){


let msg=document.createElement("div");


msg.className="chat-message mine";


msg.innerHTML=`

<div class="bubble">

${text}

</div>

<span class="time">

12:02 AM

</span>

`;



document
.getElementById("chatArea")
.appendChild(msg);



document
.getElementById("chatArea")
.scrollTop =
document
.getElementById("chatArea")
.scrollHeight;

setTimeout(()=>{

triggerEnding();

},6000);


}
// =====================================
// FINAL CINEMATIC ENDING
// =====================================


const ultimateEnding =
document.querySelector(".ultimate-ending");


const endingText =
document.getElementById("endingText");



const finalWords = `

And this is only the beginning of our story... ❤️


Thank you for becoming my favorite chapter.


I can't wait for all the memories
we are still going to create together. ✨


Forever grateful for you. 💕

`;



let endingTypingStarted = false;



function typeEnding(){


    if(!endingText) return;


    let i = 0;


    const typing = setInterval(()=>{


        endingText.innerHTML += finalWords.charAt(i);


        i++;


        if(i >= finalWords.length){


            clearInterval(typing);


        }


    },80);


}




function startFinalEnding(){


    if(!ultimateEnding || !endingText) return;


    if(endingTypingStarted) return;


    endingTypingStarted = true;



    // Fade to black

    setTimeout(()=>{


        ultimateEnding.classList.add("show");


    },1000);





    // Start writing final message

    setTimeout(()=>{


        typeEnding();


    },4500);



}





// =====================================
// CONNECT TO YOUR LAST MESSAGE
// =====================================


let finalReplySent = false;



function triggerEnding(){


    if(finalReplySent) return;


    finalReplySent = true;


    startFinalEnding();


}
