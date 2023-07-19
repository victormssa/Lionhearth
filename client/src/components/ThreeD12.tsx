"use client"
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { DodecahedronGeometry, MeshStandardMaterial, DirectionalLight } from 'three';

const ThreeD12: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
    
        // Configuração da cena
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio); // Define o clear alpha como 0
    
        // Criação da luz direcional
        const directionalLight = new DirectionalLight(0xffffff, 1);
        directionalLight.position.set(1, 1, 1); // Define a posição da luz
        scene.add(directionalLight);
        scene.add(directionalLight.target); // Adiciona um alvo para a luz direcional
    
        // Exemplo: Adicionando um icosaedro à cena
        const geometry = new DodecahedronGeometry(1);
        const material = new MeshStandardMaterial({ color: 0xff0000 });
        material.flatShading = true; // Habilita shading plano para tornar as faces mais distintas
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
    
        camera.position.z = 5;
    
        // Função de animação
        const animate = () => {
          requestAnimationFrame(animate);
          cube.rotation.x += 0.01;
          cube.rotation.y += 0.01;
          renderer.render(scene, camera);
        };
    
        animate();
    
        // Limpar cena no momento da desmontagem do componente
        return () => {
          scene.remove(cube);
        };
      }, []);
    
      return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} className='absolute top-0 left-[28rem]' />;
    };

export default ThreeD12;
