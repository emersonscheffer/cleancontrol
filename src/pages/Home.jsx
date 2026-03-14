import React from "react";
import SideMenu from "../components/SideMenu";

function Home() {
  return (
    <div>
      <SideMenu
        onAddHouse={() => console.log("Add House")}
        onAddCleaner={() => console.log("Add Cleaner")}
      />
      
    </div>
  );
}

export default Home;
