const $view = document.querySelector('.posts');
        const $create = document.querySelector('.create_btn');
        $create.onclick = ()=> {
            location.href = "create.html"
        }
        const url = "http://localhost:8080/";
        const getList = async ()=> {
            const res = await fetch(url+"post/api", {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            
            const json = await res.json();
            const id =[];
            for (const data of json) {   
                const date = data.modData.split('-');
                $view.innerHTML+=`
                <li>
                    <img src="${url}img/${data.titleImg}" alt="이미지" class="post-img">
                    <a href="#">${data.title}</a>
                    <p class="post-subtitle">view : ${data.view}</p>
                    <p class="post-subtitle">${date[0].slice(0,4)}.${date[1].slice(0,2)}.${date[2].slice(0,2)}</p>
                </li>
                `
                id.push(data._id);
            }
            const $btn2 = document.querySelectorAll('a');
            for (const i in $btn2) {
                $btn2[i].onclick=()=>{
                    sessionStorage.setItem('id',id[i]);
                }
                $btn2[i].href = "view.html"
            }
            const $btn = document.querySelectorAll('.post-img');
            for (const i in $btn) {
                $btn[i].onclick = ()=> {
                    sessionStorage.setItem('id',id[i]);
                    location.href = "view.html";
                }
            }
            
        }
        getList();