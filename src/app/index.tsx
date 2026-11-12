import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function App() {
  const [segundos, setSegundos] = useState(90); // 1 minuto y medio
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    let intervalo = null;
    if (activo && segundos > 0) {
      intervalo = setInterval(() => {
        setSegundos((seg) => seg - 1);
      }, 1000);
    } else if (segundos === 0) {
      setActivo(false);
    }
    return () => clearInterval(intervalo);
  }, [activo, segundos]);

  const toggleTimer = () => setActivo(!activo);

  const resetTimer = () => {
    setActivo(false);
    setSegundos(90);
  };

  const formatoTiempo = () => {
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${min < 10 ? "0" : ""}${min}:${seg < 10 ? "0" : ""}${seg}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatoTiempo()}</Text>

      <View style={styles.botones}>
        <TouchableOpacity style={styles.boton} onPress={toggleTimer}>
          <Text style={styles.textoBoton}>{activo ? "Pausar" : "Iniciar"}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.boton, styles.botonReset]}
          onPress={resetTimer}
        >
          <Text style={styles.textoBoton}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212", // Fondo oscuro Uchiha
    alignItems: "center",
    justifyContent: "center",
  },
  timerText: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 40,
  },
  botones: {
    flexDirection: "row",
    gap: 20,
  },
  boton: {
    backgroundColor: "#ff4757",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  botonReset: {
    backgroundColor: "#2f3542",
  },
  textoBoton: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
