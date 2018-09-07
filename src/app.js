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
});

// add coment to comment page 
document.getElementById('addCommentInput').addEventListener('keypress',addCommentToList);

const pContent = document.querySelectorAll(".pContent");
pContent.forEach((item) => {
  item.addEventListener('dblclick',dbCurrentPostImage);
});

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
function viewAllComments(e){
  const comments = e.target.parentElement.parentElement.nextElementSibling.innerHTML;
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
  allComments.children[0].innerHTML = comments;
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
  // console.log(likeCounter);
}

// add coment to comments list
/* function addCommentToList(e){
  console.log(e);
  const textInput = document.getElementById('addCommentInput');
  const allComments = document.getElementById('allComments');
  const commentsList = allComments.children[0].children[2].children[0];
  let kos = document.createElement('li');
  let userComment = `
    <div class="userAvatar"><img src="img/avatar.jpg" class="img-fluid" alt=""></div>
    <div class="comentContent">
      <div class="userName">mohsen.coder</div>
      <div class="comment">
        <!--<span>@Mohammad</span>-->
        ${textInput.value}
      </div>
      <div class="like">
        <i class="far fa-heart"></i>
        <!-- <i class="fas fa-heart"></i> red -->
      </div>
      <div class="option">
        <div class="time">1s</div>
        <div class="d-comments"></div>
        <div class="reply">Reply</div>
      </div>
    </div>
  `;
  kos.innerHTML = userComment;
  if(e.keyCode === 13){
    commentsList.appendChild(kos);
    $(".comentItems").niceScroll({
      cursorcolor: "#e7e7e7",
      cursorborderradius: "0",
      cursorborder: "0",
      scrollspeed: 1,
      cursorwidth: "0"
      //  mousescrollstep: 40
    });
  }
} */