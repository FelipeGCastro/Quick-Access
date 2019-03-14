let postController = new PostController("fieldForm", "fieldFormUpdate")

// function copyText(id) {
//     /* Get the text field */
//     let text = document.querySelector(`#${id}`).textContent
//     var textArea = document.createElement("textarea");
//     textArea.value = text;
//     document.body.appendChild(textArea);
//     textArea.select();

//     try {
//         var successful = document.execCommand('copy');
//         var msg = successful ? 'successful' : 'unsuccessful';
//         console.log('Fallback: Copying text command was ' + msg);
//     } catch (err) {
//         console.error('Fallback: Oops, unable to copy', err);
//     }

//     document.body.removeChild(textArea);


// }

