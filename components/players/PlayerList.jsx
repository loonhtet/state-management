"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddButton, LoadMoreButton} from "../ui/Buttons";
import { PlayerAddModal } from "../ui/Modals";
import { fetchPlayers } from "@/redux/slices/playerSlice";
import { addPlayerToTeam } from "@/redux/slices/teamSlice";

const PlayerList = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [openModalType, setOpenModalType] = useState(null);

  const dispatch = useDispatch();
  const { players, page, loading, hasMore, error } = useSelector((state) => state.players);
  const teams = useSelector((state) => state.teams.teams);

  useEffect(() => {
    if (players && players.length === 0) {
      dispatch(fetchPlayers(10));
    }
  }, [players, dispatch]);

  const isPlayerInAnyTeam = (player, teams) => {
    return teams.some(team => team.players?.some(p => p.id === player.id));
  };
  
  
  const openModal = (type, team = null) => {
    setSelectedTeam(team);
    setOpenModalType(type);
  };

  const closeModal = () => {
    setSelectedTeam(null);
    setOpenModalType(null);
  };

  const confirmDelete = () => {
    console.log("Deleted:", selectedTeam);
    closeModal();
  };

  const handleLoadMore = () => {
    dispatch(fetchPlayers(page + 10));
  };  

  const handleAddTeam = (data) => {
    const { player, teamId } = data;
    
    if (teamId && player) {
      dispatch(addPlayerToTeam({ 
        teamId: parseInt(teamId), 
        player 
      }));
      closeModal();
    } else {
      console.error('Missing teamId or player data');
    }
  };

  return (
    <div className="px-6 mb-24">
      <h1 className="text-2xl font-semibold mb-4">Player List</h1>

      {error && <p className="text-red-500">{error}</p>}

      <div className="overflow-x-auto bg-cream text-navy">
        <table className="min-w-full">
          <thead className="bg-salmon">
            <tr>
              <th className="border p-2 text-left">ID</th>
              <th className="border p-2 text-left">Name</th>
              <th className="border p-2 text-left">Position</th>
              <th className="border p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {players && players.length > 0 ? (
              players.map((player) => (
                <tr key={player.id}>
                  <td className="border p-2">{player.id}</td>
                  <td className="border p-2">{player.first_name} {player.last_name}</td>
                  <td className="border p-2">{player.position || "-"}</td>
                  <td className="border p-2">
                    <div className="flex gap-1">
                    {!isPlayerInAnyTeam(player, teams) && (
                      <AddButton onClick={() => openModal('add', player)} />
                    )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              null
            )}
          </tbody>
        </table>
      </div>


      <div className="text-center mt-6">
        <LoadMoreButton onClick={handleLoadMore} loading={loading} />
      </div>

      {openModalType === 'add' && (
        <PlayerAddModal 
          isOpen={true}
          onClose={closeModal}
          player={selectedTeam}
          onAssign={handleAddTeam}
          teams={teams}
        />
      )}
    </div>
  );
};

export default PlayerList;
