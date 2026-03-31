const API_KEY = "70dfd756";

const btn=document.querySelector(".submit");
btn.addEventListener("click",()=>{
    addMovie();
})

fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=${API_KEY}`)
.then(res => res.json())
.then(data => {
    const container = document.querySelector(".container");

    // Create Image Div
    let imgDiv = document.createElement("div");
    imgDiv.className = "pic";
    imgDiv.style.backgroundImage = `url('${data.Poster}')`;
    
    // Create Details Div
    let detailDiv = document.createElement("div");
    detailDiv.className = "details";

    // Create and nest the paragraphs inside detailDiv
    let p1 = document.createElement("p");
    p1.innerHTML = `<strong>${data.Title}</strong>`;
    
    // let p2 = document.createElement("p");
    // p2.innerHTML = `<b>IMDb Rating</b>: ${data.imdbRating}`;
    
    let p3 = document.createElement("p");
    p3.innerHTML = `<b>Year</b>: ${data.Year}`;

    let btnMore=document.createElement("button");
    btnMore.innerText="Click to view more";
    btnMore.className="btnStyle";
    btnMore.addEventListener("click",()=>{
        console.log("added!");
    });

    let btnFav=document.createElement("button");
    btnFav.innerText="Add to Favorites";
    btnFav.className="btnStyle";
    btnFav.addEventListener("click",()=>{
        console.log("added!");
    });

    // Structure: Put Ps inside DetailDiv, then put everything in Container
    detailDiv.append(p1,p3,btnMore,btnFav);
    container.append(imgDiv, detailDiv);
    document.querySelector(".bigContainer").append(container);

    console.log(data);
});

async function addMovie()
{
    const title=document.querySelector(".input").value ;
    const year=document.querySelector(".input").value ;
    const res=await fetch(`https://www.omdbapi.com/?s=guardian&apikey=${API_KEY}`);
    const data=await res.json();
    data.Search.forEach((movie,index)=>{
        const container = document.createElement("div");
        container.className=`container container${index}`;
        // Create Image Div
        let imgDiv = document.createElement("div");
        imgDiv.className = "pic";
        imgDiv.style.backgroundImage = `url('${movie.Poster}')`;
            
            // Create Details Div
        let detailDiv = document.createElement("div");
        detailDiv.className = "details";

            // Create and nest the paragraphs inside detailDiv
        let p1 = document.createElement("p");
        p1.innerHTML = `<strong>${movie.Title}</strong>`;
            
        let p2 = document.createElement("p");
        p2.innerHTML = `<b>Type</b>: ${movie.Type}`;
            
        let p3 = document.createElement("p");
        p3.innerHTML = `<b>Year</b>: ${movie.Year}`;

        let btnMore=document.createElement("button");
        btnMore.innerText="Click to view more";
        btnMore.className="btnStyle";
        btnMore.addEventListener("click",()=>{
            console.log("added!");
        });

        let btnFav=document.createElement("button");
        btnFav.innerText="Add to Favorites";
        btnFav.className="btnStyle";
        btnFav.addEventListener("click",()=>{
            console.log("added!");
        });

            // Structure: Put Ps inside DetailDiv, then put everything in Container
        detailDiv.append(p1,p2,p3,btnMore,btnFav);
        container.append(imgDiv, detailDiv);
        document.querySelector(".bigContainer").append(container);
        })
        console.log(data);
}
