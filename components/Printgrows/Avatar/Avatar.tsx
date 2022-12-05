import Image from 'next/image';

interface AvatarProps {
  size?: 'small' | 'medium' | 'large';
  shape?: 'rounded' | 'circular';
  src?: string;
}

const Avatar = ({ size = 'medium', shape = 'circular', src }: AvatarProps) => {
  const sizeClass = () => {
    switch (size) {
      case 'small':
        return 'h-6 w-6';
      case 'medium':
        return 'h-8 w-8';
      case 'large':
        return 'h-12 w-12';
    }
  };

  const shapeClass = shape === 'circular' ? 'rounded-full' : 'rounded-md';
  return src ? (
    <div className={`inline-block ${sizeClass()}`}>
      <Image className={shapeClass} src={src} alt="Avatar" width={'100%'} height={'100%'} />
    </div>
  ) : (
    <span className={`inline-block ${sizeClass()} ${shapeClass} overflow-hidden bg-gray-100`}>
      <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>
  );
};

export default Avatar;
