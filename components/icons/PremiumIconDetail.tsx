import React from 'react';

interface PremiumIconDetailProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  className?: string;
}

const PremiumIconDetail: React.FC<PremiumIconDetailProps> = ({
  icon,
  name,
  description,
  className = '',
}) => {
  // Variasi warna untuk ikon
  const colorVariations = [
    { name: 'Default', color: 'currentColor', bg: 'bg-white dark:bg-gray-800' },
    {
      name: 'Accent',
      color: 'rgb(var(--accent-rgb))',
      bg: 'bg-white dark:bg-gray-800',
    },
    { name: 'White', color: 'white', bg: 'bg-gray-900' },
    { name: 'Gold', color: '#D4AF37', bg: 'bg-gray-900' },
  ];

  // Variasi ketebalan stroke
  const strokeVariations = [
    { name: 'Tipis', strokeWidth: 0.8 },
    { name: 'Normal', strokeWidth: 1.5 },
    { name: 'Tebal', strokeWidth: 2.5 },
  ];

  // Fungsi untuk mengkloning ikon dengan properti yang berbeda
  const cloneIconWithProps = (
    iconElement: React.ReactElement,
    props: Record<string, any>
  ) => {
    return React.cloneElement(iconElement, props);
  };

  return (
    <div className={`premium-icon-detail ${className}`}>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Icon Preview - Ukuran Besar */}
        <div className="flex-1 flex flex-col items-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 w-full flex justify-center">
            {React.isValidElement(icon) &&
              cloneIconWithProps(icon as React.ReactElement, {
                className: 'w-40 h-40',
              })}
          </div>
          <h2 className="text-2xl font-bold mt-4">{name}</h2>
          <p className="text-gray-600 dark:text-gray-400 text-center mt-2 max-w-md">
            {description}
          </p>
        </div>

        {/* Variasi Ikon */}
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-4">Variasi Warna</h3>
          <div className="grid grid-cols-2 gap-4 mb-8">
            {colorVariations.map((variation) => (
              <div
                key={variation.name}
                className={`rounded-lg p-4 ${variation.bg}`}
              >
                <div className="flex items-center gap-3">
                  {React.isValidElement(icon) &&
                    cloneIconWithProps(icon as React.ReactElement, {
                      className: 'w-10 h-10',
                      color: variation.color,
                    })}
                  <span>{variation.name}</span>
                </div>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-semibold mb-4">Variasi Ketebalan</h3>
          <div className="grid grid-cols-3 gap-4">
            {strokeVariations.map((variation) => (
              <div
                key={variation.name}
                className="rounded-lg bg-white dark:bg-gray-800 p-4"
              >
                <div className="flex flex-col items-center gap-2">
                  {React.isValidElement(icon) &&
                    cloneIconWithProps(icon as React.ReactElement, {
                      className: 'w-12 h-12',
                      strokeWidth: variation.strokeWidth,
                    })}
                  <span className="text-sm">{variation.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ukuran Ikon */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Variasi Ukuran</h3>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <div className="flex flex-wrap items-end justify-around gap-4">
            {[8, 12, 16, 24, 32, 48].map((size) => (
              <div key={size} className="flex flex-col items-center">
                {React.isValidElement(icon) &&
                  cloneIconWithProps(icon as React.ReactElement, {
                    className: `w-${size} h-${size}`,
                  })}
                <span className="text-sm mt-2">{size}px</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animasi */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Dengan Animasi</h3>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8">
          <div className="flex flex-wrap justify-around gap-8">
            <div className="flex flex-col items-center">
              <div className="premium-legal-icon">
                {React.isValidElement(icon) &&
                  cloneIconWithProps(icon as React.ReactElement, {
                    className: 'w-16 h-16',
                  })}
              </div>
              <span className="text-sm mt-2">Hover Effect</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="animate-pulse">
                {React.isValidElement(icon) &&
                  cloneIconWithProps(icon as React.ReactElement, {
                    className: 'w-16 h-16',
                  })}
              </div>
              <span className="text-sm mt-2">Pulse</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="animate-bounce">
                {React.isValidElement(icon) &&
                  cloneIconWithProps(icon as React.ReactElement, {
                    className: 'w-16 h-16',
                  })}
              </div>
              <span className="text-sm mt-2">Bounce</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="animate-spin-slow">
                {React.isValidElement(icon) &&
                  cloneIconWithProps(icon as React.ReactElement, {
                    className: 'w-16 h-16',
                  })}
              </div>
              <span className="text-sm mt-2">Spin Slow</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumIconDetail;
