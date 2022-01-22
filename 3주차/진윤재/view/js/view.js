const $view = document.querySelector('#view');
        const url = "http://localhost:8080/"
        const getlist = async ()=>{
            const res = await fetch(url+"post/api/"+sessionStorage.getItem('id'),{
                headers: {
                    "Content-Type":"application/json"
                }
            })
            const json = await res.json();
            $view.innerHTML = `
            <p class="title">${json.title}</p>
            <ul class="views">
                <li>
                    <div class="view-img">
                        <img src="${url}img/${json.titleImg}" alt="">
                    </div>
                    <div class="view-content">${json.viewer}</div>
                </li>
                <li>
                    <div class="updel">
                        <button class="update">수정</button>
                        <button class="delete">삭제</button>
                    </div>
                </li>
            </ul>
            `
            const $update = document.querySelector('.update');
            const $delete = document.querySelector('.delete');
            $update.onclick = () => {
                location.href='update.html'
            }
            $delete.onclick = async () => {
                await fetch(url+"post/api/"+json._id,{
                    method : "delete"
                }).then((data)=>{
                    return data.json();
                }).then((data)=>{
                    alert(data.message);
                    location.href='index.html'
                }).catch((error)=>{
                    alert(error);
                })
            }
        }
        getlist();