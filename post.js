const params = new URLSearchParams(window.location.search);
const postId = params.get('id');

async function postMain() {
    try {
        const responsePost = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        const dataPost = await responsePost.json()

        const responseUsers = await fetch('https://jsonplaceholder.typicode.com/users')
        const dataUsers = await responseUsers.json()
        
        console.log(dataPost);

        const author = dataUsers.find(user => user.id === dataPost.userId)
        const postContainer = document.querySelector("#post-container")

        postContainer.innerHTML = `
        <div id="post-content-container">
        <div id="post-head-content">
        <div id="post-author-info">
        <img id="author-img" src="icons/shrek5.jpg" alt="Author image">
        <div id="author-text">
        <p id="post-author-name">${author.name}</p>
        <div id="post-meta">
        <p id="post-date"><time datetime="2025-07-07">7 july</time></p>
        <span class="dot">•</span>
        <p id="post-read-time">12 min read</p>
        <span class="dot">•</span>
        <p id="post-member">Member-only</p>
        </div>
        </div>
        </div>
        <div id="socials-icons">
        <img src="icons/linkedin.svg" alt="Linkedin">
        <img src="icons/facebook.svg" alt="Facebook">
        <img src="icons/twitter.svg" alt="Twitter">
        </div>
        </div>
        <h1 id="post-title">${dataPost.title}</h1>
        <p id="post-body">${dataPost.body}</p>
        <img id="post-img" src="https://picsum.photos/seed/${dataPost.id}/1120/480" alt="Post Image"> 
        <div id="post-subheader-section">
        <h2 id="post-subheader-title">Subheader</h2>
        <p id="post-subheader">How long are you awake in the morning before you go online? Perhaps it's while you're still lying in bed, using a news feed or social media as the needed stimulant to push you out from under the covers. Or maybe you wait to open your device until after a warm shower and cup of coffee. If you use sleep tracking apps, you might say you never signed off in the first place.
        <br><br>And, like millions of others during the pandemic, the internet is probably what enabled you to stay in touch with family, or complete entire years of work and/or school remotely. If this sounds familiar, then you live in a part of the world where an internet connection now counts as an essential utility — one that's as easy to take for granted as the natural gas heating your shower water or the electricity powering your coffee maker.
        <br><br>But if you think we're hyperconnected today, just wait. Globally, just over 55% of today's households have an internet connection. This gap between the internet haves and have-nots is referred to as the digital divide, and access is skewed toward richer nations. The gap is projected to close in the next decade as billions of homes connect to the internet for the first time and by 2030 it's estimated that the technology industry could account for 20% of the global electricity demand. This presents a troublesome dichotomy. On one hand, it supports livelihoods, educations, and bolsters the global economy; on the other hand, the increased usage of the apps, websites, and services that we build will place an even greater strain on our already-overloaded power grids.</p>
        </div>
        <div id="like-comments">
        <div id="likes">
        <img src="icons/Heart.svg" alt="Heart"><p>180</p></div>
        <div id="comments">
        <img src="icons/Speech Bubble.svg" alt="Speech Bubble"><p>12</p></div>
        <img id="icon-save" src="icons/IconSave.svg" alt="Save">
        </div>
        </div>
        `

    } catch (error) {
        console.error(error);
    }

}

postMain()