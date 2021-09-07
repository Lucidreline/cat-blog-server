import { Injectable } from '@nestjs/common';

@Injectable()
export class PostsService {
  private posts: any = [
    {
      id: 0,
      imageUrl:
        'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1101&q=80',
      title: 'Denor',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus, est laudantium necessitatibus.',
      likeCounter: 1,
    },
    {
      id: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1101&q=80',
      title: 'Ipsum Dolor Sit',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus, est laudantium necessitatibus.',
      likeCounter: 5,
    },
    {
      id: 2,
      imageUrl:
        'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1101&q=80',
      title: 'Sit',
      description:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus, est laudantium necessitatibus.',
      likeCounter: 3,
    },
  ];

  findAll() {
    return this.posts;
  }

  findById(postId: number) {
    return this.posts.find((post) => post.id === postId);
  }
}
