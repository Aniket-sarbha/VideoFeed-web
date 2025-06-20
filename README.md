# VideoFeed App 🎥

A modern, mobile-first video streaming social media platform built with Next.js 15, featuring a TikTok-like interface with smooth video playback, social interactions, and a beautiful UI.

## ✨ Features

- **📱 Mobile-First Design**: Optimized for mobile devices with responsive design
- **🎬 Video Feed**: Infinite scroll video feed with smooth transitions
- **👤 User Authentication**: Complete login/logout functionality
- **❤️ Social Interactions**: Like and follow system with optimistic updates
- **🔍 Search & Discovery**: Search functionality for finding content
- **➕ Content Creation**: Add new videos to the platform
- **👥 User Profiles**: Personal profile pages with user information
- **🎵 Reels Section**: Dedicated reels/short-form video content
- **🔇 Global Mute Control**: App-wide audio mute/unmute functionality
- **⌨️ Keyboard Navigation**: Arrow key navigation for accessibility
- **📡 Infinite Scroll**: Lazy loading with pagination support
- **⚡ Optimistic Updates**: Instant UI feedback for better UX
- **🎨 Beautiful Animations**: Smooth transitions with Framer Motion

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org) with App Router
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com)
- **UI Components**: Custom components with [Lucide React](https://lucide.dev) & [React Icons](https://react-icons.github.io/react-icons/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: React Context API with useReducer
- **Effects**: [Simplex Noise](https://github.com/jwagner/simplex-noise.js) for visual effects
- **Utilities**: [clsx](https://github.com/lukeed/clsx) and [Tailwind Merge](https://github.com/dcastil/tailwind-merge)

## 📁 Project Structure

```
app/
├── globals.css          # Global styles
├── layout.js           # Root layout component
├── page.js             # Home page (video feed)
├── add/                # Content creation page
├── profile/            # User profile page
├── reels/              # Reels/short videos page
└── search/             # Search functionality page

components/
├── BottomNavigation.js  # Mobile bottom navigation
├── Button.js           # Reusable button component
├── ErrorScreen.js      # Error state display
├── LoadingScreen.js    # Loading state display
├── LoginScreen.js      # Authentication UI
├── Toast.js            # Toast notifications
├── ui/
│   └── shape-landing-hero.js  # Landing page hero component
└── video/
    ├── VideoFeed.js    # Main video feed component
    └── VideoItem.js    # Individual video item

context/
└── AppContext.js       # Global state management

data/
└── mockVideos.js       # Mock video data and API

lib/
└── utils.js           # Utility functions
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd web
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality

## 🎮 Usage

### Navigation
- **Home (🏠)**: Main video feed with infinite scroll
- **Reels (🎥)**: Short-form video content
- **Add (➕)**: Create and upload new content
- **Search (🔍)**: Discover new videos and users
- **Profile (👤)**: View and manage user profile

### Video Interactions
- **Scroll**: Navigate between videos vertically
- **Arrow Keys**: Use ↑/↓ keys for keyboard navigation
- **Like**: Double-tap or click heart icon
- **Follow**: Follow/unfollow users
- **Mute/Unmute**: Global audio control

### Authentication
- Click on the landing page to access login
- Complete authentication to access full features
- Logout via profile menu

## 🎨 Customization

### Styling
- Modify `app/globals.css` for global styles
- Tailwind classes are used throughout components
- Dark theme is default with customizable accent colors

### Mock Data
- Update `data/mockVideos.js` to customize video content
- Add your own video URLs and user data

### Components
- All components are modular and reusable
- Extend functionality by modifying component files

## 🚀 Deployment

### Vercel (Recommended)
The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy with automatic builds and previews

### Other Platforms
- **Netlify**: Build command: `npm run build`, Publish directory: `out`
- **Digital Ocean**: Use Docker or static hosting
- **AWS**: S3 + CloudFront for static hosting

## 📱 Mobile Features

- **Touch Gestures**: Swipe navigation support
- **Responsive Design**: Adapts to all screen sizes
- **PWA Ready**: Can be installed as a mobile app
- **Performance Optimized**: Fast loading and smooth animations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org)
- UI inspired by modern social media platforms
- Icons from [Lucide](https://lucide.dev) and [React Icons](https://react-icons.github.io)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
