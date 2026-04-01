import {addToFav,favItems} from './addToFav.js'

const API_KEY = "70dfd756";

const btn=document.querySelector(".submit");
btn.addEventListener("click",()=>{
    addMovie();
})

// fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}`)
// .then(res => res.json())
// .then(data => {
//     let container=
//     // Create Image Div
//     let imgDiv = document.createElement("div");
//     imgDiv.className = "pic";
//     imgDiv.style.backgroundImage = `url('${data.Poster}')`;
    
//     // Create Details Div
//     let detailDiv = document.createElement("div");
//     detailDiv.className = "details";

//     // Create and nest the paragraphs inside detailDiv
//     let p1 = document.createElement("p");
//     p1.innerHTML = `<strong>${data.Title}</strong>`;
    
//     // let p2 = document.createElement("p");
//     // p2.innerHTML = `<b>IMDb Rating</b>: ${data.imdbRating}`;
    
//     let p3 = document.createElement("p");
//     p3.innerHTML = `<b>Year</b>: ${data.Year}`;

//     let btnMore=document.createElement("button");
//     btnMore.innerText="Click to view more";
//     btnMore.className="btnStyle";
//     btnMore.addEventListener("click",()=>{
//         console.log("added!");
//     });

//     let btnFav=document.createElement("button");
//     btnFav.innerText="Add to Favorites";
//     btnFav.className="btnStyle";
//     btnFav.addEventListener("click",()=>{
//         console.log("added!");
//     });

//     // Structure: Put Ps inside DetailDiv, then put everything in Container
//     detailDiv.append(p1,p3,btnMore,btnFav);
//     container.append(imgDiv, detailDiv);
//     document.querySelector(".bigContainer").append(container);

//     console.log(data);
// });

async function addMovie()
{
    document.querySelector(".bigContainer").innerHTML="";
    const title=document.querySelector(".input").value ;
    const year=document.querySelector(".year").value ;
    let url=`https://www.omdbapi.com/?apikey=${API_KEY}&s=${title}`;
    if(year !="")
    {
        url+=`&y=${year}`;
    }
    const res=await fetch(url);
    const data=await res.json();
    data.Search.forEach((movie,index)=>{
        const container = document.createElement("div");
        container.className=`container container${index}`;
        // Create Image Div
        let imgDiv = document.createElement("div");
        imgDiv.className = `pic pic${index}`;
        imgDiv.style.backgroundImage = `url('${movie.Poster}')`;
            
        // Create Details Div
        let detailDiv = document.createElement("div");
        detailDiv.className = `details detail${index}`;

        //create button div to store buttons
        let btnDiv = document.createElement("div");
        btnDiv.className = `btn${index}`;


        // Create and nest the paragraphs inside detailDiv
        let p1 = document.createElement("p");
        p1.innerHTML = `<strong>${movie.Title}</strong>`;
            
        let p2 = document.createElement("p");
        p2.innerHTML = `<b>Type</b>: ${movie.Type}`;
            
        let p3 = document.createElement("p");
        p3.innerHTML = `<b>Year</b>: ${movie.Year}`;

        let btnMore=document.createElement("button");
        btnMore.innerText="Click to view more";
        btnMore.className=`btnStyle moreBtn${index}`;
        btnMore.addEventListener("click",()=>{
            btnMore.disabled=true;
            moreInfo(movie.imdbID, index);
        });

        let btnFav=document.createElement("button");
        btnFav.innerText="Add to Favorites";
        btnFav.className="btnStyle";
        btnFav.addEventListener("click",async ()=>{
            btnFav.disabled=true;
           let num=await addToFav(movie.imdbID, index);
           countFav(num);
        });

        // Structure: Put Ps inside DetailDiv, then put everything in Container
        btnDiv.append(btnMore,btnFav);
        detailDiv.append(p1,p2,p3,btnDiv);
        container.append(imgDiv,detailDiv);
        document.querySelector(".bigContainer").append(container);
        })
        console.log(data);
}

async function moreInfo(Id,index)
{

    const res=await fetch(`https://www.omdbapi.com/?i=${Id}&apikey=${API_KEY}`);
    const data =await res.json();
    // changing image size
    const pic=document.querySelector(`.pic${index}`);
    pic.style.height="350px" ;
    pic.style.width="300px" ;
    
    // selecting details div
    let detailDiv = document.querySelector(`.detail${index}`);

    //selecting button div
    let btn= document.querySelector(`.btn${index}`);

    // Create and nest the paragraphs inside detailDiv
    
    let p2 = document.createElement("p");
    p2.innerHTML = `<b>IMDb Rating</b>: ${data.imdbRating}`;
    
    let p4 = document.createElement("p");
    p4.innerHTML = `<b>Plot</b>: ${data.Plot}`;

    let p3 = document.createElement("p");
    p3.innerHTML = `<b>Actors</b>: ${data.Actors}`;


    // Structure: Put Ps inside DetailDiv, detailDiv already in container toh kuch karne ka req ni
    detailDiv.insertBefore(p2, btn);
    detailDiv.insertBefore(p3, btn);
    detailDiv.insertBefore(p4, btn);

    console.log(data);
}

function countFav(num)
{
    let p=document.querySelector(".count");
    p.innerHTML=` (${num})`;
}
countFav(favItems.length);