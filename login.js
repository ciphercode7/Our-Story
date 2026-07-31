// =====================================
// CREATE STAR FIELD
// =====================================

const starContainer = document.querySelector(".stars");

for(let i = 0; i < 350; i++){

    const star = document.createElement("div");

    star.classList.add("star");


    const size = Math.random() * 3 + 1;

    star.style.width = size + "px";

    star.style.height = size + "px";


    star.style.left = Math.random() * 100 + "%";

    star.style.top = Math.random() * 100 + "%";


    star.style.animationDuration =
    (Math.random() * 4 + 2) + "s";


    star.style.animationDelay =
    Math.random() * 5 + "s";


    starContainer.appendChild(star);

}


// =====================================
// INTRO TYPING
// =====================================

const storyText = [

    "Some stories...",

    "are written in books.",

    "Others...",

    "are written in memories.",

    "This one...",

    "was written by two hearts. ❤️"

];


let line = 0;

let letter = 0;


const typing =
document.getElementById("typing");



function typeStory(){


    if(line >= storyText.length){

        return;

    }


    if(letter < storyText[line].length){


        typing.textContent +=
        storyText[line].charAt(letter);


        letter++;


        setTimeout(typeStory,80);


    }

    else{


        setTimeout(()=>{


            typing.textContent="";

            letter=0;

            line++;


            typeStory();


        },1200);


    }


}


typeStory();



// =====================================
// PASSWORD CHECK
// =====================================


function checkPassword(){


    const password =
    document.getElementById("password").value;



    if(password === "September10"){


        document.body.style.transition="2s";

        document.body.style.opacity="0";


        setTimeout(()=>{


            window.location.href="welcome.html";


        },2000);


    }


    else{


        document.getElementById("error").textContent =

        "❤️ That password is not correct.";


    }


}



// =====================================
// ENTER KEY SUPPORT
// =====================================

document
.getElementById("password")
.addEventListener("keydown",function(event){


    if(event.key==="Enter"){


        checkPassword();


    }


});