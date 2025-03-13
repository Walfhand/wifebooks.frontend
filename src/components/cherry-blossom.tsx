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
}

export function CherryBlossom({
  count = 30,
  minSize = 10,
  maxSize = 20,
  minOpacity = 0.6,
  maxOpacity = 1,
  colors = ["#ffccf9", "#ffc6e5", "#ffb7dd", "#ffa8d4", "#ff99cc"],
}: CherryBlossomProps) {
  // Utiliser useRef pour stocker l'état des pétales plutôt que useState
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
      color: colors[Math.floor(Math.random() * colors.length)]
    };
  }, [minSize, maxSize, minOpacity, maxOpacity, colors]);

  // Initialisation des pétales - exécuté une seule fois
  useEffect(() => {
    if (typeof window === 'undefined' || isInitializedRef.current) return;
    
    // Créer les pétales initiaux
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
      
      // Mettre à jour les positions des pétales
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
          // Vérifier si les pétales ont réellement changé pour éviter les rendus inutiles
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

  // Rendu des pétales avec React.memo pour éviter les rendus inutiles
  const PetalElement = useCallback(({ petal }: { petal: Petal }) => (
    <div
      key={petal.id}
      className="absolute rounded-full mix-blend-screen animate-pulse"
      style={{
        left: `${petal.x}px`,
        top: `${petal.y}px`,
        width: `${petal.size}px`,
        height: `${petal.size}px`,
        opacity: petal.opacity,
        transform: `rotate(${petal.rotation}deg)`,
        background: `radial-gradient(circle at 30% 30%, white 0%, ${petal.color} 60%)`,
        boxShadow: `0 0 5px ${petal.color}80`,
        clipPath: "polygon(50% 0%, 80% 30%, 100% 50%, 80% 80%, 50% 100%, 20% 80%, 0% 50%, 20% 20%)"
      }}
    />
  ), []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {petalsArray.map(petal => (
        <PetalElement key={petal.id} petal={petal} />
      ))}
    </div>
  );
}
