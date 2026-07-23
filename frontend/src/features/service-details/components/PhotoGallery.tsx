import React from "react";

interface PhotoGalleryProps {
  photos: string[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  if (!photos || photos.length === 0) {
    return (
      <div className="rounded-lg bg-gray-100 p-4 text-center text-sm text-gray-500">
        No photos available
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-gray-800">
        Photos
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {photos.map((photo, index) => (
          <img
            key={index}
            src={photo}
            alt={`Service photo ${index + 1}`}
            className="
              h-32
              w-full
              rounded-xl
              object-cover
              shadow-sm
            "
          />
        ))}
      </div>
    </div>
  );
};

export default PhotoGallery;