
import Pm25Dashboard from "../components/pmcencer/PmData";
import Pm25DashboardFull from "@/components/pmcencer/Pm25DashbordFull";

const Home = () => {
  return (
    <section>
      <h1>Home</h1>
      <div className="grid  sm:grid-cols-1 xs:grid-cols-2 ">
        <Pm25Dashboard />
        <Pm25DashboardFull/>
      </div>
    </section>
  );
};

export default Home;
