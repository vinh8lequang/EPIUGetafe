import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { Box, Typography, useTheme, Link } from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";
import { motion } from "framer-motion";
import SubBar from "../global/SubBar";
import Map from "../../components/MapSSCC";
import { useMapSSCCContext } from "../../components/MapSSCCProvider";
import { mapSSCCKeys } from "../../utils/auxUtils";
import { pathToSelect } from "../../constants/MapConstantsSSCC";

const keysPanel1 = ["CUSEC", "barrio", "n viviendas", "ano constru SSCC"];

const keysPanel2 = [
  "n exptes SSCC",
  "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION",
  "porc motivo INFORMACION_GENERAL",
  "porc motivo TRAMITACION_BONO_SOCIAL",
  "porc motivo OPTIMIZACION_FACTURA barrio",
  // "porc motivo OTROS_MOTIVOS",
  "porc A través de una persona conocida",
  "porc Comunicaciones del Ayuntamiento",
  "porc Otros departamentos (SAV y otros)",
  "porc SS.SS",
  // "porc Directamente",
  // "porc Administrador de fincas",
  // "porc Entidades EPIU",
  "porc Asociaciones y ONG's",
  "Intervalo de confianza (%)",
];

const keysPanel3 = [
  "pob total (INE 22)",
  "porc pob menor de 14 años (INE 22)",
  "porc pob de 65 y más años (INE 22)",
  "Edad media pob (INE 20)",
  "Índice de dependencia infantil (%)",
  "Índice de dependencia de mayores (%)",
  "Índice de dependencia total (%)",
  "Educación primaria e inferior",
  // "Primera etapa de Educación Secundaria y similar",
  // "Segunda etapa de Educación Secundaria y Educación Postsecundaria no Superior",
  // "Educación Superior",
  // "porc dependencia - discapacidad SSCC",
];

const keysPanel4 = [
  "renta media hogar",
  "porc disconfort inv",
  "porc disconfort ver",
  "porc retraso pago facturas",
  "tamaño medio hogar (INE 20)",
  "porc hogares unipersonales (INE 20)",
];

const porcSSCC = [
  "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION",
  "porc motivo OPTIMIZACION_FACTURA barrio",
  "porc motivo INFORMACION_GENERAL",
  "porc motivo TRAMITACION_BONO_SOCIAL",
  "porc motivo OTROS_MOTIVOS",
  "porc A través de una persona conocida",
  "porc Comunicaciones del Ayuntamiento",
  "porc Otros departamentos (SAV y otros)",
  "porc SS.SS",
  "porc Directamente",
  "porc Administrador de fincas",
  "porc Entidades EPIU",
  "porc Asociaciones y ONG's",
  "porc pob menor de 14 años (INE 22)",
  "porc pob de 65 y más años (INE 22)",
  "Educación primaria e inferior",
  "Primera etapa de Educación Secundaria y similar",
  "Segunda etapa de Educación Secundaria y Educación Postsecundaria no Superior",
  "Educación Superior",
  "porc dependencia - discapacidad SSCC",
  "Índice de dependencia infantil (%)",
  "Índice de dependencia de mayores (%)",
  "Índice de dependencia total (%)",
  "porc disconfort inv",
  "porc disconfort ver",
  "porc hogares unipersonales (INE 20)",
  "porc retraso pago facturas",
  "Intervalo de confianza (%)",
];

const availableSelections = [
  "n viviendas",
  "ano constru SSCC",
  "n exptes SSCC",
  "porc motivo TRAMITACION_AYUDAS_A_REHABILITACION",
  "porc motivo INFORMACION_GENERAL",
  "porc motivo TRAMITACION_BONO_SOCIAL",
  "porc motivo OPTIMIZACION_FACTURA barrio",
  "porc A través de una persona conocida",
  "porc Comunicaciones del Ayuntamiento",
  "porc Otros departamentos (SAV y otros)",
  "porc SS.SS",
  "porc Asociaciones y ONG's",
  "pob total (INE 22)",
  "porc pob menor de 14 años (INE 22)",
  "porc pob de 65 y más años (INE 22)",
  "Edad media pob (INE 20)",
  "Índice de dependencia infantil (%)",
  "Índice de dependencia de mayores (%)",
  "Índice de dependencia total (%)",
  "Educación primaria e inferior",
  "renta media hogar",
  "porc disconfort inv",
  "porc disconfort ver",
  "porc retraso pago facturas",
  "tamaño medio hogar (INE 20)",
  "porc hogares unipersonales (INE 20)",
];

const baseURL =
  "https://observatoriodedatosepiu.khoraurbanthinkers.es/api/visor-sscc";
// const storageKey = "visorData"; // Key for storing/retrieving data from localStorage
function Visor() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [geoSSCC, setGeoSSCC] = useState({});
  const [globales, setGlobales] = useState({});
  const mapRef = useRef();
  const { infoValue, selectionValue, updateSelection } = useMapSSCCContext();

  useLayoutEffect(() => {
    axios.get(baseURL).then((res) => {
      const data1 = res.data.geoSSCC;
      const data2 = res.data.globalesSSCC;
      setGeoSSCC(data1);
      setGlobales(data2);
      console.log("Project Coordinator: Asier Eguilaz Oyaga");
      console.log("asier.eguilaz@gmail.es");
      console.log("Urban Planner: Samanta Arnal Martín");
      console.log("samantaarnal@gmail.com");
      console.log("Full Stack Developer: Vinh Le Quang");
      console.log("vinh8lequang@gmail.com");
      console.log("-------------------------------------------");

      // // Scroll synchronization script
      // const box2 = document.getElementById("infoPanel2");
      // const box2Global = document.getElementById("infoPanel2Global");
      // const box3 = document.getElementById("infoPanel3");
      // const box3Global = document.getElementById("infoPanel3Global");

      // const syncScroll2 = (event) => {
      //   const scrollY = event.target.scrollTop;
      //   box2Global.scrollTop = scrollY;
      // };

      // const syncScroll3 = (event) => {
      //   const scrollY = event.target.scrollTop;
      //   box3Global.scrollTop = scrollY;
      // };

      // if (box2 && box2Global) {
      //   box2.addEventListener("scroll", syncScroll2);
      // }

      // if (box3 && box3Global) {
      //   box3.addEventListener("scroll", syncScroll3);
      // }

      // // Clean up the event listener when the component unmounts
      // return () => {
      //   if (box2 && box2Global) {
      //     box2.removeEventListener("scroll", syncScroll2);
      //   }
      //   if (box3 && box3Global) {
      //     box3.removeEventListener("scroll", syncScroll3);
      //   }
      // };
    });
  }, []);

  // useEffect(() => {
  // console.log("infoValue", infoValue);
  // }, [infoValue]);

  const handleSelectionClick = (indicator) => {
    // console.log("in handleSelectionClick");
    if (availableSelections.includes(indicator)) {
      updateSelection(`feature.properties["${indicator}"]`);
    }
    return;
  };

  const infoPanel1 = Object.fromEntries(
    Object.entries(infoValue).filter(([key]) => keysPanel1.includes(key))
  );

  const infoPanel2 = Object.fromEntries(
    Object.entries(infoValue).filter(([key]) => keysPanel2.includes(key))
  );

  const infoPanel3 = Object.fromEntries(
    Object.entries(infoValue).filter(([key]) => keysPanel3.includes(key))
  );

  const infoPanel4 = Object.fromEntries(
    Object.entries(infoValue).filter(([key]) => keysPanel4.includes(key))
  );

  function infoTextDefault(nPanel) {
    let data = [];
    switch (nPanel) {
      case 1:
        data = keysPanel1;
        break;
      case 2:
        data = keysPanel2;
        break;
      case 3:
        data = keysPanel3;
        break;
      case 4:
        data = keysPanel4;
        break;
      default:
        data = [];
    }
    return data.map((key) => {
      return (
        <div
          key={key}
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 0.3rem 0 0.3rem",
            borderRadius: "5px",
            background:
              pathToSelect(selectionValue) === key ? colors.gray[800] : "",
          }}
        >
          <Link
            onClick={() => handleSelectionClick(key)}
            underline={availableSelections.includes(key) ? "hover" : "none"}
            sx={{
              cursor: availableSelections.includes(key) ? "pointer" : "text",
              ":hover": { color: colors.gray[600] },
            }}
          >
            <Typography
              variant={"body1"}
              color={colors.gray[100]}
              style={{ flex: 3, textAlign: "left" }}
            >
              {mapSSCCKeys.get(key)}:
            </Typography>
          </Link>
          <Typography
            variant={"body1"}
            color={colors.gray[100]}
            fontWeight={700}
            style={{ flex: 1, textAlign: "right" }}
          >
            {"-"}
          </Typography>
        </div>
      );
    });
  }

  function infoText(data) {
    return Object.entries(data).map(([key, value]) => (
      <div
        key={key}
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 0.3rem 0 0.3rem",
          borderRadius: "5px",
          background:
            pathToSelect(selectionValue) === key ? colors.gray[800] : "",
        }}
      >
        <Link
          onClick={() => handleSelectionClick(key)}
          underline={availableSelections.includes(key) ? "hover" : "none"}
          sx={{
            cursor: availableSelections.includes(key) ? "pointer" : "text",
            ":hover": { color: colors.gray[600] },
          }}
        >
          <Typography
            variant={"body1"}
            color={colors.gray[100]}
            style={{ flex: 3, textAlign: "left" }}
          >
            {mapSSCCKeys.get(key)}:{/* {key}: */}
          </Typography>
        </Link>
        <Typography
          variant={"body1"}
          color={colors.gray[100]}
          fontWeight={700}
          style={{ flex: 1, textAlign: "right" }}
        >
          {value !== null ? value : "-"}
          {porcSSCC.includes(key) && value !== null ? "%" : ""}
          {key === "renta media hogar" && value !== null ? "€" : ""}
          {key === "tamaño medio hogar (INE 20)" && value !== null
            ? " hab."
            : ""}
        </Typography>
      </div>
    ));
  }

  function globalTextDash() {
    return (
      <div style={{ display: "flex" }}>
        <Typography
          variant={"body1"}
          color={colors.gray[100]}
          fontWeight={700}
          style={{ flex: 1, textAlign: "center" }}
        >
          -
        </Typography>
      </div>
    );
  }

  function globalText(key) {
    // console.log("key", key);
    return (
      <div
        style={{
          display: "flex",
          background:
            pathToSelect(selectionValue) === key ? colors.gray[800] : "",
          borderRadius: "5px",
        }}
      >
        <Typography
          variant={"body1"}
          color={colors.gray[100]}
          fontWeight={700}
          style={{ flex: 1, textAlign: "center" }}
        >
          {globales[key]}
          {porcSSCC.includes(key) ? "%" : ""}
          {key === "renta media hogar" ? "€" : ""}
          {key === "tamaño medio hogar (INE 20)" ? " hab." : ""}
        </Typography>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <SubBar
        title={"Visor de Datos Urbanos – Escala Sección Censal "}
        crumbs={[
          ["Inicio", "/"],
          ["Visor", "/visor-sscc"],
        ]}
        info={{
          title: "Visor de Datos Urbanos – Escala Sección Censal ",
          description: (
            <Typography
              variant="h6"
              align="justify"
              sx={{ color: colors.gray[400] }}
            >
              <p>
                <strong>El visor de datos urbanos del proyecto EPIU</strong>{" "}
                nace con el objetivo de contextualizar espacialmente los datos
                sobre vulnerabilidad energ&eacute;tica del municipio de Getafe.{" "}
              </p>
              <p>
                Los resultados de los indicadores se han obtenido con los datos
                propios generados a trav&eacute;s del proyecto EPIU &ndash;
                Oficina de Hogares Saludables-, y mediante las fuentes oficiales
                m&aacute;s actualizadas -Catastro e INE 2020 y 2022-.&nbsp;
              </p>
              <p>
                La escala secci&oacute;n censal tiene la funci&oacute;n de
                aportar un <strong>enfoque estrat&eacute;gico</strong>, para
                beneficiar la toma de decisiones en las pol&iacute;ticas
                sociales del municipio en general, y en materia de
                vulnerabilidad energ&eacute;tica a escala secci&oacute;n
                censal.&nbsp;
              </p>
              <p>
                Actualmente cuenta con un{" "}
                <strong>Intervalo de Confianza</strong> de 5,9 % con 921
                expedientes registrados.&nbsp;
              </p>
            </Typography>
          ),
        }}
      />
      <Box m="10px">
        <Box
          display={"grid"}
          gridTemplateColumns={"repeat(12,1fr)"}
          //60 topbar + 40 subbar + 20 gaps + 10 extra
          gridAutoRows={`calc((100vh - 60px - 40px - 20px - 10px) / 14)`}
          gap={"10px"}
        >
          <Box
            gridColumn={"span 8"}
            gridRow={"span 12"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            flexDirection={"column"}
          >
            {Object.keys(geoSSCC).length > 0 ? ( // Check if geojson is not empty
              <Map mapRef={mapRef} geojson={geoSSCC} />
            ) : (
              <Typography variant="h5" color={colors.gray[100]}>
                Cargando...
              </Typography>
            )}
          </Box>
          <Box
            gridColumn={"span 3"}
            gridRow={"span 2"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
          >
            <Typography
              variant={"h7"}
              color={"#fff"}
              fontWeight={600}
              px={"0.3rem"}
              sx={{ background: colors.blueAccent[400], borderRadius: "5px" }}
            >
              Datos Catastrales
            </Typography>
            {infoValue && Object.keys(infoValue).length > 0
              ? infoText(infoPanel1)
              : infoTextDefault(1)}
          </Box>
          <Box
            gridColumn={"span 1"}
            gridRow={"span 2"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
          >
            <Typography
              variant={"h7"}
              color={"#fff"}
              fontWeight={600}
              sx={{
                textAlign: "center",
                background: colors.blueAccent[400],
                borderRadius: "5px",
              }}
            >
              Globales
            </Typography>
            {globalTextDash()}
            {globalTextDash()}
            {globalText("n viviendas")}
            {globalText("ano constru SSCC")}
          </Box>
          <Box
            id={"infoPanel2"}
            gridColumn={"span 3"}
            gridRow={"span 4"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
            overflow={"auto"}
          >
            <Typography
              variant={"h7"}
              color={"#fff"}
              fontWeight={600}
              px={"0.3rem"}
              sx={{ background: colors.blueAccent[400], borderRadius: "5px" }}
            >
              Datos EPIU: usuarios y servicios OHS
            </Typography>
            {infoValue && Object.keys(infoValue).length > 0
              ? infoText(infoPanel2)
              : infoTextDefault(2)}
          </Box>
          <Box
            id={"infoPanel2Global"}
            gridColumn={"span 1"}
            gridRow={"span 4"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
            overflow={"auto"}
          >
            <Typography
              variant={"h7"}
              color={colors.gray[900]}
              fontWeight={600}
              sx={{ textAlign: "center" }}
            >
              -
            </Typography>
            {globalText("n exptes SSCC")}
            {globalText("porc motivo TRAMITACION_AYUDAS_A_REHABILITACION")}
            {globalText("porc motivo INFORMACION_GENERAL")}
            {globalText("porc motivo TRAMITACION_BONO_SOCIAL")}
            {globalText("porc motivo OPTIMIZACION_FACTURA barrio")}
            {globalText("porc A través de una persona conocida")}
            {globalText("porc Comunicaciones del Ayuntamiento")}
            {globalText("porc Otros departamentos (SAV y otros)")}
            {globalText("porc SS.SS")}
            {globalText("porc Asociaciones y ONG's")}
            {globalText("Intervalo de confianza (%)")}
          </Box>
          <Box
            id={"infoPanel3"}
            gridColumn={"span 3"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
            overflow={"auto"}
          >
            <Typography
              variant={"h7"}
              color={"#fff"}
              fontWeight={600}
              px={"0.3rem"}
              sx={{ background: colors.blueAccent[400], borderRadius: "5px" }}
            >
              Características socioeconómicas
            </Typography>
            {infoValue && Object.keys(infoValue).length > 0
              ? infoText(infoPanel3)
              : infoTextDefault(3)}
          </Box>
          <Box
            id={"infoPanel3Global"}
            gridColumn={"span 1"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
            overflow={"auto"}
          >
            <Typography
              variant={"h7"}
              color={colors.gray[900]}
              fontWeight={600}
              sx={{ textAlign: "center" }}
            >
              -
            </Typography>
            {globalText("pob total (INE 22)")}
            {globalText("porc pob menor de 14 años (INE 22)")}
            {globalText("porc pob de 65 y más años (INE 22)")}
            {globalText("Edad media pob (INE 20)")}
            {globalText("Índice de dependencia infantil (%)")}
            {globalText("Índice de dependencia de mayores (%)")}
            {globalText("Índice de dependencia total (%)")}
            {globalText("Educación primaria e inferior")}
          </Box>
          <Box
            id={"infoPanel4"}
            gridColumn={"span 3"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
            overflow={"auto"}
          >
            <Typography
              variant={"h7"}
              color={"#fff"}
              fontWeight={600}
              px={"0.3rem"}
              sx={{ background: colors.blueAccent[400], borderRadius: "5px" }}
            >
              Características de los hogares
            </Typography>
            {infoValue && Object.keys(infoValue).length > 0
              ? infoText(infoPanel4)
              : infoTextDefault(4)}
          </Box>
          <Box
            id={"infoPanel4Global"}
            gridColumn={"span 1"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"stretch"}
            justifyContent={"space-evenly"}
            py={"5px"}
            px={"1rem"}
            flexDirection={"column"}
            overflow={"auto"}
          >
            <Typography
              variant={"h7"}
              color={colors.gray[900]}
              fontWeight={600}
              sx={{ textAlign: "center" }}
            >
              -
            </Typography>
            {globalText("renta media hogar")}
            {globalText("porc disconfort inv")}
            {globalText("porc disconfort ver")}
            {globalText("porc retraso pago facturas")}
            {globalText("tamaño medio hogar (INE 20)")}
            {globalText("porc hogares unipersonales (INE 20)")}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

export default Visor;
