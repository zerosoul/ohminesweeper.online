import { addListener, createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import { set } from "idb-keyval";

import {
  updateLevel,
  updateCellSize,
  toggleMini,
  addRecord,
  toggleSound,
  removeRecord,
  updateCustom,
  updateUI
} from "./slice/user.data";

import type { TypedAddListener, TypedStartListening } from "@reduxjs/toolkit";

import { AppDispatch, RootState } from "./store";

type AppStartListening = TypedStartListening<RootState, AppDispatch>;

export const listenerMiddleware = createListenerMiddleware();
const startAppListening = listenerMiddleware.startListening as AppStartListening;

export const addAppListener = addListener as TypedAddListener<RootState, AppDispatch>;

// Update user data
startAppListening({
  matcher: isAnyOf(
    updateLevel,
    updateCellSize,
    toggleMini,
    addRecord,
    toggleSound,
    removeRecord,
    updateCustom,
    updateUI
  ),

  effect: async (action, listenerApi) => {
    console.log("action", action, listenerApi.getState());
    const currState = listenerApi.getState();
    switch (action.type) {
      case "userData/updateCustom":
        {
          set("custom", action.payload);
        }
        break;
      case "userData/toggleMini":
        {
          set("minimized", currState.userData.minimized);
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
      case "userData/updateUI":
        {
          set("ui", action.payload);
        }
        break;
      case "userData/toggleSound":
        {
          set("sound", currState.userData.sound);
        }
        break;
      case "userData/removeRecord":
      case "userData/addRecord":
        {
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
