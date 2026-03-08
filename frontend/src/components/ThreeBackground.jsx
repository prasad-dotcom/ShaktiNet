import { useEffect, useRef } from "react";
import * as THREE from "three";

// ─── Build a single petal geometry ───────────────────────────
function buildPetalGeometry(petalLength = 1, petalWidth = 0.45) {
  const segments = 20;
  const positions = [];
  const normals   = [];
  const uvs       = [];
  const indices   = [];

  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const width = petalWidth * Math.sin(Math.PI * t) * (1 - 0.3 * t);
    pts.push({ t, width });
  }

  const thickness = 0.04;

  for (let i = 0; i <= segments; i++) {
    const { t, width } = pts[i];
    const y = petalLength * (1 - t) - petalLength * 0.5;
    const z = Math.sin(Math.PI * t) * thickness;

    positions.push(-width, y, z);
    positions.push( width, y, z);
    normals.push(0, 0, 1,  0, 0, 1);
    uvs.push(0, t,  1, t);
  }

  for (let i = 0; i < segments; i++) {
    const a = i * 2,     b = i * 2 + 1;
    const c = (i+1)*2,   d = (i+1)*2 + 1;
    indices.push(a, b, c);
    indices.push(b, d, c);
    indices.push(c, b, a);
    indices.push(c, d, b);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geo.setAttribute("normal",   new THREE.Float32BufferAttribute(normals,   3));
  geo.setAttribute("uv",       new THREE.Float32BufferAttribute(uvs,       2));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

export default function ThreeBackground({
  count      = 220,
  style      = {},
}) {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // ── Renderer ──
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ──
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, W / H, 0.1, 100);
    camera.position.set(0, 0, 14);

    // ── Lighting ──
    const ambient = new THREE.AmbientLight(0xffeef6, 1.0);
    scene.add(ambient);
    const dirLight = new THREE.DirectionalLight(0xff80c0, 1.4);
    dirLight.position.set(3, 5, 5);
    scene.add(dirLight);
    const rimLight = new THREE.DirectionalLight(0xffc0e0, 0.6);
    rimLight.position.set(-4, -2, 3);
    scene.add(rimLight);
    // Soft neon point light — gentle pink glow from centre
    const neonLight = new THREE.PointLight(0xff2d9b, 1.2, 30);
    neonLight.position.set(0, 0, 6);
    scene.add(neonLight);

    // ── Color palette ──
    const COLORS = [
      new THREE.Color("#e91e8c"),
      new THREE.Color("#c2185b"),
      new THREE.Color("#f06292"),
      new THREE.Color("#ff80ab"),
      new THREE.Color("#e8c4a0"),
      new THREE.Color("#f48fb1"),
      new THREE.Color("#ff4081"),
      new THREE.Color("#ad1457"),
      new THREE.Color("#f8bbd0"),
    ];

    // ── Shared petal geometry ──
    const petalGeo = buildPetalGeometry(1, 0.42);
    const petals = [];

    for (let i = 0; i < count; i++) {
      const color = COLORS[Math.floor(Math.random() * COLORS.length)].clone();
      color.multiplyScalar(0.7 + Math.random() * 0.6);

      const mat = new THREE.MeshPhongMaterial({
        color,
        emissive:    color.clone().multiplyScalar(0.35),
        side:        THREE.DoubleSide,
        transparent: true,
        opacity:     0.5 + Math.random() * 0.38,
        shininess:   120,
        specular:    new THREE.Color(0xff80c8),
        blending:    THREE.AdditiveBlending,
        depthWrite:  false,
      });

      const mesh = new THREE.Mesh(petalGeo, mat);
      // frustum at z=0 with FOV=75, cam-z=14 is ~38 wide × ~21 tall
      // use larger spread so petals fill all four corners
      const spread  = 42;
      const spreadY = 25;
      mesh.position.set(
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spreadY,
        (Math.random() - 0.5) * 10,
      );
      const s = 0.18 + Math.random() * 0.72;
      mesh.scale.set(s, s * (0.9 + Math.random() * 0.4), s * 0.6);
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      );
      scene.add(mesh);

      petals.push({
        mesh,
        vx: (Math.random() - 0.5) * 0.007,
        vy: -(0.003 + Math.random() * 0.010),
        vz: (Math.random() - 0.5) * 0.003,
        rx: (Math.random() - 0.5) * 0.018,
        ry: (Math.random() - 0.5) * 0.022,
        rz: (Math.random() - 0.5) * 0.014,
        swayAmp:    0.003 + Math.random() * 0.006,
        swayFreq:   0.3   + Math.random() * 0.8,
        swayOffset: Math.random() * Math.PI * 2,
        baseOpacity: 0.5  + Math.random() * 0.38,
        pulseFreq:   0.2  + Math.random() * 0.5,
        pulseOffset: Math.random() * Math.PI * 2,
        spread,
        spreadY,
        resetY: spreadY * 0.5 + 2,
      });
    }

    // ── Mouse parallax ──
    const mouse = { x: 0, y: 0 };
    const handleMouse = (e) => {
      mouse.x = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", handleMouse);

    // ── Resize ──
    const handleResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    // ── Animation loop ──
    let animId;
    const clock = new THREE.Clock();
    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Slowly drift neon light in a gentle circle
      neonLight.position.x = Math.sin(t * 0.18) * 5;
      neonLight.position.y = Math.cos(t * 0.13) * 3;

      camera.position.x += (mouse.x * 1.5 - camera.position.x) * 0.02;
      camera.position.y += (-mouse.y * 0.8 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      petals.forEach((p) => {
        const m = p.mesh;
        m.position.x += p.vx + Math.sin(t * p.swayFreq + p.swayOffset) * p.swayAmp;
        m.position.y += p.vy;
        m.position.z += p.vz;
        m.rotation.x += p.rx;
        m.rotation.y += p.ry;
        m.rotation.z += p.rz;
        m.material.opacity =
          p.baseOpacity + Math.sin(t * p.pulseFreq + p.pulseOffset) * 0.1;
        m.material.emissiveIntensity =
          0.18 + Math.sin(t * p.pulseFreq * 0.5 + p.pulseOffset) * 0.08;
        if (m.position.y < -p.resetY) {
          m.position.y =  p.resetY;
          m.position.x = (Math.random() - 0.5) * p.spread;
          m.position.z = (Math.random() - 0.5) * 10;
        }
        // wrap left/right edges
        if (m.position.x >  p.spread * 0.52) m.position.x = -p.spread * 0.52;
        if (m.position.x < -p.spread * 0.52) m.position.x =  p.spread * 0.52;
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [count]);

  return (
    <div
      ref={mountRef}
      style={{
        position:      "fixed",
        inset:         0,
        width:         "100vw",
        height:        "100vh",
        pointerEvents: "none",
        zIndex:        0,
        overflow:      "hidden",
        ...style,
      }}
    />
  );
}
