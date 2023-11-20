import React from "react";
import styled from "styled-components";

// Creating a styled component Title which is an h2 tag with some css inside it 
const Title = styled.h2`
   font-size: 50px;
   color: ${({theme})=> theme.colors.primary}
`

const CssInJs = () => {
  return (
    <div>

      <span
        style={{
          display: "inline-block",
          fontSize: "2rem",
          color: "orange",
        }}
      >
        CssInJs Inline Css
      </span>

      <Title>CssInJs Style Component</Title>

    </div>
  );
};

export default CssInJs;


// Here advantage of styled componetns is again local css scoping the style written for style component again generate unique rule name that will not effect css of others file. 