import { writable } from 'svelte/store';

export type Stat = {
    health: number,
    fun: number,
}

const stat = writable<Stat>({
    health: 100,
    fun: 100,
});

function createStatStore() {
    const { subscribe, update, set } = stat;

    return {
        subscribe,
        reset: () => set({ health: 100, fun: 100 }),
        zeroTheHealth: () => update(s => {
            s.health = 0;
            return { ...s };
        }),
        zeroTheFun: () => update(s => {
            s.fun = 0;
            return { ...s };
        }),
        apply: (statUpdate: Stat) => update(s => {
            s.health += statUpdate.health;
            s.fun += statUpdate.fun;
            return { ...s };
        }),
    }
}

export default createStatStore();


export const uiBlocked = writable<boolean>(false);

export const selected = writable<string>('');