import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Loading = () => {
   return (
      <div className="avatar-aside">
         <Skeleton circle height={"100%"} containerClassName="avatar-img" />
         <div className="">
            <Skeleton count={4} width={300} height={20} />
         </div>
      </div>
   );
};

export default Loading;
