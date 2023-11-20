import React from "react";
import S1 from "@/styles/Style1.module.css";
import Sc1 from "@/styles/style1.module.scss"

const Style1 = () => {
  return (
    <div>
      <h2 className={S1.highlight}>Style1</h2>
      <h3 className={Sc1.highlight}>Style1 with scss</h3>
    </div>
  );
};

export default Style1;

// Here style1.js and style2.js both using same class name highlight but still each of them have different style because css modules are component level style so css module of one file will not effect others css. Other advantage is that css module does not even collide with GLOBAL STYLE applied in _app.js