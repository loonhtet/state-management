"use client";
import { useState } from "react";
import { AddButton, DeleteButton, LoadMoreButton, UpdateButton } from "../ui/Button";

const PlayerList = () => {
  const players = [
    { id: 1, name: 'Lionel Messi', position: 'Forward', team: 'Inter Miami' },
    { id: 2, name: 'Cristiano Ronaldo', position: 'Forward', team: 'Al Nassr' },
    { id: 3, name: 'Kevin De Bruyne', position: 'Midfielder', team: 'Man City' },
    { id: 4, name: 'Virgil van Dijk', position: 'Defender', team: 'Liverpool' },
    { id: 5, name: 'Kylian Mbappé', position: 'Forward', team: 'PSG' },
    { id: 6, name: 'Erling Haaland', position: 'Forward', team: 'Man City' },
    // Add more players as needed
  ];

  const [visibleCount, setVisibleCount] = useState(4);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 2);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Player List</h1>
      <div className="overflow-x-auto bg-navy text-cream">
        <table className="min-w-full">
          <thead className="bg-salmon">
            <tr>
              <th className="border p-2 text-left">ID</th>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Position</th>
              <th className="border p-2 text-left">Team</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {players.slice(0, visibleCount).map((player) => (
              <tr key={player.id}>
                <td className="border p-2">{player.id}</td>
                <td className="border p-2">{player.name}</td>
                <td className="border p-2">{player.position}</td>
                <td className="border p-2">{player.team}</td>
                <td className="border p-2">
                  <div className="flex gap-1">
                    <AddButton />
                    <UpdateButton />
                    <DeleteButton />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {visibleCount < players.length && (
          <div className="text-center my-4">
            <LoadMoreButton onClick={handleLoadMore} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerList;