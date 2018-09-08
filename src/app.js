import {
  db
} from './db';
import {config} from './config';
import * as event from './events';

class Post {
  constructor(id, title, pContent, content, likes, time, coments) {
    this.id = id;
    this.title = title;
    this.pContent = pContent;
    this.content = content;
    this.likes = likes;
    this.time = time;
    this.coments = coments;
  };

  createPost() {
    let viewCommentsText = '';
    if (this.coments.length > 0) {
      viewCommentsText = `View all ${this.coments.length} comments`;
    }
    let html = `
    <div class="post" id="${this.id}">
      <div class="title">
        <div class="avatar"><img src="${this.title.avatarImg}" class="img-fluid" alt=""></div>
        <div class="pageName">${this.title.pageName}</div>
        <div class="menuBtn"><i class="fas fa-ellipsis-v"></i></div>
      </div>
      <div class="pContent">
        <img src="${this.pContent}" class="img-fluid" alt="">
        <div class="postLikeIcon" data-display="false"><img src="img/icons/4.3.png" alt=""></div>
      </div>
      <div class="underContent">
        <div class="btns">
          <div class="like"><img src="img/icons/4.png" class="img-fluid" alt=""></div>
          <div class="comments"><img src="img/icons/8.png" class="img-fluid" alt=""></div>
          <div class="forward"><img src="img/icons/2.png" class="img-fluid" alt=""></div>
          <div class="saveToCollection"><img src="img/icons/7.png" class="img-fluid" alt=""></div>
        </div>
        <div class="content">
          <div class="likesCount">${this.likes} likes</div>
          <div class="pageName">${this.title.pageName}</div>
          <div class="text">${this.content}</div>
          <div class="viewComments">${viewCommentsText}</div>`;
    if (this.coments.length > 0) {
      html += `
      <div class="someComments">
        <ul>
      `;
      for (let i = 0; i < this.coments.length; i++) {
        html += `
        <li>
          <div class="userName">${this.coments[i].userName}</div>
          <div class="comment">
        `;
        if (this.coments[i].replyTo !== "") {
          html += `
              <span>${this.coments[i].replyTo}</span>
              ${this.coments[i].text}
            </div>
          </li>
          `;
        } else {
          html += `
              ${this.coments[i].text}
            </div>
          </li>
          `;
        }
        if (i == 1) {
          break;
        }
      }
      html += `
            </ul>
           </div>
           <div class="time">7 HOURS AGO . <span>SEE TRANSLATION</span></div>
          </div>
      </div>
    </div>
    `;
    } else {
      html += `
      <div class="time">7 HOURS AGO . <span>SEE TRANSLATION</span></div>
      </div>
  </div>
</div>
      `;
    }

    return html;
  }
}

const postsElement = document.getElementById('posts');

db.getDB('posts').then((posts) => {
  let data = '';
  posts.forEach(post => {
    const newPost = new Post(post.id, post.title, post.pContent, post.content, post.likes, post.time, post.coments);
    data += newPost.createPost();
  });
  postsElement.innerHTML = data;
});


