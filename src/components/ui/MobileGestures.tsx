"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";

interface SwipeableProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export function Swipeable({ children, onSwipeLeft, onSwipeRight, threshold = 50 }: SwipeableProps) {
  const [dragEnd, setDragEnd] = useState({ x: 0, y: 0 });

  const handleDragEnd = (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setDragEnd({ x: info.offset.x, y: info.offset.y });

    if (info.offset.x > threshold && onSwipeRight) {
      onSwipeRight();
    }
    if (info.offset.x < -threshold && onSwipeLeft) {
      onSwipeLeft();
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

// Pull to refresh hook
export function usePullToRefresh(onRefresh: () => void, threshold = 100) {
  const [pulling, setPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);

  const handleTouchStart = () => {
    if (window.scrollY === 0) {
      setPulling(true);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!pulling) return;
    const distance = Math.max(0, e.touches[0].clientY);
    setPullDistance(Math.min(distance, threshold * 1.5));
  };

  const handleTouchEnd = () => {
    if (pullDistance >= threshold) {
      onRefresh();
    }
    setPulling(false);
    setPullDistance(0);
  };

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart);
    document.addEventListener("touchmove", handleTouchMove);
    document.addEventListener("touchend", handleTouchEnd);

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [pulling, pullDistance]);

  return { pulling, pullDistance };
}

// Touch-friendly tap area
export function TapArea({
  children,
  onTap,
  className = "",
}: {
  children: React.ReactNode;
  onTap?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onTap}
      className={`touch-manipulation ${className}`}
      style={{ minHeight: "44px", minWidth: "44px" }}
    >
      {children}
    </button>
  );
}

// Mobile-safe modal that closes on swipe down
export function SwipeDownModal({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  const controls = useAnimation();
  const [startY, setStartY] = useState(0);

  const handleDragEnd = (_event: MouseEvent | PointerEvent | TouchEvent, info: PanInfo) => {
    if (info.offset.y > 100) {
      onClose();
    } else {
      controls.start({ y: 0 });
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/50"
      onClick={onClose}
    >
      <motion.div
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        onClick={(e) => e.stopPropagation()}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="absolute bottom-0 left-0 right-0 bg-white dark:bg-dark-surface rounded-t-3xl max-h-[90vh] overflow-auto"
      >
        {/* Drag indicator */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}
