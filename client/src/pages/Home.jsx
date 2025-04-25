import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Pm25Dashboard from "../components/pmcencer/PmData";
import Pm25DashboardFull from "@/components/pmcencer/Pm25DashbordFull";

const Home = () => {
  return (
    <section>
      <h1>Home</h1>
      <div className="grid  sm:grid-cols-2 xs:grid-cols-1 ">
        <Pm25Dashboard />
        <Pm25DashboardFull/>
      </div>
    </section>
  );
};

export default Home;
