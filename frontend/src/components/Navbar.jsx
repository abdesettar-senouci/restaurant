import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const styles = {
    navbar: {
      // position: "fixed",
      backgroundColor: "transparent",
      zIndex: 50,
      width: "100%",
      // overflow: "visible",
    },
    container: {
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "1rem 7rem",
    },
    navContent: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      height: "64px",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
    },
    logoIcon: {
      width: "32px",
      height: "32px",
      backgroundColor: "#f97316",
      borderRadius: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginRight: "8px",
    },
    logoText: {
      fontSize: "22px",
      fontWeight: "bold",
      color: "#1f2937",
    },
    desktopNav: {
      display: "flex",
      alignItems: "center",
      gap: "2rem",
    },
    navLink: {
      color: "#374151",
      textDecoration: "none",
      padding: "8px 12px",
      fontSize: "18px",
      fontWeight: "500",
      transition: "color 0.2s ease",
      cursor: "pointer",
    },
    navLinkHover: {
      color: "#f97316",
    },
    ctaButton: {
      backgroundColor: "#f97316",
      color: "white",
      border: "none",
      padding: "12px 24px",
      borderRadius: "20px 8px 20px 8px",
      fontSize: "16px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "all 0.2s ease",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    },
    ctaButtonHover: {
      backgroundColor: "#ea580c",
      boxShadow: "0 10px 15px rgba(0, 0, 0, 0.15)",
    },
    mobileMenuButton: {
      display: "none",
      background: "none",
      border: "none",
      color: "#374151",
      cursor: "pointer",
      padding: "8px",
      transition: "color 0.2s ease",
    },
    mobileMenu: {
      backgroundColor: "white",
      borderTop: "1px solid #e5e7eb",
      padding: "8px",
    },
    mobileNavLink: {
      display: "block",
      color: "#374151",
      textDecoration: "none",
      padding: "8px 12px",
      fontSize: "16px",
      fontWeight: "500",
      borderRadius: "6px",
      transition: "all 0.2s ease",
      marginBottom: "4px",
    },
    mobileNavLinkHover: {
      color: "#f97316",
      backgroundColor: "#f9fafb",
    },
    mobileCTAContainer: {
      paddingTop: "8px",
    },
    mobileCTAButton: {
      width: "100%",
      backgroundColor: "#f97316",
      color: "white",
      border: "none",
      padding: "8px 24px",
      borderRadius: "20px 8px 20px 8px",
      fontSize: "16px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "background-color 0.2s ease",
    },
    // Media queries handled through CSS
    "@media (max-width: 768px)": {
      desktopNav: {
        display: "none",
      },
      mobileMenuButton: {
        display: "block",
      },
    },
  };

  // CSS for responsive behavior
  const responsiveCSS = `
    @media (max-width: 768px) {
      .desktop-nav {
        display: none !important;
      }
      .mobile-menu-button {
        display: block !important;
      }
    }
    @media (min-width: 769px) {
      .desktop-nav {
        display: flex !important;
      }
      .mobile-menu-button {
        display: none !important;
      }
    }
  `;

  return (
    <>
      <style>{responsiveCSS}</style>
      <nav style={styles.navbar}>
        <div style={styles.container}>
          <div style={styles.navContent}>
            {/* Logo */}
            <a href="/">
              <div style={styles.logoContainer}>
                <div style={styles.logoIcon}>
                  <span
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "17px",
                    }}
                  ></span>
                </div>
                <span style={styles.logoText}>restaurant</span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="desktop-nav" style={styles.desktopNav}>
              <a
                href="/#home"
                style={styles.navLink}
                onMouseEnter={(e) =>
                  (e.target.style.color = styles.navLinkHover.color)
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = styles.navLink.color)
                }
              >
                Home
              </a>
              <a
                href="/about"
                style={styles.navLink}
                onMouseEnter={(e) =>
                  (e.target.style.color = styles.navLinkHover.color)
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = styles.navLink.color)
                }
              >
                About
              </a>
              <a
                href="/#menu"
                style={styles.navLink}
                onMouseEnter={(e) =>
                  (e.target.style.color = styles.navLinkHover.color)
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = styles.navLink.color)
                }
              >
                Menu
              </a>
              {/* <a
                href="#chefs"
                style={styles.navLink}
                onMouseEnter={(e) =>
                  (e.target.style.color = styles.navLinkHover.color)
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = styles.navLink.color)
                }
              >
                Chefs
              </a> */}
              <a
                href="/contact"
                style={styles.navLink}
                onMouseEnter={(e) =>
                  (e.target.style.color = styles.navLinkHover.color)
                }
                onMouseLeave={(e) =>
                  (e.target.style.color = styles.navLink.color)
                }
              >
                Contact
              </a>
              <a href="/book">
                <button
                  style={styles.ctaButton}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor =
                      styles.ctaButtonHover.backgroundColor;
                    e.target.style.boxShadow = styles.ctaButtonHover.boxShadow;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor =
                      styles.ctaButton.backgroundColor;
                    e.target.style.boxShadow = styles.ctaButton.boxShadow;
                  }}
                >
                  Book Table
                </button>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              className="mobile-menu-button"
              onClick={toggleMenu}
              style={styles.mobileMenuButton}
              onMouseEnter={(e) =>
                (e.target.style.color = styles.navLinkHover.color)
              }
              onMouseLeave={(e) =>
                (e.target.style.color = styles.mobileMenuButton.color)
              }
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div style={styles.mobileMenu}>
            <a
              href="#home"
              style={styles.mobileNavLink}
              onMouseEnter={(e) => {
                e.target.style.color = styles.mobileNavLinkHover.color;
                e.target.style.backgroundColor =
                  styles.mobileNavLinkHover.backgroundColor;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = styles.mobileNavLink.color;
                e.target.style.backgroundColor = "transparent";
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </a>
            <a
              href="#about"
              style={styles.mobileNavLink}
              onMouseEnter={(e) => {
                e.target.style.color = styles.mobileNavLinkHover.color;
                e.target.style.backgroundColor =
                  styles.mobileNavLinkHover.backgroundColor;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = styles.mobileNavLink.color;
                e.target.style.backgroundColor = "transparent";
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#menu"
              style={styles.mobileNavLink}
              onMouseEnter={(e) => {
                e.target.style.color = styles.mobileNavLinkHover.color;
                e.target.style.backgroundColor =
                  styles.mobileNavLinkHover.backgroundColor;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = styles.mobileNavLink.color;
                e.target.style.backgroundColor = "transparent";
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Menu
            </a>
            <a
              href="#chefs"
              style={styles.mobileNavLink}
              onMouseEnter={(e) => {
                e.target.style.color = styles.mobileNavLinkHover.color;
                e.target.style.backgroundColor =
                  styles.mobileNavLinkHover.backgroundColor;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = styles.mobileNavLink.color;
                e.target.style.backgroundColor = "transparent";
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Chefs
            </a>
            <a
              href="#contact"
              style={styles.mobileNavLink}
              onMouseEnter={(e) => {
                e.target.style.color = styles.mobileNavLinkHover.color;
                e.target.style.backgroundColor =
                  styles.mobileNavLinkHover.backgroundColor;
              }}
              onMouseLeave={(e) => {
                e.target.style.color = styles.mobileNavLink.color;
                e.target.style.backgroundColor = "transparent";
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <div style={styles.mobileCTAContainer}>
              <button
                style={styles.mobileCTAButton}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#ea580c")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#f97316")
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Book Table
              </button>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
