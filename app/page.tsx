"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Download, Server, Cpu, Layers, ExternalLink, Search, Check, Flame, ShieldCheck, Zap, Heart } from "lucide-react";

interface Modpack {
  id: string;
  title: string;
  author: string;
  version: string;
  category: string;
  description: string;
  ram: string;
  modsCount: number;
  image: string;
  downloadUrl: string;
  popularMods: string[];
  isFeatured?: boolean;
}

const DISCORD_URL = "https://discord.gg/m2BpqY9K7";

const MODPACKS: Modpack[] = [
  {
    id: "slayzx-beyond-horizon",
    title: "Beyond the Horizon",
    author: "Slayzx",
    version: "1.20.1 (Forge)",
    category: "RPG & Приключения",
    description: "Кастомный пак с модами на эпических боссов (Bosses of Mass Destruction), кастомными ресурспаками и мощной оптимизацией для комфортной игры!",
    ram: "4-6 ГБ",
    modsCount: 120,
    image: "/castle.jpg.jpg",
    downloadUrl: "https://drive.google.com/drive/folders/1y_Ju4zVCMH-sy5aCe5evQrcCLjcmc-0o?usp=sharing",
    popularMods: ["Bosses of Mass Destruction", "ResourcePacks", "FPS Optimization", "Forge Mods"],
    isFeatured: true,
  },
];

// Компонент анимированного пиксельного фона в стиле Minecraft
function MinecraftPixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Парящие пиксели/кубы
    const numPixels = 45;
    const pixels = Array.from({ length: numPixels }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 12 + 6,
      speedY: -(Math.random() * 0.8 + 0.2),
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? "rgba(168, 85, 247," : "rgba(6, 182, 212,",
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pixels.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -20) {
          p.y = canvas.height + 20;
          p.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = `${p.color} ${p.opacity})`;
        ctx.fillRect(p.x, p.y, p.size, p.size);

        ctx.strokeStyle = `rgba(255, 255, 255, ${p.opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.strokeRect(p.x, p.y, p.size, p.size);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}

// Компонент 3D-карточки Liquid Glass
function Glass3DCard({ pack }: { pack: Modpack }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 400, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 400, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      style={{ perspective: 1000 }}
      className="w-full"
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateY,
          rotateX,
          transformStyle: "preserve-3d",
        }}
        initial={{ opacity: 1, scale: 1 }}
        className="relative rounded-3xl p-[1px] bg-gradient-to-b from-cyan-400/30 via-violet-500/20 to-transparent shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-all duration-75 group"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-purple-600/30 to-pink-500/30 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition duration-300 -z-10" />

        <div className="relative bg-[#090b16]/75 rounded-3xl overflow-hidden backdrop-blur-3xl border border-white/10 flex flex-col justify-between">
          <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none z-30" />

          <div>
            <div 
              style={{ transform: "translateZ(30px)" }}
              className="absolute top-4 left-4 z-40 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-cyan-400/30 text-cyan-300 text-xs font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-lg"
            >
              <Flame className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" /> OFFICIAL BUILD
            </div>

            <div className="relative h-72 sm:h-96 w-full overflow-hidden bg-slate-950">
              <img
                src={pack.image}
                alt={pack.title}
                style={{ transform: "translateZ(15px)" }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out filter brightness-105 contrast-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090b16] via-[#090b16]/20 to-transparent z-10" />

              <div 
                style={{ transform: "translateZ(30px)" }}
                className="absolute bottom-4 left-4 z-20 flex gap-2"
              >
                <span className="px-3 py-1 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-xs font-semibold text-cyan-300 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> MC {pack.version}
                </span>
                <span className="px-3 py-1 rounded-xl bg-purple-950/70 backdrop-blur-md border border-purple-500/30 text-xs font-semibold text-purple-300">
                  {pack.category}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8" style={{ transform: "translateZ(20px)" }}>
              <h3 className="text-3xl font-black text-white tracking-wide mb-1 group-hover:text-cyan-400 transition-colors">
                {pack.title}
              </h3>
              <p className="text-xs text-purple-400 font-semibold mb-4 tracking-wider uppercase">
                Автор: {pack.author}
              </p>
              <p className="text-slate-300/90 text-sm leading-relaxed mb-6 font-light">
                {pack.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm text-slate-300 mb-6 p-4 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/10 shadow-inner">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-medium">Память</span>
                    <strong className="text-white font-bold">{pack.ram}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider font-medium">Моды</span>
                    <strong className="text-white font-bold">{pack.modsCount} шт.</strong>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-[11px] uppercase tracking-widest font-bold text-slate-400 block mb-3">
                  Входящие модули:
                </span>
                <div className="flex flex-wrap gap-2">
                  {pack.popularMods.map((mod) => (
                    <span
                      key={mod}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] hover:bg-white/10 backdrop-blur-md border border-white/10 text-xs text-slate-200 font-medium transition"
                    >
                      {mod}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-8 pt-0" style={{ transform: "translateZ(25px)" }}>
            <motion.a
              whileHover={{ scale: 1.02, boxShadow: "0 0 35px rgba(168, 85, 247, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              href={pack.downloadUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full py-4 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 text-white font-extrabold text-base rounded-2xl transition flex justify-center items-center gap-2 shadow-2xl relative overflow-hidden group/btn"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              <Download className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Скачать сборку (Google Диск)</span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [search, setSearch] = useState("");
  const [copied, setCopied] = useState(false);

  const filteredPacks = MODPACKS.filter((pack) => {
    return (
      pack.title.toLowerCase().includes(search.toLowerCase()) ||
      pack.description.toLowerCase().includes(search.toLowerCase()) ||
      pack.author.toLowerCase().includes(search.toLowerCase())
    );
  });

  const copyIP = () => {
    navigator.clipboard.writeText("mc.yourdomain.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#04060d] text-slate-100 font-sans relative overflow-hidden selection:bg-purple-500 selection:text-white flex flex-col justify-between">
      {/* Майнкрафтовский анимированный фон */}
      <MinecraftPixelBackground />

      {/* Неоновый фон */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-pink-600/20 blur-[160px] pointer-events-none rounded-full" />
      <div className="absolute top-1/2 left-[-150px] w-[500px] h-[500px] bg-indigo-600/15 blur-[170px] pointer-events-none rounded-full" />

      <div>
        {/* Шапка */}
        <header className="sticky top-4 z-50 max-w-5xl mx-auto px-4">
          <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl px-6 py-3.5 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-indigo-500 to-purple-600 rounded-xl flex items-center justify-center font-black text-white text-xl shadow-lg shadow-indigo-500/30">
                MC
              </div>
              <div>
                <h1 className="font-black text-lg tracking-wider bg-gradient-to-r from-white via-cyan-200 to-purple-300 bg-clip-text text-transparent">
                  MINECRAFT BUILDS
                </h1>
                <p className="text-[11px] text-slate-400 flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping inline-block" />
                  Официальный сайт
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyIP}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-200 text-xs font-semibold rounded-xl border border-white/10 backdrop-blur-md shadow-lg flex items-center gap-2 transition"
              >
                {copied ? <Check className="w-4 h-4 text-cyan-400" /> : <Server className="w-4 h-4 text-cyan-400" />}
                {copied ? "IP скопирован!" : "IP: mc.yourdomain.com"}
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/30 flex items-center gap-2 transition"
              >
                Наш Discord <ExternalLink className="w-3.5 h-3.5" />
              </motion.a>
            </div>
          </div>
        </header>

        {/* Главная секция */}
        <main className="max-w-5xl mx-auto px-4 py-16 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-purple-500/10 border border-purple-500/20 text-purple-300 inline-flex items-center gap-2 mb-6 backdrop-blur-md shadow-inner">
              <Zap className="w-3.5 h-3.5 text-cyan-400" /> Liquid Neon 3D & Pixel FX
            </span>
            <h2 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight leading-tight">
              Сборки для <br />
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                настоящих игроков
              </span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base font-light">
              Заходи в <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="text-cyan-400 underline font-semibold hover:text-cyan-300">Наш Discord</a> и скачивай готовые моды в один клик!
            </p>
          </div>

          {/* Поиск */}
          <div className="flex justify-center mb-12">
            <div className="relative w-full max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Поиск по сборкам..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/[0.04] border border-white/10 rounded-2xl focus:outline-none focus:border-cyan-500/50 text-sm text-white placeholder-slate-500 transition backdrop-blur-2xl shadow-2xl"
              />
            </div>
          </div>

          {/* Карточка */}
          <div className="max-w-xl mx-auto">
            <AnimatePresence>
              {filteredPacks.map((pack) => (
                <Glass3DCard key={pack.id} pack={pack} />
              ))}
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Футер с подписью авторства */}
      <footer className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur-xl py-6 mt-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm font-medium text-slate-400 flex items-center justify-center gap-1.5">
            Сайт сделан <span className="font-extrabold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">Slayzx (Валентин)</span>
          </p>
        </div>
      </footer>
    </div>
  );
}