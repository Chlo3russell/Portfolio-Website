import { useEffect, useState } from "react";

import Link from "next/link";
import {routes} from "@/data/global";

// This component renders the mobile navigation menu for the site.
// It handles opening/closing the menu, locking page scroll while open,
// and showing the menu links with a simple animation effect.
export default function MobileNavbar() {
  // Tracks whether the mobile menu is currently open or closed.
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Controls whether the menu should be mounted in the DOM at all.
  // This is separate from the visual animation state so the menu can
  // stay mounted briefly after closing before disappearing completely.
  const [isMenuMounted, setIsMenuMounted] = useState(false);

  // Controls whether the menu has finished its entry animation and should
  // display its active visual state (for example, the background color).
  const [isMenuRendered, setIsMenuRendered] = useState(false);

  // Toggles the menu open/closed state and prevents or allows page scrolling.
  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = "";
    } else {
      setIsMenuOpen(true);
      document.body.style.overflow = "hidden";
    }
  }

  // This effect manages the menu's open/close lifecycle.
  // When the menu opens, it mounts the menu immediately and then enables
  // the rendered state shortly after so the transition can begin.
  // When it closes, it disables the rendered state first and then removes
  // the menu from the DOM after a short delay.
  useEffect(() => {
    if (isMenuOpen) {
      setIsMenuMounted(true);
      const timeout = window.setTimeout(() => setIsMenuRendered(true), 20);
      return () => window.clearTimeout(timeout);
    }

    setIsMenuRendered(false);
    const timeout = window.setTimeout(() => setIsMenuMounted(false), 300);
    return () => window.clearTimeout(timeout);
  }, [isMenuOpen]);

  // Clean up the body overflow style when the component is removed.
  useEffect(() => {
    return function cleanup() {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <nav>
      <div
        className={`w-full justify-between flex items-center ${isMenuRendered && 'bg-bg'} p-5`}
        style={{ zIndex: 101 }}
      >
        <li className="list-none font-bold text-lg">
          <Link href="/">
            <img
              className="mr-3"
              src="/static/logos/logo_full.svg"
              width="160"
            />
          </Link>
        </li>
        <button
          className="burger visible md:hidden"
          aria-label="Toggle menu"
          type="button"
          onClick={toggleMenu}
        >
          {/* Show the hamburger icon when the menu is closed and the cross icon when open. */}
          <MenuIcon data-hide={isMenuOpen} />
          <CrossIcon data-hide={!isMenuOpen} />
        </button>
      </div>

      {/* Only render the menu list if it has been mounted. */}
      {isMenuMounted && (
        <ul
          className={`menu flex flex-col absolute bg-bg
            ${isMenuRendered && "menuRendered"}`}
        >
          {routes.map((item, index) => {
            return (
              <li
                className="border-b border-gray-900 text-gray-100 text-sm font-semibold"
                // Each link gets a slightly later transition delay so the menu items
                // appear one by one instead of all at once.
                style={{ transitionDelay: `${150 + index * 25}ms` }}
              >
                <Link href={item.path}>
                  <a className="flex w-auto pb-4">{item.title}</a>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </nav>
  );
}

// SVG icon for the hamburger menu button.
function MenuIcon(props) {
  return (
    <svg
      className="h-5 w-5 absolute text-gray-100"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 7.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// SVG icon for the close/cross button.
function CrossIcon(props) {
  return (
    <svg
      className="h-5 w-5 absolute text-gray-100"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  );
}
