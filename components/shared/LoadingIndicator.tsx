// import React from 'react';
// import {
//   useIsLoading,
//   useLoadingMessage,
//   useProgress,
// } from '@/lib/stores/useLoadingStore';
// import clsx from 'clsx';

// interface LoadingIndicatorProps {
//   variant?: 'overlay' | 'inline' | 'minimal';
//   className?: string;
//   showMessage?: boolean;
//   showProgress?: boolean;
// }

// const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({
//   variant = 'overlay',
//   className,
//   showMessage = true,
//   showProgress = false,
// }) => {
//   const isLoading = useIsLoading();
//   const loadingMessage = useLoadingMessage();
//   const progress = useProgress();

//   if (!isLoading) return null;

//   // Overlay variant - Full screen overlay
//   if (variant === 'overlay') {
//     return (
//       <div
//         className={clsx(
//           'fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center',
//           'transition-opacity duration-300',
//           className
//         )}
//       >
//         <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 shadow-2xl">
//           <div className="flex flex-col items-center gap-4">
//             {/* Spinner */}
//             <div className="relative">
//               <div className="w-12 h-12 border-4 border-emerald-500/30 rounded-full" />
//               <div className="absolute inset-0 w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
//             </div>

//             {/* Message */}
//             {showMessage && loadingMessage && (
//               <p className="text-white text-sm font-medium text-center">
//                 {loadingMessage}
//               </p>
//             )}

//             {/* Progress Bar */}
//             {showProgress && (
//               <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
//                 <div
//                   className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 transition-all duration-300 ease-out"
//                   style={{ width: `${progress}%` }}
//                 />
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Inline variant - For use within components
//   if (variant === 'inline') {
//     return (
//       <div className={clsx('flex items-center justify-center p-8', className)}>
//         <div className="flex flex-col items-center gap-3">
//           <div className="relative">
//             <div className="w-8 h-8 border-3 border-emerald-500/30 rounded-full" />
//             <div className="absolute inset-0 w-8 h-8 border-3 border-emerald-500 border-t-transparent rounded-full animate-spin" />
//           </div>

//           {showMessage && loadingMessage && (
//             <p className="text-gray-600 dark:text-gray-300 text-sm">
//               {loadingMessage}
//             </p>
//           )}
//         </div>
//       </div>
//     );
//   }

//   // Minimal variant - Just a small spinner
//   if (variant === 'minimal') {
//     return (
//       <div className={clsx('flex items-center gap-2', className)}>
//         <div className="w-4 h-4 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
//         {showMessage && loadingMessage && (
//           <span className="text-sm text-gray-600 dark:text-gray-300">
//             {loadingMessage}
//           </span>
//         )}
//       </div>
//     );
//   }

//   return null;
// };

// export default LoadingIndicator;
