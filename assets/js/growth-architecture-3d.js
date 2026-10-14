/**
 * DNGWORLD — 3D Growth Architecture Engine (V9.0)
 * Art Direction: From Complexity to Clarity
 * Studio-lit geometric growth structure with frosted mint, satin cobalt & coral accents.
 */

import * as THREE from '/assets/js/vendor/three.module.js';

class GrowthArchitecture3D {
  constructor() {
    this.stage = document.getElementById('hero3dStage');
    this.canvas = document.getElementById('hero3dCanvas');
    this.fallback = document.getElementById('hero3dFallback');
    
    if (!this.stage || !this.canvas) return;

    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.isVisible = true;
    this.mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.scrollProgress = 0;
    this.clock = new THREE.Clock();

    this.init();
  }

  isWebGLAvailable() {
    try {
      const c = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (c.getContext('webgl') || c.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  init() {
    if (!this.isWebGLAvailable()) {
      console.warn('[DNG 3D] WebGL not supported, preserving art-directed fallback.');
      if (this.fallback) this.fallback.style.opacity = '1';
      return;
    }

    try {
      // 1. Scene & Camera Setup
      this.scene = new THREE.Scene();

      const width = this.stage.clientWidth || window.innerWidth;
      const height = this.stage.clientHeight || window.innerHeight;
      this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      this.updateCameraForViewport(width);

      // 2. Renderer
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
      this.renderer.setSize(width, height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      this.renderer.outputColorSpace = THREE.SRGBColorSpace;
      this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
      this.renderer.toneMappingExposure = 1.35;

      // 3. Studio Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      this.scene.add(ambientLight);

      // Key light (soft studio white from top left)
      const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
      keyLight.position.set(5, 7, 6);
      this.scene.add(keyLight);

      // Cobalt rim light (crisp edge definition from behind right)
      const cobaltRimLight = new THREE.DirectionalLight(0x285BE8, 3.2);
      cobaltRimLight.position.set(-6, -2, -4);
      this.scene.add(cobaltRimLight);

      // Mint fill light (soft upward bounce)
      const mintFillLight = new THREE.DirectionalLight(0x12BCA4, 1.6);
      mintFillLight.position.set(2, -5, 3);
      this.scene.add(mintFillLight);

      // Signal coral strategic accent light
      const coralPoint = new THREE.PointLight(0xF18B53, 2.0, 12);
      coralPoint.position.set(3, 2, -2);
      this.scene.add(coralPoint);

      // 4. Construct Growth Architecture Subject
      this.buildGrowthArchitecture();

      // 5. Hide fallback smoothly when WebGL frame is ready
      if (this.fallback) {
        this.fallback.style.transition = 'opacity 0.8s ease';
        this.fallback.style.opacity = '0';
        setTimeout(() => {
          if (this.fallback) this.fallback.style.display = 'none';
        }, 800);
      }

      // 6. Event Listeners
      this.bindEvents();

      // 7. Render Loop
      this.render();
    } catch (err) {
      console.error('[DNG 3D] WebGL initialization failed:', err);
      if (this.fallback) {
        this.fallback.style.display = 'block';
        this.fallback.style.opacity = '1';
      }
    }
  }

  updateCameraForViewport(width) {
    if (width >= 900) {
      // Desktop: place camera slightly to the right to frame 3D subject in the 55-60% right zone
      this.camera.position.set(0.65, 0.15, 6.2);
      this.camera.lookAt(0.55, 0, 0);
    } else {
      // Mobile / Tablet: center the 3D subject and pull back slightly
      this.camera.position.set(0, 0.45, 7.8);
      this.camera.lookAt(0, 0, 0);
    }
  }

  buildGrowthArchitecture() {
    this.rootGroup = new THREE.Group();
    this.scene.add(this.rootGroup);

    // Color Palette Definitions
    const colCobalt = 0x285BE8;
    const colMint = 0x12BCA4;
    const colCoral = 0xF18B53;
    const colDeep = 0x173DA7;
    const colGlass = 0xEBF4FF;

    // Materials
    this.matSatinCobalt = new THREE.MeshStandardMaterial({
      color: colCobalt,
      metalness: 0.62,
      roughness: 0.26,
    });

    this.matDeepNavy = new THREE.MeshStandardMaterial({
      color: colDeep,
      metalness: 0.8,
      roughness: 0.2,
    });

    this.matFrostedMint = new THREE.MeshPhysicalMaterial({
      color: colMint,
      metalness: 0.15,
      roughness: 0.22,
      transmission: 0.58,
      thickness: 1.2,
      transparent: true,
      opacity: 0.88,
    });

    this.matSignalCoral = new THREE.MeshStandardMaterial({
      color: colCoral,
      metalness: 0.45,
      roughness: 0.32,
      emissive: 0x551B05,
      emissiveIntensity: 0.35,
    });

    this.matGlassPrism = new THREE.MeshPhysicalMaterial({
      color: colGlass,
      metalness: 0.1,
      roughness: 0.12,
      transmission: 0.85,
      thickness: 1.8,
      transparent: true,
      opacity: 0.75,
    });

    this.matWireLattice = new THREE.MeshBasicMaterial({
      color: 0x285BE8,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });

    // Sub-assemblies for Scroll Storyboard
    this.coreModule = new THREE.Group();
    this.diagnosticNodes = new THREE.Group();
    this.connectionLattice = new THREE.Group();
    this.growthRings = new THREE.Group();

    this.rootGroup.add(this.coreModule);
    this.rootGroup.add(this.diagnosticNodes);
    this.rootGroup.add(this.connectionLattice);
    this.rootGroup.add(this.growthRings);

    // --- 1. CORE ARCHITECTURAL SCULPTURE ---
    // Central Octahedral Growth Keystone
    const keystoneGeo = new THREE.OctahedronGeometry(1.25, 0);
    this.keystoneMesh = new THREE.Mesh(keystoneGeo, this.matSatinCobalt);
    this.coreModule.add(this.keystoneMesh);

    // Internal Frosted Mint Prism
    const innerPrismGeo = new THREE.IcosahedronGeometry(0.85, 0);
    this.innerPrismMesh = new THREE.Mesh(innerPrismGeo, this.matFrostedMint);
    this.coreModule.add(this.innerPrismMesh);

    // Outer Precision Wire Cage
    const cageGeo = new THREE.IcosahedronGeometry(1.58, 1);
    this.cageMesh = new THREE.Mesh(cageGeo, this.matWireLattice);
    this.coreModule.add(this.cageMesh);

    // --- 2. MODULAR SATELLITE PILLARS (STRATEGY / MARKETING / AI / CRM) ---
    this.satelliteNodes = [];
    const nodeConfigs = [
      { geo: new THREE.CylinderGeometry(0.24, 0.24, 1.1, 6), mat: this.matFrostedMint, pos: [1.8, 1.1, 0.4], rot: [0.3, 0.4, 0.8] },
      { geo: new THREE.DodecahedronGeometry(0.55, 0), mat: this.matSatinCobalt, pos: [-1.7, 0.9, 0.8], rot: [0.5, 0.2, 0.1] },
      { geo: new THREE.OctahedronGeometry(0.48, 0), mat: this.matSignalCoral, pos: [1.5, -1.3, 0.7], rot: [0.2, 0.6, 0.4] },
      { geo: new THREE.BoxGeometry(0.68, 0.68, 0.68), mat: this.matGlassPrism, pos: [-1.4, -1.2, 0.5], rot: [0.6, 0.5, 0.3] },
      { geo: new THREE.TetrahedronGeometry(0.5, 0), mat: this.matDeepNavy, pos: [0.1, 2.0, -0.6], rot: [0.1, 0.8, 0.2] },
    ];

    nodeConfigs.forEach((cfg, i) => {
      const node = new THREE.Mesh(cfg.geo, cfg.mat);
      node.position.set(...cfg.pos);
      node.rotation.set(...cfg.rot);
      node.userData = {
        basePos: new THREE.Vector3(...cfg.pos),
        driftSpeed: 0.8 + (i * 0.25),
        rotSpeed: 0.005 + (i * 0.003)
      };
      this.satelliteNodes.push(node);
      this.diagnosticNodes.add(node);
    });

    // --- 3. ALIGNMENT AXIS & CONNECTION LATTICES ---
    const ringGeo = new THREE.TorusGeometry(2.35, 0.022, 16, 100);
    this.orbitalRing1 = new THREE.Mesh(ringGeo, new THREE.MeshStandardMaterial({
      color: 0x12BCA4,
      metalness: 0.7,
      roughness: 0.25,
      transparent: true,
      opacity: 0.65
    }));
    this.orbitalRing1.rotation.x = Math.PI / 2.8;
    this.growthRings.add(this.orbitalRing1);

    const ringGeo2 = new THREE.TorusGeometry(2.7, 0.016, 16, 100);
    this.orbitalRing2 = new THREE.Mesh(ringGeo2, new THREE.MeshStandardMaterial({
      color: 0x285BE8,
      metalness: 0.8,
      roughness: 0.2,
      transparent: true,
      opacity: 0.5
    }));
    this.orbitalRing2.rotation.y = Math.PI / 3.4;
    this.orbitalRing2.rotation.z = Math.PI / 6;
    this.growthRings.add(this.orbitalRing2);

    // Dynamic Connection Beams (Representing Commercial System Architecture)
    const lineMat = new THREE.LineBasicMaterial({ color: 0x285BE8, transparent: true, opacity: 0.28 });
    const lineGeo = new THREE.BufferGeometry();
    const linePositions = [];

    this.satelliteNodes.forEach(node => {
      linePositions.push(0, 0, 0);
      linePositions.push(node.position.x, node.position.y, node.position.z);
    });

    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
    this.connectorLines = new THREE.LineSegments(lineGeo, lineMat);
    this.connectionLattice.add(this.connectorLines);
  }

  bindEvents() {
    // 1. Mouse & Touch Parallax Tracking
    const onPointerMove = (e) => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      this.mouse.targetX = (clientX / window.innerWidth) * 2 - 1;
      this.mouse.targetY = -(clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });

    // 2. Scroll Storyboard Tracking
    const onScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const heroHeight = this.stage.clientHeight || window.innerHeight;
      this.scrollProgress = Math.min(scrollY / heroHeight, 1.8);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    // 3. Responsive Resize
    window.addEventListener('resize', () => {
      if (!this.stage || !this.renderer || !this.camera) return;
      const w = this.stage.clientWidth || window.innerWidth;
      const h = this.stage.clientHeight || window.innerHeight;

      this.camera.aspect = w / h;
      this.updateCameraForViewport(w);
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    }, { passive: true });

    // 4. Viewport Observer (Pause Rendering When Off-Screen)
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
        });
      }, { threshold: 0.05 });

      this.observer.observe(this.stage);
    }
  }

  render() {
    requestAnimationFrame(() => this.render());

    if (!this.isVisible) return;

    const delta = this.clock.getDelta();
    const elapsed = this.clock.getElapsedTime();

    if (!this.isReducedMotion) {
      // Smooth interpolation for mouse parallax
      this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.045;
      this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.045;

      // Primary Geometric Rotation
      this.keystoneMesh.rotation.y += 0.007;
      this.keystoneMesh.rotation.x = Math.sin(elapsed * 0.5) * 0.15;

      this.innerPrismMesh.rotation.y -= 0.009;
      this.innerPrismMesh.rotation.z += 0.005;

      this.cageMesh.rotation.y += 0.003;
      this.cageMesh.rotation.x -= 0.002;

      this.orbitalRing1.rotation.z += 0.004;
      this.orbitalRing2.rotation.x -= 0.003;

      // Floating harmonic drift on satellite nodes
      this.satelliteNodes.forEach((node, i) => {
        const drift = Math.sin(elapsed * node.userData.driftSpeed + i) * 0.08;
        node.position.y = node.userData.basePos.y + drift;
        node.rotation.x += node.userData.rotSpeed;
        node.rotation.y += node.userData.rotSpeed * 1.2;
      });

      // Update line connections to tracked nodes
      const linePositions = this.connectorLines.geometry.attributes.position.array;
      let ptr = 0;
      this.satelliteNodes.forEach(node => {
        linePositions[ptr++] = 0;
        linePositions[ptr++] = 0;
        linePositions[ptr++] = 0;
        linePositions[ptr++] = node.position.x;
        linePositions[ptr++] = node.position.y;
        linePositions[ptr++] = node.position.z;
      });
      this.connectorLines.geometry.attributes.position.needsUpdate = true;

      // Storyboard Transformation Driven by Scroll:
      // Stage 00 (Arrival): Natural equilibrium
      // Stage 01 (Diagnose): Expanding modules outward, focal shift
      // Stage 02 (Connect): Precision alignment
      const scrollFactor = this.scrollProgress;
      
      this.rootGroup.rotation.y = (this.mouse.x * 0.45) + (scrollFactor * 0.65);
      this.rootGroup.rotation.x = (-this.mouse.y * 0.35) - (scrollFactor * 0.25);
      this.rootGroup.position.y = Math.sin(elapsed * 0.8) * 0.08 - (scrollFactor * 0.85);

      // Expansion effect on scroll
      const expansion = 1.0 + (scrollFactor * 0.35);
      this.diagnosticNodes.scale.set(expansion, expansion, expansion);
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => new GrowthArchitecture3D());
} else {
  new GrowthArchitecture3D();
}
