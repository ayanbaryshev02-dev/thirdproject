
async function postsMain() {

    if (performance.navigation.type === 1) {
        sessionStorage.removeItem('currentIndex')
        sessionStorage.removeItem('scrollPosition')
    }
    try {
        const responsePosts = await fetch('https://jsonplaceholder.typicode.com/posts')
        const dataPosts = await responsePosts.json()

        const responseUsers = await fetch('https://jsonplaceholder.typicode.com/users')
        const dataUsers = await responseUsers.json()
        
        console.log(dataUsers, dataPosts)

        const postContainer = document.querySelector('#posts-container')

        const savedIndex = parseInt(sessionStorage.getItem('currentIndex')) || 0
        let currentIndex = 0
        const postsPerPage = 3

        function loadPosts(){
            const postsToShow = dataPosts.slice(currentIndex, currentIndex + postsPerPage)

            postsToShow.forEach((post) => {
            const author = dataUsers.find(user => user.id === post.userId)
            const postBoxContent = document.createElement('div')
            postBoxContent.innerHTML = `
            <div id="posts-content-container">
            <div id="posts-head-content">
            <img id="author-img" src="icons/shrek5.jpg" alt="Author Image">
            <p id="posts-user">${author.name} <span class="in">in</span> Topics Name</p>
            <span class="dot">•</span>
            <p id="posts-date"><time datetime="2025-07-07">7 july</time></p>
            </div>
            <div id="posts-main-content">
            <div id="posts-left-side">
            <div id="posts-text-content">
            <h2 id="posts-title">${post.title}</h2>
            <p id="posts-body">${post.body}</p>
            </div>
            <div id="posts-footer-content">
            <p id="posts-theme">JavaScript</p>
            <p id="posts-read-time">12 min read</p>
            <span class="dot">•</span>
            <p id="posts-selected">Selected for you</p>
            <div id="posts-boxes">
            <div class="box"></div>
            <div class="box"></div>
            <div class="box"></div>
            </div>
            </div>
            </div>
            <img id="posts-img" src="https://picsum.photos/seed/${post.id}/265/265" alt="Post Image">
            </div>
            </div>
            `
            postContainer.append(postBoxContent)

            postBoxContent.addEventListener('click', () => {
                sessionStorage.setItem('currentIndex', currentIndex)
                sessionStorage.setItem('scrollPosition', window.scrollY)

                window.location.href = `post.html?id=${post.id}`
            })
        })
        
        currentIndex += postsPerPage

        sessionStorage.setItem('currentIndex', currentIndex)

        if(currentIndex >=dataPosts.length){
            loadMoreBtn.style.display = 'none'
        }
        }

        const loadMoreBtn = document.createElement('button')
        loadMoreBtn.id = 'load-more-btn'
        loadMoreBtn.textContent = 'Show more ⬇'
        postContainer.after(loadMoreBtn)

        loadMoreBtn.addEventListener('click',()=>{
            loadPosts()
            sessionStorage.setItem('currentIndex', currentIndex)

            if(currentIndex >= dataPosts.length){
                loadMoreBtn.style.display = 'none'
            }
        })

        while(currentIndex < savedIndex){
            loadPosts()
        }
        if(savedIndex === 0){
            loadPosts()
        }
        if(currentIndex >= dataPosts.length){
            loadMoreBtn.style.display = 'none'
        }

        const savedScroll = sessionStorage.getItem('scrollPosition')
        if(savedScroll){
            setTimeout(()=>{
                window.scrollTo(0, parseInt(savedScroll))
            }, 100)
        }

    } catch (error) {
        console.error(error);
    }

}


postsMain()