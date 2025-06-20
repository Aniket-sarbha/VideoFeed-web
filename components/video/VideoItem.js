import { useState, useRef, useEffect } from "react";
import { useApp, actions } from "../../context/AppContext";
import { useToast } from "../Toast";
import { simulateApiCall } from "../../data/mockVideos";
import {
  FaPlay,
  FaHeart,
  FaRegHeart,
  FaComment,
  FaShare,
  FaDollarSign,
  FaEllipsisV,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";

export default function VideoItem({ video, isActive }) {
  const { state, dispatch } = useApp();
  const { addToast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  // Use global mute state from context
  const isMuted = state.globalMuteState;
  const [showMenu, setShowMenu] = useState(false);
  const [isProcessingLike, setIsProcessingLike] = useState(false);
  const [isProcessingFollow, setIsProcessingFollow] = useState(false);
  const videoRef = useRef(null);
  const playPromiseRef = useRef(null);
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        playVideo();
      } else {
        pauseVideo();
      }
    }
  }, [isActive]);

  // Sync video muted state with global mute state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted, video.id]);

  const playVideo = async () => {
    if (videoRef.current) {
      try {
        // Cancel any existing play promise
        if (playPromiseRef.current) {
          await playPromiseRef.current.catch(() => {});
        }

        playPromiseRef.current = videoRef.current.play();
        await playPromiseRef.current;
        setIsPlaying(true);
        playPromiseRef.current = null;
      } catch (error) {
        if (error.name !== "AbortError") {
          console.warn("Video play failed:", error);
        }
        setIsPlaying(false);
        playPromiseRef.current = null;
      }
    }
  };

  const pauseVideo = async () => {
    if (videoRef.current) {
      try {
        // If there's a pending play promise, wait for it to resolve/reject
        if (playPromiseRef.current) {
          await playPromiseRef.current.catch(() => {});
          playPromiseRef.current = null;
        }

        videoRef.current.pause();
        setIsPlaying(false);
      } catch (error) {
        console.warn("Video pause failed:", error);
      }
    }
  };

  const handleVideoClick = () => {
    if (isPlaying) {
      pauseVideo();
    } else {
      playVideo();
    }
  };
  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      const newMutedState = !isMuted;
      videoRef.current.muted = newMutedState;
      // Update global mute state
      dispatch(actions.setGlobalMute(newMutedState));
    }
  };

  const handleFollowToggle = async () => {
    if (isProcessingFollow) return;

    setIsProcessingFollow(true);
    const originalState = video.isFollowing;
    const optimisticKey = `follow_${video.id}_${Date.now()}`;

    // Optimistic update
    dispatch(actions.toggleFollow(video.id));
    dispatch(
      actions.setOptimisticUpdate(optimisticKey, {
        type: "follow",
        videoId: video.id,
        originalState,
      })
    );

    try {
      await simulateApiCall("toggle follow", {
        videoId: video.id,
        userId: state.user.id,
        isFollowing: !originalState,
      });

      // Success - clear optimistic update
      dispatch(actions.clearOptimisticUpdate(optimisticKey));
    } catch (error) {
      console.error("Follow toggle failed:", error);

      // Revert optimistic update
      dispatch(
        actions.revertOptimisticUpdate(optimisticKey, {
          videoId: video.id,
          changes: { isFollowing: originalState },
        })
      );

      // Show error toast
      addToast("Failed to update follow status. Please try again.", "error");
    } finally {
      setIsProcessingFollow(false);
    }
  };

  const handleLikeToggle = async () => {
    if (isProcessingLike) return;

    setIsProcessingLike(true);
    const originalIsLiked = video.isLiked || false;
    const originalLikes = video.likes;
    const newIsLiked = !originalIsLiked;
    const optimisticKey = `like_${video.id}_${Date.now()}`;

    // Optimistic update
    dispatch(actions.toggleLike(video.id, newIsLiked));
    dispatch(
      actions.setOptimisticUpdate(optimisticKey, {
        type: "like",
        videoId: video.id,
        originalIsLiked,
        originalLikes,
      })
    );

    try {
      await simulateApiCall("toggle like", {
        videoId: video.id,
        userId: state.user.id,
        isLiked: newIsLiked,
      });

      // Success - clear optimistic update
      dispatch(actions.clearOptimisticUpdate(optimisticKey));
    } catch (error) {
      console.error("Like toggle failed:", error);

      // Revert optimistic update
      dispatch(
        actions.revertOptimisticUpdate(optimisticKey, {
          videoId: video.id,
          changes: {
            isLiked: originalIsLiked,
            likes: originalLikes,
          },
        })
      );

      // Show error toast
      addToast("Failed to update like. Please try again.", "error");
    } finally {
      setIsProcessingLike(false);
    }
  };
  return (
    <div className="video-container">
      {/* Video */}{" "}
      <div className="video-wrapper relative">
        <video
          ref={videoRef}
          className="vertical-video"
          loop
          muted={isMuted}
          playsInline
          onClick={handleVideoClick}
          onLoadStart={() =>
            console.log("Video loading started for:", video.title)
          }
          onError={(e) => {
            console.error("Video error for:", video.title, e.target.error);
            console.error("Video source:", video.videoUrl);
          }}
          onLoadedData={() =>
            console.log("Video data loaded for:", video.title)
          }
          onCanPlayThrough={() =>
            console.log("Video can play through:", video.title)
          }
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onCanPlay={() => {
            // Auto-play if this video is active when it's ready
            if (isActive && !isPlaying) {
              playVideo();
            }
          }}
        >
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>{" "}
        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black bg-opacity-50 rounded-full p-4">
              <FaPlay className="w-12 h-12 text-white" />
            </div>
          </div>
        )}{" "}
        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-full p-2 z-30"
        >
          {isMuted ? (
            <FaVolumeMute className="w-6 h-6 text-white" />
          ) : (
            <FaVolumeUp className="w-6 h-6 text-white" />
          )}{" "}
        </button>{" "}
        {/* Left Side Content */}
        <div className="video-overlay-left absolute bottom-2 text-wrap px-4 w-auto">
          {/* Hashtag */}
          <div className="mb-2">
            <span className="text-blue-400 font-semibold text-xs sm:text-sm">
              {video.hashtag}
            </span>
          </div>

          {/* Creator Info */}
          <div className="flex items-center mb-3">
            <img
              src={video.userImage}
              alt={video.userName}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full mr-2 sm:mr-3 flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-xs sm:text-sm truncate">
                {video.userName}
              </p>
            </div>
            <button
              onClick={handleFollowToggle}
              disabled={isProcessingFollow}
              className={`px-2 sm:px-4 py-1 rounded-full text-xs font-semibold transition-all relative flex-shrink-0 ${
                video.isFollowing
                  ? "bg-gray-600 text-white"
                  : "bg-white text-black"
              } ${isProcessingFollow ? "opacity-70" : "hover:scale-105"}`}
            >
              {isProcessingFollow ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-3 w-3 border border-current border-t-transparent mr-1"></div>
                  <span className="hidden sm:inline">
                    {video.isFollowing ? "Following" : "Follow"}
                  </span>
                  <span className="sm:hidden">
                    {video.isFollowing ? "✓" : "+"}
                  </span>
                </div>
              ) : video.isFollowing ? (
                <>
                  <span className="hidden sm:inline">Following</span>
                  <span className="sm:hidden">✓</span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">Follow</span>
                  <span className="sm:hidden">+</span>
                </>
              )}
            </button>
          </div>

          {/* Title and Episode */}
          <div className="mb-2">
            <h3 className="text-white font-bold text-sm sm:text-base line-clamp-2">
              {video.title}
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm truncate">
              {video.episode}
            </p>
          </div>

          {/* Description */}
          <div className="mb-4">
            <p className="text-white text-xs sm:text-sm leading-tight line-clamp-2 sm:line-clamp-3">
              {video.description}
            </p>
          </div>
        </div>
      </div>{" "}
      {/* Right Side Actions */}{" "}
      <div className="video-overlay-right absolute bottom-20 z-20 right-130">
        <div className="flex flex-col space-y-4">
          {" "}
          {/* Like */}
          <button
            onClick={handleLikeToggle}
            disabled={isProcessingLike}
            className="flex flex-col items-center relative"
          >
            <div
              className={`bg-gray-800 bg-opacity-90 rounded-full p-3 mb-2 transition-all shadow-lg ${
                isProcessingLike ? "animate-pulse" : "hover:scale-110"
              }`}
            >
              {video.isLiked ? (
                <FaHeart className="w-6 h-6 text-red-500" />
              ) : (
                <FaRegHeart className="w-6 h-6 text-white" />
              )}
              {isProcessingLike && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="animate-spin rounded-full h-4 w-4 border border-white border-t-transparent"></div>
                </div>
              )}
            </div>
            <span className="text-white text-xs font-semibold bg-black bg-opacity-50 px-2 py-1 rounded-full min-w-[40px] text-center">
              {video.likes}
            </span>
          </button>{" "}
          {/* Comments */}
          <button className="flex flex-col items-center">
            <div className="bg-gray-800 bg-opacity-90 rounded-full p-3 mb-2 hover:scale-110 transition-transform shadow-lg">
              <FaComment className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xs font-semibold bg-black bg-opacity-50 px-2 py-1 rounded-full min-w-[40px] text-center">
              {video.comments}
            </span>
          </button>{" "}
          {/* Share */}
          <button className="flex flex-col items-center">
            <div className="bg-gray-800 bg-opacity-90 rounded-full p-3 mb-2 hover:scale-110 transition-transform shadow-lg">
              <FaShare className="w-6 h-6 text-white" />
            </div>
            <span className="text-white text-xs font-semibold bg-black bg-opacity-50 px-2 py-1 rounded-full min-w-[40px] text-center">
              {video.shares}
            </span>
          </button>{" "}
          {/* Tips/Earnings */}
          <button className="flex flex-col items-center">
            <div className="bg-gray-800 bg-opacity-90 rounded-full p-3 mb-2 hover:scale-110 transition-transform shadow-lg">
              <FaDollarSign className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-green-400 text-xs font-semibold bg-black bg-opacity-60 px-2 py-1 rounded-full min-w-[45px] text-center">
              {video.earnings}
            </span>
          </button>{" "}
          {/* Three Dot Menu */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="flex flex-col items-center relative"
          >
            <div className="bg-gray-800 bg-opacity-90 rounded-full p-3 hover:scale-110 transition-transform shadow-lg">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
            </div>
            {showMenu && (
              <div className="absolute right-0 bottom-full mb-2 bg-gray-900 rounded-lg py-2 min-w-[120px] shadow-lg">
                <div className="block w-full text-left px-4 py-2 text-white text-sm hover:bg-gray-800 transition-colors cursor-pointer">
                  Report
                </div>
                <div className="block w-full text-left px-4 py-2 text-white text-sm hover:bg-gray-800 transition-colors cursor-pointer">
                  Not Interested
                </div>
                <div className="block w-full text-left px-4 py-2 text-white text-sm hover:bg-gray-800 transition-colors cursor-pointer">
                  Save
                </div>
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
