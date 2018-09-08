import {db} from './db';
// config db
export const config = (function () {
  // create database and add data to it
  if (!db.dbExist('posts')) {
    let data = [
      // start post 1
      {
        id: 1,
        title: {
          avatarImg: "img/usersAvatar/avatar.jpg",
          pageName: "mohsen.coder"
        },
        pContent: "img/posts/5.jpeg",
        content: "This is a test content for this post This is a test content for this post",
        time: "1536318205876",
        likes: 64,
        coments: [{
            id: 0,
            class: 'c-1',
            userAvatar: "img/usersAvatar/avatar2.jpg",
            userName: "Mohammad",
            replyTo: "",
            text: "This is a comment from Mohammad.",
            time: "1536318205876",
            likes: 2,
            isAdminLiked: 'no',
            isMainComment: 'yes',
            subComments: [{
              id: 0,
              class: 's',
              userAvatar: "img/usersAvatar/avatar.jpg",
              userName: "mohsen.coder",
              replyTo: "@Mohammad",
              text: "This is a comment from Mohsen",
              time: "1536318205876",
              likes: 0,
              isAdminLiked: 'no',
              isMainComment: 'no',
              subComments: []
            }]
          },
          {
            id: 1,
            class: 'c-2',
            userAvatar: "img/usersAvatar/avatar3.jpg",
            userName: "Ali",
            replyTo: "",
            text: "This is a comment from Ali",
            time: "1536318205876",
            likes: 0,
            isAdminLiked: 'no',
            isMainComment: 'yes',
            subComments: [
              {
                id: 0,
                class: 's',
                userAvatar: "img/usersAvatar/avatar.jpg",
                userName: "mohsen.coder",
                replyTo: "@Ali",
                text: "This is a comment from Mohsen",
                time: "1536318205876",
                likes: 0,
                isAdminLiked: 'no',
                isMainComment: 'no',
                subComments: []
              }
            ]
          },
          {
            id: 2,
            class: 'c-3',
            userAvatar: "img/usersAvatar/avatar4.jpg",
            userName: "Hassan",
            replyTo: "",
            text: "This is a comment from Hassan",
            time: "1536318205876",
            likes: 0,
            isAdminLiked: 'no',
            isMainComment: 'yes',
            subComments: []
          },
          {
            id: 3,
            class: 'c-4',
            userAvatar: "img/usersAvatar/avatar5.jpg",
            userName: "Sara",
            replyTo: "",
            text: "This is a comment from Sara",
            time: "1536318205876",
            likes: 1,
            isAdminLiked: 'no',
            isMainComment: 'yes',
            subComments: []
          }
        ]
      },
      // end post 1

      // start post 2
      {
        id: 2,
        title: {
          avatarImg: "img/usersAvatar/avatar2.jpg",
          pageName: "John_Coder"
        },
        pContent: "img/posts/1.jpeg",
        content: "This is a test content for this post This is a test content for this post",
        time: "1536318205876",
        likes: 35,
        coments: []
      },
      {
        id: 3,
        title: {
          avatarImg: "img/usersAvatar/avatar5.jpg",
          pageName: "Sara_Janson"
        },
        pContent: "img/posts/4.jpeg",
        content: "This is a test content for this post This is a test content for this post",
        time: "1536318205876",
        likes: 78,
        coments: [
          {
            id: 0,
            class: 'c-1',
            userAvatar: "img/usersAvatar/avatar2.jpg",
            userName: "Mohanmmad",
            replyTo: "",
            text: "Nice",
            time: "1536318205876",
            likes: 2,
            isAdminLiked: 'no',
            isMainComment: 'yes',
            subComments:[]
          },
          {
            id: 0,
            class: 'c-2',
            userAvatar: "img/usersAvatar/avatar3.jpg",
            userName: "Reza",
            replyTo: "",
            text: "Beautiful",
            time: "1536318205876",
            likes: 2,
            isAdminLiked: 'no',
            isMainComment: 'yes',
            subComments:[]
          }
        ]
      },
      {
        id: 4,
        title: {
          avatarImg: "img/usersAvatar/avatar4.jpg",
          pageName: "Cris_7"
        },
        pContent: "img/posts/2.jpeg",
        content: "This is a test content for this post This is a test content for this post",
        time: "1536318205876",
        likes: 64,
        coments: []
      },
      {
        id: 5,
        title: {
          avatarImg: "img/usersAvatar/avatar3.jpg",
          pageName: "Jack_Wilson"
        },
        pContent: "img/posts/3.jpg",
        content: "This is a test content for this post This is a test content for this post",
        time: "1536318205876",
        likes: 99,
        coments: []
      }
      // end post 2
    ];
    db.createDB('posts', JSON.stringify(data));
  }
})();