"use client";

import { useState } from "react";

export const TeamCreateModal = ({ isOpen, onClose, onCreate }) => {
  if (!isOpen) return null;

  const [teamName, setTeamName] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleCreate = () => {
    if (teamName && city && country) {
      const newTeam = {
        id: Date.now(), 
        name: teamName,
        city,
        country,
      };
      onCreate(newTeam);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white px-16 py-12 shadow-md max-w-sm w-full text-center space-y-4">
        <h2 className="text-lg font-semibold text-navy">Create New Team</h2>

        <div className="space-y-2">
          <input
            type="text"
            placeholder="Team Name"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
        </div>

        <div className="flex justify-center pt-4 space-x-4">
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-teal text-cream"
          >
            Create
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-cream text-navy"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const TeamDeleteModal = ({ isOpen, onClose, team, onConfirm }) => {
  if (!isOpen) return null;

  const handleDelete = () => {
    if (team) {
      onConfirm();
      console.log("Deleting team:", team.id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white px-16 py-12 shadow-md max-w-sm w-full text-center space-y-4">
        <h2 className="text-lg font-semibold text-navy">Delete Team</h2>
        <p className="text-sm text-gray-600">Are you sure you want to delete the team <span className="font-bold">{team?.name}</span>?</p>

        <div className="flex justify-center pt-4 space-x-4">
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-danger text-cream"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-cream text-navy"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export const TeamUpdateModal = ({ isOpen, onClose, team, onUpdate, onRemovePlayer }) => {
  if (!isOpen || !team) return null;

  const [name, setName] = useState(team.name || "");
  const [city, setCity] = useState(team.city || "");
  const [country, setCountry] = useState(team.country || "");

  const handleUpdate = () => {
    if (name && city && country) {
      onUpdate({ name, city, country });
      onClose();
    }
  };

  const handleRemovePlayer = async (teamId, playerId) => {
    await onRemovePlayer(teamId, playerId);
    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg px-8 py-6 shadow-lg max-w-md w-full space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-navy">Update Team</h2>
          <p className="text-gray-600 text-sm mt-1">Edit team information and manage players</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Team Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter team name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter country"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
          </div>
        </div>

        {team.players?.length > 0 && (
          <div className="pt-4">
            <h3 className="text-lg font-semibold text-navy mb-3">Team Players</h3>
            <div className="max-h-48 overflow-y-auto">
              <ul className="divide-y divide-gray-200">
                {team.players.map((player) => (
                  <li
                    key={player.id}
                    className="flex justify-between items-center py-3 px-4 hover:bg-gray-50 rounded-md"
                  >
                    <span className="font-medium">
                      {player.first_name} {player.last_name}
                    </span>
                    <button
                      onClick={() => handleRemovePlayer(team.id, player.id)}
                      className="cursor-pointer text-sm px-3 py-1 text-danger"
                    >
                      Remove from team
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-6 border-t">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-cream text-navy"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-5 py-2 bg-teal text-cream"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export const PlayerAddModal = ({ isOpen, onClose, onAssign, player, teams }) => {
  const [teamId, setTeamId] = useState("");

  const handleAssign = () => {
    if (teamId) {
      onAssign({
        teamId,
        player,
      });
      console.log("Assigning player to team:", teamId, player);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white px-16 py-12 shadow-md max-w-sm w-full space-y-4">
        <h2 className="text-lg font-semibold text-navy text-center">
          Assign <span className="font-bold">{player.first_name} {player.last_name}</span> to Team
        </h2>

        <select
          value={teamId}
          onChange={(e) => setTeamId(e.target.value)}
          className="w-full px-4 py-2 border rounded"
        >
          <option value="">Select Team</option>
          {teams?.map((team) => (
            <option key={team.id} value={team.id}>
              {team.name || team.full_name}
            </option>
          ))}
        </select>

        <div className="flex justify-center pt-4 space-x-2">
          <button
            onClick={handleAssign}
            className="px-4 py-2 bg-teal text-cream"
          >
            Assign
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-cream text-navy"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export const PlayerUpdateModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white px-16 py-12 shadow-md max-w-sm w-full text-center space-y-4">
        <h2 className="text-lg font-semibold text-navy">PlayerUpdateModal</h2>
        <p className="text-sm text-gray-600">Form elements go here...</p>

        <div className="flex justify-center pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const PlayerDeleteModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white px-16 py-12 shadow-md max-w-sm w-full text-center space-y-4">
        <h2 className="text-lg font-semibold text-navy">PlayerDeleteModal</h2>
        <p className="text-sm text-gray-600">Form elements go here...</p>

        <div className="flex justify-center pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
