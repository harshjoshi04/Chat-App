"use client";
import React, { FC } from "react";
import { twMerge } from "tailwind-merge";
const AvatarImage = "/avatar.png";
interface AvatarProps {
  src?: string;
  className?: string;
}

const Avatar: FC<AvatarProps> = ({ src, className }) => {
  return (
    <img
      src={src || AvatarImage}
      className={twMerge(
        `size-14 rounded-full object-contain border-4 border-MainColor border-opacity-30  `,
        className
      )}
      onError={(e) => (e.currentTarget.src = AvatarImage)}
      alt="Avatar"
    />
  );
};

export default Avatar;
