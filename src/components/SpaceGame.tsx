import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gamepad2, X } from 'lucide-react';

interface GameObject {
  x: number;
  y: number;
  size: number;
  speed?: number;
  angle?: number;
}

export const SpaceGame = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('spaceGameHighScore');
    return saved ? parseInt(saved) : 0;
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const requestRef = useRef<number>();
  const playerRef = useRef<GameObject>({ x: 0, y: 0, size: 20 });
  const bulletsRef = useRef<GameObject[]>([]);
  const asteroidsRef = useRef<GameObject[]>([]);
  const lastShotRef = useRef(0);
  const keysRef = useRef<Set<string>>(new Set());

  const initGame = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas size based on container size
    const container = canvas.parentElement;
    if (container) {
      canvas.width = container.clientWidth;
      canvas.height = Math.min(400, 400);
    }

    contextRef.current = context;
    playerRef.current = {
      x: canvas.width / 2,
      y: canvas.height - 40,
      size: 20,
    };
    bulletsRef.current = [];
    asteroidsRef.current = [];
    setScore(0);
    setGameOver(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    keysRef.current.add(e.key);
    if (e.key === ' ') {
      shoot();
    }
  };

  const handleKeyUp = (e: KeyboardEvent) => {
    keysRef.current.delete(e.key);
  };

  const shoot = () => {
    const now = Date.now();
    if (now - lastShotRef.current < 250) return;
    lastShotRef.current = now;

    bulletsRef.current.push({
      x: playerRef.current.x,
      y: playerRef.current.y,
      size: 4,
      speed: 7,
    });
  };

  const spawnAsteroid = () => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    
    asteroidsRef.current.push({
      x: Math.random() * canvas.width,
      y: -20,
      size: Math.random() * 20 + 10,
      speed: Math.random() * 2 + 1,
      angle: Math.random() * Math.PI * 2,
    });
  };

  const updateGame = () => {
    if (!canvasRef.current || !contextRef.current || gameOver) return;
    const canvas = canvasRef.current;
    const ctx = contextRef.current;

    // Clear canvas with gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#0B1026');
    gradient.addColorStop(1, '#2B0548');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Update player position
    if (keysRef.current.has('ArrowLeft')) {
      playerRef.current.x = Math.max(playerRef.current.size, playerRef.current.x - 5);
    }
    if (keysRef.current.has('ArrowRight')) {
      playerRef.current.x = Math.min(canvas.width - playerRef.current.size, playerRef.current.x + 5);
    }

    // Draw player
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(playerRef.current.x, playerRef.current.y - playerRef.current.size);
    ctx.lineTo(playerRef.current.x - playerRef.current.size, playerRef.current.y + playerRef.current.size);
    ctx.lineTo(playerRef.current.x + playerRef.current.size, playerRef.current.y + playerRef.current.size);
    ctx.closePath();
    ctx.fill();

    // Update and draw bullets
    bulletsRef.current = bulletsRef.current.filter(bullet => {
      bullet.y -= bullet.speed!;
      ctx.fillStyle = '#ff69b4';
      ctx.beginPath();
      ctx.arc(bullet.x, bullet.y, bullet.size, 0, Math.PI * 2);
      ctx.fill();
      return bullet.y > 0;
    });

    // Spawn asteroids
    if (Math.random() < 0.02) {
      spawnAsteroid();
    }

    // Update and draw asteroids
    asteroidsRef.current = asteroidsRef.current.filter(asteroid => {
      asteroid.y += asteroid.speed!;
      asteroid.angle! += 0.02;

      // Check collision with bullets
      bulletsRef.current = bulletsRef.current.filter(bullet => {
        const dx = bullet.x - asteroid.x;
        const dy = bullet.y - asteroid.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < asteroid.size + bullet.size) {
          setScore(prev => prev + 10);
          return false;
        }
        return true;
      });

      // Check collision with player
      const dx = playerRef.current.x - asteroid.x;
      const dy = playerRef.current.y - asteroid.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < asteroid.size + playerRef.current.size) {
        setGameOver(true);
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('spaceGameHighScore', score.toString());
        }
        return false;
      }

      // Draw asteroid
      ctx.save();
      ctx.translate(asteroid.x, asteroid.y);
      ctx.rotate(asteroid.angle!);
      ctx.fillStyle = '#666';
      ctx.beginPath();
      ctx.moveTo(asteroid.size, 0);
      for (let i = 1; i < 8; i++) {
        const angle = (i * Math.PI * 2) / 8;
        const radius = asteroid.size * (0.8 + Math.random() * 0.4);
        ctx.lineTo(Math.cos(angle) * radius, Math.sin(angle) * radius);
      }
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      return asteroid.y < canvas.height + asteroid.size;
    });

    requestRef.current = requestAnimationFrame(updateGame);
  };

  useEffect(() => {
    if (isOpen && !gameOver) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
      initGame();
      requestRef.current = requestAnimationFrame(updateGame);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isOpen, gameOver]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        initGame();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <>
      <motion.button
        className="fixed bottom-24 right-6 p-4 bg-purple-600 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
      >
        <Gamepad2 className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm z-50"
          >
            <div className="bg-gray-900/95 p-6 rounded-2xl shadow-2xl max-w-2xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Space Shooter</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-gray-700 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="rounded-lg w-full"
                  style={{ background: 'transparent' }}
                />
                
                {gameOver && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 rounded-lg">
                    <h3 className="text-2xl font-bold mb-4">Game Over!</h3>
                    <p className="mb-2">Score: {score}</p>
                    <p className="mb-4">High Score: {highScore}</p>
                    <motion.button
                      className="px-4 py-2 bg-purple-600 rounded-full hover:bg-purple-700 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={initGame}
                    >
                      Play Again
                    </motion.button>
                  </div>
                )}

                <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded-full">
                  Score: {score}
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-400">
                <p>Controls:</p>
                <ul className="list-disc list-inside">
                  <li>Left/Right Arrow Keys to move</li>
                  <li>Spacebar to shoot</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};