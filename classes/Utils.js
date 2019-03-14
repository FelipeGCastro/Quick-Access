class Utils {

    static dateFormat(date) {

        return date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' + date.getHours() + ':' + date.getMinutes();


    }

    static checkCategories(categories, action) {

        if (action === "amount") {
            let idPost
            switch (categories) {
                case "chat":
                    idPost = "c" + document.getElementById("menuChat").childElementCount

                    break;
                case "abs":
                    idPost = "a" + document.getElementById("menuAbs").childElementCount;
                    break;
                case "emails":

                    idPost = "e" + document.getElementById("menuEmails").childElementCount;
                    break;
                case "escalations":

                    idPost = "es" + document.getElementById("menuEscalations").childElementCount;
                    break;
                case "others":

                    idPost = "o" + document.getElementById("menuOthers").childElementCount;
                    break;
                case "news":

                    idPost = "n" + document.getElementById("menuNews").childElementCount;
                    break;

                default:
                    break;
            }
            return idPost
        }
        if (action === "getNum") {
            let getNum
            switch (categories) {
                case "chat":
                getNum = document.getElementById("menuChat").childElementCount

                    break;
                case "abs":
                getNum = document.getElementById("menuAbs").childElementCount;
                    break;
                case "emails":

                getNum = document.getElementById("menuEmails").childElementCount;
                    break;
                case "escalations":

                getNum = document.getElementById("menuEscalations").childElementCount;
                    break;
                case "others":

                getNum = document.getElementById("menuOthers").childElementCount;
                    break;
                case "news":

                getNum = document.getElementById("menuNews").childElementCount;
                    break;

                default:
                    break;
            }
            return getNum
        }
        if (action === "getCat") {
            let letterId
            switch (categories) {
                case "chat":
                    letterId = "c" 
                    break;
                case "abs":
                    letterId = "a" 
                    break;
                case "emails":

                    letterId = "e" 
                    break;
                case "escalations":

                    letterId = "es" 
                    break;
                case "others":

                    letterId = "o" 
                    break;
                case "news":

                    letterId = "n"
                    break;

                default:
                    break;
            }
            return letterId
        }

        if (action === "addPost") {
            let trChild

            switch (categories) {
                case "chat":
                    trChild = document.getElementById("postsChat")
                    break;
                case "abs":
                    trChild = document.getElementById("postsAbs")

                    break;
                case "emails":
                    trChild = document.getElementById("postsEmails")
                    break;
                case "escalations":
                    trChild = document.getElementById("postsEscalations")
                    break;
                case "others":
                    trChild = document.getElementById("postsOthers")
                    break;
                case "news":
                    trChild = document.getElementById("postsNews")
                    break;

                default:
                    break;
            }
            return trChild
        }
        if (action === "addMenu") {

            let liChild
            switch (categories) {
                case "chat":
                    liChild = document.getElementById("menuChat")
                    break;
                case "abs":
                    liChild = document.getElementById("menuAbs")
                    break;
                case "emails":

                    liChild = document.getElementById("menuEmails")
                    break;
                case "escalations":

                    liChild = document.getElementById("menuEscalations")
                    break;
                case "others":
                    liChild = document.getElementById("menuOthers")
                    break;
                case "news":
                    liChild = document.getElementById("menuNews")
                    break;

                default:
                    break;
            }
            return liChild
        }

    }


}