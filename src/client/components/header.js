import { useState } from "react";

import { Search } from "@material-ui/icons";

const Header = ({ parentCallback }) => {
   const [searchValue, setSearchValue] = useState("");

   const onSubmit = (e) => {
      e.preventDefault();
      parentCallback(searchValue);
   };

   return (
      <header className="header">
         <h2 className="headerLogo">q-node</h2>
         <form onSubmit={(e) => onSubmit(e)} className="header-form">
            <button className={"header-form_button"}>
               <Search className={"header-form_icon"} />
            </button>
            <input
               type="search"
               className={"header-form_input"}
               placeholder={`search for users`}
               onChange={(e) => {
                  setSearchValue(e.target.value);
                  parentCallback(e.target.value);
               }}
            />
         </form>
         <div>&nbsp;</div>
      </header>
   );
};

export default Header;
