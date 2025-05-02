import PlayerList from "@/components/players/PlayerList";
import TeamList from "@/components/teams/TeamList";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <TeamList />
      <PlayerList />
    </>
  );
}
