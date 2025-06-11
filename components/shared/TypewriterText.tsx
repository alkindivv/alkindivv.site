// import React, { useState, useEffect, useRef, useCallback } from 'react';

// interface BackgroundParticle {
//   id: number;
//   x: number;
//   y: number;
//   vx: number;
//   vy: number;
//   size: number;
//   opacity: number;
//   hue: number;
//   depth: number;
//   pulsePhase: number;
// }

// interface TypewriterTextProps {
//   /** Text to display with typewriter effect */
//   text?: string;
//   /** Typing speed in milliseconds per character (default: 100) */
//   typingSpeed?: number;
//   /** Delay before starting typing (default: 500) */
//   startDelay?: number;
//   /** Show cursor blink effect (default: true) */
//   showCursor?: boolean;
//   /** Color theme: 'emerald' | 'gold' | 'blue' | 'purple' (default: 'emerald') */
//   theme?: 'emerald' | 'gold' | 'blue' | 'purple';
//   /** Font family (default: 'Inter') */
//   fontFamily?: 'Inter' | 'Poppins' | 'Fira Code' | 'Geist';
//   /** Enable background particles (default: true) */
//   enableParticles?: boolean;
//   /** Additional CSS classes */
//   className?: string;
// }

// /**
//  * Typewriter Text with Parallax Particles
//  *
//  * Komponen teks dengan efek typewriter yang elegan dan smooth,
//  * dilengkapi dengan background partikel parallax yang halus.
//  */
// const TypewriterText: React.FC<TypewriterTextProps> = ({
//   text = 'AL KINDI',
//   typingSpeed = 120,
//   startDelay = 800,
//   showCursor = true,
//   theme = 'emerald',
//   fontFamily = 'Inter',
//   enableParticles = true,
//   className = '',
// }) => {
//   const [displayedText, setDisplayedText] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isTyping, setIsTyping] = useState(false);
//   const [isComplete, setIsComplete] = useState(false);
//   const [showBlinkingCursor, setShowBlinkingCursor] = useState(true);

//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const animationRef = useRef<number>();
//   const particlesRef = useRef<BackgroundParticle[]>([]);
//   const containerRef = useRef<HTMLDivElement>(null);
//   const timeRef = useRef(0);

//   // Theme configurations
//   const themes = {
//     emerald: {
//       primary: '#10b981',
//       secondary: '#34d399',
//       accent: '#6ee7b7',
//       hue: 160,
//       saturation: 70,
//       lightness: 60,
//     },
//     gold: {
//       primary: '#f59e0b',
//       secondary: '#fbbf24',
//       accent: '#fcd34d',
//       hue: 45,
//       saturation: 85,
//       lightness: 65,
//     },
//     blue: {
//       primary: '#3b82f6',
//       secondary: '#60a5fa',
//       accent: '#93c5fd',
//       hue: 220,
//       saturation: 80,
//       lightness: 65,
//     },
//     purple: {
//       primary: '#8b5cf6',
//       secondary: '#a78bfa',
//       accent: '#c4b5fd',
//       hue: 260,
//       saturation: 75,
//       lightness: 70,
//     },
//   };

//   const currentTheme = themes[theme];

//   // Font family mapping
//   const fontFamilies = {
//     Inter: 'Inter, system-ui, sans-serif',
//     Poppins: 'Poppins, system-ui, sans-serif',
//     'Fira Code': 'Fira Code, Monaco, Consolas, monospace',
//     Geist: 'Geist, system-ui, sans-serif',
//   };

//   // Initialize background particles
//   const initParticles = useCallback(() => {
//     if (!enableParticles) return;

//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     particlesRef.current = [];
//     const particleCount = 30; // Subtle amount

//     for (let i = 0; i < particleCount; i++) {
//       particlesRef.current.push({
//         id: i,
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         vx: (Math.random() - 0.5) * 0.4,
//         vy: (Math.random() - 0.5) * 0.4,
//         size: Math.random() * 1.8 + 0.6,
//         opacity: Math.random() * 0.12 + 0.03, // Very subtle
//         hue: currentTheme.hue + (Math.random() - 0.5) * 40,
//         depth: Math.random() * 3 + 1,
//         pulsePhase: Math.random() * Math.PI * 2,
//       });
//     }
//   }, [enableParticles, currentTheme.hue]);

//   // Update and draw particles
//   const updateParticles = useCallback(() => {
//     if (!enableParticles) return;

//     const canvas = canvasRef.current;
//     const ctx = canvas?.getContext('2d');
//     if (!canvas || !ctx) return;

//     timeRef.current += 16;

//     // Clear canvas with subtle fade
//     ctx.fillStyle = 'rgba(0, 0, 0, 0.02)';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     // Update and draw particles
//     particlesRef.current.forEach((particle) => {
//       // Update position with gentle drift
//       particle.x += particle.vx;
//       particle.y += particle.vy;

//       // Wrap around edges smoothly
//       if (particle.x < -10) particle.x = canvas.width + 10;
//       if (particle.x > canvas.width + 10) particle.x = -10;
//       if (particle.y < -10) particle.y = canvas.height + 10;
//       if (particle.y > canvas.height + 10) particle.y = -10;

//       // Subtle floating animation
//       const time = timeRef.current * 0.001;
//       const floatOffset = Math.sin(time * 0.8 + particle.pulsePhase) * 1.2;
//       const currentY = particle.y + floatOffset;

//       // Pulsing opacity
//       const pulseOpacity =
//         particle.opacity + Math.sin(time * 1.2 + particle.pulsePhase) * 0.03;

//       // Draw particle with enhanced glow
//       ctx.save();

//       // Outer glow (larger)
//       const outerGradient = ctx.createRadialGradient(
//         particle.x,
//         currentY,
//         0,
//         particle.x,
//         currentY,
//         particle.size * 4
//       );
//       outerGradient.addColorStop(
//         0,
//         `hsla(${particle.hue}, ${currentTheme.saturation}%, ${currentTheme.lightness}%, ${pulseOpacity * 0.8})`
//       );
//       outerGradient.addColorStop(
//         0.3,
//         `hsla(${particle.hue}, ${currentTheme.saturation}%, ${currentTheme.lightness}%, ${pulseOpacity * 0.4})`
//       );
//       outerGradient.addColorStop(
//         0.7,
//         `hsla(${particle.hue}, ${currentTheme.saturation}%, ${currentTheme.lightness}%, ${pulseOpacity * 0.1})`
//       );
//       outerGradient.addColorStop(1, 'transparent');

//       ctx.fillStyle = outerGradient;
//       ctx.beginPath();
//       ctx.arc(particle.x, currentY, particle.size * 4, 0, Math.PI * 2);
//       ctx.fill();

//       // Inner glow
//       const innerGradient = ctx.createRadialGradient(
//         particle.x,
//         currentY,
//         0,
//         particle.x,
//         currentY,
//         particle.size * 2
//       );
//       innerGradient.addColorStop(
//         0,
//         `hsla(${particle.hue}, ${currentTheme.saturation}%, ${currentTheme.lightness}%, ${pulseOpacity * 1.2})`
//       );
//       innerGradient.addColorStop(
//         0.5,
//         `hsla(${particle.hue}, ${currentTheme.saturation}%, ${currentTheme.lightness}%, ${pulseOpacity * 0.6})`
//       );
//       innerGradient.addColorStop(1, 'transparent');

//       ctx.fillStyle = innerGradient;
//       ctx.beginPath();
//       ctx.arc(particle.x, currentY, particle.size * 2, 0, Math.PI * 2);
//       ctx.fill();

//       // Core particle
//       ctx.fillStyle = `hsla(${particle.hue}, ${currentTheme.saturation}%, ${currentTheme.lightness}%, ${pulseOpacity * 1.8})`;
//       ctx.beginPath();
//       ctx.arc(particle.x, currentY, particle.size, 0, Math.PI * 2);
//       ctx.fill();

//       ctx.restore();
//     });

//     animationRef.current = requestAnimationFrame(updateParticles);
//   }, [enableParticles, currentTheme]);

//   // Handle canvas resize
//   const handleResize = useCallback(() => {
//     if (!enableParticles) return;

//     const canvas = canvasRef.current;
//     const container = containerRef.current;
//     if (!canvas || !container) return;

//     const rect = container.getBoundingClientRect();
//     canvas.width = rect.width;
//     canvas.height = rect.height;

//     initParticles();
//   }, [initParticles, enableParticles]);

//   // Typewriter effect with variable timing
//   useEffect(() => {
//     if (currentIndex >= text.length) {
//       setIsTyping(false);
//       setIsComplete(true);
//       return;
//     }

//     // Variable typing speed for more natural feel
//     let currentSpeed = typingSpeed;
//     const char = text[currentIndex];

//     // Slower for spaces and punctuation
//     if (char === ' ') currentSpeed = typingSpeed * 1.5;
//     if (['.', ',', '!', '?'].includes(char)) currentSpeed = typingSpeed * 2;

//     const timer = setTimeout(
//       () => {
//         if (currentIndex === 0) {
//           setIsTyping(true);
//         }

//         setDisplayedText(text.slice(0, currentIndex + 1));
//         setCurrentIndex(currentIndex + 1);
//       },
//       currentIndex === 0 ? startDelay : currentSpeed
//     );

//     return () => clearTimeout(timer);
//   }, [currentIndex, text, typingSpeed, startDelay]);

//   // Cursor blinking effect with smart behavior
//   useEffect(() => {
//     if (!showCursor) return;

//     let blinkSpeed = 530;

//     // Faster blinking while typing, slower when complete
//     if (isTyping) blinkSpeed = 300;
//     if (isComplete) blinkSpeed = 800;

//     const blinkInterval = setInterval(() => {
//       setShowBlinkingCursor((prev) => !prev);
//     }, blinkSpeed);

//     return () => clearInterval(blinkInterval);
//   }, [showCursor, isTyping, isComplete]);

//   // Initialize particles and animation
//   useEffect(() => {
//     if (!enableParticles) return;

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     animationRef.current = requestAnimationFrame(updateParticles);

//     return () => {
//       window.removeEventListener('resize', handleResize);
//       if (animationRef.current) {
//         cancelAnimationFrame(animationRef.current);
//       }
//     };
//   }, [handleResize, updateParticles, enableParticles]);

//   // Reset animation when text changes
//   useEffect(() => {
//     setDisplayedText('');
//     setCurrentIndex(0);
//     setIsTyping(false);
//     setIsComplete(false);
//   }, [text]);

//   return (
//     <div
//       ref={containerRef}
//       className={`relative inline-block ${className}`}
//       style={{ fontFamily: fontFamilies[fontFamily] }}
//     >
//       {/* Background particles canvas */}
//       {enableParticles && (
//         <canvas
//           ref={canvasRef}
//           className="absolute inset-0 pointer-events-none"
//           style={{
//             width: '100%',
//             height: '100%',
//             zIndex: -1,
//           }}
//         />
//       )}

//       {/* Typewriter text */}
//       <div className="relative z-10">
//         <span
//           className="inline-block font-bold tracking-tight transition-all duration-300"
//           style={{
//             background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
//             WebkitBackgroundClip: 'text',
//             WebkitTextFillColor: 'transparent',
//             backgroundClip: 'text',
//             filter: `drop-shadow(0 0 20px ${currentTheme.accent}40)`,
//           }}
//         >
//           {displayedText}
//         </span>

//         {/* Animated cursor */}
//         {showCursor && (
//           <span
//             className={`inline-block w-0.5 ml-1 transition-all duration-150 ${
//               showBlinkingCursor
//                 ? 'opacity-100 scale-y-100'
//                 : 'opacity-0 scale-y-75'
//             }`}
//             style={{
//               height: '1em',
//               backgroundColor: currentTheme.primary,
//               boxShadow: `0 0 15px ${currentTheme.primary}80`,
//               transformOrigin: 'bottom',
//             }}
//           />
//         )}
//       </div>

//       {/* Enhanced text glow effect */}
//       <div
//         className="absolute inset-0 pointer-events-none opacity-30 blur-sm scale-105"
//         style={{
//           background: `linear-gradient(135deg, ${currentTheme.primary}, ${currentTheme.secondary})`,
//           WebkitBackgroundClip: 'text',
//           WebkitTextFillColor: 'transparent',
//           backgroundClip: 'text',
//           zIndex: -1,
//         }}
//       >
//         <span className="font-bold tracking-tight">{displayedText}</span>
//       </div>

//       {/* Additional subtle glow layer */}
//       <div
//         className="absolute inset-0 pointer-events-none opacity-15 blur-md scale-110"
//         style={{
//           background: `linear-gradient(135deg, ${currentTheme.accent}, ${currentTheme.primary})`,
//           WebkitBackgroundClip: 'text',
//           WebkitTextFillColor: 'transparent',
//           backgroundClip: 'text',
//           zIndex: -2,
//         }}
//       >
//         <span className="font-bold tracking-tight">{displayedText}</span>
//       </div>
//     </div>
//   );
// };

// export default TypewriterText;
