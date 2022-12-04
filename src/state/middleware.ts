import { createListenerMiddleware } from "@reduxjs/toolkit";

import { toggleFav } from "./favsSlice";
import { RootState } from "./store";

const persistenceMiddleware = createListenerMiddleware();
persistenceMiddleware.startListening({
  actionCreator: toggleFav,
  effect: (action, listenerApi) => {
    const idStrings = (listenerApi.getState() as RootState)
      .favs
      .favs
      .map(fav => fav.imdbID);
    localStorage.setItem('favs', JSON.stringify(idStrings));
  }
});

export default persistenceMiddleware;
