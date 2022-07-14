import { useState } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BodyCard = ({
   date,
   i,
   photo,
   loading,
   email,
   active,
   name,
   created
}) => {
   return (
      <li key={i} className="body-listItem">
         <div className="body-date">{date}</div>
         <aside className="body-aside">
            <figure>
               {loading && (
                  <Skeleton
                     circle
                     height={"100%"}
                     containerClassName="avatar-circle"
                  />
               )}
               <img
                  src={require(`../utils/images/${photo}`)}
                  alt="person"
                  className="body-img"
               />
            </figure>
            <div>
               {loading && <Skeleton count={4} width={70} />}
               <div className="body-details">
                  <span>{name}</span>
                  <span>{email}</span>
                  <span></span>
               </div>

               <div className="">
                  {/* /<span>active: {active}</span> */}
               </div>

               {/* <span>date created: {created}</span> */}
            </div>
         </aside>
      </li>
   );
};

export default BodyCard;
