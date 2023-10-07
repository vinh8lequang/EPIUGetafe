import React, { useState } from "react";
import { ColorModeContext, useMode } from "./theme";
import {
  CssBaseline,
  ThemeProvider,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { tokens } from "./theme";
import { Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Analisis from "./pages/analisis";
import Ohs from "./pages/ohs";
import Derivadores from "./pages/derivadores";
import CompForm from "./pages/compForm";
import Derivacion from "./pages/derivacion";
import Concienciacion from "./pages/concienciacion";
import Intervenciones from "./pages/intervenciones";
import Visor from "./pages/visorSSCC";
import VisorEPIU from "./pages/visorEPIU";
import VisorBarrio from "./pages/visorBarrio";
import Descargas from "./pages/descargas";
import BottomBar from "./pages/global/BottomBar";
import SideBar from "./pages/global/SideBar";
import MapEPIUProvider from "./components/MapEPIUProvider";
import MapSSCCProvider from "./components/MapSSCCProvider";
import MapBarrioProvider from "./components/MapBarrioProvider";
// import { AnimatePresence } from "framer-motion/dist/framer-motion";
import { AnimatePresence, color } from "framer-motion";
import logoOhsText from "./assets/logo_ohs_text.png";
import logoAyunt from "./assets/logo_ayunt.png";
import logoEuro from "./assets/logo_euro.png";
import logoUrban from "./assets/logo_urban.png";

function App() {
  const [theme, colorMode] = useMode();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const [showOverlay, setShowOverlay] = useState(true); // Initially show overlay

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  return (
    <AnimatePresence>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {showOverlay && (
              <Box
                onClick={closeOverlay}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: colors.primary[200],
                  zIndex: 999,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  onClick={closeOverlay}
                  style={{
                    position: "absolute",
                    top: 20,
                    right: 20,
                    height: "5rem",
                    width: "5rem",
                  }}
                >
                  <Typography
                    align="center"
                    fontSize={"7rem"}
                    color={colors.gray[200]}
                  >
                    ×
                  </Typography>
                </Button>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  <Box width={"42rem"}>
                    <Typography
                      variant="h1"
                      align="center"
                      // letterSpacing={"0.05rem"}
                      color={colors.gray[200]}
                      fontWeight={400}
                      paddingBottom={"1rem"}
                      borderBottom={`1px solid ${colors.gray[800]}`}
                    >
                      OBSERVATORIO DE DATOS EPIU GETAFE
                    </Typography>
                    <Typography
                      variant="h5"
                      align="justify"
                      paddingTop={"1rem"}
                      width={"auto"}
                      margin={"auto"}
                      color={colors.gray[200]}
                      paddingBottom={"1rem"}
                    >
                      Este observatorio forma parte de la actividad de
                      Seguimiento y Evaluación del proyecto EPIU (Energy Poverty
                      Intelligence Unit) para el municipio de Getafe. Se trata
                      de un proyecto cofinanciado por el programa europeo UIA
                      que tiene como objetivo el desarrollo de soluciones
                      urbanas innovadoras en las ciudades.
                      <br />
                      <br />
                      El reto ha consistido en el diseño de un visor analítico y
                      cartográfico capaz de facilitar el seguimiento de los
                      objetivos del proyecto y de generar nuevas cartografías
                      mediante el análisis de grandes volúmenes de datos
                      procedentes de diferentes fuentes de información.
                      <br />
                      <br />
                      La herramienta espacial desarrollada para el observatorio,
                      en línea con el objetivo innovador del programa, explora
                      nuevas formas de representación en diferentes escalas que
                      facilitan el análisis estratégico (a escala de sección
                      censal y de barrio) y el seguimiento operativo (a escala
                      de catastro y soluciones implementadas) en un mismo visor.
                    </Typography>
                    <Box
                      // backgroundColor={colors.gray[800]}
                      display={"flex"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                      paddingTop={"1.5rem"}
                    >
                      <img
                        src={logoOhsText}
                        alt="Oficina de Hogares Saludables (OHS)"
                        height={"60px"}
                      />
                      <img
                        src={logoAyunt}
                        alt="Ayuntamiento de Getafe"
                        height={"60px"}
                      />
                      <img
                        src={logoEuro}
                        alt="Ayuntamiento de Getafe"
                        height={"60px"}
                      />
                      <img
                        src={logoUrban}
                        alt="Ayuntamiento de Getafe"
                        height={"60px"}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}
            <SideBar />
            <main className="content">
              <BottomBar /> {/* <Bottom bar acts as topbar now /> */}
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/analisis" element={<Analisis />} />
                <Route path="/ohs" element={<Ohs />} />
                <Route path="/derivadores" element={<Derivadores />} />
                <Route path="/comparativa-formacion" element={<CompForm />} />
                <Route path="/derivacion" element={<Derivacion />} />
                <Route path="/concienciacion" element={<Concienciacion />} />
                <Route path="/intervenciones" element={<Intervenciones />} />
                <Route
                  path="/visor-barrio"
                  element={
                    <MapBarrioProvider>
                      <VisorBarrio />
                    </MapBarrioProvider>
                  }
                />
                <Route
                  path="/visor-sscc"
                  element={
                    <MapSSCCProvider>
                      <Visor />
                    </MapSSCCProvider>
                  }
                />
                <Route
                  path="/visor-epiu"
                  element={
                    <MapEPIUProvider>
                      <VisorEPIU />
                    </MapEPIUProvider>
                  }
                />
                <Route path="/descargas" element={<Descargas />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </AnimatePresence>
  );
}

export default App;
