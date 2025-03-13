"use client";

import { useEffect, useState, useCallback, useRef } from "react";

interface CherryBlossomProps {
  count?: number;
  minSize?: number;
  maxSize?: number;
  minOpacity?: number;
  maxOpacity?: number;
  colors?: string[];
}

interface Petal {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  fallSpeed: number;
  swayAmount: number;
  swaySpeed: number;
  swayOffset: number;
  color: string;
  variant: number; // Variante de forme de pétale
}

// Formes de pétale de cerisier réalistes
const PETAL_PATHS = [
  // Forme 1: Pétale classique avec encoche
  "M50,0 C60,10 80,25 85,40 C90,55 90,70 80,85 C70,100 55,100 50,100 C45,100 30,100 20,85 C10,70 10,55 15,40 C20,25 40,10 50,0",
  
  // Forme 2: Pétale plus arrondi
  "M50,0 C65,5 80,20 90,40 C95,60 90,80 75,90 C60,100 40,100 25,90 C10,80 5,60 10,40 C20,20 35,5 50,0",
  
  // Forme 3: Pétale avec une encoche plus profonde
  "M50,0 C65,10 75,30 75,50 C75,65 70,80 60,90 C50,100 35,95 25,85 C15,75 10,60 15,45 C20,30 35,10 50,0"
];

export function CherryBlossom({
  count = 40,
  minSize = 15,
  maxSize = 30,
  minOpacity = 0.8,
  maxOpacity = 1,
  colors = ["#ffcce6", "#ffb3d9", "#ff99cc", "#ff80bf", "#ff66b3"],
}: CherryBlossomProps) {
  // Utiliser useRef pour stocker l'état des pétale plutôt que useState
  // Cela évite les re-rendus inutiles et les boucles infinies
  const petalsRef = useRef<Petal[]>([]);
  const [petalsArray, setPetalsArray] = useState<Petal[]>([]);
  const animationRef = useRef<number | null>(null);
  const isInitializedRef = useRef<boolean>(false);
  
  // Fonction pour créer un nouveau pétale
  const createPetal = useCallback((id: number): Petal => {
    // Vérifier si window est défini (pour le SSR)
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 500;
    
    const size = Math.random() * (maxSize - minSize) + minSize;
    const opacity = Math.random() * (maxOpacity - minOpacity) + minOpacity;
    const variant = Math.floor(Math.random() * PETAL_PATHS.length);
    
    return {
      id,
      x: Math.random() * windowWidth,
      y: -size * 2 - Math.random() * windowHeight, // Commencer au-dessus de l'écran
      size,
      opacity,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 2, // Direction et vitesse de rotation aléatoires
      fallSpeed: Math.random() * 1 + 0.5, // Vitesse de chute aléatoire
      swayAmount: Math.random() * 10 + 5, // Amplitude de balancement aléatoire
      swaySpeed: Math.random() * 2 + 0.5, // Fréquence de balancement aléatoire
      swayOffset: Math.random() * Math.PI * 2, // Décalage de phase aléatoire pour le balancement
      color: colors[Math.floor(Math.random() * colors.length)],
      variant
    };
  }, [minSize, maxSize, minOpacity, maxOpacity, colors]);

  // Initialisation des pétale - exécuté une seule fois
  useEffect(() => {
    if (typeof window === 'undefined' || isInitializedRef.current) return;
    
    // Créer les pétale initiaux
    const initialPetals = Array.from({ length: count }, (_, i) => createPetal(i));
    petalsRef.current = initialPetals;
    setPetalsArray(initialPetals);
    isInitializedRef.current = true;
    
    // Nettoyer l'animation lors du démontage
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [count, createPetal]);

  // Boucle d'animation - séparée de la mise à jour de l'état
  useEffect(() => {
    if (typeof window === 'undefined' || !isInitializedRef.current) return;
    
    let lastTime = performance.now();
    const UPDATE_INTERVAL = 16.67; // ~60fps (1000ms / 60)
    let lastUpdateTime = performance.now();
    
    const animate = (currentTime: number): void => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1); // Limiter deltaTime à 0.1s pour éviter les sauts
      lastTime = currentTime;
      
      if (!petalsRef.current.length) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      // Mettre à jour les positions des pétale
      const windowHeight = window.innerHeight;
      const updatedPetals = petalsRef.current.map(petal => {
        // Mettre à jour la position en fonction de la vitesse de chute
        const y = petal.y + petal.fallSpeed * deltaTime * 50;
        
        // Appliquer le mouvement de balancement
        const swayX = Math.sin((currentTime / 1000 * petal.swaySpeed) + petal.swayOffset) * petal.swayAmount;
        
        // Réinitialiser le pétale s'il sort de l'écran
        if (y > windowHeight + 50) {
          return createPetal(petal.id);
        }
        
        return {
          ...petal,
          y,
          x: petal.x + swayX * deltaTime,
          rotation: petal.rotation + petal.rotationSpeed * deltaTime
        };
      });
      
      // Mettre à jour la référence
      petalsRef.current = updatedPetals;
      
      // Mettre à jour l'état visuel pour le rendu
      // Utiliser requestAnimationFrame pour synchroniser avec le cycle de rendu du navigateur
      const now = performance.now();
      if (now - lastUpdateTime >= UPDATE_INTERVAL) {
        lastUpdateTime = now;
        // Utiliser une fonction pour éviter les dépendances sur l'état précédent
        setPetalsArray(prevPetals => {
          // Vérifier si les pétale ont réellement changé pour éviter les rendus inutiles
          const hasChanged = prevPetals.some((petal, index) => {
            const newPetal = petalsRef.current[index];
            return !newPetal || 
                   petal.x !== newPetal.x || 
                   petal.y !== newPetal.y || 
                   petal.rotation !== newPetal.rotation;
          });
          
          return hasChanged ? [...petalsRef.current] : prevPetals;
        });
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Démarrer l'animation
    if (animationRef.current === null) {
      animationRef.current = requestAnimationFrame(animate);
    }
    
    // Fonction de nettoyage
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [createPetal]); // Ne dépendre que de createPetal

  // Rendu des pétale avec React.memo pour éviter les rendus inutiles
  const PetalElement = useCallback(({ petal }: { petal: Petal }) => (
    <div
      key={petal.id}
      className="absolute mix-blend-screen"
      style={{
        left: `${petal.x}px`,
        top: `${petal.y}px`,
        width: `${petal.size}px`,
        height: `${petal.size}px`,
        opacity: petal.opacity,
        transform: `rotate(${petal.rotation}deg)`,
      }}
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 100 100" 
        preserveAspectRatio="none"
      >
        <path 
          d={PETAL_PATHS[petal.variant]} 
          fill={`url(#gradient-${petal.id})`}
          filter="url(#blur-filter)"
        />
        <defs>
          <radialGradient id={`gradient-${petal.id}`} cx="30%" cy="30%" r="70%" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="white" />
            <stop offset="40%" stopColor={petal.color} />
            <stop offset="100%" stopColor={petal.color} stopOpacity="0.8" />
          </radialGradient>
          <filter id="blur-filter" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1" />
          </filter>
        </defs>
      </svg>
    </div>
  ), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petalsArray.map(petal => (
        <PetalElement key={petal.id} petal={petal} />
      ))}
    </div>
  );
}
