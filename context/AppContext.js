'use client';

import { createContext, useContext, useReducer, useEffect } from 'react';

// Initial State
const initialState = {
  user: null,
  isAuthenticated: false,
  videos: [],
  loading: false,
  error: null,
  currentVideoIndex: 0,
  hasMoreVideos: true,
  page: 1,
  optimisticUpdates: {},
  globalMuteState: true, // Add global mute state, default to muted
};

// Action Types
export const ActionTypes = {
  SET_USER: 'SET_USER',
  LOGOUT: 'LOGOUT',
  SET_VIDEOS: 'SET_VIDEOS',
  ADD_VIDEOS: 'ADD_VIDEOS',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_CURRENT_VIDEO: 'SET_CURRENT_VIDEO',
  TOGGLE_FOLLOW: 'TOGGLE_FOLLOW',
  TOGGLE_LIKE: 'TOGGLE_LIKE',
  SET_HAS_MORE: 'SET_HAS_MORE',
  SET_PAGE: 'SET_PAGE',
  SET_OPTIMISTIC_UPDATE: 'SET_OPTIMISTIC_UPDATE',
  CLEAR_OPTIMISTIC_UPDATE: 'CLEAR_OPTIMISTIC_UPDATE',
  REVERT_OPTIMISTIC_UPDATE: 'REVERT_OPTIMISTIC_UPDATE',
  SET_GLOBAL_MUTE: 'SET_GLOBAL_MUTE',
};

// Reducer
function appReducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
      };

    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
      };

    case ActionTypes.SET_VIDEOS:
      return {
        ...state,
        videos: action.payload,
        loading: false,
        error: null,
      };

    case ActionTypes.ADD_VIDEOS:
      return {
        ...state,
        videos: [...state.videos, ...action.payload],
        loading: false,
        error: null,
      };

    case ActionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case ActionTypes.SET_CURRENT_VIDEO:
      return {
        ...state,
        currentVideoIndex: action.payload,
      };

    case ActionTypes.TOGGLE_FOLLOW:
      return {
        ...state,
        videos: state.videos.map(video =>
          video.id === action.payload
            ? { ...video, isFollowing: !video.isFollowing }
            : video
        ),
      };

    case ActionTypes.TOGGLE_LIKE:
      const videoId = action.payload.videoId;
      const isLiked = action.payload.isLiked;
      
      return {
        ...state,
        videos: state.videos.map(video => {
          if (video.id === videoId) {
            const currentLikes = parseInt(video.likes.replace(/[^\d]/g, '')) || 0;
            const newLikes = isLiked ? currentLikes + 1 : Math.max(0, currentLikes - 1);
            const formattedLikes = newLikes >= 1000000 
              ? Math.floor(newLikes / 1000000) + 'M'
              : newLikes >= 1000 
              ? Math.floor(newLikes / 1000) + 'K'
              : newLikes.toString();
            
            return {
              ...video,
              likes: formattedLikes,
              isLiked: isLiked,
            };
          }
          return video;
        }),
      };

    case ActionTypes.SET_HAS_MORE:
      return {
        ...state,
        hasMoreVideos: action.payload,
      };

    case ActionTypes.SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    case ActionTypes.SET_OPTIMISTIC_UPDATE:
      return {
        ...state,
        optimisticUpdates: {
          ...state.optimisticUpdates,
          [action.payload.key]: action.payload.value,
        },
      };

    case ActionTypes.CLEAR_OPTIMISTIC_UPDATE:
      const { [action.payload]: removed, ...remainingUpdates } = state.optimisticUpdates;
      return {
        ...state,
        optimisticUpdates: remainingUpdates,
      };

    case ActionTypes.REVERT_OPTIMISTIC_UPDATE:
      const revertKey = action.payload.key;
      const revertData = action.payload.revertData;
      
      return {
        ...state,
        videos: state.videos.map(video =>
          video.id === revertData.videoId
            ? { ...video, ...revertData.changes }
            : video
        ),        optimisticUpdates: {
          ...state.optimisticUpdates,
          [revertKey]: null,
        },
      };

    case ActionTypes.SET_GLOBAL_MUTE:
      return {
        ...state,
        globalMuteState: action.payload,
      };

    default:
      return state;
  }
}

// Context
const AppContext = createContext();

// Provider Component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('videoapp_user');
    if (savedUser) {
      try {
        const user = JSON.parse(savedUser);
        dispatch({ type: ActionTypes.SET_USER, payload: user });
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('videoapp_user');
      }
    }

    // Load global mute state from localStorage
    const savedMuteState = localStorage.getItem('videoapp_mute_state');
    if (savedMuteState !== null) {
      try {
        const muteState = JSON.parse(savedMuteState);
        dispatch({ type: ActionTypes.SET_GLOBAL_MUTE, payload: muteState });
      } catch (error) {
        console.error('Error parsing saved mute state:', error);
        localStorage.removeItem('videoapp_mute_state');
      }
    }
  }, []);
  // Save user to localStorage when user state changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('videoapp_user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('videoapp_user');
    }
  }, [state.user]);

  // Save global mute state to localStorage
  useEffect(() => {
    localStorage.setItem('videoapp_mute_state', JSON.stringify(state.globalMuteState));
  }, [state.globalMuteState]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// Custom Hook
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

// Action Creators
export const actions = {
  setUser: (user) => ({ type: ActionTypes.SET_USER, payload: user }),
  logout: () => ({ type: ActionTypes.LOGOUT }),
  setVideos: (videos) => ({ type: ActionTypes.SET_VIDEOS, payload: videos }),
  addVideos: (videos) => ({ type: ActionTypes.ADD_VIDEOS, payload: videos }),
  setLoading: (loading) => ({ type: ActionTypes.SET_LOADING, payload: loading }),
  setError: (error) => ({ type: ActionTypes.SET_ERROR, payload: error }),
  setCurrentVideo: (index) => ({ type: ActionTypes.SET_CURRENT_VIDEO, payload: index }),
  toggleFollow: (videoId) => ({ type: ActionTypes.TOGGLE_FOLLOW, payload: videoId }),
  toggleLike: (videoId, isLiked) => ({ type: ActionTypes.TOGGLE_LIKE, payload: { videoId, isLiked } }),
  setHasMore: (hasMore) => ({ type: ActionTypes.SET_HAS_MORE, payload: hasMore }),
  setPage: (page) => ({ type: ActionTypes.SET_PAGE, payload: page }),  
  setOptimisticUpdate: (key, value) => ({ type: ActionTypes.SET_OPTIMISTIC_UPDATE, payload: { key, value } }),
  clearOptimisticUpdate: (key) => ({ type: ActionTypes.CLEAR_OPTIMISTIC_UPDATE, payload: key }),
  revertOptimisticUpdate: (key, revertData) => ({ type: ActionTypes.REVERT_OPTIMISTIC_UPDATE, payload: { key, revertData } }),
  setGlobalMute: (muted) => ({ type: ActionTypes.SET_GLOBAL_MUTE, payload: muted }),
};
