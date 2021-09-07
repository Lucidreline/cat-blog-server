import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-post.dto';
import { BlogPost } from './entities/blog-post.entity';

@Injectable()
export class PostsService {
  private posts: BlogPost[] = [
    {
      id: 0,
      imageUrl:
        'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1101&q=80',
      title: 'Denor',
      textBody:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus, est laudantium necessitatibus.',
      likeCounter: 1,
    },
    {
      id: 1,
      imageUrl:
        'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1101&q=80',
      title: 'Ipsum Dolor Sit',
      textBody:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus, est laudantium necessitatibus.',
      likeCounter: 5,
    },
    {
      id: 2,
      imageUrl:
        'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1101&q=80',
      title: 'Sit',
      textBody:
        'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus, est laudantium necessitatibus.',
      likeCounter: 3,
    },
  ];

  findAll(query?: string): BlogPost[] {
    if (query)
      return this.posts.filter(
        (post) =>
          post.textBody
            .toLocaleLowerCase()
            .includes(query.toLocaleLowerCase()) ||
          post.title.toLocaleLowerCase().includes(query.toLocaleLowerCase()),
      );
    return this.posts;
  }

  findById(postId: number): BlogPost {
    return this.posts.find((post) => post.id === postId);
  }

  createPost(post: CreateTaskDto): BlogPost {
    const { imageUrl } = post;
    const newPost = {
      ...post,
      id: Date.now(),
      imageUrl: imageUrl
        ? imageUrl
        : 'https://images.unsplash.com/photo-1494256997604-768d1f608cac?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1101&q=80',
      likeCounter: 0,
    };

    this.posts.push(newPost);
    return newPost;
  }
}
