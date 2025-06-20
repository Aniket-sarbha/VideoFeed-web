const baseVideos = [
  {
    id: 1,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    title: "Amazing Startup Journey",
    description: "From zero to hero: How I built my startup from scratch and scaled it to millions in revenue. This is the complete story of my entrepreneurial journey.",
    userName: "Gabar Singh",
    userImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    hashtag: "#StartupIndia",
    episode: "Episode 1",
    likes: "200K",
    comments: "1.3K",
    shares: "456",
    earnings: "₹ 2.1K",
    isPaid: false,
    isFollowing: false,
    isLiked: false
  },
  {
    id: 2,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    title: "Tech Innovation Hub",
    description: "Exploring the latest trends in AI and machine learning. Join me as I dive deep into the future of technology and its impact on our daily lives.",
    userName: "Priya Sharma",
    userImage: "https://images.unsplash.com/photo-1494790108755-2616b612b7fd?w=150&h=150&fit=crop&crop=face",
    hashtag: "#TechTalk",
    episode: "Episode 5",
    likes: "150K",
    comments: "890",
    shares: "234",
    earnings: "₹ 1.8K",
    isPaid: true,
    isFollowing: true,
    isLiked: false
  },
  {
    id: 3,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    title: "Fitness Revolution",
    description: "Transform your body in 30 days with this simple workout routine. No gym required! Just dedication and consistency to achieve your fitness goals.",
    userName: "Arjun Patel",
    userImage: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    hashtag: "#FitnessGoals",
    episode: "Episode 12",
    likes: "89K",
    comments: "445",
    shares: "123",
    earnings: "₹ 950",
    isPaid: false,
    isFollowing: false,
    isLiked: false
  },
  {
    id: 4,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    title: "Cooking Mastery",
    description: "Learn to cook authentic Indian cuisine with traditional recipes passed down through generations. Perfect for beginners and food enthusiasts.",
    userName: "Meera Rajesh",
    userImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    hashtag: "#CookingTips",
    episode: "Episode 8",
    likes: "95K",
    comments: "567",
    shares: "189",
    earnings: "₹ 1.2K",
    isPaid: true,
    isFollowing: true,
    isLiked: false
  },
  {
    id: 5,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    title: "Travel Diaries",
    description: "Exploring hidden gems across India. Join me on this incredible journey as we discover breathtaking landscapes and rich cultural heritage.",
    userName: "Rohit Kumar",
    userImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    hashtag: "#TravelIndia",
    episode: "Episode 3",
    likes: "178K",
    comments: "923",
    shares: "345",
    earnings: "₹ 2.5K",
    isPaid: false,
    isFollowing: false,
    isLiked: false
  }
];

const additionalVideos = [
  {
    id: 6,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    title: "Music Production Tips",
    description: "Learn how to create amazing beats and produce professional music from your home studio. Perfect for beginners and aspiring producers.",
    userName: "DJ Aryan",
    userImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=150&h=150&fit=crop&crop=face",
    hashtag: "#MusicProduction",
    episode: "Episode 4",
    likes: "120K",
    comments: "678",
    shares: "289",
    earnings: "₹ 1.5K",
    isPaid: false,
    isFollowing: false,
    isLiked: false
  },
  {
    id: 7,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4",
    title: "Photography Secrets",
    description: "Master the art of photography with these professional tips and tricks. From lighting to composition, learn it all here.",
    userName: "Sneha Kapoor",
    userImage: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face",
    hashtag: "#Photography",
    episode: "Episode 7",
    likes: "85K",
    comments: "392",
    shares: "156",
    earnings: "₹ 890",
    isPaid: true,
    isFollowing: true,
    isLiked: false
  },
  {
    id: 8,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4",
    title: "Digital Marketing Mastery",
    description: "Unlock the secrets of digital marketing and grow your business online. Learn about SEO, social media, and content marketing strategies.",
    userName: "Rahul Gupta",
    userImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    hashtag: "#DigitalMarketing",
    episode: "Episode 2",
    likes: "95K",
    comments: "521",
    shares: "203",
    earnings: "₹ 1.1K",
    isPaid: false,
    isFollowing: false,
    isLiked: false
  }
];

// Generate more videos for pagination
function generateMoreVideos(page) {
  const videosPerPage = 3;
  const startId = (page - 1) * videosPerPage;
  
  return Array.from({ length: videosPerPage }, (_, index) => {
    const videoIndex = (startId + index) % (baseVideos.length + additionalVideos.length);
    const sourceVideo = videoIndex < baseVideos.length 
      ? baseVideos[videoIndex] 
      : additionalVideos[videoIndex - baseVideos.length];
    
    return {
      ...sourceVideo,
      id: startId + index + 100, // Unique ID for pagination
      title: `${sourceVideo.title} - Page ${page}`,
      episode: `Episode ${startId + index + 1}`,
    };
  });
}

export const mockVideos = baseVideos;

// Simulate API fetch with timeout and pagination
export const fetchVideos = (page = 1) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate random API failure (5% chance)
      if (Math.random() < 0.05) {
        reject(new Error('Failed to fetch videos'));
      } else {
        let videos;
        let hasMore = true;
        
        if (page === 1) {
          videos = baseVideos;
        } else if (page === 2) {
          videos = additionalVideos;
        } else if (page <= 5) {
          videos = generateMoreVideos(page);
        } else {
          videos = [];
          hasMore = false;
        }
        
        resolve({
          videos,
          hasMore,
          page,
          totalPages: 5
        });
      }
    }, 1000 + Math.random() * 1000); // 1-2 second delay
  });
};

// Simulate optimistic API calls
export const simulateApiCall = (action, data) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate API failure (10% chance)
      if (Math.random() < 0.1) {
        reject(new Error(`Failed to ${action}`));
      } else {
        resolve({
          success: true,
          action,
          data,
          timestamp: new Date().toISOString()
        });
      }
    }, 500 + Math.random() * 1000); // 0.5-1.5 second delay
  });
};
