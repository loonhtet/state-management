import { createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const initialState = {
  teams: [],
  loading: false,
  error: null,
};

const persistConfig = {
  key: "teams",
  storage,
};

const teamSlice = createSlice({
  name: "teams",
  initialState,
  reducers: {
    createTeam: (state, action) => {
      const newTeam = { ...action.payload, players: [] };
      state.teams.push(newTeam);
    },

    updateTeam: (state, action) => {
      const { id, updatedTeam } = action.payload;
      const index = state.teams.findIndex((team) => team.id === id);
      if (index !== -1) {
        state.teams[index] = { ...state.teams[index], ...updatedTeam };
      }
    },

    deleteTeam: (state, action) => {
      const { id } = action.payload;
      state.teams = state.teams.filter((team) => {
        return team.id !== (typeof id === 'string' ? parseInt(id) : id);
      });
    },

    addPlayerToTeam: (state, action) => {
      const { teamId, player } = action.payload;
      const team = state.teams.find((team) => team.id === (typeof teamId === 'string' ? parseInt(teamId) : teamId));
      
      if (team) {
        const playerExists = team.players?.some(p => p.id === player.id);
        if (!playerExists) {
          team.players = team.players || [];
          team.players.push(player);
        }
      }
    },
    removePlayerFromTeam: (state, action) => {
      const { teamId, playerId } = action.payload;
      const team = state.teams.find((team) => team.id === teamId);
      if (team && team.players) {
        team.players = team.players.filter((player) => player.id !== playerId);
      }
    },
  },
});

export const {
  createTeam,
  updateTeam,
  deleteTeam,
  addPlayerToTeam,
  removePlayerFromTeam,
} = teamSlice.actions;

const persistedReducer = persistReducer(persistConfig, teamSlice.reducer);

export default persistedReducer;
