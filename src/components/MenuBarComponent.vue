<template>
    <v-app-bar app dark elevation="2" class="navbar">
      <router-link to="/home" class="link">
        <v-toolbar-title class="logo">FS</v-toolbar-title>
      </router-link>
      <v-divider vertical class="mx-4"></v-divider>
      <v-spacer></v-spacer>
      <v-btn plain color="orange" to="/unidades">Unidades</v-btn>
      <v-btn plain color="orange" to="/empresas">Empresas</v-btn>
      <v-btn plain color="orange" class="pr-0" to="/leiloes">Leilões</v-btn>
    </v-app-bar>
  </template>
  
  <style>
  .logo {
    color: white;;
    font-weight: bold;
    padding-right: 16px;
    font-size: 1.5rem;
  }

  .link {
  text-decoration: none;
  }
  
  .navbar {
    padding-right: 2rem;
    padding-left: 2rem;
  }
  </style>