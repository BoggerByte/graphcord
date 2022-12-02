interface Icon {
	box: number
	name: string
	svg: string
}

const icons: Icon[] = [
	{
		box: 16,
		name: 'plus',
		svg: `<path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 4L8 12M4 8L12 8" />`
	},
	{
		box: 16,
		name: 'copy',
		svg: `<path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M3 10H2.5C1.67157 10 1 9.32845 1 8.50002L1 2.5C1 1.67157 1.67158 1 2.50001 1L8.5 1.00002C9.32843 1.00002 10 1.67159 10 2.50002V3.00002M13.4999 6.00008L7.49994 6.00006C6.67151 6.00006 5.99994 6.67164 5.99994 7.50006L5.99993 13.5001C5.99993 14.3285 6.67151 15.0001 7.49993 15.0001H13.4999C14.3284 15.0001 14.9999 14.3285 14.9999 13.5001V7.50008C14.9999 6.67165 14.3284 6.00008 13.4999 6.00008Z" />`
	},
	{
		box: 16,
		name: 'cross',
		svg: `<path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 4L4 12M4 4L12 12" />`
	},
	{
		box: 24,
		name: 'chevron-up',
		svg: `<path stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />`
	},
	{
		box: 24,
		name: 'chevron-down',
		svg: `<path stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />`
	},
	{
		box: 24,
		name: 'chevron-right',
		svg: `<path stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />`
	},
	{
		box: 24,
		name: 'arrow-path',
		svg: `<path stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />`
	},
	{
		box: 24,
		name: 'clipboard',
		svg: `<path stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />`
	}
]

export default icons
