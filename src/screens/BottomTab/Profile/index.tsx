import { ButtonPrimary } from "@components/Button";
import { useAuth } from "@context/authContext";
import MainLayout from "@layout/MainLayout";
import React from "react";

function ProfileScreen() {
  const { logout } = useAuth();
  return (
    <MainLayout>
      <ButtonPrimary onPress={logout} title={"Logout"} />
    </MainLayout>
  );
}

export default ProfileScreen;
