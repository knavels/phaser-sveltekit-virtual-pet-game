import { writable } from 'svelte/store';

export interface Stat {
    health: number,
    fun: number,
}

export const stat = writable<Stat>({
    health: 100,
    fun: 100,
});