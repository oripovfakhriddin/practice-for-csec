import React, { useRef, useEffect, Fragment, useState } from "react";
import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Aos from "aos";
import Hamburger from "../../assets/icons/hamburger";
import ThemeToggle from "../../components/theme";
import Logo from "/pictures/logo-login-background.png";
import "./index.css";

const Cub3DPage = () => {
  const mountRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Aos.init({
      duration: 700,
      easing: "ease-in",
      once: true,
    });
  }, []);

  useEffect(() => {
    let camera, scene, renderer, controls, stats;
    let mesh;
    const amount = 10;
    const count = Math.pow(amount, 3);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(1, 1);

    const color = new THREE.Color();
    const white = new THREE.Color().setHex(0xffffff);

    const gui = new GUI();

    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(amount, amount, amount);
    camera.lookAt(0, 0, 0);

    scene = new THREE.Scene();

    const light = new THREE.HemisphereLight(0xffffff, 0x888888, 3);
    light.position.set(0, 1, 0);
    scene.add(light);

    const geometry = new THREE.IcosahedronGeometry(0.5, 3);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff });

    mesh = new THREE.InstancedMesh(geometry, material, count);

    let i = 0;
    const offset = (amount - 1) / 2;

    const matrix = new THREE.Matrix4();

    for (let x = 0; x < amount; x++) {
      for (let y = 0; y < amount; y++) {
        for (let z = 0; z < amount; z++) {
          matrix.setPosition(offset - x, offset - y, offset - z);
          mesh.setMatrixAt(i, matrix);
          mesh.setColorAt(i, color);
          i++;
        }
      }
    }

    scene.add(mesh);

    gui.add(mesh, "count", 0, count);

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    mountRef.current.appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.enableZoom = false;
    controls.enablePan = false;

    stats = new Stats();
    mountRef.current.appendChild(stats.dom);

    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();

      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const onMouseMove = (event) => {
      event.preventDefault();

      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("resize", onWindowResize);
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      controls.update();

      raycaster.setFromCamera(mouse, camera);

      const intersection = raycaster.intersectObject(mesh);

      if (intersection.length > 0) {
        const instanceId = intersection[0].instanceId;

        mesh.getColorAt(instanceId, color);

        if (color.equals(white)) {
          mesh.setColorAt(instanceId, color.setHex(Math.random() * 0xffffff));
          mesh.instanceColor.needsUpdate = true;
        }
      }

      renderer.render(scene, camera);
      stats.update();

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      gui.destroy();
      window.removeEventListener("resize", onWindowResize);
      window.removeEventListener("mousemove", onMouseMove);

      if (
        mountRef.current &&
        renderer.domElement.parentNode === mountRef.current
      ) {
        mountRef.current.removeChild(renderer.domElement);
      }

      if (mountRef.current && stats.dom.parentNode === mountRef.current) {
        mountRef.current.removeChild(stats.dom);
      }

      controls.dispose();
      renderer.dispose();

      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <Fragment>
      <header>
        <nav
          data-aos="fade-down"
          className="bg-white border-gray-200 dark:bg-gray-900"
        >
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <img src={Logo} className="h-12" alt="Fakhriddin Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Fakhriddin
              </span>
            </a>
            {isOpen ? (
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  data-collapse-toggle="navbar-default"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-default"
                  aria-expanded="false"
                >
                  <Hamburger />
                </button>
                <ThemeToggle />
              </div>
            ) : (
              ""
            )}
            <div
              className={`${isOpen ? "" : "hidden"} w-full md:block md:w-auto`}
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <a
                    href="/"
                    className="block py-2 px-3  text-gray-900  rounded-sm md:bg-transparent  md:p-0 dark:text-white "
                    aria-current="page"
                  >
                    Bosh sahifa - 3D
                  </a>
                </li>
                <li>
                  <a
                    href="/text-3d"
                    className="block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent text-gray-900 md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700  dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Text - 3D
                  </a>
                </li>
                <li>
                  <a
                    href="/cub-3d"
                    className="block py-2 px-3 md:text-blue-700 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:text-blue-500 md:dark:hover:bg-transparent"
                  >
                    Kub - 3D
                  </a>
                </li>
                <li>
                  <a
                    href="/carousel"
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Karusel
                  </a>
                </li>
              </ul>
            </div>
            {!isOpen ? (
              <div className="flex justify-between md:hidden">
                <button
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                  data-collapse-toggle="navbar-default"
                  type="button"
                  className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg  hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                  aria-controls="navbar-default"
                  aria-expanded="false"
                >
                  <Hamburger />
                </button>
                <ThemeToggle />
              </div>
            ) : (
              ""
            )}
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>
      <main data-aos="flip-down">
        <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />
      </main>
    </Fragment>
  );
};

export default Cub3DPage;
