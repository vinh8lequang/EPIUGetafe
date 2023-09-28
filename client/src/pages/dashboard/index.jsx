import React, { useState, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import SubBar from "../global/SubBar";
import BarChartDash1 from "../../components/BarChartDash1";
import BarChartDash2 from "../../components/BarChartDash2";
import BarChartDash3 from "../../components/BarChartDash3";
import BarChartDash4 from "../../components/BarChartDash4";
import LineChart from "../../components/LineChartDash";
import axios from "axios";
import { motion } from "framer-motion";
import FamilyRestroomIcon from "@mui/icons-material/FamilyRestroom";
import AdfScannerIcon from "@mui/icons-material/AdfScanner";
import CallIcon from "@mui/icons-material/Call";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

const baseURL = "http://82.223.243.108/api/dashboard";
// const storageKey = "dashboardData"; // Key for storing/retrieving data from localStorage

function Dashboard() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [globalData, setGlobalData] = useState([]);
  const [barData1, setBarData1] = useState([]);
  const [barHeaders1, setHeadersData1] = useState([]);
  const [barData2, setBarData2] = useState([]);
  const [barData3, setBarData3] = useState([]);
  const [barData4, setBarData4] = useState([]);
  const [lineData1, setLineData1] = useState([]);
  const [lineMarkers1, setLineMarkers1] = useState([]);

  useEffect(() => {
    // const storedData = sessionStorage.getItem(storageKey);
    // if (storedData) {
    //   const parsedData = JSON.parse(storedData);
    //   setSunburstData(parsedData[0]);
    // } else {
    axios.get(baseURL).then((res) => {
      const data = res.data;
      setGlobalData(data.globalData);
      setBarData1(data.barChart1[0]);
      setHeadersData1(data.barChart1[1]);
      setBarData2(data.barChart2);
      setBarData3(data.barChart3);
      setBarData4(data.barChart4);
      setLineData1(data.lineChart1[0]);
      setLineMarkers1(data.lineChart1[1]);
      console.log("Project Coordinator: Asier Eguilaz Oyaga");
      console.log("asier.eguilaz@gmail.es");
      console.log("Urban Planner: Samanta Arnal Martín");
      console.log("samantaarnal@gmail.com");
      console.log("Full Stack Developer: Vinh Le Quang");
      console.log("vinh8lequang@gmail.com");
      console.log("-------------------------------------------");
      // sessionStorage.setItem(storageKey, JSON.stringify(data));
    });
    // }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <SubBar
        title={"Principales estadísticas del servicio de la OHS"}
        crumbs={[["Inicio", "/"]]}
        info={{
          title: "Inicio",
          description: "",
        }}
      />
      <Box m="10px">
        <Box
          display={"grid"}
          gridTemplateColumns={"repeat(12,1fr)"}
          //60 topbar + 40 subbar + 20 gaps + 10 extra
          gridAutoRows={`calc((100vh - 60px - 40px - 20px - 10px) / 6.5)`}
          gap={"10px"}
        >
          <Box
            gridColumn={"span 2"}
            gridRow={"span 2"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            // alignItems={"center"}
            justifyContent={"space-evenly"}
            padding={"10px 5px 10px 20px"}
            flexDirection={"column"}
          >
            {globalData.length > 0 ? (
              <>
                <Typography
                  variant={"h5"}
                  color={colors.gray[100]}
                  // textAlign={"center"}
                >
                  <FamilyRestroomIcon fontSize={"medium"} sx={{ mr: "15px" }} />
                  <strong>{globalData[0][1]}</strong> usuarios de la OHS
                </Typography>
                <Typography
                  variant={"h5"}
                  color={colors.gray[100]}
                  // textAlign={"start"}
                >
                  <AdfScannerIcon fontSize={"medium"} sx={{ mr: "15px" }} />
                  {globalData[1][0]}: <strong>{globalData[1][1]}</strong>
                </Typography>
                <Typography
                  variant={"h5"}
                  color={colors.gray[100]}
                  // textAlign={"start"}
                >
                  <CallIcon fontSize={"medium"} sx={{ mr: "15px" }} />
                  {globalData[2][0]}: <strong>{globalData[2][1]}</strong>
                </Typography>
                <Typography
                  variant={"h5"}
                  color={colors.gray[100]}
                  // textAlign={"start"}
                >
                  <AlternateEmailIcon fontSize={"medium"} sx={{ mr: "15px" }} />
                  {globalData[3][0]}: <strong>{globalData[3][1]}</strong>
                </Typography>
              </>
            ) : (
              <Typography variant={"h5"} color={colors.gray[100]}>
                Loading...
              </Typography>
            )}
          </Box>
          <Box
            gridColumn={"span 3"}
            gridRow={"span 2"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"10px 5px 10px 5px"}
            flexDirection={"column"}
          >
            <Typography variant={"h5"} color={colors.gray[100]}>
              Motivo de la visita
            </Typography>
            <BarChartDash2 data={barData2} />
          </Box>
          <Box
            gridColumn={"span 3"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"10px 5px 10px 5px"}
            flexDirection={"column"}
          >
            <Typography variant={"h5"} color={colors.gray[100]}>
              Origen de usuarios
            </Typography>
            <BarChartDash3 data={barData3} />
          </Box>
          <Box
            gridColumn={"span 4"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"10px 5px 10px 5px"}
            flexDirection={"column"}
          >
            <Typography variant={"h5"} color={colors.gray[100]}>
              Reparto por barrios
            </Typography>
            <BarChartDash4 data={barData4} />
          </Box>
          <Box
            gridColumn={"span 5"}
            gridRow={"span 4"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"10px 5px 10px 5px"}
            flexDirection={"column"}
          >
            <Typography variant={"h5"} color={colors.gray[100]}>
              Número de usuarios diarios
            </Typography>
            <BarChartDash1 data={barData1} headers={barHeaders1} />
          </Box>
          <Box
            gridColumn={"span 7"}
            gridRow={"span 3"}
            backgroundColor={colors.gray[900]}
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            padding={"10px 5px 10px 5px"}
            flexDirection={"column"}
          >
            <Typography variant={"h6"} color={colors.gray[100]}>
              Evolución del Número de Usuarios por mes y las Derivaciones de
              Servicios Sociales
            </Typography>
            <LineChart data={lineData1} markers={lineMarkers1} />
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
}

export default Dashboard;
