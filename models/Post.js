class Post {
    constructor(id, title, text, categories) {

        this._idPost = id
        this._titleForm = title
        this._textForm = text
        this._categories = categories
        this._datePost = new Date()

    }

    get idPost() {

        return this._idPost

    }
    get titleForm() {

        return this._titleForm

    }
    get textForm() {

        return this._textForm

    }
    get categories() {

        return this._categories

    }
    get datePost() {

        return this._datePost

    }

    set idPost(value) {
        this._idPost = value;
    }

    loadFromJSON(json) {

        for (let name in json) {

            switch (name) {

                case '_datePost':

                    this[name] = new Date(json[name])
                    break;

                default:
                    this[name] = json[name]
                    break;
            }
        }
    }

    static getPostsStorage() {

        let posts = []
        if (localStorage.getItem("posts")) {
            posts = JSON.parse(localStorage.getItem("posts"))
        }
        console.log(typeof posts)
        return posts
    }
    save() {

        

        if (postsData.length > 0) {

            let postcheck = postsData.filter(e => {
                if (e._idPost == this._idPost) return e
            })
            console.log(postcheck)
            if (postcheck.length >= 1) {

                postsData.map(p => {

                    if (this._idPost == p._idPost) {

                        Object.assign(p, this)

                        console.log(p, this, "já tem o posto. substituir")

                    }
                    return p
                })
                console.log(this, "já tem o posto. substituir")

            } else {
                postsData.push(this);
                console.log(this, "Já tem, mas não esse")
            }


            // posts.forEach((dataPost, ) => {

            //     if (this._idPost == dataPost._idPost) {

            //         Object.assign(dataPost, this)

            //         console.log(dataPost, "já tem o posto. substituir")

            //     }

            // });

            // posts.filter(dataPost => {

            //     if (this._idPost == dataPost._idPost) {

            //         Object.assign(dataPost, this)

            //         console.log(dataPost, "já tem o posto. substituir")

            //     }
            // })


        } else {
            postsData.push(this);
            console.log(this, "Não tem Post esse é o primeiro")
        }

        // sessionStorage.setItem("posts", JSON.stringify(posts));
        // localStorage.setItem("posts", JSON.stringify(postsData));

    }

    remove() {

        

        postsData.forEach((dataPost, index) => {

            if (this._idPost == dataPost._idPost) {

                postsData.splice(index, 1)
            }

        });

        // localStorage.setItem("posts", JSON.stringify(posts));

    }


}