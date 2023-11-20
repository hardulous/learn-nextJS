import React from 'react'
import S2 from "@/styles/Style2.module.css"
import Sc2 from "@/styles/style2.module.scss"

const Style2 = () => {
  return (
    <div>
      <h2 className={S2.highlight}>Style2</h2>
      <h3 className={Sc2.highlight}>Style2 with scss</h3>
    </div>
  )
}

export default Style2
