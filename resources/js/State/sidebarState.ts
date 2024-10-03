import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const sidebarState = atom({
  key: 'sidebarState',  // Unique ID (with respect to other atoms/selectors)
  default: false,       // Default value (collapsed state)
	effects_UNSTABLE: [persistAtom],
});
