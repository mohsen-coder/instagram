import {db} from './db';
import { isArray } from 'util';
import { resolve } from 'url';

document.addEventListener('click',(e) => {
  console.log(e);
  // open post menu option
  if(e.target.classList.contains('fas')){
    postMenu();
  }else if(e.target.id === "postMenuOptionsBg"){
    postMenu();
  }
  // current post like btn
  if(e.target.parentElement.className === "like" && e.target.classList.contains('img-fluid')){
    clickOnLikeBtnUnderCurrentPostImage(e);
  }
  // view all comments
  if(e.target.className === "viewComments"){
    viewAllComments(e);
  }
  // close comment page 
  if(e.target.classList.contains('fa-arrow-left')){
    closeCommentPage();
  }
  if(e.target.classList.contains('fa-heart') && e.target.parentElement.className === "like"){
    likeCurrentComment(e);
  }
  if(e.target.className === "subCommentsText"){
    displaySubComments(e);
  }
  try{
    if(e.target.parentElement.className === "comments"){
      let currentPostID = parseInt( e.target.parentElement.parentElement.parentElement.parentElement.id);
      sessionStorage.setItem('currentPost',currentPostID);
      viewAllComments('s');
    }
  }catch(e){}
  
});


// double click events
document.addEventListener('dblclick',(e) => {
  // like post image
  if(e.target.parentElement.className === "pContent"){
    dbCurrentPostImage(e);
  }
});


// add coment to comment page 
document.getElementById('addCommentInput').addEventListener('keypress',addCommentToList);


// Post Menu
function postMenu(){
  const postMenuOptionsBg = document.getElementById('postMenuOptionsBg');
  const postMenuOptions = document.getElementById('postMenuOptions');
  if(postMenuOptionsBg.style.display === "none"){
    postMenuOptions.style.display = "block";
    postMenuOptionsBg.style.display = "block";
  }else{
    postMenuOptions.style.display = "none";
    postMenuOptionsBg.style.display = "none";
  }
}


// dbClick on current post image
function dbCurrentPostImage(e){
  // Click on post image
  const postLikeIcon = e.target.parentElement.children[1];
  const likeBtnUnderPostImage = e.target.parentElement.nextElementSibling.children[0].children[0];
  const likeCounter = e.target.parentElement.nextElementSibling.children[1].children[0];
  let likeNumber = likeCounter.innerText.split(" ");
  if(postLikeIcon.getAttribute("data-display") === "false"){
    postLikeIcon.setAttribute("class","postLikeIcon scale-up-center");
    setTimeout(() => {
      postLikeIcon.setAttribute("class","postLikeIcon");
    },1500);
    if(!likeBtnUnderPostImage.children[0].classList.contains("scale-up-center")){
      likeBtnUnderPostImage.children[0].setAttribute("src","img/icons/4.4.png");
      likeBtnUnderPostImage.children[0].setAttribute("class","img-fluid scale-up-center");
      likeCounter.innerText = `${++likeNumber[0]} ${likeNumber[1]}`;
    }
  }
}


// click on like button under current post image
function clickOnLikeBtnUnderCurrentPostImage(e){
  const likeBtn = e.target.parentElement;
  const likeCounter = e.target.parentElement.parentElement.nextElementSibling.children[0];
  let likeNumber = likeCounter.innerText.split(" ");
  if(!likeBtn.children[0].classList.contains("scale-up-center")){
    likeBtn.children[0].setAttribute("src","img/icons/4.4.png");
    likeBtn.children[0].setAttribute("class","img-fluid scale-up-center");
    likeCounter.innerText = `${++likeNumber[0]} ${likeNumber[1]}`;
  }else{
    likeBtn.children[0].setAttribute("src","img/icons/4.png");
    likeBtn.children[0].setAttribute("class","img-fluid");
    likeCounter.innerText = `${--likeNumber[0]} ${likeNumber[1]}`;
  }
}


// click on View All (number) comments
function viewAllComments(event){

  let postId;
  try{
    postId = parseInt(event.target.parentElement.parentElement.parentElement.id);
  }catch(e){
    postId = parseInt(sessionStorage.getItem('currentPost'));
  }
  
  
  sessionStorage.setItem('currentPost',postId);

  const allComments = document.querySelector('#allComments');
  const camera = document.getElementById('camera');
  const instagramText = document.getElementById('instagramText');
  const backArrow = document.createElement('i');
  backArrow.className = "fas fa-arrow-left";

  // replace camera icon to back arrow
  camera.replaceChild(backArrow,camera.children[0]);
  camera.style.fontSize = "20px";
  camera.style.marginLeft = "20px";
  camera.style.cursor = "pointer";

  // replace instagram text to comments
  instagramText.innerText = "Comments";
  instagramText.style.fontFamily = "'Roboto',sans-serif";
  instagramText.style.fontWeight = "bold";
  instagramText.style.fontSize = "17px";
  instagramText.style.paddingTop = "3px";

  // show comment page
  allComments.style.display = "block";
  
  // get current post comments from database
  db.getDB('posts').then(res => {
    const post = res.find((item) => {
      if(item.id === postId){
        return item;
      }
    });

    const postComments = post.coments;
    let html = `
      <div class="postContent">
        <div class="avatar"><img src="${post.title.avatarImg}" class="img-fluid" alt=""></div>
        <div class="content">
          <div class="pageName">${post.title.pageName}</div>
          <div class="text">${post.content}</div>
        </div>
      </div>
      <hr>
      <div class="comentItems">
        <ul>
      `;
    postComments.forEach((comment) => {
      html += `
      <li class="${comment.class}">
        <div class="userAvatar"><img src="${comment.userAvatar}" class="img-fluid" alt=""></div>
        <div class="comentContent">
          <div class="userName">${comment.userName}</div>
          <div class="comment">${comment.text}</div>
          <div class="like">`;
          if(comment.isAdminLiked === 'no'){
            html += `<i class="far fa-heart"></i>`;
          }else{
            html += `<i class="fas fa-heart" style="color: red;"></i>`;
          }
          html +=`</div>
          <div class="option">
            <div class="time">1h</div>`;
            if(comment.likes === 0){
              html += `<div class="d-comments"></div>`;
            }else{
              html += `<div class="likes">${comment.likes} likes</div>`;
            }
            html += `
            <div class="reply">Reply</div>
          </div>
      `;
      if(comment.subComments.length === 0){
        html += `
        </div>
      </li>
      `;
      }else{
        html += `
            <div class="subCommentsText">View replies (${comment.subComments.length})</div>
            </div>
            <div class="subComments">
              <ul>`;
        comment.subComments.forEach((comment) => {
          html += `
          <li class="${comment.class}">
            <div class="userAvatar"><img src="${comment.userAvatar}" class="img-fluid" alt=""></div>
            <div class="comentContent">
              <div class="userName">${comment.userName}</div>
              <div class="comment">
            `;
            if(comment.replyTo !== ""){
              html += `
              <span>${comment.replyTo}</span>
              `;
            }
            html += `
              ${comment.text}
              </div>
              <div class="like">`;
              if(comment.isAdminLiked === 'no'){
                html += `<i class="far fa-heart"></i>`;
              }else{
                html += `<i class="fas fa-heart" style="color: red;"></i>`;
              }
              html +=`
              </div>
              <div class="option">
                <div class="time">16m</div>`;
              if(comment.likes === 0){
                html += `<div class="d-comments"></div>`;
              }else{
                html += `<div class="likes">${comment.likes} likes</div>`;
              }
              html += `
                <div class="d-comments"></div>
                <div class="reply">Reply</div>
              </div>
            </div>
          </li>
            `;
        });

        html += `
        </ul>
        </div>
        </li>
        `;
      }
     
    });

    html += `
      </ul>
      </div>
    `

    allComments.children[0].innerHTML = html;
    $(".comentItems").niceScroll({
      cursorcolor: "#e7e7e7",
      cursorborderradius: "0",
      cursorborder: "0",
      scrollspeed: 1,
      cursorwidth: "0"
      //  mousescrollstep: 40
    });
  });

  // let x = JSON.parse(data);


  $(".comentItems").niceScroll({
    cursorcolor: "#e7e7e7",
    cursorborderradius: "0",
    cursorborder: "0",
    scrollspeed: 1,
    cursorwidth: "0"
    //  mousescrollstep: 40
  });

} 


// close comment page
function closeCommentPage(){
  const allComments = document.querySelector('#allComments');
  const camera = document.getElementById('camera');
  const instagramText = document.getElementById('instagramText');
  const postMenuOptionsBg = document.getElementById('postMenuOptionsBg');
  const postMenuOptions = document.getElementById('postMenuOptions');
  postMenuOptionsBg.style.display = "none";
  postMenuOptions.style.display = "none";
  allComments.style.display = "none";
  camera.innerHTML = `<img src="img/icons/1.png" class="img-fluid" alt="">`;
  instagramText.innerText = 'Instagram';
  instagramText.removeAttribute('style');
}

// Like current comment
function likeCurrentComment(e){
  const i = e.target;
  const likeCounter = i.parentElement.nextElementSibling.children[1];
  let likeIncrement;

  if(likeCounter.innerText !== ""){
    likeIncrement = likeCounter.innerText.split(" ");
  }

  const postMenuOptionsBg = document.getElementById('postMenuOptionsBg');
  const postMenuOptions = document.getElementById('postMenuOptions');
  postMenuOptionsBg.style.display = "none";
  postMenuOptions.style.display = "none";

  if(i.className !== "fas fa-heart"){
    if(likeCounter.className === "d-comments"){
      i.className = "fas fa-heart";
      i.style.color = "red";
      likeCounter.innerText = '1 likes';
      likeCounter.className = 'likes';
    }else{
      i.className = "fas fa-heart";
      i.style.color = "red";
      if(likeCounter.style.display === 'none'){
        likeCounter.style.display = 'inline';
      }
      likeCounter.innerText = `${++likeIncrement[0]} ${likeIncrement[1]}`;
    }
    
  }else{
    i.className = "far fa-heart";
    i.removeAttribute('style');
    likeCounter.innerText = `${--likeIncrement[0]} ${likeIncrement[1]}`;
    if(likeIncrement[0] == 0){
      likeCounter.style.display = 'none';
    }
  }

}


// Like current comment
function likeCurrentComment(e){
  const i = e.target; // Like Icon
  const likeCounter = i.parentElement.nextElementSibling.children[1]; // Get Likes Element
  let likeIncrement;
  let userName = e.target.parentElement.parentElement.children[0].innerText;  // Get main comment User Name
  let subCommentUserName = e.target.parentElement.parentElement.children[0].innerText;  // Get subComment User Name
  let parenSubComment;  // SubComment Parent
  let isSubComment = 'no';

  if(e.target.parentElement.parentElement.parentElement.className === 's'){
      parenSubComment = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[0].innerText;
      userName = parenSubComment;
      isSubComment = 'yes';
      sessionStorage.setItem('parenSubComment',parenSubComment);
  }

  if(likeCounter.innerText !== ""){
    likeIncrement = likeCounter.innerText.split(" ");
  }

  const postMenuOptionsBg = document.getElementById('postMenuOptionsBg');
  const postMenuOptions = document.getElementById('postMenuOptions');
  postMenuOptionsBg.style.display = "none";
  postMenuOptions.style.display = "none";
  
  if(i.className !== "fas fa-heart"){
    if(likeCounter.className === "d-comments"){
      i.className = "fas fa-heart";
      i.style.color = "red";
      likeCounter.innerText = '1 likes';
      likeCounter.className = 'likes';
      // insert likes data to database
      db.getDB('posts').then((res) => {
        const post = res.find((item) => {
          const currentPost = parseInt(sessionStorage.getItem('currentPost'));
          if(item.id === currentPost){
            return item;
          }
        });
        const postComments = post.coments;
        const findUser = postComments.find((item) => {
          if(item.userName === userName){
            return item;
          }
        });
        console.log('is sub commen?',isSubComment);
        if(findUser.isMainComment === 'yes' && isSubComment === 'no'){
          findUser.likes += 1;
          findUser.isAdminLiked = 'yes';
          console.log('we are here now1');
        }else{
          console.log('we are here now2');
          const parenSubComment = sessionStorage.getItem('parenSubComment');

          const findUserInParentOfSubComments = postComments.find((item) => {
            if(item.userName === parenSubComment){
              return item;
            }
          });
          
          const findUserInSubComments = findUserInParentOfSubComments.subComments.find((item) => {
            if(item.userName === subCommentUserName){
              
              return item;
            }
          });

            findUserInSubComments.likes += 1;
            findUserInSubComments.isAdminLiked = 'yes';
        }
        localStorage.setItem('posts',JSON.stringify(res));
      });

    }else{
      console.log('we are here now0');
      i.className = "fas fa-heart";
      i.style.color = "red";
      if(likeCounter.style.display === 'none'){
        likeCounter.style.display = 'inline';
      }
      likeCounter.innerText = `${++likeIncrement[0]} ${likeIncrement[1]}`;
      db.getDB('posts').then((res) => {
        const post = res.find((item) => {
          const currentPost = parseInt(sessionStorage.getItem('currentPost'));
          if(item.id === currentPost){
            return item;
          }
        });
        const postComments = post.coments;
        const findUser = postComments.find((item) => {
          if(item.userName === userName){
            return item;
          }
        });
        if(findUser.isMainComment === 'yes' && isSubComment === 'no'){
          findUser.likes += 1;
          findUser.isAdminLiked = 'yes';
        }else{
          const parenSubComment = sessionStorage.getItem('parenSubComment');

          const findUserInParentOfSubComments = postComments.find((item) => {
            if(item.userName === parenSubComment){
              return item;
            }
          });
          
          const findUserInSubComments = findUserInParentOfSubComments.subComments.find((item) => {
            if(item.userName === subCommentUserName){
              
              return item;
            }
          });
            findUserInSubComments.likes += 1;
            findUserInSubComments.isAdminLiked = 'yes';
        }
        // console.log(findUser);
        
        localStorage.setItem('posts',JSON.stringify(res));
      });
    }
    
  }else{
    i.className = "far fa-heart";
    i.removeAttribute('style');
    likeCounter.innerText = `${--likeIncrement[0]} ${likeIncrement[1]}`;
    if(likeIncrement[0] == 0){
      likeCounter.style.display = 'none';
    }
    db.getDB('posts').then((res) => {
      const post = res.find((item) => {
        const currentPost = parseInt(sessionStorage.getItem('currentPost'));
        if(item.id === currentPost){
          return item;
        }
      });
      const postComments = post.coments;
      const findUser = postComments.find((item) => {
        if(item.userName === userName){
          return item;
        }
      });
      
      if(findUser.isMainComment === 'yes' && isSubComment === 'no'){
        findUser.likes -= 1;
        findUser.isAdminLiked = 'no';
        
      }else{
          
        const parenSubComment = sessionStorage.getItem('parenSubComment');

        const findUserInParentOfSubComments = postComments.find((item) => {
          if(item.userName === parenSubComment){
            return item;
          }
        });
        
        const findUserInSubComments = findUserInParentOfSubComments.subComments.find((item) => {
          if(item.userName === subCommentUserName){
            
            return item;
          }
        });
        // console.log(findUserInParentOfSubComments);
        
        findUserInSubComments.likes -= 1;
        findUserInSubComments.isAdminLiked = 'no';
        
      }

      localStorage.setItem('posts',JSON.stringify(res));
    });
  }

}

// Display SubComments
function displaySubComments(e){
  const subCommentsText = e.target;
  const subComments = e.target.parentElement.nextElementSibling;
  subCommentsText.style.display = 'none';
  subComments.style.display = 'block';
}

// Add comment to current post comments list
function addCommentToList(e){
  const textInput = document.getElementById('addCommentInput');
  if(e.keyCode === 13){
    db.getDB('posts').then((res) => {
      let currentPostIndex = (sessionStorage.getItem('currentPost')) - 1;
      let comments = res[currentPostIndex].coments;
      let data = {
        id: comments.length + 1,
        class: `c-${comments.length + 1}`,
        userAvatar: "img/usersAvatar/avatar.jpg",
        userName: "mohsen.coder",
        replyTo: "",
        text: textInput.value,
        time: new Date().getTime(),
        likes: 0,
        isAdminLiked: 'no',
        isMainComment: 'yes',
        subComments:[]
      };
      comments.push(data);

      // add new comment to database
      const result = JSON.stringify(res);
      localStorage.setItem('posts',result);
      viewAllComments(sessionStorage.getItem('currentPost'));
    });

  }
  
}