import { useState, useEffect, useRef } from "react";
import { X, Play, RotateCcw } from "lucide-react";

interface SnakeGameProps {
  onClose: () => void;
  onAddLog: (text: string, type: "system" | "kernel" | "user" | "success" | "warning" | "error") => void;
}

type Point = { x: number; y: number };
type Direction = "UP" | "DOWN" | "LEFT" | "RIGHT";
type GameState = "START" | "PLAYING" | "GAMEOVER";

const GRID_SIZE = 20;

export default function SnakeGame({ onClose, onAddLog }: SnakeGameProps) {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("adeeb_systems_snake_highscore");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [gameState, setGameState] = useState<GameState>("START");
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Game state refs to prevent closure issues in interval
  const snakeRef = useRef<Point[]>([
    { x: 10, y: 10 },
    { x: 10, y: 11 },
    { x: 10, y: 12 }
  ]);
  const directionRef = useRef<Direction>("UP");
  const nextDirectionRef = useRef<Direction>("UP");
  const foodRef = useRef<Point>({ x: 5, y: 5 });
  const gameLoopRef = useRef<number | null>(null);

  // Generate random food position not on the snake
  const generateFood = (snake: Point[]): Point => {
    let newFood: Point;
    let onSnake = true;
    while (onSnake) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE)
      };
      onSnake = snake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
    }
    return newFood!;
  };

  // Reset Game
  const resetGame = () => {
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 }
    ];
    directionRef.current = "UP";
    nextDirectionRef.current = "UP";
    foodRef.current = generateFood(snakeRef.current);
    setScore(0);
    setGameState("PLAYING");
    onAddLog("SNAKE_OS: Game session initialized. Good luck.", "kernel");
  };

  // Handle steer inputs
  const handleSteer = (dir: Direction) => {
    const current = directionRef.current;
    if (dir === "UP" && current !== "DOWN") nextDirectionRef.current = "UP";
    if (dir === "DOWN" && current !== "UP") nextDirectionRef.current = "DOWN";
    if (dir === "LEFT" && current !== "RIGHT") nextDirectionRef.current = "LEFT";
    if (dir === "RIGHT" && current !== "LEFT") nextDirectionRef.current = "RIGHT";
  };

  // Keyboard and exit listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl + Z exit
      if (e.ctrlKey && e.key.toLowerCase() === "z") {
        e.preventDefault();
        onAddLog("SNAKE_OS: Connection terminated by user request (SIGINT).", "warning");
        onClose();
        return;
      }

      if (gameState !== "PLAYING") {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          resetGame();
        }
        return;
      }

      // Movement controls
      switch (e.key) {
        case "ArrowUp":
        case "w":
        case "W":
          e.preventDefault();
          handleSteer("UP");
          break;
        case "ArrowDown":
        case "s":
        case "S":
          e.preventDefault();
          handleSteer("DOWN");
          break;
        case "ArrowLeft":
        case "a":
        case "A":
          e.preventDefault();
          handleSteer("LEFT");
          break;
        case "ArrowRight":
        case "d":
        case "D":
          e.preventDefault();
          handleSteer("RIGHT");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameState]);

  // Main game update loop
  useEffect(() => {
    if (gameState !== "PLAYING") {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
      return;
    }

    const moveSnake = () => {
      // Update direction
      directionRef.current = nextDirectionRef.current;
      const currentDir = directionRef.current;
      
      const head = { ...snakeRef.current[0] };

      switch (currentDir) {
        case "UP": head.y -= 1; break;
        case "DOWN": head.y += 1; break;
        case "LEFT": head.x -= 1; break;
        case "RIGHT": head.x += 1; break;
      }

      // Check wall collision
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        handleGameOver();
        return;
      }

      // Check self collision
      if (snakeRef.current.some(segment => segment.x === head.x && segment.y === head.y)) {
        handleGameOver();
        return;
      }

      // Add new head
      const newSnake = [head, ...snakeRef.current];

      // Check food collision
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        // Grow snake and generate new food
        foodRef.current = generateFood(newSnake);
        setScore(prev => {
          const next = prev + 10;
          if (next > highScore) {
            setHighScore(next);
            localStorage.setItem("adeeb_systems_snake_highscore", next.toString());
          }
          return next;
        });
      } else {
        // Pop tail
        newSnake.pop();
      }

      snakeRef.current = newSnake;
      draw();
    };

    const handleGameOver = () => {
      setGameState("GAMEOVER");
      onAddLog(`SNAKE_OS: Game Over. Final Score: ${score}`, "error");
      if (score === highScore && score > 0) {
        onAddLog("SNAKE_OS: NEW CORE LOG HIGH SCORE RECORDED!", "success");
      }
    };

    gameLoopRef.current = window.setInterval(moveSnake, 130);

    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = null;
      }
    };
  }, [gameState, score, highScore]);

  // Handle draw loop updates on canvas
  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const cellSize = width / GRID_SIZE;

    // Clear board
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(0, 0, width, height);

    // Draw board cyber grid background lines
    ctx.strokeStyle = "rgba(58, 74, 73, 0.25)";
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, height);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(width, i * cellSize);
      ctx.stroke();
    }

    // Draw Food (flashing/glowing pink/magenta)
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#bf00ff";
    ctx.fillStyle = "#bf00ff";
    ctx.fillRect(
      foodRef.current.x * cellSize + 1.5,
      foodRef.current.y * cellSize + 1.5,
      cellSize - 3,
      cellSize - 3
    );

    // Draw Snake body (Glowing cyan/green)
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00ffcc";
    
    snakeRef.current.forEach((segment, index) => {
      // Slightly change head color or drawing style
      if (index === 0) {
        ctx.fillStyle = "#00ffff"; // brighter cyan head
      } else {
        ctx.fillStyle = "#00ffcc"; // standard neon green/teal body
      }
      ctx.fillRect(
        segment.x * cellSize + 1,
        segment.y * cellSize + 1,
        cellSize - 2,
        cellSize - 2
      );
    });

    // Reset shadow values for other renders
    ctx.shadowBlur = 0;
  };

  // Re-draw when gameState changes to update starting screen / overlay message
  useEffect(() => {
    draw();
  }, [gameState]);

  return (
    <div className="absolute inset-0 z-40 bg-[#0a0a0a] flex flex-col font-mono text-xs select-none">
      {/* Game Header */}
      <div className="flex justify-between items-center bg-[#131313] border-b border-[#3a4a49] px-3 py-1.5 text-[10px] tracking-wider text-[#b9cac9]">
        <div className="flex items-center gap-1.5 text-neon-cyan">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ffcc] animate-pulse"></span>
          <span className="font-bold">SNAKE_CORE_V1.0</span>
        </div>
        
        {/* Scoreboard */}
        <div className="flex items-center gap-4">
          <div>
            SCORE: <span className="text-[#00ffcc] font-bold">{score}</span>
          </div>
          <div>
            HI-SCORE: <span className="text-neon-yellow font-bold">{highScore}</span>
          </div>
        </div>

        {/* Desktop close shortcut or simple close */}
        <div className="flex items-center gap-2">
          <span className="text-gray-500 hidden sm:inline">Ctrl + Z to exit</span>
          <button
            onClick={() => {
              onAddLog("SNAKE_OS: Process closed by user action.", "system");
              onClose();
            }}
            className="p-1 hover:bg-neon-orange/20 hover:text-neon-orange text-gray-400 border border-transparent hover:border-neon-orange/40 rounded transition-all cursor-pointer"
            title="Close Game"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main Game Screen */}
      <div className="flex-1 flex flex-col md:flex-row items-center justify-center p-3 gap-4 min-h-0 bg-[#070707] relative">
        <div className="relative aspect-square h-[190px] xs:h-[220px] md:h-[250px] border border-[#3a4a49] bg-[#0a0a0a]">
          <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="w-full h-full block"
          />
          
          {/* Start Screen Overlay */}
          {gameState === "START" && (
            <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-center p-4">
              <div className="text-neon-cyan font-bold text-lg tracking-widest mb-3 glow-cyan animate-pulse">
                SNAKE_OS
              </div>
              <p className="text-[9px] text-[#839493] leading-relaxed max-w-[200px] mb-4">
                INTEGRATED Easter Egg Subsystem. Use keyboard arrows or WASD to navigate.
              </p>
              <button
                onClick={resetGame}
                className="px-4 py-2 border border-[#00ffcc] bg-[#00ffcc]/10 hover:bg-[#00ffcc]/30 text-[#00ffcc] font-bold text-[10px] tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5"
              >
                <Play className="w-3 h-3" /> INITIALIZE_GAME
              </button>
            </div>
          )}

          {/* Game Over Screen Overlay */}
          {gameState === "GAMEOVER" && (
            <div className="absolute inset-0 bg-black/85 flex flex-col items-center justify-center text-center p-4">
              <div className="text-neon-orange font-bold text-lg tracking-widest mb-2 glow-orange">
                GAME OVER
              </div>
              <p className="text-[10px] text-gray-400 mb-4">
                SCORE REACHED: <span className="text-[#00ffcc] font-bold">{score}</span>
              </p>
              <button
                onClick={resetGame}
                className="px-4 py-2 border border-[#00ffcc] bg-[#00ffcc]/10 hover:bg-[#00ffcc]/30 text-[#00ffcc] font-bold text-[10px] tracking-wider uppercase transition-all duration-200 cursor-pointer flex items-center gap-1.5"
              >
                <RotateCcw className="w-3 h-3" /> REBOOT_SESSION
              </button>
            </div>
          )}
        </div>

        {/* Mobile Virtual Controller / D-pad (only visible on mobile/touch interfaces) */}
        <div className="flex flex-col items-center justify-center shrink-0 w-[120px] md:w-auto h-auto md:h-full gap-2">
          {/* Virtual D-pad for easy mobile gaming */}
          <div className="grid grid-cols-3 gap-1 w-[90px] h-[90px] select-none">
            <div></div>
            <button
              onClick={() => handleSteer("UP")}
              className="border border-[#3a4a49] bg-[#111111] hover:bg-[#00ffff]/20 active:bg-[#00ffff]/40 text-[#00ffff] flex items-center justify-center text-xs font-bold rounded-sm h-7 cursor-pointer"
            >
              ▲
            </button>
            <div></div>
            <button
              onClick={() => handleSteer("LEFT")}
              className="border border-[#3a4a49] bg-[#111111] hover:bg-[#00ffff]/20 active:bg-[#00ffff]/40 text-[#00ffff] flex items-center justify-center text-xs font-bold rounded-sm h-7 cursor-pointer"
            >
              ◀
            </button>
            <div className="flex items-center justify-center text-[7px] text-gray-600 select-none uppercase font-bold">
              STEER
            </div>
            <button
              onClick={() => handleSteer("RIGHT")}
              className="border border-[#3a4a49] bg-[#111111] hover:bg-[#00ffff]/20 active:bg-[#00ffff]/40 text-[#00ffff] flex items-center justify-center text-xs font-bold rounded-sm h-7 cursor-pointer"
            >
              ▶
            </button>
            <div></div>
            <button
              onClick={() => handleSteer("DOWN")}
              className="border border-[#3a4a49] bg-[#111111] hover:bg-[#00ffff]/20 active:bg-[#00ffff]/40 text-[#00ffff] flex items-center justify-center text-xs font-bold rounded-sm h-7 cursor-pointer"
            >
              ▼
            </button>
            <div></div>
          </div>
          <span className="text-[7px] text-gray-500 uppercase tracking-widest font-bold hidden xs:inline mt-1">
            Virtual D-Pad
          </span>
        </div>
      </div>

      {/* Footer Info / Status Bar */}
      <div className="bg-[#0c0c0c] border-t border-[#3a4a49] text-[8px] text-center text-gray-500 py-1 uppercase tracking-wider">
        <span>CTRL + Z to Terminate Process // Operator: Adeeb</span>
      </div>
    </div>
  );
}
