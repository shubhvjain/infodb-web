<script>
	import { onMount } from 'svelte';
	export let mode = 'view';
	export let schema = {
		type: 'object',
		title: 'Some title ',
		properties: {
			name: { type: 'string' },
			email: { type: 'string', format: 'email' }
		},
		required: ['name', 'class', 'email']
	};
	export let data = { };
	export let options = {};

	let theEditor;
	let editorId;
	let editorError;
	let displayError = (msg)=>{
		editorError= msg
	}

	let getEditorName = () => {
		return 'editor-' + (Math.floor(Math.random() * 9000) + 1000);
	};

	let valErrMag = (error)=>{
		let val = []
		error.map(er=>{
			let pp = er.path.split(".")
			val.push(`- ${pp[1]} : ${er.message}`)
		})
		return val.join("\n")
	}

	let displayEditor = async () => {
		const { JSONEditor } = await import('@json-editor/json-editor');
		const element = document.getElementById(editorId);
		if (!schema) {
			displayError('No schema provided');
			throw new Error('No schema provided');
		}
		const editorOptions = {
			theme: 'bootstrap5',
			disable_collapse: true,
			disable_edit_json: true,
			disable_properties: true,
			use_default_values: true,
			disable_array_delete_last_row: true,
			disable_array_reorder:true,
			array_controls_top:false,
			//show_errors:"change",
			//show_opt_in:true,
			//object_layout:"table",
			...options,
			schema: schema
		};
		theEditor = new JSONEditor(element, editorOptions);
		setTimeout(() => {
			theEditor.disable(); // the editor is disabled by default, if the mode is edit or new , it is then enabled when loading the mode
			theEditor.on('change', () => {
				// Do something
				const errors = theEditor.validate();
				if (errors.length) {
					console.log(errors);
					displayError(`Validation Errors \n${valErrMag(errors)}`)
				} else {
					displayError("")
					data = theEditor.getValue();
					console.log(data);
				}
			});
		}, 100);
	};
	let editor_options = {};
	let loadEditor = async () => {
		if (theEditor) {
			theEditor.destroy();
		}
		let modes = {
			view: async () => {
				if (Object.keys(data).length > 0) {
					editor_options['show_edit_button_on_view'] = true;
				}
				await displayEditor();
				setTimeout(() => {
					theEditor.enable();
					theEditor.setValue(data);
					theEditor.disable();
				}, 100);
			},
			edit: async () => {
				await displayEditor();
				setTimeout(() => {
					theEditor.setValue(data);
					theEditor.enable();
				}, 100);
			},
			new: async () => {
				await displayEditor();
				setTimeout(() => {
					// theEditor.setValue(data);
					theEditor.enable();
				}, 100);
			}
		};
		await modes[mode]();
	};

	let initializeEditor = () => {
		if (!mode) {
			displayError('No editor mode provided');
		}
		loadEditor();
	};

	const changeModeTo = (new_mode) => {
		mode = new_mode;
		loadEditor();
	};

	onMount(async () => {
		try {
			editorId = getEditorName();
			initializeEditor();
		} catch (error) {}
	});
</script>

<div class="row">
	<div class="col">
		{#if editorError}
			<div class="alert alert-warning">
				{@html editorError}
			</div>
		{/if}
		<div class="editor-json" id={editorId}></div>
		{#if mode == 'view'}
		{#if editor_options['show_edit_button_on_view']}
						<button class="btn btn-sm" on:click={() => changeModeTo('edit')}>Edit</button>
					{/if}
			
		{/if}
	</div>
</div>

<div></div>
