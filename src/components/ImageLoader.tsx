import React, { useState } from 'react';
import { motion, MotionStyle } from 'framer-motion';
import { cn } from '../lib/utils';

interface ImageLoaderProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'style'> {
  containerClassName?: string;
  imageClassName?: string;
  style?: MotionStyle;
  aspectRatio?: string;
}

export function ImageLoader({ 
  src, 
  alt, 
  containerClassName, 
  imageClassName, 
  className,
  aspectRatio,
  ...props 
}: ImageLoaderProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className={cn("relative overflow-hidden bg-surface/50", containerClassName || className)}
      style={{ aspectRatio }}
    >
      <div 
        className={cn(
          "absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_1.5s_infinite] z-10",
          isLoaded ? "opacity-0 transition-opacity duration-700 ease-out" : "opacity-100"
        )}
      />
      <div 
        className={cn(
          "absolute inset-0 bg-surface/80 z-0",
          isLoaded ? "opacity-0 transition-opacity duration-700 ease-out" : "opacity-100 animate-pulse"
        )}
      />
      <motion.img
        src={src}
        alt={alt}
        className={cn("w-full h-full object-cover", imageClassName)}
        initial={{ opacity: 0, filter: 'blur(20px)', scale: 1.1 }}
        animate={{ 
          opacity: isLoaded ? 1 : 0, 
          filter: isLoaded ? 'blur(0px)' : 'blur(20px)',
          scale: isLoaded ? 1 : 1.1
        }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
        decoding="async"
        {...props}
      />
    </div>
  );
}
