'use client'

import {useData} from "@/contexts/data-context";
import {TeamMessage} from "@/types/types";
import TeamBox from "@/components/TextBox/TextBox";

const TeamsNewsList = () => {
  const {data} = useData();

  return (<>
    {!data || data?.length === 0 && (<p>Wähle eine JSON-Datei aus...</p>)}
    {data?.length > 0 && <ul>
      {data.filter((item) => item.skeleton === false).filter((item)=>item.id).map((item: TeamMessage) => {
        const componentProps = {
          author: item.author,
          timeLabel: item.timeLabel,
          text: item.text
        } satisfies Pick<TeamMessage, 'author' | 'timeLabel' | 'text'>;
        return (<li key={item.id}><TeamBox {...componentProps} /></li>)
      })}
    </ul>
    }
  </>)
}

export default TeamsNewsList;
