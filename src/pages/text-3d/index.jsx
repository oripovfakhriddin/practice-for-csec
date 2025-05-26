import React, { Fragment, useEffect, useRef, useState } from "react";
import Hamburger from "../../assets/icons/hamburger";
import ThemeToggle from "../../components/theme";
import Logo from "/pictures/logo-login-background.png";
import Aos from "aos";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import helvetiker from "three/examples/fonts/helvetiker_regular.typeface.json";

function Text3D() {
  const groupRef = useRef();

  useEffect(() => {
    const font = new FontLoader().parse(helvetiker);
    const message = " Oripov Faxriddin";
    const color = 0x006699;

    const matDark = new THREE.LineBasicMaterial({
      color,
      side: THREE.DoubleSide,
    });
    const matLite = new THREE.MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.4,
      side: THREE.DoubleSide,
    });

    const shapes = font.generateShapes(message, 100);
    const geometry = new THREE.ShapeGeometry(shapes);
    geometry.computeBoundingBox();

    const xMid =
      -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
    geometry.translate(xMid, 0, 0);

    const text = new THREE.Mesh(geometry, matLite);
    text.position.z = -150;
    groupRef.current.add(text);

    const holeShapes = [];
    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];
      if (shape.holes && shape.holes.length > 0) {
        for (let j = 0; j < shape.holes.length; j++) {
          holeShapes.push(shape.holes[j]);
        }
      }
    }

    shapes.push(...holeShapes);

    for (let i = 0; i < shapes.length; i++) {
      const shape = shapes[i];
      const points = shape.getPoints();
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
      lineGeometry.translate(xMid, 0, 0);

      const line = new THREE.Line(lineGeometry, matDark);
      groupRef.current.add(line);
    }
  }, []);

  return <group ref={groupRef} />;
}

const Text3DPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    Aos.init({
      duration: 700,
      easing: "ease-in",
      once: true,
    });
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
                    href="text-3d"
                    className="block py-2 px-3  rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:text-blue-700 md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 md:dark:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Text-3D
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Contact
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
      <main>
        <div style={{ width: "100vw", height: "100vh" }}>
          <Canvas camera={{ position: [0, -400, 600], fov: 45 }}>
            <ambientLight />
            <Text3D />
            <OrbitControls />
          </Canvas>
        </div>
      </main>
    </Fragment>
  );
};

export default Text3DPage;
