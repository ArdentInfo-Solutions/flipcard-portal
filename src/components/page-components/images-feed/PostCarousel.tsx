import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Image from "next/image";
import { Heart, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PostItem as PostItemType } from "../../../lib/types";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation"
import { useAppSelector } from "@/redux/hooks";
import { selectIsPostLiked, selectPostLikes } from "@/features/actions-like-post/likePostSelectors";
import { selectBookmarks, selectIsBookmarked } from "@/features/actions-bookmark-post/bookmarkPostSelectors";
import { useSession } from "next-auth/react";

interface PostItemProps {
  post: PostItemType;
  onLike?: (id: string) => void;
  onBookmark?: (id: string) => void;
}

export function PostCarousel({ post, onLike, onBookmark }: PostItemProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<any>(null);
  const autoplayTimeout = useRef<NodeJS.Timeout | null>(null);
  const { data: session } = useSession()
  const router = useRouter()

  const isLiked = useAppSelector((state) => selectIsPostLiked(state, post.id, post.isLiked));
  const likes = useAppSelector((state) => selectPostLikes(state, post.id, post.likes));
  
  const isBookmarked = useAppSelector((state) => selectIsBookmarked(state, post.id, post.isBookmarked));
  const bookmarks = useAppSelector((state) => selectBookmarks(state, post.id, post.bookmarks));
  
  const handleAction = (action: () => void) => {
    if (session) {
      console.log("Action:", action)
      action()
    } else {
      router.push("/login")
    }
  }

  const handleLike = () => {
    console.log("Like:", post.id);
   onLike?.(post.id);
 };

 const handleBookmark = () => {
   console.log("Bookmark:", post.id);
   onBookmark?.(post.id);
  };
  
  // Handle touch/click to move to the next or previous slide
  const handleTap = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!swiperRef.current) return;

    const { clientX } = e;
    const { offsetWidth } = e.currentTarget;

    if (clientX < offsetWidth / 2) {
      swiperRef.current.slidePrev(); // Tap left → go back
    } else {
      swiperRef.current.slideNext(); // Tap right → go forward
    }
  };

  // Pause autoplay when holding the screen
  const handleHoldStart = () => {
    if (!swiperRef.current) return;
    swiperRef.current.autoplay.stop();
    if (autoplayTimeout.current) clearTimeout(autoplayTimeout.current);
  };

  // Resume autoplay when release
  const handleHoldEnd = () => {
    if (!swiperRef.current) return;
    autoplayTimeout.current = setTimeout(() => {
      swiperRef.current.autoplay.start();
    }, 500); // Small delay to prevent accidental skips
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Header: Avatar & Username */}
      <div className="p-4 flex items-center">
        <Image
          src={post.userLogo || "/placeholder-user.png"}
          alt={post.userName}
          width={40}
          height={40}
          className="rounded-full mr-2"
        />
        <span className="font-semibold">{post.userName}</span>
      </div>

      {/* Stories-style Carousel */}
      <div 
        className="relative w-full h-[300px] touch-none select-none"
        onMouseDown={handleHoldStart}
        onMouseUp={handleHoldEnd}
        onTouchStart={handleHoldStart}
        onTouchEnd={handleHoldEnd}
        onClick={handleTap} // Handle tap for navigation
      >
        {/* Progress Indicators (Inside Image Container) */}
        <div className="absolute top-2 left-0 w-full flex px-4 space-x-1 z-20">
          {post.images.map((_, index) => (
            <div key={index} className="flex-1 h-1 bg-gray-500/40 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-[3000ms] ${activeIndex === index ? "bg-white w-full" : "bg-transparent w-0"}`}
              />
            </div>
          ))}
        </div>

        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onSwiper={(swiper) => (swiperRef.current = swiper)} // Store swiper instance
          className="w-full h-full"
        >
          {post.images.map((image, index) => (
            <SwiperSlide key={index} className="flex justify-center">
              <Image
                src={image.url}
                alt={`Slide ${index + 1}`}
                width={800}
                height={400}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Actions: Like & Bookmark */}
      <div className="p-4 flex justify-between items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleAction(handleLike)}
          className={isLiked ? "text-red-500" : "text-gray-500"}
        >
          <Heart className={`h-4 w-4 ${isLiked ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
          {likes}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleAction(handleBookmark)}
          className={isBookmarked ? "text-blue-500" : "text-gray-500"}
        >
          <Bookmark className={`h-4 w-4 ${isBookmarked ? "text-blue-500 fill-blue-500" : "text-gray-400"}`} />
          {bookmarks}
        </Button>
      </div>
    </div>
  );
}