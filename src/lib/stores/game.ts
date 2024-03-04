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
    const { subscribe, update } = stat;

    return {
        subscribe,
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