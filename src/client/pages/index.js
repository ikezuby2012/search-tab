import { useCallback, useState } from "react";
import Body from "../components/body";
import Header from "../components/header";

const Index = () => {
   const [seaValue, setSeaValue] = useState("");

   const getValue = useCallback(
      (data) => {
         console.log(data);
         setSeaValue(data);
      },
      [seaValue]
   );

   return (
      <section className="container">
         <Header parentCallback={getValue} />
         <Body queryValue={seaValue} />
      </section>
   );
};

export default Index;
