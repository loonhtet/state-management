"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteButton, UpdateButton } from "../ui/Buttons";
import { TeamCreateModal, TeamDeleteModal, TeamUpdateModal } from "../ui/Modals";
import { createTeam, deleteTeam, removePlayerFromTeam, updateTeam } from "@/redux/slices/teamSlice";

const TeamList = () => {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [openModalType, setOpenModalType] = useState(null);

  const dispatch = useDispatch();
  const teams = useSelector((state) => state.teams.teams);

  console.log("Teams:", teams);

  const openModal = (type, team = null) => {
    setSelectedTeam(team);
    setOpenModalType(type);
  };

  const closeModal = () => {
    setSelectedTeam(null);
    setOpenModalType(null);
  };

  const handleDeleteTeam = (teamId) => {
    dispatch(deleteTeam({ id: selectedTeam.id }));
    closeModal();
  };

  const handleCreateTeam = (team) => {
    dispatch(createTeam(team));
    closeModal();
  };

  const handleUpdateTeam = (updatedData) => {
    dispatch(updateTeam({ id: selectedTeam.id, updatedTeam: updatedData }));
    closeModal();
  };

  return (
    <div className="p-6 relative">
      <h1 className="text-3xl font-bold mb-6 text-navy">Team List</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team) => (
          <div
            key={team.id}
            className="bg-cream text-navy rounded-lg border-4 border-salmon space-y-4 p-6 transition duration-300"
          >
            <h2 className="text-xl font-bold">{team.name}</h2>
            <p className="text-sm"><span className="font-semibold">City:</span> {team.city}</p>
            <p className="text-sm"><span className="font-semibold">Country:</span> {team.country}</p>
            {team.players && team.players.length > 0 && (
              <div className="mt-2">
                <h3 className="font-semibold text-sm">Players:</h3>
                <ul className="text-sm list-disc list-inside">
                  {team.players.map(player => (
                    <li key={player.id}>
                      {player.first_name} {player.last_name} ({player.position || 'N/A'})
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div>
              <DeleteButton onClick={() => openModal('delete', team)} />
              <UpdateButton onClick={() => openModal('update', team)} />
            </div>
          </div>
        ))}
        <div
          onClick={() => openModal('create')}
          className="cursor-pointer flex flex-col justify-center items-center bg-teal text-navy border-4 border-sand space-y-4 p-6 transition duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="#F2CC8F" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#F2CC8F" className="size-16">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Create New Team
        </div>
      </div>

      {openModalType === 'delete' && (
        <TeamDeleteModal
          isOpen={openModalType === 'delete'}
          onClose={closeModal}
          onConfirm={handleDeleteTeam}
          team={selectedTeam}
        />
      )}

      {openModalType === 'update' && (
        <TeamUpdateModal
          isOpen={openModalType === 'update'}
          onClose={closeModal}
          team={selectedTeam}
          onUpdate={(data) => {
            dispatch(updateTeam({ id: selectedTeam.id, updatedTeam: data }));
            closeModal();
          }}
          onRemovePlayer={(teamId, playerId) => {
            dispatch(removePlayerFromTeam({ teamId, playerId }));
          }}
        />
      )}

      {openModalType === 'create' && (
        <TeamCreateModal
          isOpen={openModalType === 'create'}
          onClose={closeModal}
          onCreate={handleCreateTeam}
        />
      )}
    </div>
  );
};

export default TeamList;
