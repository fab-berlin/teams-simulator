import Header from "@/components/Header/Header";
import {Suspense} from "react";
import {DataProvider} from "@/contexts/data-context";
import TeamsNewsList from "@/components/TeamsNewsList/TeamsNewsList";


export default function Home() {

  return (
    <div className="container mx-auto px-4">
      <Suspense fallback={<div>Loading...</div>}>

        <DataProvider>
          <Header/>
          <TeamsNewsList/>
        </DataProvider>
      </Suspense>
    </div>
  );
}
