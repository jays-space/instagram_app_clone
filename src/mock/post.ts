import {IPost} from '../types/models';

export const POST = {
  id: '1',
  createdAt: '19 December 2021',
  image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg',
  description:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?',
  user: {
    image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
    username: 'jaymondlana',
  },
  nofComments: 11,
  nofLikes: 33,
  comments: [
    {
      id: '1',
      comment: 'Hello there',
      user: {
        username: 'vadimnotjustdev',
      },
    },
    {
      id: '2',
      comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
      user: {
        username: 'vadimnotjustdev',
      },
    },
  ],
};

export const POSTS: IPost[] = [
  {
    id: 'video',
    createdAt: '19 December 2021',
    video:
      'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?',
    user: {
      id: 'u1',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
      username: 'jaymondlana',
      name: 'jay',
    },
    nofComments: 11,
    nofLikes: 34,
    comments: [
      {
        id: '1',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
        user: {
          id: 'u1',
          username: 'vadimnotjustdev',
          name: 'vadimnotjustdev',
        },
      },
      {
        id: '2',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
        user: {
          id: 'u1',
          username: 'vadimnotjustdev',
          name: 'vadimnotjustdev',
        },
      },
    ],
  },
  {
    id: '1',
    createdAt: '19 December 2021',
    images: [
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/1.jpg',
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/2.jpg',
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/3.jpg',
      'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/4.jpg',
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?',
    user: {
      id: 'u1',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/1.jpg',
      username: 'jaymondlana',
      name: 'jay',
    },
    nofComments: 11,
    nofLikes: 34,
    comments: [
      {
        id: '1',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
        user: {
          id: 'u1',
          username: 'jaymondlana',
          name: 'jay',
        },
      },
      {
        id: '2',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
        user: {
          id: 'u1',
          username: 'vadimnotjustdev',
          name: 'vadim',
        },
      },
    ],
  },
  {
    id: '2',
    createdAt: '19 December 2021',
    image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/2.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?',
    user: {
      id: 'u1',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/2.jpg',
      username: 'vadimnotjustdev',
      name: 'vadim',
    },
    nofComments: 11,
    nofLikes: 34,
    comments: [
      {
        id: '1',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
        user: {
          id: 'u1',
          username: 'vadimnotjustdev',
          name: 'vadim',
        },
      },
      {
        id: '2',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
        user: {
          id: 'u1',
          username: 'vadimnotjustdev',
          name: 'vadim',
        },
      },
    ],
  },
  {
    id: '3',
    createdAt: '19 December 2021',
    image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/3.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?',
    user: {
      id: 'u1',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/3.jpg',
      username: 'vadimnotjustdev',
      name: 'vadim',
    },
    nofComments: 11,
    nofLikes: 34,
    comments: [
      {
        id: '1',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
        user: {
          id: 'u1',
          username: 'vadimnotjustdev',
          name: 'vadim',
        },
      },
      {
        id: '2',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
        user: {
          id: 'u1',
          username: 'vadimnotjustdev',
          name: 'vadim',
        },
      },
    ],
  },
  {
    id: '4',
    createdAt: '19 December 2021',
    image: 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/images/4.jpg',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic repellendus unde blanditiis. Eos fugiat dolorem ea fugit aut sapiente corrupti autem dolores deleniti architecto, omnis, amet unde dignissimos quam minima?',
    user: {
      id: 'u1',
      image:
        'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/avatars/4.jpg',
      username: 'vadimnotjustdev',
      name: 'vadim',
    },
    nofComments: 11,
    nofLikes: 34,
    comments: [
      {
        id: '1',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
        user: {
          id: 'u1',
          username: 'vadimnotjustdev',
          name: 'vadim',
        },
      },
      {
        id: '2',
        comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. H',
        user: {
          id: 'u1',
          username: 'vadimnotjustdev',
          name: 'vadim',
        },
      },
    ],
  },
];
