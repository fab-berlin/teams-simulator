import {TeamMessage} from "@/types/types";

const TeamBox = ({author, timeLabel, text}: Pick<TeamMessage, 'author' | 'timeLabel' | 'text'>) => {
  const intials = author.split(" ")[0].substring(0, 1) + author.split(" ")[1].substring(0, 1);
  return (<section className="flex flex-row items-start py-4">
    <p className="size-16 rounded-full bg-black text-white shrink-0 grow-0 flex items-center justify-center text-2xl mr-4">{intials}</p>
    <div>
      <p className="font-bold mb-2">{timeLabel}</p>
      <p className="bg-gray-100 p-4 rounded-md">{text}</p>
    </div>
  </section>)
}

export default TeamBox;
