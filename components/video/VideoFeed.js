"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import VideoItem from "./VideoItem";
import LoadingScreen from "../LoadingScreen";
import ErrorScreen from "../ErrorScreen";
import BottomNavigation from "../BottomNavigation";
import { useApp, actions } from "../../context/AppContext";
import { fetchVideos } from "../../data/mockVideos";
import { FaCheckCircle, FaChevronUp, FaChevronDown } from "react-icons/fa";

export default function VideoFeed() {
  const { state, dispatch } = useApp();
  const { videos, loading, error, currentVideoIndex, hasMoreVideos, page } =
    state;
  const [loadingMore, setLoadingMore] = useState(false);
  const containerRef = useRef(null);
  const videoRefs = useRef([]);
  const lastVideoElementRef = useRef(null);
  const isInitialLoad = useRef(true);

  // Load initial videos
  useEffect(() => {
    if (isInitialLoad.current && videos.length === 0) {
      loadVideos(1);
      isInitialLoad.current = false;
    }
  }, [videos.length]);

  // Arrow key navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowUp" || event.key === "ArrowDown") {
        event.preventDefault();

        if (event.key === "ArrowUp" && currentVideoIndex > 0) {
          scrollToVideo(currentVideoIndex - 1);
        } else if (
          event.key === "ArrowDown" &&
          currentVideoIndex < videos.length - 1
        ) {
          scrollToVideo(currentVideoIndex + 1);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentVideoIndex, videos.length]);

  // Intersection Observer for infinite scroll
  const lastVideoRef = useCallback(
    (node) => {
      if (loading || loadingMore) return;
      if (lastVideoElementRef.current) lastVideoElementRef.current.disconnect();

      lastVideoElementRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMoreVideos) {
            loadMoreVideos();
          }
        },
        {
          threshold: 0.5,
          rootMargin: "100px",
        }
      );

      if (node) lastVideoElementRef.current.observe(node);
    },
    [loading, loadingMore, hasMoreVideos]
  );

  // Handle scroll for current video detection
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const scrollTop = container.scrollTop;
      const videoHeight = window.innerHeight;
      const newIndex = Math.round(scrollTop / videoHeight);

      if (
        newIndex !== currentVideoIndex &&
        newIndex >= 0 &&
        newIndex < videos.length
      ) {
        dispatch(actions.setCurrentVideo(newIndex));
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [currentVideoIndex, videos.length, dispatch]);

  const loadVideos = async (pageNum = 1) => {
    try {
      dispatch(actions.setLoading(true));
      dispatch(actions.setError(null));

      const data = await fetchVideos(pageNum);

      if (pageNum === 1) {
        dispatch(actions.setVideos(data.videos));
      } else {
        dispatch(actions.addVideos(data.videos));
      }

      dispatch(actions.setHasMore(data.hasMore));
      dispatch(actions.setPage(pageNum));
    } catch (err) {
      dispatch(actions.setError(err.message));
    } finally {
      dispatch(actions.setLoading(false));
    }
  };

  const loadMoreVideos = async () => {
    if (!hasMoreVideos || loadingMore) return;

    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const data = await fetchVideos(nextPage);

      dispatch(actions.addVideos(data.videos));
      dispatch(actions.setHasMore(data.hasMore));
      dispatch(actions.setPage(nextPage));
    } catch (err) {
      console.error("Failed to load more videos:", err);
      // Don't show error for pagination failures, just log them
    } finally {
      setLoadingMore(false);
    }
  };

  const handleRetry = () => {
    dispatch(actions.setError(null));
    loadVideos(1);
  };

  const scrollToVideo = (index) => {
    if (containerRef.current) {
      const targetScroll = index * window.innerHeight;
      containerRef.current.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
    }
  };

  if (loading && videos.length === 0) {
    return <LoadingScreen />;
  }

  if (error && videos.length === 0) {
    return <ErrorScreen onRetry={handleRetry} />;
  }

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {" "}
      {/* Video Container */}
      <div
        ref={containerRef}
        className="h-full overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
      >
        {videos.map((video, index) => (
          <div
            key={video.id}
            ref={index === videos.length - 1 ? lastVideoRef : null}
            className="snap-start"
          >
            <VideoItem video={video} isActive={index === currentVideoIndex} />
          </div>
        ))}
        {/* Loading More Indicator */}
        {loadingMore && (
          <div className="h-screen flex items-center justify-center bg-black">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
              <p className="text-white text-sm">Loading more videos...</p>
            </div>
          </div>
        )}
        {/* End of Feed Indicator */}
        {!hasMoreVideos && videos.length > 0 && (
          <div className="h-screen flex items-center justify-center bg-black">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-white text-lg font-semibold mb-2">
                You're all caught up!
              </h3>
              <p className="text-gray-400 text-sm">
                No more videos to show right now.
              </p>
              <button
                onClick={() => loadVideos(1)}
                className="mt-4 px-6 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition-colors"
              >
                Refresh Feed
              </button>
            </div>
          </div>
        )}{" "}
      </div>{" "}
      {/* Arrow Key Navigation Indicators */}
      <div className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 z-30">
        <div className="flex flex-col items-center space-y-4">
          {" "}
          {/* Up Arrow */}
          <button
            onClick={() =>
              currentVideoIndex > 0 && scrollToVideo(currentVideoIndex - 1)
            }
            disabled={currentVideoIndex === 0}
            className={`arrow-nav-indicator ${
              currentVideoIndex > 0 ? "active" : "inactive"
            } ${
              currentVideoIndex > 0
                ? "cursor-pointer hover:scale-110"
                : "cursor-not-allowed"
            } transition-transform duration-200 p-2 rounded-full`}
          >
            <FaChevronUp className="w-6 h-6" />
          </button>
          {/* Down Arrow */}
          <button
            onClick={() =>
              currentVideoIndex < videos.length - 1 &&
              scrollToVideo(currentVideoIndex + 1)
            }
            disabled={currentVideoIndex === videos.length - 1}
            className={`arrow-nav-indicator ${
              currentVideoIndex < videos.length - 1 ? "active" : "inactive"
            } ${
              currentVideoIndex < videos.length - 1
                ? "cursor-pointer hover:scale-110"
                : "cursor-not-allowed"
            } transition-transform duration-200 p-2 rounded-full`}
          >
            <FaChevronDown className="w-6 h-6" />
          </button>
        </div>
      </div>
      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
