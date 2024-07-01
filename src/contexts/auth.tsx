import { api } from "@/services/api";
import { User } from "@/types/user";
import React, { PropsWithChildren, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { router } from "expo-router";

type AuthContextData = {
  isAuth: boolean;
  user: User | undefined;

  signIn: (data: { cpf: string; birthday: string }) => Promise<User | string>;
  signOut: () => Promise<void>;
};

const AuthContext = React.createContext({} as AuthContextData);

export function useSession() {
  const value = React.useContext(AuthContext);

  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider(props: PropsWithChildren) {
  const [user, setUser] = useState<User | undefined>();
  const isAuth = !!user;

  useEffect(() => {
    async function getUser() {
      const userInfo = await AsyncStorage.getItem("@cmm");
      const hasUser = JSON.parse(userInfo || "{}") as {
        user: User;
        token: string;
      };

      if (hasUser.token) {
        api.defaults.headers.common["Authorization"] =
          `Bearer ${hasUser.token}`;

        setUser(hasUser.user);
        router.replace("/");
      }
    }

    getUser();
  }, []);

  async function signIn({ cpf, birthday }: { cpf: string; birthday: string }) {
    try {
      const response = await api.post("/auth/customer", {
        cpfOrCnpj: cpf,
        password: birthday,
      });

      const { token, customer, dependent } = response.data.data;

      let user: User;
      if (dependent) {
        user = {
          uuid: dependent.uuid,
          name: dependent.name,
          cpfOrCnpj: dependent.cpf,
          holderUuid: customer.uuid,
          plan: customer.planName,
          subscriptionUuid: customer.subscriptionUuid,
          subscriptionActive: customer.subscriptionActive,
          isExternalSubscription: customer.isExternalSubscription,
        };
        setUser(user);
      } else {
        user = {
          uuid: customer.uuid,
          name: customer.name,
          cpfOrCnpj: customer.cpfOrCnpj,
          holderUuid: customer.uuid,
          plan: customer.planName,
          subscriptionUuid: customer.subscriptionUuid,
          subscriptionActive: customer.subscriptionActive,
          isExternalSubscription: customer.isExternalSubscription,
        };
        setUser(user);
      }

      await AsyncStorage.setItem("@cmm", JSON.stringify({ user, token }));

      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return user;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data.message;
      }
      return "Opss, algo deu errado! Tente novamente!";
    }
  }

  async function signOut() {
    await AsyncStorage.removeItem("@cmm");
    setUser(undefined);
    router.replace("/login");
  }

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        user,
        signIn,
        signOut,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
