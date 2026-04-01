export let favItems=JSON.parse(localStorage.getItem("fav"))|| [];
const API_KEY = "70dfd756";

export async function addToFav(Id,index)
{
    const res=await fetch(`https://www.omdbapi.com/?i=${Id}&apikey=${API_KEY}`);
    const data =await res.json();
    if (!favItems.some(item => item.imdbID === data.imdbID)) {
    favItems.push(data);
    }
    localStorage.setItem("fav",JSON.stringify(favItems)) ;
    return favItems.length;
}

function display()
{
   const bigContainer = document.querySelector(".bigContainerFav");

    if (!bigContainer) return;
    else{bigContainer.innerHTML="";} 

    favItems.forEach((movie,index)=>{
        const container = document.createElement("div");
        container.className=`container`;
        // Create Image Div
        // let imgDiv = document.createElement("div");
        // imgDiv.className = `pic favPic${index}`;
        // imgDiv.style.backgroundImage = `url('${movie.Poster}')`;
        let img = document.createElement("img");
        img.className = `pic favPic${index}`;
        img.src = movie.Poster !== "N/A" ? movie.Poster : "fallback.jpg";

        // 👇 THIS is the correct error handling
        img.onerror = () => {
            img.src = "/error.jpeg";
        };
            
        // Create Details Div
        let detailDiv = document.createElement("div");
        detailDiv.className = `details favDetail${index}`;

        //create button div to store buttons
        let btnDiv = document.createElement("div");
        btnDiv.className = `favBtn${index}`;


        // Create and nest the paragraphs inside detailDiv
        let p1 = document.createElement("p");
        p1.innerHTML = `<strong>${movie.Title}</strong>`;
            
        let p2 = document.createElement("p");
        p2.innerHTML = `<b>Type</b>: ${movie.Type}`;
            
        let p3 = document.createElement("p");
        p3.innerHTML = `<b>Year</b>: ${movie.Year}`;

        let btnMore=document.createElement("button");
        btnMore.innerText="Click to view more";
        btnMore.className=`btnStyle favMoreBtn${index}`;
        btnMore.addEventListener("click",()=>{
            btnMore.disabled=true;
            favMoreInfo(movie.imdbID, index);
        });

        let btnFav=document.createElement("button");
        btnFav.innerText="Remove From Favorites";
        btnFav.className="btnStyle";
        btnFav.addEventListener("click",()=>{
            btnFav.disabled=true;
           removeFromFav(index);
        });

        // Structure: Put Ps inside DetailDiv, then put everything in Container
        btnDiv.append(btnMore,btnFav);
        detailDiv.append(p1,p2,p3,btnDiv);
        container.append(img,detailDiv);
        document.querySelector(".bigContainerFav").append(container);
        })
        console.log(favItems);
}
display();
async function favMoreInfo(Id,index)
{

    const res=await fetch(`https://www.omdbapi.com/?i=${Id}&apikey=${API_KEY}`);
    const data =await res.json();
    // changing image size
    const pic=document.querySelector(`.favPic${index}`);
    pic.style.height="350px" ;
    pic.style.width="300px" ;
    
    // selecting details div
    let detailDiv = document.querySelector(`.favDetail${index}`);

    //selecting button div
    let btn= document.querySelector(`.favBtn${index}`);

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
function removeFromFav(indexDelete)
{
    favItems = favItems.filter((_, index) => index !== indexDelete);
   localStorage.setItem("fav",JSON.stringify(favItems)) ;
   display();
}