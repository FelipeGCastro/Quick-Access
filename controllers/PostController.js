class PostController {

    constructor(formIdCreate, formIdUpdate) {

        this.formEl = document.getElementById(formIdCreate)
        this.formUpdateEl = document.getElementById(formIdUpdate)
        this.formField = document.querySelectorAll(`#${formIdCreate} [name]`)
        this.loadPost()
        this.onSubmit()
        this.copyText()
        this.onEdit()
        this.saveAll()


    }

    loadPost() {



        window.addEventListener("beforeunload", (event) => {
            event.returnValue = "Antes de sair, verifique se já salvou o que modificou!";
            return "Antes de sair, verifique se já salvou o que modificou!"
        });


        postsData.forEach(postData => {

            let datas = new Post
            datas.loadFromJSON(postData)

            this.addLines(datas)
        })



    }



    onEdit() {



        document.getElementById("cancelUpdate").addEventListener("click", e => {
            event.preventDefault()
            let modal = document.getElementById('myModal');

            modal.style.display = "none";


        })
        this.formUpdateEl.addEventListener("submit", event => {

            event.preventDefault()

            let modal = document.getElementById('myModal');

            let btn = this.formUpdateEl.querySelector("[type=submit]")

            let values = this.getValues(this.formUpdateEl)

            let oldCateg = this.formUpdateEl.dataset.trCateg
            let oldClass = this.formUpdateEl.dataset.trClass



            if (oldCateg == values.categories) {

                let trIndex = this.formUpdateEl.dataset.trIndex
                let tr = Utils.checkCategories(values.categories, "addPost").rows[trIndex]

                let json = JSON.parse(tr.dataset.post)

                let li = Utils.checkCategories(values.categories, "addMenu").children[parseInt(trIndex) + 1];

                tr.className = `post${json._idPost}`
                li.className = `post${json._idPost}`

                values.idPost = json._idPost;

                let post = new Post()

                post.loadFromJSON(values)

                console.log(post)
                post.save();

                this.getTr(post, tr)
                this.getLi(post, li)

                modal.style.display = "none";

                btn.disabled = false;

            } else {
                let postSection = document.getElementsByClassName(oldClass)[1]
                console.log(postSection)

                let oldPost = new Post()
                oldPost.loadFromJSON(JSON.parse(postSection.dataset.post))
                oldPost.remove()
                let post = new Post()

                post.loadFromJSON(values)
                console.log(values)
                console.log(post)
                post.save();
                this.addLines(values)
                this.removePost(oldClass)
                modal.style.display = "none";

            }



        })


    }

    onSubmit() {
        [...this.formEl.elements].forEach(function (field, index) {

            field.addEventListener("keypress", event => {


                if (field.classList.value == "has-error") {
                    field.classList.remove('has-error');
                }


            })

        })


        this.formEl.addEventListener("submit", event => {

            event.preventDefault()

            let btn = this.formEl.querySelector("[type=submit]")

            btn.disabled = true;

            let values = this.getValues(this.formEl)

            if (!values) {
                btn.disabled = false;
                return false;
            } else {

                // let a = document.createElement("a");

                // let file = new Blob([content], {type: contentType});
                // a.href = URL.createObjectURL(file);
                // a.download = fileName;
                // a.click();

                values.save();
                this.addLines(values)

                this.formEl.reset();

                btn.disabled = false;
            }
        })
    }
    saveAll() {

        let btnSave = document.getElementById("downloadFile")


        btnSave.addEventListener("click", () => {


            var json = JSON.stringify(postsData);

            var textFileAsBlob = new Blob(["let postsData = " + json], { type: 'text/plain' });

            var downloadLink = document.createElement("a");
            downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
            downloadLink.download = "posts.txt";
            downloadLink.click();

        })



    }

    getValues(formEl) {

        let post = {};
        let isValid = true;
        [...formEl.elements].forEach(function (field, index) {

            if (['titleForm', 'categories', 'textForm'].indexOf(field.name) > -1 && !field.value) {

                field.classList.add('has-error');
                isValid = false;
            }

            post[field.name] = field.value

        })

        // continuar daqui para criar um id unico
        let createdId = Utils.checkCategories(post.categories, "amount")

        if (document.getElementById(createdId)) {
            let getCat = Utils.checkCategories(post.categories, "getCat")
            let getNum = Utils.checkCategories(post.categories, "getNum")

            for (let i = 1; i < 100; i++) {
                if (document.getElementById(getCat + i)) {

                } else {
                    post.idPost = getCat + getNum + "op" + i
                    break
                }

            }

        } else {
            post.idPost = createdId

        }

        if (!isValid) {

            return false
        }
        return new Post(post.idPost, post.titleForm, post.textForm, post.categories)

    }//



    // selectAll() {

    //     let posts = Post.getPostsStorage()

    //     posts.forEach(dataPost => {

    //         let post = new Post()

    //         post.loadFromJSON(dataPost)

    //         this.addLines(post)

    //     });

    // }


    insert(data) {

        let posts = this.getPostsStorage()

        posts.push(data);
        // sessionStorage.setItem("posts", JSON.stringify(posts));
        localStorage.setItem("posts", JSON.stringify(posts));


    }
    addLines(dataPost) {

        let tr = this.getTr(dataPost)
        let li = this.getLi(dataPost)



        tr.className = `post${dataPost.idPost}`
        li.className = `post${dataPost.idPost}`



        Utils.checkCategories(dataPost.categories, "addPost").appendChild(tr)
        Utils.checkCategories(dataPost.categories, "addMenu").appendChild(li)


    }
    getTr(dataPost, tr = null) {

        if (tr === null) tr = document.createElement("tr");
        tr.dataset.post = JSON.stringify(dataPost)

        tr.innerHTML = `<div><h3 style="display: inline; margin-right: 30px;" 
    >${dataPost.titleForm}</h3>
        <p class="inline">${Utils.dateFormat(dataPost.datePost)}</p><br>
                <p id="${dataPost.idPost}" >${dataPost.textForm}</p><br>
                <button type="link"  id="btn-remove" class="remove"
                value="post${dataPost.idPost}" >Remover</button>
                <button type="link" id="btn-edit" class="Editar"
                value="post${dataPost.idPost}" >Editar</button></div>
                `
        this.addEventsTr(tr);

        return tr;

    }
    getLi(dataPost, li = null) {


        if (li === null) li = document.createElement("li");
        li.dataset.post = JSON.stringify(dataPost.idPost)

        li.innerHTML = `<p class="inline">${dataPost.titleForm}</p>
        <a type="link" style="cursor: pointer; color: blue;" class="copy"
        value="${dataPost.idPost}" >Copy</a>`

        return li;

    }

    addEventsTr(tr) {
        tr.querySelector("#btn-edit").addEventListener("click", e => {


            let json = JSON.parse(tr.dataset.post)
            let form = document.querySelector("#fieldFormUpdate")

            form.dataset.trIndex = tr.rowIndex;
            form.dataset.trCateg = json._categories;
            form.dataset.trClass = `post${json._idPost}`;


            for (let name in json) {

                let field = form.querySelector("[name=" + name.replace("_", "") + "]")
                if (field) {
                    field.value = json[name]
                }

            }

            // Get the modal
            let modal = document.getElementById('myModal');

            modal.style.display = "block";


        })
        tr.querySelector("#btn-remove").addEventListener("click", e => {

            let className = tr.className

            let conf = confirm("Tem certeza que quer remover o item?");

            if (conf) {
                let post = new Post()
                post.loadFromJSON(JSON.parse(tr.dataset.post))
                post.remove()
                this.removePost(className)
            }
        })

    }
    removePost(className) {


        let postSection = document.getElementsByClassName(className)[1]

        let postTitle = document.getElementsByClassName(className)[0]

        postSection.remove();
        postTitle.remove();


    }

    copyText() {

        document.addEventListener('click', function (e) {
            if (e.target.className == "copy") {
                let id = e.target.attributes["value"].value

                let text = document.querySelector(`#${id}`).textContent
                var textArea = document.createElement("textarea");
                textArea.value = text;
                document.body.appendChild(textArea);
                textArea.select();

                try {
                    var successful = document.execCommand('copy');
                    var msg = successful ? 'successful' : 'unsuccessful';
                    console.log('Fallback: Copying text command was ' + msg);
                } catch (err) {
                    console.error('Fallback: Oops, unable to copy', err);
                }
                document.body.removeChild(textArea)

            }
        })


    }


}



// let text = document.querySelector(`#${id}`).textContent
//         var textArea = document.createElement("textarea");
//         textArea.value = text;
//         document.body.appendChild(textArea);
//         textArea.select();

//         try {
//             var successful = document.execCommand('copy');
//             var msg = successful ? 'successful' : 'unsuccessful';
//             console.log('Fallback: Copying text command was ' + msg);
//         } catch (err) {
//             console.error('Fallback: Oops, unable to copy', err);
//         }

//         document.body.removeChild(textArea);