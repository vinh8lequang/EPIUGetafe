import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { Box, Typography, useTheme, Link } from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";
import { motion } from "framer-motion";
import SubBar from "../global/SubBar";
import Map from "../../components/MapEPIU";
import { useMapEPIUContext } from "../../components/MapEPIUProvider";
import { mapEPIUKeys, readableValueEPIU } from "../../utils/auxUtils";
import {
  Selections as Selections,
  pathToSelect,
} from "../../constants/MapConstantsEPIU";

const keysPanel1 = [
  "reference",
  "currentUse",
  "numberOfDw",
  "ano_constr",
  "Building_Getafe_Barrio",
];

const keysPanel2 = [
  "Building_Getafe_n exptes",
  "Building_Getafe_porc viv OHS",
  "Building_Getafe_Medidas recibidas: Kit de eficiencia energética Cruz Roja",
  "Building_Getafe_Medidas recibidas: Medidas de rehabilitación en vivienda",
  "Building_Getafe_Medidas recibidas: Medidas de rehabilitación en edificio",
];

const keysPanel3 = [
  "Building_Getafe_porc retraso pago facturas",
  "Building_Getafe_porc alquiler",
  "Building_Getafe_porc prop sin hipoteca",
  "Building_Getafe_porc prop con hipoteca",
  "Building_Getafe_disconfort inv",
  "Building_Getafe_disconfort ver",
];

const keysPanel4 = [
  "Building_Getafe_porc patologias exptes",
  "Building_Getafe_porc no calefaccion",
  "Building_Getafe_cert emision CO2",
  "Building_Getafe_cert consumo e primaria",
  "Building_Getafe_prod fotovol",
  "Building_Getafe_irradiacion anual kwh/m2",
];

const porcEPIU = [
  "Building_Getafe_porc viv OHS",
  "Building_Getafe_porc retraso pago facturas",
  "Building_Getafe_disconfort inv",
  "Building_Getafe_disconfort ver",
  "Building_Getafe_porc alquiler",
  "Building_Getafe_porc prop sin hipoteca",
  "Building_Getafe_porc prop con hipoteca",
  "Building_Getafe_porc no calefaccion",
  "Building_Getafe_porc patologias exptes",
];

const availableSelections = [
  "numberOfDw",
  "Building_Getafe_n exptes",
  "ano_constr",
  "Building_Getafe_cert emision CO2",
  "Building_Getafe_cert consumo e primaria",
  "Building_Getafe_porc viv OHS",
  "Building_Getafe_porc retraso pago facturas",
  "Building_Getafe_disconfort inv",
  "Building_Getafe_disconfort ver",
  "Building_Getafe_porc alquiler",
  "Building_Getafe_porc prop sin hipoteca",
  "Building_Getafe_porc prop con hipoteca",
  "Building_Getafe_porc no calefaccion",
  "Building_Getafe_porc patologias exptes",
  "Building_Getafe_prod fotovol",
  "Building_Getafe_irradiacion anual kwh/m2",
  "Building_Getafe_Medidas recibidas: Kit de eficiencia energética Cruz Roja",
  "Building_Getafe_Medidas recibidas: Medidas de rehabilitación en vivienda",
  "Building_Getafe_Medidas recibidas: Medidas de rehabilitación en edificio",
];

const baseURL = "http://82.223.243.108/api/visor-epiu";
// const storageKey = "visorData"; // Key for storing/retrieving data from localStorage

function VisorEPIU() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [geoEPIU, setEPIU] = useState({});
  const [geoEPIULimites, setEPIULimites] = useState({});
  const [globales, setGlobales] = useState({});
  const mapRef = useRef();
  const { infoValue, selectionValue, updateSelection } = useMapEPIUContext();

  useLayoutEffect(() => {
    axios.get(baseURL).then((res) => {
      const data1 = res.data.geoEPIU;
      const data2 = res.data.globalesEPIU;
      const data3 = res.data.geoEPIULimites;
      setEPIU(data1);
      setGlobales(data2);
      setEPIULimites(data3);
      console.log("Project Coordinator: Asier Eguilaz Oyaga");
      console.log("asier.eguilaz@gmail.es");
      console.log("Urban Planner: Samanta Arnal Martín");
      console.log("samantaarnal@gmail.com");
      console.log("Full Stack Developer: Vinh Le Quang");
      console.log("vinh8lequang@gmail.com");
      console.log("-------------------------------------------");
    });
  }, []);

  // useEffect(() => {
  // console.log("infoValue", infoValue);
  // console.log("globales", globales);
  // console.log("map", mapEPIUKeys.get("reference"));
  // }, [infoValue, globales]);

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
              variant={"h7"}
              color={colors.gray[100]}
              style={{ flex: 1, textAlign: "left" }}
            >
              {mapEPIUKeys.get(key)}:
            </Typography>
          </Link>
          <Typography
            variant={"h7"}
            color={colors.gray[100]}
            fontWeight={700}
            style={{ flex: 1, textAlign: "right" }}
          >
            -
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
            variant={"h7"}
            color={colors.gray[100]}
            style={{ flex: 3, textAlign: "left" }}
          >
            {mapEPIUKeys.get(key)}:
          </Typography>
        </Link>
        <Typography
          variant={"h7"}
          color={colors.gray[100]}
          fontWeight={700}
          style={{ flex: 2, textAlign: "right" }}
        >
          {value !== null ? readableValueEPIU(key, value) : "-"}
          {porcEPIU.includes(key) && value !== null ? "%" : ""}
        </Typography>
      </div>
    ));
  }

  function globalTextDash() {
    return (
      <div style={{ display: "flex" }}>
        <Typography
          variant={"h7"}
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
          variant={"h7"}
          color={colors.gray[100]}
          fontWeight={700}
          style={{ flex: 1, textAlign: "center" }}
        >
          {globales[key]}
          {porcEPIU.includes(key) ? "%" : ""}
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
        title={"Visor de Datos Urbanos – Escala Ámbito EPIU "}
        crumbs={[
          ["Inicio", "/"],
          ["Visor EPIU", "/visor-epiu"],
        ]}
        info={{
          title: "Visor de Datos Urbanos – Escala Ámbito EPIU ",
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
                La escala catastral tiene la funci&oacute;n de aportar un{" "}
                <strong>enfoque operativo</strong>, para representar
                cartogr&aacute;ficamente las caracter&iacute;sticas
                socioecon&oacute;micas y habitacionales de las personas usuarias
                de la Oficina de Hogares Saludables, y la distribuci&oacute;n de
                las personas beneficiarias de servicios y rehabilitaciones a
                trav&eacute;s del proyecto EPIU.{" "}
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
          gridAutoRows={`calc((100vh - 60px - 40px - 20px - 10px) / 8.8)`}
          gap={"10px"}
        >
          <Box
            gridColumn={"span 8"}
            gridRow={"span 8"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"space-evenly"}
            flexDirection={"column"}
          >
            {Object.keys(geoEPIU).length > 0 ? ( // Check if geojson is not empty
              <Map
                mapRef={mapRef}
                geojson={geoEPIU}
                geojsonLimites={geoEPIULimites}
              />
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
              variant={"h6"}
              color={"#fff"}
              fontWeight={600}
              px={"0.3rem"}
              sx={{ background: colors.blueAccent[400], borderRadius: "5px" }}
            >
              Datos catastrales
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
              variant={"h6"}
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
            {globalText("numberOfDw")}
            {globalText("ano_constr")}
            {globalTextDash()}
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
              variant={"h6"}
              color={"#fff"}
              fontWeight={600}
              px={"0.3rem"}
              sx={{ background: colors.blueAccent[400], borderRadius: "5px" }}
            >
              Datos EPIU
            </Typography>
            {infoValue && Object.keys(infoValue).length > 0
              ? infoText(infoPanel2)
              : infoTextDefault(2)}
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
              variant={"h6"}
              color={colors.gray[900]}
              fontWeight={600}
              sx={{ textAlign: "center" }}
            >
              -
            </Typography>
            {globalText("Building_Getafe_n exptes")}
            {globalText("Building_Getafe_porc viv OHS")}
            {globalTextDash()}
            {globalTextDash()}
            {globalTextDash()}
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
              variant={"h6"}
              color={"#fff"}
              fontWeight={600}
              px={"0.3rem"}
              sx={{ background: colors.blueAccent[400], borderRadius: "5px" }}
            >
              Características de población
            </Typography>
            {infoValue && Object.keys(infoValue).length > 0
              ? infoText(infoPanel3)
              : infoTextDefault(3)}
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
              variant={"h6"}
              color={colors.gray[900]}
              fontWeight={600}
              sx={{ textAlign: "center" }}
            >
              -
            </Typography>
            {globalText("Building_Getafe_porc retraso pago facturas")}
            {globalText("Building_Getafe_porc alquiler")}
            {globalText("Building_Getafe_porc prop sin hipoteca")}
            {globalText("Building_Getafe_porc prop con hipoteca")}
            {globalText("Building_Getafe_disconfort inv")}
            {globalText("Building_Getafe_disconfort ver")}
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
              variant={"h6"}
              color={"#fff"}
              fontWeight={600}
              px={"0.3rem"}
              sx={{ background: colors.blueAccent[400], borderRadius: "5px" }}
            >
              Características de la vivienda
            </Typography>
            {infoValue && Object.keys(infoValue).length > 0
              ? infoText(infoPanel4)
              : infoTextDefault(4)}
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
              variant={"h6"}
              color={colors.gray[900]}
              fontWeight={600}
              sx={{ textAlign: "center" }}
            >
              -
            </Typography>
            {globalText("Building_Getafe_porc patologias exptes")}
            {globalText("Building_Getafe_porc no calefaccion")}
            {globalText("Building_Getafe_cert emision CO2")}
            {globalText("Building_Getafe_cert consumo e primaria")}
            {globalText("Building_Getafe_prod fotovol")}
            {globalText("Building_Getafe_irradiacion anual kwh/m2")}
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

export default VisorEPIU;
