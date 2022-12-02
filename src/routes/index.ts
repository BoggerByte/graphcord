import Docs from './docs/index.svelte'
import MessageGenerator from './message-generator/index.svelte'

const routes = {
	'/': MessageGenerator,
	'/docs': Docs
}

export default routes
