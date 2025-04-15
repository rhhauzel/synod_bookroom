import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Home',
};

const delay = (ms:number) => new Promise((resolve) => setTimeout(resolve, ms));

const Home = async () => {
  await delay(1000);
  return (
    <div>
      Home
      
    </div>
  )
}

export default Home