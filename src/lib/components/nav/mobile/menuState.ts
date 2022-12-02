import { writable } from 'svelte/store'

const menuState = writable<boolean>(false)

export default menuState

export function close() {
	menuState.update(() => false)
}

export function toggle() {
	menuState.update((value) => !value)
}
