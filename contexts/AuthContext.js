import React, { createContext, useState, useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import pb from "../services/pocketbase";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verificarSessao();
  }, []);

  async function verificarSessao() {
    try {
      const token = await SecureStore.getItemAsync("token");
      const userStorage = await SecureStore.getItemAsync("user");

      if (!token || !userStorage) {
        setLoading(false);
        return;
      }

      const biometria = await LocalAuthentication.authenticateAsync({
        promptMessage: "Entrar com biometria",
      });

      if (!biometria.success) {
        setLoading(false);
        return;
      }

      pb.authStore.save(token, JSON.parse(userStorage));
      await pb.collection("users").authRefresh();
      await SecureStore.setItemAsync("token", pb.authStore.token);
      setUser(JSON.parse(userStorage));
    } catch (error) {
      console.log(error);
      pb.authStore.clear();
      await SecureStore.deleteItemAsync("token");
      await SecureStore.deleteItemAsync("user");
    } finally {
      setLoading(false);
    }
  }

  async function login(email, senha) {
    const authData = await pb.collection("users").authWithPassword(email, senha);
    await SecureStore.setItemAsync("token", pb.authStore.token);
    await SecureStore.setItemAsync("user", JSON.stringify(authData.record));
    setUser(authData.record);
  }

  async function loginBiometrico() {
    const biometria = await LocalAuthentication.authenticateAsync({
      promptMessage: "Entrar com biometria",
    });

    if (!biometria.success) {
      throw new Error("Biometria inválida");
    }

    const token = await SecureStore.getItemAsync("token");
    const userStorage = await SecureStore.getItemAsync("user");

    if (!token || !userStorage) {
      throw new Error("Nenhuma sessão salva");
    }

    pb.authStore.save(token, JSON.parse(userStorage));
    await pb.collection("users").authRefresh();
    await SecureStore.setItemAsync("token", pb.authStore.token);
    setUser(JSON.parse(userStorage));
  }

  async function logout() {
    pb.authStore.clear();
    await SecureStore.deleteItemAsync("token");
    await SecureStore.deleteItemAsync("user");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        loading,
        login,
        loginBiometrico,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}