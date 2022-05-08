<template>
  <div id="app">
    <header>
      <h1>{{ constants.metaData.heading }}</h1>
    </header>
    <div class="container">
      <router-view />
    </div>
    <footer>
      {{ constants.metaData.footer }}
    </footer>
  </div>
</template>

<script>
import { constants } from "./lib/constants";
export default {
  name: "App",
  data: () => {
    return {
      constants
    }
  }
}
</script>

<style lang="scss">
  // This will act as a global css as there is no scoped mention
  @import url('https://fonts.googleapis.com/css?family=Acme');
  @import url('https://use.fontawesome.com/releases/v5.8.2/css/all.css');
  body {
    margin: 0;
    padding: 0;
    font-family: 'Acme', arial;
  }
  .container {
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 10px;
    width: calc(100% - 20px);
    min-height: calc(100vh - 19vh);
    background: #E5E7E9;
    font-family: 'Acme', arial;
    font-size: 1rem;
    font-weight: normal;
  }
  header {
    background: radial-gradient(#1B4F72, #2980B9);
    h1 {
      color: #ffffff;
      margin: 0;
      padding: 15px 0;
      display: flex;
      justify-content: center;
    }
  }
  footer {
    background: #17202A;
    color: #ffffff;
    display: flex;
    justify-content: center;
    padding: 15px 0;
  }
  .capitalize {
    text-transform: capitalize;
  }
</style>
