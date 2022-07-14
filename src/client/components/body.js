import { useState, useEffect } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import moment from "moment";
import _ from "lodash";
import "react-loading-skeleton/dist/skeleton.css";
import BodyCard from "./body-card";
import Loading from "./loading";

const get_Users = gql`
   query users {
      allUsers {
         id
         name
         active
         email
         role
         photo
         date
      }
   }
`;
const get_user_by_name = gql`
   query getUserByName($filter: String!) {
      allUsers(filter: { name: $filter }) {
         id
         name
         email
         role
         active
         photo
         date
      }
   }
`;

const get_user_by_email = gql`
   query getUserByEmail($filter: String!) {
      allUsers(filter: { email: $filter }) {
         id
         name
         email
         role
         active
         photo
         date
      }
   }
`;

const get_user_by_role = gql`
   query getUserByRole($filter: String!) {
      allUsers(filter: { role: $filter }) {
         id
         name
         email
         role
         active
         photo
         date
      }
   }
`;

const Body = ({ queryValue }) => {
   const [dataArr, setDataArr] = useState([]);
   const [searchQuery, setSearchQuery] = useState("");
   // setSearchQuery(get_Users);
   let renderItem;

   const groupByDate = (arr) => {
      const monthName = (arr) =>
         moment(arr.date, "YYYY-MM-DD").format("YYYY-MMM");
      const result = _.groupBy(arr, monthName);
      // console.log(result);
      setDataArr(result);
      Object.entries(result).map(([key, value]) => {
         console.log("key is" + key);
         // value.map((el) => console.log("el is" + el.role));
         console.log("value is " + value[0].name);
      });
   };

   const [getUserByName, { loading: loading1, error: error1, data: data1 }] =
      useLazyQuery(get_user_by_name, {
         onCompleted: (data) => {
            if (data) {
               groupByDate(data.allUsers);
            }
         }
      });

   const [getUser, { loading: loading2, data: data2, error: error2 }] =
      useLazyQuery(get_Users, {
         onCompleted: (data) => {
            if (data) {
               groupByDate(data.allUsers);
            }
         }
      });

   const [getUserByEmail, { loading: loading3, data: data3, error: error3 }] =
      useLazyQuery(get_user_by_email, {
         onCompleted: (data) => {
            if (data) {
               groupByDate(data.allUsers);
            }
         }
      });
   const [getUserByRole, { loading, data, error }] = useLazyQuery(
      get_user_by_role,
      {
         onCompleted: (data) => {
            if (data) {
               groupByDate(data.allUsers);
            }
         }
      }
   );
   useEffect(() => {
      if (queryValue.length > 2) setSearchQuery(queryValue);
   }, [renderItem, queryValue]);

   const onEmailHandler = () => {
      getUserByEmail({
         variables: { filter: searchQuery }
      });
   };

   const onNameHandler = () => {
      getUserByName({
         variables: { filter: searchQuery }
      });
   };

   const onRoleHandler = () => {
      getUserByRole({
         variables: { filter: searchQuery }
      });
   };

   return (
      <main className="body">
         <nav className="body-buttons">
            <button
               className="body-btn"
               onClick={() => {
                  getUser();
               }}
            >
               all
            </button>
            <button className="body-btn" onClick={onNameHandler}>
               name
            </button>
            <button className="body-btn" onClick={onEmailHandler}>
               email
            </button>
            <button className="body-btn" onClick={onRoleHandler}>
               role
            </button>
         </nav>
         <div className="body-searchTab">
            <ul className="body-list">
               {(loading || loading1 || loading2 || loading3) && <Loading />}
               {(error || error1 || error2 || error3) && <h2>not found</h2>}
               {dataArr &&
                  Object.entries(dataArr).map(([key, value]) =>
                     value.map((el, i) => (
                        <BodyCard
                           date={key}
                           i={i}
                           photo={el.photo}
                           name={el.name}
                           email={el.email}
                           active={el.active}
                        />
                     ))
                  )}
            </ul>
         </div>
      </main>
   );
};

export default Body;
