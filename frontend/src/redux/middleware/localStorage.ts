import { Middleware } from '@reduxjs/toolkit';
import { RootState } from '../store';

type StorageConfig = {
  slicePrefix: string;
  storageKey: string;
  selector: (state: RootState) => any;
};

const storageConfigs: StorageConfig[] = [
  {
    slicePrefix: 'exercise/',
    storageKey: 'exercises',
    selector: (state: RootState) => state.exercise.exercises
  },
  {
    slicePrefix: 'workout/',
    storageKey: 'workouts',
    selector: (state: RootState) => state.workout
  },
  {
    slicePrefix: 'profile/',
    storageKey: 'profiles',
    selector: (state: RootState) => state.profile
  }
];

export const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);
  
  if (typeof action === 'object' && action !== null && 'type' in action && typeof action.type === 'string') {
    // Check each storage config
    for (const config of storageConfigs) {
      if (action.type.startsWith(config.slicePrefix)) {
        const state = store.getState() as RootState;
        const data = config.selector(state);
        localStorage.setItem(config.storageKey, JSON.stringify(data));
        break; // Exit after first match since an action can only belong to one slice
      }
    }
  }
  
  return result;
}; 