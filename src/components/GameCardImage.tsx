import Image from "next/image";

interface GameCardImageProps {
  src: string;
  alt: string;
  isHot?: boolean;
}

export default function GameCardImage({ src, alt, isHot }: GameCardImageProps) {
  return (
    <div className="relative h-48 bg-gray-200">
      <Image
        src={src || "/placeholder-game.jpg"}
        alt={alt}
        fill
        className="object-cover"
        unoptimized
      />
      {isHot && (
        <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
          HOT
        </div>
      )}
    </div>
  );
}

