import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  players: [],
  page: 10,
  loading: false,
  error: null,
  hasMore: true,
};

export const fetchPlayers = createAsyncThunk(
  "players/fetchPlayers",
  async (page, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://api.balldontlie.io/v1/players?per_page=${page}`, {
        headers: {
          Authorization: `Bearer 99aac2be-1857-45b8-a632-dce364721af3`,
        },
      });

      const players = response.data.data.map((player) => ({
        ...player,
        team: null,
      }));

      return {
        players,
        total: response.data.meta.total,
        page,
      };
    } catch (err) {
      return rejectWithValue("Failed to fetch players");
    }
  }
);

const playerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    addPlayer: (state, action) => {
      state.players.unshift(action.payload);
    },
    updatePlayerTeam: (state, action) => {
      const { playerId, team } = action.payload;
      const index = state.players.findIndex((p) => p.id === playerId);
      if (index !== -1) {
        state.players[index].team = team;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlayers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlayers.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.players = action.payload.players;
        state.page = action.payload.page;
        state.hasMore = action.payload.players.length < action.payload.total;
      })
      .addCase(fetchPlayers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch players";
      });
  },
});

export const { addPlayer, updatePlayerTeam } = playerSlice.actions;
export default playerSlice.reducer;
