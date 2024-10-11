export const commentsData = [
  {
    id: 1,
    user: 'Alice',
    profileImage: 'https://i.pravatar.cc/150?img=1',
    text: "I found this article really helpful! I've been struggling with performance issues for a while.",
    replies: [
      {
        id: 2,
        user: 'Bob',
        profileImage: 'https://i.pravatar.cc/150?img=2',
        text: 'Totally agree, Alice! Optimizing images alone made a huge difference in one of my projects.',
        replies: [],
      },
      {
        id: 3,
        user: 'Charlie',
        profileImage: 'https://i.pravatar.cc/150?img=3',
        text: "Same here! I also found that using a CDN improved my site's loading speed significantly.",
        replies: [],
      },
    ],
  },
  {
    id: 4,
    user: 'Dave',
    profileImage: 'https://i.pravatar.cc/150?img=4',
    text: 'Great insights! Do you have any recommendations for optimizing large video files?',
    replies: [
      {
        id: 5,
        user: 'Eve',
        profileImage: 'https://i.pravatar.cc/150?img=5',
        text: '@Dave, you could try compressing videos with tools like HandBrake or using modern formats like WebM for better compression.',
        replies: [],
      },
    ],
  },
  {
    id: 6,
    user: 'Frank',
    profileImage: 'https://i.pravatar.cc/150?img=6',
    text: "One trick I've learned is lazy loading images. It’s especially useful for pages with a lot of media.",
    replies: [],
  },
];

export const users = ['Alice', 'Bob', 'Charlie', 'Dave', 'Eve', 'Frank'];
