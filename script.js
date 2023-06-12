// yaha hum post ko local storage sai get kr rhy hy ...aur agr koi post exist nhi kr rhi tou aik empty array intialize hojai ga
var posts = JSON.parse(localStorage.getItem("posts")) || [];
// Generate a random ID
function RandomId() {
    var randomId = Math.floor(100000 + Math.random() * 900000);
    return randomId;
}

function renderPosts() {// Screen pr post  show hogi
    var postList = document.getElementById("postList");
    postList.innerHTML = ""; // yaha pr jo bhi content hoga wo clear hojai ga

    // Loop chlai gai hr post pr aur generate kraingai HTML element hr post kai liyay
    const currentName = localStorage.getItem("name");

    const filteredPosts = posts.filter(function (post) {
        return post.name === currentName;
    });

    filteredPosts.forEach(function (post) {
        //For each calls a function for each element in an array
        //post.id, post.title, post.description property hy post obj ki  
        var postthing = document.createElement("div");
        postthing.className = "post";
        postthing.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.description}</p>
            <button class="editButton">Edit</button>
         <div class="Editable_feild" style="display: none;">
            <input class="editTitle" type="text" value="${post.title}"/>
            <input class="editDescription" type="text" value="${post.description}" />
            <button class="saveButton" data-id="${post.id}">Save</button>
        </div>
            <button class="deleteButton" data-id="${post.id}">Delete</button>`;
        postList.appendChild(postthing);//Jo bhi post hogi wo direct HTML kai Page pr shown krdaiga


    });

    //Delete Btn work
    var deletebtn = document.getElementsByClassName("deleteButton");//yaha document get hoga 
    Array.from(deletebtn).forEach(function (button) {//(Array.from)jo result collection elements ki wo convert hojai gi array mai
        //har element Array ky,event listener add huwa hy click event kai liyay
        button.addEventListener("click", function () {
            var postId = parseInt(button.getAttribute("data-id"));
            deletePost(postId);
        });
    });


    //Edit Btn Work
    var editButtons = document.getElementsByClassName("editButton");
    //yaaha pr bhi jo result collection hy array ki wo cnvert hojai gi array mai
    Array.from(editButtons).forEach(function (button) {
        button.addEventListener("click", function () {
            //yah represents krta hy wo element that comes immediately after a particular element in the HTML structure, within the same parent element.
            var Editable_feild = button.nextElementSibling;
            Editable_feild.style.display = "block";
        });
    });


    //Save Btn Work
    var saveButtons = document.getElementsByClassName("saveButton");
    Array.from(saveButtons).forEach(function (button) {
        button.addEventListener("click", function () {
            var postId = parseInt(button.getAttribute("data-id"));
            var Editable_feild = button.parentElement;
            var EditTitle = Editable_feild.querySelector(".editTitle");
            var EditDescription = Editable_feild.querySelector(".editDescription");
            var editedTitle = EditTitle.value;
            var editedDescription = EditDescription.value;

            Editable_feild.style.display = "none";

            editPost(postId, editedTitle, editedDescription);
        });
    });
}

//Yha pr execution horhi hy edit post kaisai hogi
function editPost(postId, editedTitle, editedDescription) {
    // find:function used huwa hy posts array pr search krny kai liyay 
    // post object with an id property jo match krhi ho provided postId
    var UpdatePost = posts.find(function (post) {
        return post.id === postId;
    });
    // Agr UpdatePost shi hy tou proceed krjai update pr
    if (UpdatePost) {
        //jo edit title hy na wo null hona chahiyay na wo khali "" hona chahiyay
        if (editedTitle !== null && editedTitle !== "") {
            UpdatePost.title = editedTitle;
        }
        //jo edit description hy na wo null hona chahiyay na wo khali "" hona chahiyay

        if (editedDescription !== null && editedDescription !== "") {
            UpdatePost.description = editedDescription;
        }
        var postsJson = JSON.stringify(posts);
        localStorage.setItem("posts", postsJson);
        renderPosts();
    }
}

//Yha pr execution ho rhi hy kai post delete kaisai hoogi
function deletePost(postId) {
    posts = posts.filter(function (post) {
        return post.id !== postId;
    });

    var postsJson = JSON.stringify(posts);
    localStorage.setItem("posts", postsJson);

    renderPosts();
}


// Yha pr Event listner lagai gai hr post pr
var postForm = document.getElementById("postForm");
postForm.addEventListener("submit", function (event) {
    // Yaha pr hum stop kr rhy form kai default behaviour ko submit hony pr
    //...submit pr click krny sai web page reload na ho ya kisi dosri direction mai na jai
    event.preventDefault();

    // Yaha hum form mai jo value input hui hy wo get kr rhy hy id kai through 
    var title = document.getElementById("titleInput").value;
    var description = document.getElementById("descriptionInput").value;
    var name = localStorage.getItem("name");
    // Yaha dekhai gai kai input feild empty hy alert show karadai
    if (!title || !description) {
        alert("Please enter both title and description");
        return; // Agr khali hy tou yhi rok do
    }
    var id = RandomId();

    // Yaha pr hum form kai nichy post show karaingai
    var post = {
        name: name,
        id: id,
        title: title,
        description: description
    };

    // Yaha hum jo post hy is ko post waly array mai save kardingai
    posts.push(post);

    // Post array ko convert kr rhy string mai
    var postsJson = JSON.stringify(posts);

    // Yaha hum is ko string ko local storage mai save kr rhy 
    localStorage.setItem("posts", postsJson);

    // yaha pr hum input feild empty kr rhy
    postForm.reset();

    // Yha hum jo post create hui hy iusko render kr rhy hy
    renderPosts();
});

// yaha function end horha hy rendering post ka
renderPosts();