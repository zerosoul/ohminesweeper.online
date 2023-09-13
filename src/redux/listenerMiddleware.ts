import { addListener, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { set } from "idb-keyval";

import {
  updateLevel,
  updateCellSize,
  updateMini,
  addRecord,
  updateSound,
  removeRecord
} from "./slice/user.data";

import type { TypedAddListener, TypedStartListening } from "@reduxjs/toolkit";

import { AppDispatch, RootState } from "./store";

type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const listenerMiddleware = createListenerMiddleware();
const startAppListening = listenerMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<RootState, AppDispatch>;

// Update user data
startAppListening({
  matcher: isAnyOf(updateLevel, updateCellSize, updateMini, addRecord, updateSound, removeRecord),

  effect: async (action, listenerApi) => {
    console.log("action", action, listenerApi.getState());
    switch (action.type) {
      case "userData/updateMini":
        {
          set("minimized", action.payload);
        }
        break;
      case "userData/updateLevel":
        {
          set("level", action.payload);
        }
        break;
      case "userData/updateCellSize":
        {
          set("cellSize", action.payload);
        }
        break;
      case "userData/updateSound":
        {
          set("sound", action.payload);
        }
        break;
      case "userData/removeRecord":
      case "userData/addRecord":
        {
          const currState = listenerApi.getState();
          set("records", currState.userData.records);
        }
        break;

      default:
        break;
    }
  }
});

// // Update setting
// startAppListening({
//     actionCreator: setAppSetting,
//     effect: (action, listenerApi) => {
//         localStorage.setItem('setting', JSON.stringify(listenerApi.getState().setting));
//     },
// });
